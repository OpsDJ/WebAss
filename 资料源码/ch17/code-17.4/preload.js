const { contextBridge, ipcRenderer } = require('electron')
// 向渲染进程暴露API
contextBridge.exposeInMainWorld('myApi', {
  // 按空格键时主进程发送 "start/pause" 事件
  // 此方法向渲染进程提供事件监听注册接口
  onStartOrPause: (callback) => ipcRenderer.on('start/pause', callback)
})