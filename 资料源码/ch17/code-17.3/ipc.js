const { ipcMain } = require('electron')

function registerIpc(win) {
  // 响应渲染进程 sayHello 调用
  ipcMain.handle('sayHello', (channel, name) => {
    return 'Hello ' + name
  })
  
  // 每隔1秒主动向渲染进程发送1次当前时间
  setInterval(()=>{
    win.webContents.send('tick', new Date().toLocaleTimeString())
  }, 1000)
}

module.exports = { registerIpc }