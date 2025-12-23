const { app, ipcMain, BrowserWindow, webContents, dialog } = require('electron/main');
const { isBinaryFileSync } = require("isbinaryfile");
const path = require('path');
const fs = require('fs');
let OPTIONS_FILE = 'options.json';
let installationPath = 'exe';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 600,
    height: 600,
    minWidth: 450,
    minHeight: 350,
    icon: path.join(__dirname, 'src/assets/icon.png'),
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'src/js/preload.js'),
    }
  })

  win.loadFile('src/index.html')
}

app.whenReady().then(() => {
  let initialFileObj = { path: "", data: "", error: "No File" };
  installationPath = path.dirname(app.getPath('exe'))
  OPTIONS_FILE = path.join(installationPath, 'options.json');

  if (process.platform === 'win32' || process.platform === 'linux') {
    //const fileArg = process.argv.find(arg => !arg.startsWith('--') && path.isAbsolute(arg) && !arg.toLowerCase().includes('electron'));
    let fileArg = "--";
    if (app.isPackaged && process.argv[1]) {
      fileArg = process.argv[1];
    } else if (process.argv[2]) {
      fileArg = process.argv[2];
    }

    if (!fileArg.startsWith('--') && path.isAbsolute(fileArg)) {
      initialFileObj = initializeFile(fileArg);
    }
  }

  ipcMain.handle('exit-app', () => app.quit());
  ipcMain.handle('screenshot-screen', async (event, bounds) => screenshot(event, bounds));
  ipcMain.handle('open-file', () => loadFile());
  ipcMain.handle('save-file', (event, path, data) => saveFile(path, data));
  ipcMain.handle('file-exists', (event, filePath, data) => fileExists(filePath, data));
  ipcMain.handle('get-options', () => getOptions());
  ipcMain.handle('set-options', (event, theme, bold, zoom) => setOptions(theme, bold, zoom));
  ipcMain.handle('initialize', () => initialFileObj);
  ipcMain.handle('undo-text', () => {
    let focusedWindow = BrowserWindow.getFocusedWindow();
    if (focusedWindow) {
      focusedWindow.webContents.undo();
    }
  });
  ipcMain.handle('redo-text', () => {
    let focusedWindow = BrowserWindow.getFocusedWindow();
    if (focusedWindow) {
      focusedWindow.webContents.redo();
    }
  });

  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  });
  app.on('open-file', (event, filePath) => {
    event.preventDefault();
    initialFileObj = initializeFile(filePath);
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

function getOptions() {
  let options = { theme: '', bold: false, zoom: 16 };
  try {
    if (fs.existsSync(OPTIONS_FILE)) {
      let rawData = fs.readFileSync(OPTIONS_FILE);
      let jsonData = JSON.parse(rawData);

      options.zoom = Number(jsonData.zoom);
      options.bold = Boolean(jsonData.bold);
      options.theme = String(jsonData.theme).toLowerCase();
    }
  } catch (error) {
    console.log("Error loading options:", error.message);
  }
  return options;
}

function setOptions(theme, bold, zoom) {
  let options = { theme: String(theme) || '', bold: Boolean(bold) || false, zoom: Number(zoom) || 16 };
  try {
    let data = JSON.stringify(options, null, 2);
    fs.writeFileSync(OPTIONS_FILE, data, 'utf8');
  } catch (error) {
    console.log("Error loading options:", error.message);
  }
}

function fileExists(filePath = "", data) {
  let fileObj = { matches: true, error: null }
  try {
    let fileContent = "";
    let dataIsBlank = Boolean(!data) || data.length === 0;
    let fileExists = filePath.length !== 0 ? fs.existsSync(filePath) : false;

    if ((!fileExists ^ dataIsBlank)
      || (fileExists && !dataIsBlank)) {

      if (fileExists) {
        fileContent = fs.readFileSync(filePath, 'utf8');
      }

      if (!(fileContent === data) || !fileExists) {
        fileObj = { matches: false, error: null }
      } else if (fileContent === data) {
        fileObj = { matches: true, error: null }
      }
    }
  } catch (error) {
    fileObj = { matches: false, error: error.message }
  }

  return fileObj;
}

function saveFile(path = "", data) {
  let saveObj = { filePath: "", error: "Unknown" }
  try {
    let newPath = path;

    if (!fs.existsSync(newPath) || newPath.length === 0) {
      newPath = dialog.showSaveDialogSync({
        title: "Save File",
        filters: [
          { name: "Text Files", extensions: ["txt"] },
          { name: "Text-Based Files", extensions: ["*"] }
        ]
      });
    }

    fs.writeFileSync(newPath, data, 'utf8');
    saveObj = { filePath: newPath, error: null };
  } catch (error) {
    saveObj = { filePath: "", error: error.message }
  }

  return saveObj;
}

function loadFile() {
  let fileObj = { path: "", data: "", error: "Unknown" }
  try {
    let file = dialog.showOpenDialogSync({
      properties: ['openFile'],
      title: "Open File",
      defaultPath: "",
      filters: [
        { name: "Text Files", extensions: ["txt"] },
        { name: "Text-Based Files", extensions: ["*"] }
      ]
    });

    if (file && file.length > 0) {
      let filePath = file[0];

      if (!fs.existsSync(filePath)) {
        throw new Error("No File");
      }

      if (isBinaryFileSync(filePath)) {
        throw new Error("Incompatible");
      }

      let fileData = fs.readFileSync(filePath, 'utf8');
      fileObj = { path: filePath, data: fileData, error: null };
    }
  } catch (error) {
    fileObj = { path: "", data: "", error: error.message };
  }

  return fileObj;
}

function initializeFile(filePath) {
  let fileObj = { path: "", data: "", error: "Unknown" }
  try {
    if (filePath && filePath.length > 0) {
      if (!fs.existsSync(filePath)) {
        throw new Error("No File");
      }

      if (isBinaryFileSync(filePath)) {
        throw new Error("Incompatible");
      }

      let fileData = fs.readFileSync(filePath, 'utf8');
      fileObj = { path: filePath, data: fileData, error: null };
    } else {
      throw new Error("No File");
    }
  } catch (error) {
    fileObj = { path: "", data: "", error: error.message };
  }

  return fileObj;
}

async function screenshot(event, bounds) {
  let image = await event.sender.capturePage(bounds);
  let pngBuffer = image.toPNG();
  let downloadDir = app.getPath("downloads")

  let randNum = Math.floor(Math.random() * (999 - 100 + 1) + 100);
  if (!fs.existsSync(path.join(downloadDir, "screenshots"))) {
    fs.mkdirSync(path.join(downloadDir, "screenshots"))
  }

  let filename = path.join(downloadDir, `screenshots/${randNum}.png`);

  while (fs.existsSync(filename)) {
    randNum = Math.floor(Math.random() * (999 - 100 + 1) + 100);
    filename = path.join(downloadDir, `screenshots/${randNum}.png`);
  }

  fs.writeFileSync(filename, pngBuffer);
}