const { sayHello, onTick } = myApi

// 监听 Commit 按钮点击事件
// 将输入的姓名发送到主进程, 并接收回应更新到页面底部
document.getElementById('btnCommit').onclick = async function () {
  const userName = document.getElementById('inputUserName').value
  // invoke() 为异步调用
  const echo = await sayHello(userName)
  document.getElementById('echo').innerText = echo
}

// 接收主进程主动发来的时间并显示
// 回调函数的第1个参数为事件对象
onTick((_event, time) => {
  document.getElementById('time').innerText = time
})
