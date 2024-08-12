const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 9000;

app.use(bodyParser.json());
app.use(cors());

const usersFile = 'users.json';
const messagesFile = 'messages.json';

// 确保初始文件存在
if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, JSON.stringify([]));
}
if (!fs.existsSync(messagesFile)) {
    fs.writeFileSync(messagesFile, JSON.stringify([]));
}

// 用户注册
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const users = JSON.parse(fs.readFileSync(usersFile));
    if (users.find(user => user.username === username)) {
        return res.status(409).send('User already exists');
    }
    users.push({ username, password });
    fs.writeFileSync(usersFile, JSON.stringify(users));
    res.send('注册成功');
});

// 用户登录
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = JSON.parse(fs.readFileSync(usersFile));
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        res.send({ message: '登录成功', username });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// 发布消息
app.post('/post', (req, res) => {
    const { username, message } = req.body;
    const messages = JSON.parse(fs.readFileSync(messagesFile));
    messages.push({ username, message, timestamp: new Date().toISOString() });
    fs.writeFileSync(messagesFile, JSON.stringify(messages));
    res.send('信息已发送');
});

// 获取所有消息
app.get('/messages', (req, res) => {
    const messages = JSON.parse(fs.readFileSync(messagesFile));
    res.json(messages);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
