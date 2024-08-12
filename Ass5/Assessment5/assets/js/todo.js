/**
 * 定义API的URL基础路径。
 */
const apiUrl = "http://129.204.76.75:9000";

/**
 * 检查用户登录状态。
 * 根据localStorage中是否存在username和userID来确定用户是否已登录。
 * 如果已登录，将界面状态设置为已登录并显示用户姓名，同时获取并显示待办事项。
 * 如果未登录，将界面状态设置为未登录，并提示用户登录。
 */
function checkLoginStatus() {
  const username = localStorage.getItem("username");
  const userID = localStorage.getItem("userID");
  if (username && userID) {
    document.getElementById("statusCircle").style.backgroundColor = "green";
    document.getElementById(
      "statusText"
    ).textContent = `Logged in as ${username}`;
    fetchTodos(userID);
    fetchTodos(userID); // 使用用户ID获取代办事项
  } else {
    document.getElementById("statusCircle").style.backgroundColor = "red";
    document.getElementById("statusText").textContent = "Not logged in";
    alert("你还未登录");
    window.location.href = "./login_or_register.html"; // 重定向到登录页面
  }
}

/**
 * 用户登出功能。
 * 从localStorage中移除username和userID，界面状态重置为未登录，并重定向到登录/注册页面。
 */
function logout() {
  localStorage.removeItem("username");
  localStorage.removeItem("userID");
  document.getElementById("statusCircle").style.backgroundColor = "red";
  document.getElementById("statusText").textContent = "Not logged in";
  alert("Successfully logged out");
  window.location.href = "./login_or_register.html"; // 重定向到登录页面
}

/**
 * 异步获取并显示所有待办事项。
 * @param {string} userID - 用户ID，用于获取特定用户的待办事项。
 */
async function fetchTodos(userID) {
  const response = await fetch(`${apiUrl}/todos/list/${userID}`);
  const todos = await response.json();
  const todosContainer = document.getElementById("todos");
  todosContainer.innerHTML = ""; // 清空当前代办事项
  todos.forEach((todo) => {
    const todoElement = document.createElement("div");
    todoElement.classList.add("todo");
    const isoTimestamp = todo.timestamp;
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
    todoElement.innerHTML = `\
            <span>todo_id: ${todo.id}; content: ${todo.content}; timestamp: ${formattedDate}</span>\
            <button class="delete-button" onclick="deleteTodo(${todo.id})">Delete</button>\
        `;
    todosContainer.appendChild(todoElement);
  });
}

/**
 * 添加待办事项。
 * 获取用户输入的待办事项内容，如果内容不为空且用户已登录，则发送POST请求添加待办事项，并重新加载待办事项列表。
 */
async function addTodo() {
  const content = document.getElementById("todoText").value;
  const userID = localStorage.getItem("userID");
  if (!content) {
    alert("请输入待办事项内容");
    return;
  }

  try {
    const response = await fetch(`${apiUrl}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID, content }),
    });

    if (!response.ok) {
      throw new Error(`Failed to add todo: ${response.statusText}`);
    }

    const data = await response.text();
    alert(data);
    fetchTodos(userID); // 添加待办事项后重新加载待办事项
  } catch (error) {
    console.error(error);
    alert("添加待办事项失败，请稍后再试！");
  }
}


/**
 * 删除待办事项。
 * 根据待办事项ID发送DELETE请求删除该事项，然后重新加载待办事项列表。
 * @param {number} id - 待删除待办事项的ID。
 */
async function deleteTodo(id) {
  await fetch(`${apiUrl}/todos/${id}`, {
    method: "DELETE",
  });
  const userID = localStorage.getItem("userID");
  fetchTodos(userID); // 删除代办事项后重新加载代办事项
}

/**
 * 搜索待办事项。
 * 根据用户输入的ID搜索待办事项，如果未找到则显示错误信息。
 */
async function searchTodo() {
  const id = document.getElementById("searchInput").value.trim();
  const userID = localStorage.getItem("userID");

  if (!id) {
    fetchTodos(userID); // 如果搜索ID为空，加载所有代办事项
    alert("请输入搜索ID");
    return;
  }

  try {
    const response = await fetch(`${apiUrl}/todos/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID, id }),
    });

    if (!response.ok) {
      throw new Error("Todo not found");
    }

    const todos = await response.json();
    const todosContainer = document.getElementById("todos");
    todosContainer.innerHTML = ""; // 清空当前代办事项
    todos.forEach((todo) => {
      const todoElement = document.createElement("div");
      todoElement.classList.add("todo");
      const isoTimestamp = todo.timestamp;
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
      const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
        date
      );
      todoElement.innerHTML = `\
            <span>todo_id: ${todo.id}; content: ${todo.content}; timestamp: ${formattedDate}</span>\
            <button class="delete-button" onclick="deleteTodo(${todo.id})">Delete</button>\
          `;
      todosContainer.appendChild(todoElement);
    });
  } catch (error) {
    const todosContainer = document.getElementById("todos");
    todosContainer.innerHTML = ""; // 清空当前代办事项
    const errorElement = document.createElement("div");
    errorElement.classList.add("todo");
    errorElement.textContent = `Error: ${error.message}`;
    alert("No todo found");
    todosContainer.appendChild(errorElement);
  }
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
      document.getElementById("pageTitle").innerText = "Todo"; // 设置页标题
      checkLoginStatus(); // 检查登录状态
      document.getElementById("nav-todo").classList.add("active"); // 设置当前导航项为激活状态
    });
});