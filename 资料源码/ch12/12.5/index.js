const express = require('express')
const app = express()
const port = 9000
const expressWs = require('express-ws')(app)

app.use(express.static('public'))

app.ws('/', (ws, req) => {
  ws.on('message', function (msg) {
    console.log(msg)
    ws.send('Welcome!')
  })
})

// 每隔1秒向所有Websocket客户端发送服务器时间
setInterval(() => {
  // express-ws实例的getWss()方法可取得所有连接的Websocket客户端
  // 以此方式发送全局广播
  expressWs.getWss().clients.forEach((ws) => {
    ws.send(new Date().toLocaleTimeString())
  })
}, 1000)

app.listen(port, () => {
  console.log(`Listening to port ${port}`)
})
