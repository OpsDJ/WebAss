const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const usersFile = path.join(__dirname, '../public/data/users.json');

// 用户注册
router.post("/register", (req, res) => {
  const { username, password, email, gender, birthdate, bio } = req.body;
  const users = JSON.parse(fs.readFileSync(usersFile));
  if (!username) {
    return res.status(400).send("需要用户名！");
  }
  if (!password) {
    return res.status(400).send("需要密码！");
  }
  if (!email) {
    return res.status(400).send("需要邮箱！");
  }
  if (
    users.find((user) => user.username === username || user.email === email)
  ) {
    return res.status(409).send("用户已存在");
  }
  const newUser = {
    id: users.length + 1,
    username,
    password,
    email,
    gender,
    birthdate,
    bio,
  };
  users.push(newUser);
  fs.writeFileSync(usersFile, JSON.stringify(users));
  res.send("注册成功");
});

// 用户登录
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync(usersFile));
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    res.send({
      message: "登录成功！",
      user: {
        userID: user.id,
        username: user.username,
        email: user.email,
        gender: user.gender,
        birthdate: user.birthdate,
        bio: user.bio,
      },
    });
  } else {
    res.status(401).send("无效登录！");
  }
});

// 用户登出
router.post("/logout", (req, res) => {
  res.send("用户已登出");
});

module.exports = router;
