const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const articlesFile = path.join(__dirname, '../public/data/articles.json');

// 发布文章
router.post("/", (req, res) => {
  const { userID, title, body, username } = req.body;
  const articles = JSON.parse(fs.readFileSync(articlesFile));
  const newArticle = { id: articles.length + 1, userID, username, title, body, timestamp: new Date().toISOString() };
  articles.push(newArticle);
  fs.writeFileSync(articlesFile, JSON.stringify(articles));
  res.send("文章已添加！");
});

// 展示文章
router.get("/", (req, res) => {
  const articles = JSON.parse(fs.readFileSync(articlesFile));
  res.json(articles);
});

// 根据文章标题搜索文章
router.get("/search", (req, res) => {
  const { title } = req.query;
  const articles = JSON.parse(fs.readFileSync(articlesFile));
  if (!title) {
    return res.json(articles);
  }

  const filteredArticles = articles.filter((article) =>
    article.title.includes(title)
  );
  if (filteredArticles.length === 0) {
    return res.status(404).json({ message: "No articles found" });
  } else {
    res.json(filteredArticles);
  }
});

// 删除文章
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const { userID } = req.body;
  let articles = JSON.parse(fs.readFileSync(articlesFile));
  const article = articles.find(
    (article) => article.userID === userID && article.id.toString() === id
  );
  if (article) {
    articles = articles.filter((article) => article.id.toString() !== id);
    fs.writeFileSync(articlesFile, JSON.stringify(articles));
    res.send("文章已删除！");
  } else {
    res.status(401).send("你没有权限删除这篇文章！");
  }
});

module.exports = router;
