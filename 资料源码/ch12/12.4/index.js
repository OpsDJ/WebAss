const { App } = require('uWebSockets.js')
const app = App()
const port = 9000

// 监听器特定URL模式的WebSocket连接
app.ws('/*', {
  // 建立连接
  open: (ws) => {
    // 向客户端发送信息
    ws.send('Welcome!')
    // 订阅Tick主题
    ws.subscribe('Tick')
  },
  // 收到客户端消息
  message: (ws, message, isBinary) => {
    // 输出从客户端发来的信息
    console.log(Buffer.from(message).toString())
  },
})

// 每隔1秒向客户端推送当前时间(发布Tick主题消息)
setInterval(() => {
  app.publish('Tick', new Date().toLocaleTimeString()) 
}, 1000)

// 启动监听
app.listen(port, (listenSocket) => {
  if (listenSocket) {
    console.log(`Listening to port ${port}`)
  } else {
    console.error(`Failed to listen to port ${port}`)
  }
})
