// 请求拦截器
// 每次发送请求时执行
axios.interceptors.request.use(function (config) {
  // 取得访问令牌
  const accessToken = sessionStorage.getItem('access_token')
  if (accessToken) {
    // 将访问令牌置于请求头部的authorization字段
    config.headers.authorization = `Bearer ${accessToken}`
  }
  return config
})

// 回应拦截器
// 每次收到服务端回应时执行
axios.interceptors.response.use(
  // 正常回应的回调函数
  function (res) {
    // 若回应中存在access_token则将其存储于sessionStorage
    if (res.data.access_token) {
      sessionStorage.setItem('access_token', res.data.access_token)
    }
    return res
  },
  // 出错时的回调函数
  function (err) {
    // 可在此处添加统一的错误处理逻辑
    return Promise.reject(err)
  }
)
