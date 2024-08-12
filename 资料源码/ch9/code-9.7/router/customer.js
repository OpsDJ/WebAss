const express = require("express")
const router = express.Router()
const service = require("../service/customer")

// 获取所有客户信息列表
router.get("/getCustomers", function (req, res) {
  res.json(service.getCustomers())
})

// 删除客户信息
router.post("/remove", function (req, res) {
  res.send(service.remove(req.body.id))
})

// 新增或修改客户信息
router.post("/saveOrUpdate", function (req, res) {
  res.json(service.saveOrUpdate(req.body.customerInfo))
})

module.exports = router
