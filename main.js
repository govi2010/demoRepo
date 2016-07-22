if (require('electron-squirrel-startup')) return;

const electron = require('electron');
const app = electron.app;

const tray = electron.tray;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;

var ipc = electron.ipcMain;
var updateFeed = 'http://localhost:5000/download/latest';

const autoUpdater = electron.autoUpdater;
const os = require('os').platform();

autoUpdater.addListener("update-available", function (event) {
    console.log("Update Is Avilable");
    if (mainWindow) {
        mainWindow.webContents.send('update-message', 'update-available');
    }
});

autoUpdater.addListener("update-downloaded", function (event, releaseNotes, releaseName, releaseDate, updateURL) {
    console.log("A new update is ready to install", `Version ${releaseName} is downloaded and will be automatically installed on Quit`);
    if (mainWindow) {
        mainWindow.webContents.send('update-message', 'update-downloaded');
    }
});

autoUpdater.addListener("error", function (error) {
    console.log(error);
    if (mainWindow) {
        mainWindow.webContents.send('update-message', 'update-error');
    }
});

autoUpdater.addListener("checking-for-update", function (event) {
    console.log("Checking for update");
    if (mainWindow) {
        mainWindow.webContents.send('update-message', 'checking-for-update');
    }
});

autoUpdater.addListener("update-not-available", function () {
    console.log("Update not available");
    if (mainWindow) {
        mainWindow.webContents.send('update-message', 'update-not-available');
    }
});


const appVersion = require('./package.json').version;
const feedURL = updateFeed + '?v=' + appVersion;
autoUpdater.setFeedURL(feedURL);

function createWindow() {
    const appIcon = 'icon.ico';

    mainWindow = new BrowserWindow({ width: 1280, height: 1024, title: "Jewellery Desktop" });
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.webContents.openDevTools();

    mainWindow.webContents.on('did-frame-finish-load', function () {
        console.log("Checking for updates: " + feedURL);
        autoUpdater.checkForUpdates();
    });

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}
app.on('ready', createWindow);

