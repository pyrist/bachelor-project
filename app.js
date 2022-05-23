const {app, BrowserWindow } = require('electron');
const url = require('url');
const path = require("path");

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true
    },
    autoHideMenuBar: true,
    useContentSize: true,
  })

  mainWindow.loadFile(`./dist/project/index.html`);
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})
