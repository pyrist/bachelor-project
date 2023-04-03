const {app, BrowserWindow } = require('electron');
const expressApp = require('./api')

let mainWindow

expressApp()

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true
    },
    autoHideMenuBar: true
  })

  mainWindow.loadFile(`./frontend/dist/project/index.html`);
  /*
  mainWindow.webContents.openDevTools()
  */

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
