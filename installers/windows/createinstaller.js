const createWindowsInstaller = require("electron-winstaller")
  .createWindowsInstaller;
const path = require("path");

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch(error => {
    console.error(error.message || error);
    process.exit(1);
  });

function getInstallerConfig() {
  console.log("creating windows installer");
  const rootPath = path.join("./");
  const outPath = path.join(rootPath, "release-builds");

  return Promise.resolve({
    appDirectory: path.join(outPath, "http-print-server-win32-x64"),
    authors: "Cody Patnaude",
    noMsi: true,
    outputDirectory: path.join(outPath, "windows-installer"),
    exe: "http-print-server.exe",
    setupExe: "http-print-server-setup.exe",
    description: "A tiny http printserver"
  });
}
