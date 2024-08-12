/**
 * 定义API的URL基础路径。
 */
const apiUrl = "http://129.204.76.75:9000";

/**
 * 从服务器获取文章列表并显示在页面上。
 */
function fetchArticle() {
  // 发起GET请求获取文章列表
  fetch(`${apiUrl}/articles`)
    .then((response) => response.json())
    .then((article) => {
      // 获取文章容器元素
      const articleContainer = document.getElementById("article");
      // 清空文章容器
      articleContainer.innerHTML = "";
      // 从本地存储获取当前用户ID
      const userID = localStorage.getItem("userID");
      // 遍历文章列表
      article.forEach((art, index) => {
        // 创建文章元素
        const articleElement = document.createElement("div");
        // 获取文章时间戳
        const isoTimestamp = art.timestamp;
        // 将时间戳转换为日期对象
        const date = new Date(isoTimestamp);
        // 定义日期格式化选项
        const options = {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZoneName: "short",
        };
        // 格式化日期
        const formattedDate = new Intl.DateTimeFormat("zh-CN", options).format(date);
        // 添加文章内容到文章元素
        articleElement.classList.add("article");
        articleElement.innerHTML = `
              <div class="article-details">
                <strong>${art.title}</strong>
                <p>${art.body}</p>
                <span>By ${art.username}; ${formattedDate}</span>
              </div>
            `;
        // 如果文章作者是当前用户，添加删除按钮
        if (art.userID == userID) {
          articleElement.innerHTML += `
                <button class="delete-button" onclick="deleteArticle(${art.id})">Delete</button>
              `;
        }
        // 将文章元素添加到文章容器
        articleContainer.appendChild(articleElement);
      });
    });
}

/**
 * 用户登出操作
 */
function logout() {
  localStorage.removeItem("username");
  document.getElementById("statusCircle").style.backgroundColor = "red";
  document.getElementById("statusText").textContent = "Not logged in";
  alert("Successfully logged out");
  window.location.href = "./login_or_register.html";
}

/**
 * 检查用户登录状态，并根据状态更新界面。
 */
/**
 * 检查用户登录状态。
 * 通过查询本地存储中的用户名和用户ID来确定用户是否已登录。
 * 如果用户已登录，则更新界面显示已登录状态，并获取用户文章。
 * 如果用户未登录，则更新界面显示未登录状态，并提示用户登录。
 */
function checkLoginStatus() {
  // 从本地存储获取用户名和用户ID
  const username = localStorage.getItem("username");
  const userID = localStorage.getItem("userID");
  // 如果用户名和用户ID存在，表示用户已登录
  if (username && userID) {
    // 更新登录状态指示器颜色和文本
    document.getElementById("statusCircle").style.backgroundColor = "green";
    document.getElementById("statusText").textContent = `Logged in as ${username}`;
    // 加载用户文章
    fetchArticle(userID);
  } else {
    // 更新登录状态指示器颜色和文本
    document.getElementById("statusCircle").style.backgroundColor = "red";
    document.getElementById("statusText").textContent = "Not logged in";
    // 提示用户未登录，并重定向到登录页面
    alert("你还未登录");
    window.location.href = "./login_or_register.html";
  }
}

/**
 * 提交新文章到服务器。
 */
function postArticle() {
  // 获取文章标题和内容
  const title = document.getElementById("title").value;
  const body = document.getElementById("articleText").value;
  // 从本地存储获取当前用户ID
  const userID = localStorage.getItem("userID");
  const username = localStorage.getItem("username");
  // 如果用户已登录
  if (username) {
    // 发起POST请求创建新文章
    fetch(`${apiUrl}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, body, userID, title }),
    })
      .then((response) => response.text())
      .then((data) => {
        // 显示创建结果
        alert(data);
        // 刷新文章列表
        fetchArticle();
      });
  } else {
    // 如果用户未登录，提示登录
    alert("You are not logged in");
  }
}

/**
 * 从服务器删除指定文章。
 * @param {number} id - 要删除的文章ID。
 */
function deleteArticle(id) {
  // 从本地存储获取当前用户ID
  const userId = localStorage.getItem("userID");
  // 如果用户ID存在
  if (userId) {
    // 发起DELETE请求删除文章
    fetch(`${apiUrl}/articles/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID: userId }),
    })
      .then((response) => response.text())
      .then((data) => {
        // 显示删除结果
        alert(data);
        // 刷新文章列表
        fetchArticle();
      });
  }
}

/**
 * 根据搜索关键词从服务器获取并显示文章。
 */
function searchArticle() {
  // 获取搜索关键词
  const title = document.getElementById("searchInput").value.trim();
  // 发起GET请求搜索文章
  fetch(`${apiUrl}/articles/search?title=${title}`)
    .then((response) => response.json())
    .then((articles) => {
      // 清空文章容器
      const articleContainer = document.getElementById("article");
      articleContainer.innerHTML = "";
      // 遍历搜索结果并显示
      articles.forEach((article) => {
        const articleElement = document.createElement("div");
        articleElement.classList.add("article");
        articleElement.innerHTML = `
          <div class="article-details">
            <strong>${article.title}</strong>
            <p>${article.body}</p>
            <span>By ${article.username}</span>
          </div>
        `;
        // 如果文章作者是当前用户，添加删除按钮
        if (article.userID == localStorage.getItem("userID")) {
          articleElement.innerHTML += `
                <button class="delete-button" onclick="deleteArticle(${article.id})">Delete</button>
              `;
        }
        // 将文章元素添加到文章容器
        articleContainer.appendChild(articleElement);
      });
    })
    .catch((error) => {
      // 如果搜索失败，显示错误信息
      const articleContainer = document.getElementById("article");
      articleContainer.innerHTML = ""; // 清空当前消息
      const messageElement = document.createElement("div");
      messageElement.classList.add("article");
      messageElement.innerHTML = `<span>Article not found </span>`;
      articleContainer.appendChild(messageElement);
      alert("Article not found")
    });
}

/**
 * 页面加载完成后执行的初始化操作。
 */
document.addEventListener("DOMContentLoaded", () => {
  // 加载头部导航
  fetch("header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header-container").innerHTML = data;
      // 设置页面标题
      document.getElementById("pageTitle").innerText = "Article";
      // 检查用户登录状态
      checkLoginStatus();
      // 激活文章导航项
      document.getElementById("nav-article").classList.add("active");
    });
});