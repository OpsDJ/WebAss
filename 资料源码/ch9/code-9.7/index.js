const express = require("express")
const app = express()
const port = 9000

app.use(express.static("public"))
app.use(express.json())

// 挂载路由模块
app.use("/customer", require("./router/customer"))

// 启动监听
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})