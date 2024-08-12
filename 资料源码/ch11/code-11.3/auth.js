const jwt = require('jsonwebtoken')
const { expressjwt } = require('express-jwt')

// 用于签署访问令牌(JWT)的密钥, 自行设置
const ACCESS_TOKEN_SECRET = 'YourSecret'
// JWT有效期10秒, 单位 ms/s/m/h/d
const TOKEN_EXPIRE = '10s'
// 鉴权白名单, 其中的URL不鉴权
const WHITE_LIST = ['/login']

// 生成访问令牌
function generateAccessToken(payload) {
  // 默认使用HS256(HMAC SHA256)算法
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: TOKEN_EXPIRE })
}

// 鉴权中间件, 除白名单中的URL外, 均须鉴权
// 鉴权失败将抛出错误
const authentication = expressjwt({
  secret: ACCESS_TOKEN_SECRET,
  algorithms: ['HS256'],
}).unless({ path: WHITE_LIST })

// 鉴权失败处理中间件
// 若 JWT 校验失败, err.name 为 'UnauthorizedError'
function unauthorizedHandler(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid Token')
  } else {
    next(err)
  }
}

module.exports = {
  generateAccessToken,
  authentication,
  unauthorizedHandler,
}