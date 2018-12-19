# electron-print-server
An http print server written in electron to allow printing directly from the browser

# Deployment

## To create a windows installer

```
npm run package
npm run create-installer
```

This will create an installer in ./release-builds/windows-installer.

# Usage

## Check if the app is running from a webpage

```javascript
fetch('http://localhost:1337/status').then(res => res.json()).then(console.log)
```

```json
{"running": true}
```

## Get a list of printers

```javascript
fetch('http://localhost:1337/printers').then(res => res.json()).then(console.log)
```

```json
[
  {
    "name": "Send To OneNote 2016",
    "description": "",
    "status": 0,
    "isDefault": false,
    "options": {
      "printer-make-and-model": "Send to Microsoft OneNote 16 Driver",
      "system_driverinfo": "Send to Microsoft OneNote 16 Driver;10.0.17134.191 (WinBuild.160101.0800);Microsoft® Windows® Operating System;10.0.17134.191"
    }
  },
  {
    "name": "Zebra ZP 450 CTP",
    "description": "",
    "status": 0,
    "isDefault": false,
    "options": {
      "printer-location": "",
      "printer-make-and-model": "Zebra ZP 450 CTP",
      "system_driverinfo": "Zebra ZP 450 CTP;0.3.0.0;Seagull Printer Drivers;1.0.0"
    }
  },
  {
    "name": "Zebra GK420d - ZPL",
    "description": "",
    "status": 0,
    "isDefault": true,
    "options": {
      "printer-location": "",
      "printer-make-and-model": "Zebra GK420d - ZPL",
      "system_driverinfo": "Zebra GK420d - ZPL;0.3.0.0;Seagull Printer Drivers;1.0.0"
    }
  }
]
```

## Print a document

```javascript
fetch(
  'http://localhost:1337/print?printerName=Zebra+GK420d+-+ZPL',
  {
    method: "POST", 
    body: "<h1>TEST</h1>"
  }
).then(res => res.json()).then(console.log)
```

The body can be plaintext or html.

```json
{"success": "true"}
```