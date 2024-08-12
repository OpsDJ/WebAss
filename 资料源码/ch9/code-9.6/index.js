const express = require("express")
const app = express()
const port = 9000

// 引入multer模块
const multer = require('multer')
// 指定服务端保存文件的位置
const upload = multer({ dest: 'uploads/' })

app.use(express.static("public"))

// 使用 uploader.single() 中间件处理单个上传的文件
// 若要支持多文件上传则使用 uploader.array() 或 uploader.fields()
// 注意参数名应与客户端请求中的参数名(avatar)一致
app.post("/", upload.single("avatar"), function (req, res) {
  // 向客户端发回表单数据和上传文件的信息
  res.json({
    userName: req.body.userName,
    avatar: req.file,  // 上传的文件信息
  })
})

// 启动监听
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
