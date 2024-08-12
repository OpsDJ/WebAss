const express = require("express")
const router = express.Router()
const service = require("../service/customer")

// 获取所有客户信息列表
router.get("/getCustomers", async function (req, res) {
  try {
    res.json(await service.getCustomers())
  } catch(ex) {
    res.sendStatus(500)
  }
})

// 删除客户信息
router.post("/remove", async function (req, res) {
  try {
    res.send(await service.remove(req.body.id))
  } catch(ex) {
    res.sendStatus(500)
  }
})

// 新增或修改客户信息
router.post("/saveOrUpdate", async function (req, res) {
  try {
    res.json(await service.saveOrUpdate(req.body.customerInfo))
  } catch(ex) {
    res.sendStatus(500)
  }
})

module.exports = router
