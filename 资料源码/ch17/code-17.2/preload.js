const { contextBridge } = require('electron')

// 以下将 Node.js 环境（主进程）的变量和函数暴露给渲染进程
// versions 为向渲染进程暴露的 API 的自定义名称
contextBridge.exposeInMainWorld('versions', {
  // 变量（数据）
  nodeVersion: process.versions.node,
  chromeVersion: process.versions.chrome,
  // 函数
  getElectronVersion: () => process.versions.electron,
})