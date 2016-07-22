'use strict';
const electron = require('electron');
const app = electron.app;

const tray = electron.tray;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;
var ipc = electron.ipcMain;

const autoUpdater = electron.autoUpdater;
const appVersion = require('./package.json').version;
const os = require('os').platform();

function createWindow() {
    const appIcon = 'icon.ico';

    mainWindow = new BrowserWindow({ width: 1280, height: 1024, title: "Jewellery Desktop" });
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}
app.on('ready', createWindow);


