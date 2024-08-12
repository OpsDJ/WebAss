// 使用 Ajax 方式提交
async function ajaxUpload() {
    // 发送到服务端的数据
    const data = {
        userName: document.querySelector('[name="userName"]').value,
        avatar: document.querySelector('[name="avatar"]').files[0]
    }
    // Axios配置
    const config = {
        headers: {'Content-Type': 'multipart/form-data'}
    }

    // 发起AJAX请求
    try {
        const resp = await axios.post('/', data, config)
        alert(JSON.stringify(resp.data))
    } catch(ex) {
        alert(ex)
    }
}