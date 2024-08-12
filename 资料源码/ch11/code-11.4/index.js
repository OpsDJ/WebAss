const express = require("express")
const app = express()
const port = 9000

// 请执行npm install qr-image --save安装qr-image模块
const QRCode = require("qr-image")
// 请执行npm install axios --save安装axios模块
const axios = require("axios")

const BASE_URL = "http://YOUR_ORIGIN"				// 外网访问首页的URL
const REDIRECT_PATH = "/wx/redirect"				// 微信扫码登录重定向路径

// 客户端凭证, 修改为实际值(在"测试号管理界面"中获取)
const APP_ID = 'YOUR_APP_ID'
const APP_SECRET = 'YOUR_APP_SECRET'

// ① 登录入口, 呈现微信扫码登录二维码图像
app.get("/login", (req, res) => {
  // 微信端扫码后的回调地址
  const redirectUrl = BASE_URL + REDIRECT_PATH
  // 手机微信扫码后将自动打开如下页面
  const url = "https://open.weixin.qq.com/connect/oauth2/authorize"
                 + `?appid=${APP_ID}&redirect_uri=${redirectUrl}` 
                 + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
  // 生成二维码
  const imgBase64 = QRCode.imageSync(url, { type: "png" }).toString("base64")
  // 在浏览器中呈现二维码
  res.send(`<img src="data:image/png;base64,${imgBase64}">`)
})

// ② 用户扫码授权后微信平台回调此接口
app.get(REDIRECT_PATH, async (req, res) => {
  try {    
    const authorization_code = req.query.code				// 授权码    
    const token = await getAccessToken(authorization_code)	// 访问令牌    
    const userInfo = await getUserInfo(token)				// 用户的微信开放信息    
    console.log(userInfo)			// 项目中可在此创建用户账户、绑定微信或执行登录流程
    res.send("<h1>Success</h1>")
  } catch (ex) {
    console.error(ex);
    res.send("<h1>Failure</h1>")
  }
})

// ③ 获取访问令牌（access_token）
async function getAccessToken(code) {
  const url = "https://api.weixin.qq.com/sns/oauth2/access_token"
                 + `?appid=${APP_ID}&secret=${APP_SECRET}&code=${code}`
                 + "&grant_type=authorization_code"
  return (await axios.get(url)).data
}

// ④ 获取用户的微信开放信息
async function getUserInfo(token) {
  const url = "https://api.weixin.qq.com/sns/userinfo"
                 + `?access_token=${token.access_token}&openid=${token.openid}`
                 + "&lang=zh_CN"
  return (await axios.get(url)).data
}

app.listen(port, () => {
  console.log(`Server listening on ${BASE_URL}`)
})
