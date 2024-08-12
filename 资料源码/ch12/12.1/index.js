const express = require('express')
const app = express()
const port = 9000

app.use(express.static('public'))

app.post('/poll', (req, res) => {
  // 发回客户端的数据
  // 即使没有数据需要发回, 也应正常回应
  const data = getData() || ''
  res.send(data)
})

// 此函数用于模拟生成向客户端发送的数据
function getData() {
  return new Date().toLocaleTimeString()
}

// 启动监听
app.listen(port, () => {
  console.log(`Listening to port ${port}`)
})
