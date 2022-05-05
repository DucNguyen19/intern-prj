const electron = require('electron');
const { app, BrowserWindow, Menu } = electron;
const path = require('path');
const prompt = require('electron-prompt');
const isDev = require('electron-is-dev');
const Store = require('./storage.js');

const store = new Store({
  configName: 'setting',
  defaults: {
    prodURL: ""
  }
});

let mainWindow = null;
let devURL = "http://localhost:4000";
let prodURL = store.get('prodURL');

app.on('ready', () => {
  createWindow();
  setMainMenu();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

function setMainMenu() {
  const template = [
    {
      label: 'Cài Đặt',
      submenu: [
        {
          label: 'Cấu hình cổng giao tiếp',
          accelerator: 'Shift+CmdOrCtrl+H',
          async click() {
            const result = await prompt({
              title: 'Cài đặt PORT',
              label: 'URL:',
              value: 'http://localhost:3000',
              inputAttrs: {
                type: 'url'
              },
              type: 'input'
            })
            if (result !== null) {
              store.set('prodURL', result);
              devURL = result;
              prodURL = result;
              app.quit();
              createWindow();
            } 
          }
        }
      ]
    }
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    title: "XTP HIS ",
    webPreferences: {
      devTools: false
    },
    //autoHideMenuBar: true,
    icon: path.join(__dirname, "logo512.png")
  });
  mainWindow.loadURL(isDev ? devURL : prodURL);
  mainWindow.on('closed', function () {
    mainWindow = null
  })
  mainWindow.on('page-title-updated', function (e) {
    e.preventDefault()
  });
}