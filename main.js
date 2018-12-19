const { app, BrowserWindow } = require("electron");
const express = require("express");
const cors = require("cors");
const { v4: uuid } = require("uuid");
const path = require("path");
const rimraf = require("rimraf");
const fs = require("fs");
const bodyParser = require("body-parser");

documentsDir = path.join(app.getPath("temp"), "electron-print-server");

if (fs.existsSync(documentsDir)) {
  rimraf.sync(documentsDir);
}

fs.mkdirSync(documentsDir);

const server = express();
let appWin = null;

server.use(bodyParser.text());
server.use(cors());

server.get("/", (req, res) => {
  const win = new BrowserWindow({ width: 800, height: 600 });
});

server.get("/status", (req, res) => {
  res.json({ running: true });
});

server.get("/printers", (req, res) => {
  if (appWin) {
    const wc = appWin.webContents;
    const printers = wc.getPrinters();
    res.json(printers);
  }
});

server.post("/print", (req, res) => {
  const filepath = path.join(documentsDir, `${uuid()}.html`);
  const printerName = req.query.printerName;
  fs.writeFileSync(filepath, req.body);

  let labelWin = new BrowserWindow({
    width: 475,
    height: 640,
    webPreferences: {
      webSecurity: false
    }
  });

  labelWin.loadFile(filepath);

  labelWin.on("closed", () => {
    labelWin = null;
    fs.unlinkSync(filepath);
  });

  labelWin.webContents.on("did-finish-load", () => {
    labelWin.webContents.print(
      {
        silent: true,
        deviceName: printerName
      },
      () => labelWin.close()
    );
  });
  res.json({ success: "true" });
});

app.on("ready", () => {
  appWin = new BrowserWindow({ width: 800, height: 600 });
  appWin.hide();
  server.listen(1337, console.log("listening on 1337"));
});
