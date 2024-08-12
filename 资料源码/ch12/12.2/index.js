const express = require('express')
const app = express()
const port = 9000

app.use(express.static('public'))

// 暂存长连接的回应对象
const responses = []

app.post('/long-poll', (req, res) => {
  // 暂存HTTP回应对象
  responses.push(res)
  // 注意: 此处无 res.send 或 res.end, 暂不回应
})

// 有需要时调用此函数将数据推送至客户端
// 需要将数据推送至哪个客户端则从 responses 数组中取得相应的回应对象传入
// data 为需要推送的数据
function serverPush(res, data) {
  res.send(data)
  // 回送数据后此回应对象已失效(连接断开)
  // 此时应将其从responses数组中移除
  responses.splice(responses.indexOf(res), 1)
}

// 以下代码使用定时器模拟服务端推送数据, 每隔1秒向客户端推送当前服务端时间
setInterval(() => {
  responses.forEach(res => {
    serverPush(res, new Date().toLocaleTimeString())
  })
}, 3000)

// 启动监听
app.listen(port, () => {
  console.log(`Listening to port ${port}`)
})
