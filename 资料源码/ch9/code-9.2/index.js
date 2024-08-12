const express = require('express')
const app = express()
const port = 9000

// 托管前端静态资源
app.use(express.static('public'))

// 取得查询字符串传递的数据
app.get('/greet', function (req, res) {
  res.send('Hello ' + req.query.userName)
})

// 取得命名路由参数
app.get('/greet/:userName', function (req, res) {
  res.send('Hello ' + req.params.userName)
})

// 取得请求正文(body)中的数据
// 须使用 express.urlencoded() 中间件
app.use(express.urlencoded({ extended: true }))
app.post('/greet', function (req, res) {
  res.send('Hello ' + req.body.userName)
})

// 启动监听
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
