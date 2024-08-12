const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const messagesFile = path.join(__dirname, '../public/data/messages.json');

// 发布消息
router.post("/", (req, res) => {
  const { username, message } = req.body;
  const messages = JSON.parse(fs.readFileSync(messagesFile));
  messages.push({
    id: messages.length + 1,
    username,
    message,
    timestamp: new Date().toISOString(),
  });
  fs.writeFileSync(messagesFile, JSON.stringify(messages));
  res.send("信息已发送");
});

// 获取所有消息
router.get("/", (req, res) => {
  const messages = JSON.parse(fs.readFileSync(messagesFile));
  res.json(messages);
});

// 删除消息
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  let messages = JSON.parse(fs.readFileSync(messagesFile));
  const originalLength = messages.length;
  messages = messages.filter((message) => message.id.toString() !== id);

  if (messages.length === originalLength) {
    res.status(404).send("没有这条消息！");
  } else {
    fs.writeFileSync(messagesFile, JSON.stringify(messages));
    res.send("消息已删除！");
  }
});

// 通过ID获取消息
router.get("/:id?", (req, res) => {
  const messages = JSON.parse(fs.readFileSync(messagesFile));
  const id = req.params.id;

  if (!id) {
    res.json(messages);
  } else {
    const message = messages.find((msg) => msg.id === parseInt(id));
    if (message) {
      res.json(message);
    } else {
      res.status(404).send("Message not found");
    }
  }
});

module.exports = router;
