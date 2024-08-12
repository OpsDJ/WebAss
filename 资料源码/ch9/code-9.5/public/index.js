// 输入用户名的文本框
const txtUserName = document.getElementById('txtUserName')
// Send 按钮
const btnSend = document.getElementById('btnSend')
// 显示回应内容的<p>元素
const respText = document.getElementById('respText')

// 监听 Send 按钮点击事件
btnSend.onclick = async function() {
    // 取得用户输入的姓名
    const userName = txtUserName.value
    try {
        // 禁用Send按钮
        btnSend.disabled = true
        // 向服务端发起 AJAX 请求, 并接收异步回应
        const resp = await axios.post('/greet', { userName })
        // 回应对象 resp 的 data 属性值为服务端返回的结果
        respText.innerText = resp.data
    } catch(ex) {
        // 若出现异常则显示异常消息
        alert(ex)
    } finally {
        // 无论是否出现异常都要取消 Send 按钮的禁用状态
        btnSend.disabled = false
    }
}