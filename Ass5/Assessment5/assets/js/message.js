// message.js

// 定义API的URL基础路径
const apiUrl = "http://localhost:9000";

/**
 * 从服务器获取消息并显示在页面上
 */
function fetchMessages() {
  fetch(`${apiUrl}/messages`)
    .then((response) => response.json())
    .then((messages) => {
      const messagesContainer = document.getElementById("messages");
      messagesContainer.innerHTML = ""; // 清空当前消息
      messages.forEach((msg) => {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");
        const isoTimestamp = msg.timestamp;
        const date = new Date(isoTimestamp);
        const options = {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZoneName: "short",
        };
        const formattedDate = new Intl.DateTimeFormat("zh-CN", options).format(
          date
        );
        messageElement.innerHTML = `
          <span>message_id：${msg.id}; <strong>username: ${msg.username}</strong> (${formattedDate}): ${msg.message}</span>
          <button class="delete-button" onclick="deleteMessage(${msg.id})">Delete</button>
        `;
        messagesContainer.appendChild(messageElement);
      });
    });
}

/**
 * 检查用户登录状态，并根据状态更新UI
 */
function checkLoginStatus() {
  const username = localStorage.getItem("username");
  const userID = localStorage.getItem("userID");
  if (username && userID) {
    document.getElementById("statusCircle").style.backgroundColor = "green";
    document.getElementById(
      "statusText"
    ).textContent = `Logged in as ${username}`;
  } else {
    document.getElementById("statusCircle").style.backgroundColor = "red";
    document.getElementById("statusText").textContent = "Not logged in";
    alert("你还未登录");
    window.location.href = "./login_or_register.html"; // 重定向到登录页面
  }
}

const username = localStorage.getItem("username");
if (username) {
  document.addEventListener("DOMContentLoaded", fetchMessages);
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
 * 发送新消息到服务器
 */
function postMessage() {
  const message = document.getElementById("messageText").value;
  const username = localStorage.getItem("username"); // 从本地存储获取用户名

  if (username) {
    console.log("postMessage function called"); // 添加日志
    console.log(`Sending message: ${message}`); // 添加调试信息
    fetch(`${apiUrl}/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, message }),
    })
      .then((response) => response.text())
      .then((data) => {
        alert(data);
        fetchMessages(); // 发布消息后重新加载消息
      });
  } else {
    alert("你还未登录");
  }
}

/**
 * 删除指定消息
 * @param {number} id 消息ID
 */
function deleteMessage(id) {
  console.log(`Deleting message with id: ${id}`); // 添加调试信息
  fetch(`${apiUrl}/messages/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.text())
    .then((data) => {
      alert(data);
      fetchMessages(); // 删除消息后重新加载消息
    });
}

/**
 * 根据搜索关键字从服务器获取并显示消息
 */
function searchMessage() {
  const searchInput = document.getElementById("searchInput").value.trim();

  if (searchInput === "") {
    alert("请输入搜索内容");
    fetchMessages(); // 重新加载所有消息
    return;
  }

  fetch(`${apiUrl}/messages/${searchInput}`)
    .then((response) => response.json())
    .then((message) => {
      const messagesContainer = document.getElementById("messages");
      messagesContainer.innerHTML = ""; // 清空当前消息
      if (message) {
        console.log(`Found message: ${JSON.stringify(message)}`);
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");
        const isoTimestamp = message.timestamp;
        const date = new Date(isoTimestamp);
        const options = {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZoneName: "short",
        };
        const formattedDate = new Intl.DateTimeFormat("zh-CN", options).format(
          date
        );
        messageElement.innerHTML = `
          <span>message_id：${message.id}; <strong>username: ${message.username}</strong> (${formattedDate}): ${message.message}</span>
          <button class="delete-button" onclick="deleteMessage(${message.id})">Delete</button>
        `;
        messagesContainer.appendChild(messageElement);
      } else {
        alert("Message not found");
      }
    })
    .catch((error) => {
      alert("该消息不存在！");
      const messagesContainer = document.getElementById("messages");
      messagesContainer.innerHTML = ""; // 清空当前消息
      const messageElement = document.createElement("div");
      messageElement.innerHTML = "Message not found"
      messagesContainer.appendChild(messageElement);
    });
}

/**
 * 页面加载完成后执行的初始化操作。
 * 包括获取并插入头部HTML，设置页面标题，检查用户登录状态，以及激活待办事项导航项。
 */
document.addEventListener("DOMContentLoaded", () => {
  fetch("header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header-container").innerHTML = data;
      document.getElementById("pageTitle").innerText = "Message"; // 设置页标题
      checkLoginStatus(); // 检查登录状态
      document.getElementById("nav-messages").classList.add("active"); // 设置当前导航项为激活状态
    });
});
