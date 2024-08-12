const express = require('express')
const app = express()
const port = 9000

app.use(express.static('public'))

// 使用 Axios 发起的 POST 请求默认使用 JSON 格式编码
// Content-Type: "application/json"
// 使用 Express 内置中间件进行解析
app.use(express.urlencoded())

app.post('/greet', function (req, res) {
  const userName = req.body.userName
  res.send('Hello, ' + userName)
})

// 启动监听
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})