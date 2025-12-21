const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('utilities', {
  exit: () => ipcRenderer.invoke('exit-app'),
  undo: () => ipcRenderer.invoke('undo-text'),
  redo: () => ipcRenderer.invoke('redo-text'),
  screenshot: (bounds) => ipcRenderer.invoke('screenshot-screen', bounds),
  openFile: () => ipcRenderer.invoke('open-file'),
  saveFile: (path, data) => ipcRenderer.invoke('save-file', path, data),
  fileExists: (filePath, data) => ipcRenderer.invoke('file-exists', filePath, data),
  initialize: () => ipcRenderer.invoke('initialize'),
  getOptions: () => ipcRenderer.invoke('get-options'),
  setOptions: (theme, bold, zoom) => ipcRenderer.invoke('set-options', theme, bold, zoom)
});