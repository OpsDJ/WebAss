const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require('path');

const app = express();
const PORT = 80;

app.use(bodyParser.json());
app.use(cors());

// 托管 public 目录下的静态文件
app.use(express.static(path.join(__dirname, 'public/html')));

// 托管 assets 目录下的静态文件，并通过 /assets 路径访问
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// 确保初始文件存在
const ensureFileExists = (filePath) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
};

const usersFile = path.join(__dirname, "public/data/users.json");
const messagesFile = path.join(__dirname, "public/data/messages.json");
const todosFile = path.join(__dirname, "public/data/todos.json");
const articlesFile = path.join(__dirname, "public/data/articles.json");

ensureFileExists(usersFile);
ensureFileExists(messagesFile);
ensureFileExists(todosFile);
ensureFileExists(articlesFile);

// 引入路由模块
const userRoutes = require('./routes/users');
const messageRoutes = require('./routes/messages');
const todoRoutes = require('./routes/todos');
const articleRoutes = require('./routes/articles');

// 使用路由模块
app.use('/users', userRoutes);
app.use('/messages', messageRoutes);
app.use('/todos', todoRoutes);
app.use('/articles', articleRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
