const { app, BrowserWindow } = require('electron')
const path = require('path')

// 创建窗口(下方应用程序启动就绪后调用)
function createWindow() {
  const win = new BrowserWindow({
    // 窗口尺寸
    width: 800, height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })
  // 加载首页
  win.loadFile('index.html')
}


// 应用程序启动就绪后创建窗口
app.whenReady().then(() => {
  createWindow()
  // 应用程序进入激活状态时, 如果没有窗口则创建一个窗口(兼容macOS)
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// 所有窗口关闭时退出应用程序
app.on('window-all-closed', () => {
  // 兼容macOS系统
  if (process.platform !== 'darwin') {
    app.quit()
  }
})