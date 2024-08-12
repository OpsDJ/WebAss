const { contextBridge, ipcRenderer } = require('electron')

// 向渲染进程暴露API
contextBridge.exposeInMainWorld('myApi', {
  // 渲染进程调用 sayHello() 函数时通过 IPC 通道调用主进程的 sayHello() 函数
  sayHello: (name) => ipcRenderer.invoke('sayHello', name),
  // 监听到主进程的 tick 事件时, 转递给渲染进程
  // callback 为渲染进程中注册的回调函数(参见 renderer.js)
  onTick: (callback) => ipcRenderer.on('tick', callback)
})
