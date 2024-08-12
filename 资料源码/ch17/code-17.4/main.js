const { app, BrowserWindow, Menu, dialog } = require('electron')
const path = require('path')

// 创建窗口
function createWindow() {
  const win = new BrowserWindow({
    width: 240, height: 80,  // 窗口尺寸
    resizable: false,        // 不可改变窗口大小
    frame: false,            // 无边界窗口
    alwaysOnTop: true,       // 置顶显示
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  // 程序主菜单, 因是无边界窗口 Window 系统下并不显示主菜单
  // 但快捷键注册仍有效
  const menu = Menu.buildFromTemplate([{
      label: app.name,
      submenu: [{
          id: 'menu-run',
          label: '启动/暂停',
          accelerator: 'Space',   // 快捷键: 空格
          // 触发时主动发送消息至渲染进程
          click: () => { 
            win.webContents.send('start/pause') 
          },
        },
        { type: 'separator' },
        { role: 'minimize', label: '最小化' },
        { role: 'hide', label: '隐藏' },
        { role: 'quit', label: '退出', accelerator: 'Esc' },
      ],
    }, {
      role: 'help',
      submenu: [{
          label: '关于...',
          click: () => {
            // 使用 dialog 模块弹出"关于"对话框
            dialog.showMessageBox({ 
              message: '计时器 - Electron 示例', type: 'info', title: '关于...' 
            })
          },
        }]
    }])
  Menu.setApplicationMenu(menu)
  // 加载首页
  win.loadFile('pages/index.html')
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

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})