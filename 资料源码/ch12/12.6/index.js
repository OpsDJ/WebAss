const express = require('express')
const { Server } = require('socket.io')
const { createServer } = require('http')

const app = express()
const port = 9000
app.use(express.static('public'))

const httpServer = createServer(app)
// Socket.IO 服务端
const io = new Server(httpServer)

// 有客户端连接时触发connection事件
io.on('connection', (socket) => {
  // 向当前建立连接的客户端发送信息
  socket.emit('message', 'Welcome!')
  // 加入房间
  socket.join('Room1')
  // 收到客户端消息
  socket.on('message', (data) => {
    console.log(data)
  })
})

// 每隔1秒向 Room1 房间的所有 Socket 推送服务器时间
setInterval(() => {
  io.in('Room1').emit('RoomTick', new Date().toLocaleTimeString())
}, 1000)

// 每隔5秒向所有 Socket 推送服务器时间
setInterval(() => {
  io.emit('GlobalTick', new Date().toLocaleTimeString())
}, 5000)

// 启动监听
httpServer.listen(port, () => {
  console.log(`Listening to port ${port}`)
})
