const store = require('../../utils/store')

Page({
    // 页面初始数据
    data: { src: '', title: '', location: '', date: '' },
    onLoad(options) {
        // onLoad 回调函数
        this.setData({ src: options.photoPath })
    },
    // 选择拍摄地点
    chooseLocation() {
        wx.chooseLocation({
            success: (res) => {
                this.setData({ location: res.name || res.address })
            }
        })
    },
    // 选择拍摄日期后的回调函数
    dateChange(e) {
        this.setData({ date: e.detail.value })
    },
    // 点击"确定"按钮时保存图片数据
    save() {
        // 调用 /utils/store.js 模块中定义的 addPhoto() 方法保存图片数据
        store.addPhoto(this.data)
        // 保存成功后退回上一页
        wx.navigateBack({ delta: 1 })
    }
})