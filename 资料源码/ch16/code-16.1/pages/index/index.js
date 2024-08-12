// 引入数据存储模块
const store = require('../../utils/store')

Page({
    data: {
        // 图片数据, 在 loadPhotos() 方法中填充
        photos: [] 
    },
    // 页面显示时自动加载图片数据
    onShow() {
        this.loadPhotos()
    },
    // 下拉重新加载图片数据
    onPullDownRefresh() {
        this.loadPhotos()
    },
    // 加载图片数据
    loadPhotos() {
        // 显示加载提示
        wx.showLoading({
            title: '刷新中...'
        })
        // 获取相册图片数据
        // 本例从本地存储获取数据, 真实项目此处应是异步请求
        const photos = store.getPhotos()
        this.setData({
            photos: photos
        })
        // 取得数据后隐藏加载提示
        wx.hideLoading()
        // 取得数据后恢复下拉状态
        wx.stopPullDownRefresh()
    },
    // 添加新图片
    addPhoto() {
        // 调用微信API选取图片
        // 该接口可从系统相册选取或使用摄像头拍摄图片或视频
        wx.chooseMedia({
            count: 1,                        // 最多选取1张图片
            mediaType: ['image'],            // 仅选取图片
            sourceType: ['album', 'camera'], // 图片来源于系统相册或摄像头
            camera: 'back',                  // 使用后置摄像头
            success(res) {                   // 成功取得图片时的回调函数
                // 图片文件信息以数组形式返回: res.tempFiles
                if (res.tempFiles.length) {
                    // 携带图片的临时存储路径, 转至“add”页面
                    wx.navigateTo({
                        url: '../add/add?photoPath=' + res.tempFiles[0].tempFilePath,
                    })
                }
            }
        })
    }
})