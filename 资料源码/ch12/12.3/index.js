const express = require('express')
const app = express()
const port = 9000

app.use(express.static('public'))

// 暂存SSE连接回应对象
const responses = []

// 建立SSE通信的接口
app.get('/sse', function (req, res) {
  // 设定回应内容为event-stream
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  })
  // 暂存SSE连接回应对象
  responses.push(res)
})

// 有需要时调用此函数将数据推送至客户端
// 需要将数据推送至哪个客户端则从 responses 数组中取得相应的回应对象传入
// data 为需要推送的数据(string)
function serverPush(res, data) {
  // 将数据写回客户端(必须使用此格式)
  res.write('data: ' + data + '\n\n')
}

// 以下代码使用定时器模拟服务端推送数据，每隔1秒向客户端推送当前服务端时间
setInterval(() => {
  responses.forEach(res => {
    serverPush(res, new Date().toLocaleTimeString())
  })
}, 1000)

// 启动监听
app.listen(port, () => {
  console.log(`Listening to port ${port}`)
})
