const express = require('express')
const app = express()
const port = 9000

// 指定模板文件夹为 /views
app.set('views', 'views');
// 设置模板引擎为pug
app.set('view engine', 'pug')

app.get('/', function (req, res) {
  // 客户数据
  const customers = [
    {name: 'Johnny', email: 'Johnny@foo.com'},
    {name: 'Joanna', email: 'Joanna@bar.com'}
  ]

  // 使用模板引擎进行服务端渲染
  // 模板文件为 /views/index.pug
  res.render('index', {customers})
})

// 启动监听
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})