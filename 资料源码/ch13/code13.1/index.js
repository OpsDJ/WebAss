// 引入Express模块
const express = require('express')

// 服务端程序, 监听9001端口
const serverApp = express()
const serverPort = 9001
const cors = require('cors')
serverApp.use(cors({
  origin: 'http://localhost:9000'
}))
// 监听 HTTP GET http://localhost:9001/getMessage
serverApp.get('/getMessage', (req, res) => {
  res.send('Some message ...')
})
serverApp.listen(serverPort, () => {
  console.log(`Server: http://localhost:${serverPort}`)
})

// 客户端程序, 监听9000端口
const clientApp = express()
const clientPort = 9000
clientApp.get('/', (req, res) => {
  res.send(`
    <html><head>
    <script src="https://cdn.bootcdn.net/ajax/libs/axios/0.27.2/axios.min.js"></script>
    <script>
      // 使用Axios发送跨域请求
      axios.get('http://localhost:9001/getMessage').then(
        res => console.log(res.data),
        err => console.log(err)
      ).catch(
        ex => console.log(ex.message)
      )
    </script>
    </head></html>
  `)
})
clientApp.listen(clientPort, () => {
  console.log(`Client: http://localhost:${clientPort}`)
})
