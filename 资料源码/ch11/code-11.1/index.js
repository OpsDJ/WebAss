const express = require("express")
const app = express()
const port = 9000

// 引入basic-auth-connect模块
const basicAuth = require('basic-auth-connect')

// 拦截所有HTTP请求, 进行身份认证
// user, pass 分别为解密后的用户名和密码
// 回调函数返回 true 则表示验证通过
// localhost 应改作实际域名
app.use(basicAuth(function(user, pass) {
  // 演示简单验证: 若用户名与密码相同则通过验证
  return user === pass
}, 'localhost'))

app.get('/', (req, res) => {
  res.send('Welcome, ' + req.user)
})

// 启动监听
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})