// 引入http模块（CommonJS规范）
// 等价于 ECMAScript Module 规范的 
// import * as http from 'http'
// 若需使用 ECMAScript Module 规范
// 可在package.json中添加 "type":"module"
const http = require('http')
// 端口号
const port = 9000								

// 创建Web服务，接收客户端请求
const server = http.createServer(function(request, response) {
    // 写入HTTP响应头, 避免乱码
    response.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
    
    // 向客户端发回信息, 并结束响应过程
    response.end('你好，世界!');
})

// 开始监听客户端请求
// port参数为监听的端口号
server.listen(port, () => {
  // 启动成功则输出控制台日志
  console.log(`Server listening on port ${port}`)
});