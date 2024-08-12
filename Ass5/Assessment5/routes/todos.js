const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const todosFile = path.join(__dirname, '../public/data/todos.json');

// 发布代办事项
router.post("/", (req, res) => {
  const { userID, content } = req.body;
  const todos = JSON.parse(fs.readFileSync(todosFile));
  const newTodo = {
    id: todos.length + 1,
    userID,
    content,
    timestamp: new Date().toISOString(),
  };
  todos.push(newTodo);
  fs.writeFileSync(todosFile, JSON.stringify(todos));
  res.send("代办事项已添加");
});

// 展示用户的代办事项
router.get("/list/:userID", (req, res) => {
  const { userID } = req.params;
  const todos = JSON.parse(fs.readFileSync(todosFile));
  const userTodos = todos.filter((todo) => todo.userID.toString() === userID);
  res.json(userTodos);
});

// 根据id搜索todo
router.post("/search", (req, res) => {
  const { userID, id } = req.body;
  const todos = JSON.parse(fs.readFileSync(todosFile));
  const userTodos = todos.filter((todo) => todo.userID.toString() === userID);

  if (!id) {
    return res.json(userTodos);
  }

  const filteredTodos = userTodos.filter(
    (todo) => todo.id.toString() === id.toString()
  );
  if (filteredTodos.length === 0) {
    return res.status(404).json({ error: "Todo not found" });
  } else {
    res.json(filteredTodos);
  }
});

// 删除代办事项
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  let todos = JSON.parse(fs.readFileSync(todosFile));
  todos = todos.filter((todo) => todo.id.toString() !== id);
  fs.writeFileSync(todosFile, JSON.stringify(todos));
  res.send("代办事项已删除");
});

module.exports = router;
