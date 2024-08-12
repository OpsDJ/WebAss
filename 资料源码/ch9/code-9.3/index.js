const express = require('express')
const path = require('path')
const app = express()
const port = 9000

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// 生成验证码的第三方模块
// 执行 npm install --save svg-captcha 安装
const svgCaptcha = require('svg-captcha')
// 暂存生成的验证码文本
let captchaText

// 获取验证码SVG图像
app.get('/captcha', function (req, res) {
    const captcha = svgCaptcha.create()
    // 暂存验证码文本
    captchaText = captcha.text
    // 将验证码图像返回客户端
    res.type('svg')
    res.status(200).send(captcha.data)
})

// 下载文件接口
// 若输入的验证码正确则下载 /public/index.html
// 否则禁止下载(返回502)
app.post('/download', function (req, res) {
  if (captchaText === req.body.captchaText) {
    // 设置附件文件名为 test.html
    res.attachment('test.html')
    // 待下载文件的物理路径
    const filePath = path.join(__dirname, 'public/index.html')
    // 将附件文件返回客户端
    res.sendFile(filePath)
  } else {
    // 验证码不匹配, 返回403状态码
    res.sendStatus(403)
  }
})

// 启动监听
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})