const express = require('express')
const app = express()
const port = 9000

const { generateAccessToken, authentication, unauthorizedHandler } = require('./auth')

app.use(express.static('public'))
app.use(express.json())

// 鉴权中间件
app.use(authentication)

// 登录接口
app.post('/login', (req, res) => {
  const { user, pass } = req.body
  // 演示简单验证: 若用户名与密码相同则认证通过
  if (user === pass) {
    // 生成访问令牌并返回客户端
    const accessToken = generateAccessToken({ user })
    res.json({ message: 'Success', access_token: accessToken })
  } else {
    // 认证失败, 返回403(Forbidden)
    res.sendStatus(403)
  }
})

// 获取服务端消息的接口
app.post('/getMessage', function (req, res) {
  // 返回登录用户名和当前服务端时间
  res.send(`Welcome, ${req.auth.user}, ServerTime: ${new Date()}`)
})

// 错误处理
app.use(unauthorizedHandler)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})