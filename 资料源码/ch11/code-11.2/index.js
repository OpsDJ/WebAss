const express = require('express')
const app = express()
const port = 9000

// 启用express-session中间件
const session = require('express-session')
app.use(
  session({
    secret: 'YourSecret', // 用于签署cookie的密钥, 自行设置
    resave: false,        // session无变化时不保存
    saveUninitialized: false,     // session未初始化时不保存
    cookie: { maxAge: 1800000 },  // cookie 30分钟有效
  })
)

// 鉴权函数
function isAuthenticated(req, res, next) {
  // 若Session中有用户信息则认定为认证通过
  if (req.session.user) {
    next()
  } else {
    // 认证不通过, 跳转至再一下个中间件(登录表单)
    next('route')
  }
}

// 默认首页
// 此页面须经上述鉴权函数认证通过方可访问
app.get('/', isAuthenticated, function (req, res) {
  // req.session.user取得存储于Session中的用户名
  res.send('Welcome, ' + req.session.user + '!' + req.url + ' <a href="/logout">Logout</a>')
})

// 返回登录表单
app.get('/', function (req, res) {
  res.send(
    '<form action="/login" method="post">' +
      'Username: <input name="user"><br>' +
      'Password: <input name="pass" type="password"><br>' +
      '<input type="submit" text="Login"></form>'
  )
})

// 登录
app.post('/login', express.urlencoded({ extended: true }), (req, res) => {
  const { user, pass } = req.body
  // 演示简单验证: 若用户名与密码相同则通过验证
  if (user === pass) {
    // 将用户名存储于Session中
    req.session.user = user
  }
  // 重定向
  res.redirect('/')
})

// 登出
app.get('/logout', (req, res) => {
  // 将Session中用户名置空
  req.session.user = null
  res.redirect('/')
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
