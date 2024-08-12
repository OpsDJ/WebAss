/* 
  本例使用“本地存储”保存相册数据, 真实项目中应将数据存储于公网服务器
  数据结构为：[{ id: 1, title: '', src: '', location: '', date: '' }, ... ]
  其中: title - 图片标题, src - 图片url, location - 拍摄地点, date - 拍摄日期
*/
const photos = wx.getStorageSync('photos') || []

// 获得相册中所有图片数据
// 真实项目中可使用 wx.request() 方法向服务端发起 HTTPS 请求获取数据
function getPhotos() {
    return photos;
}

// 添加新图片, 本例仅将数据保存于本地存储
// 真实项目中可使用 wx.uploadFile() 方法上传图片文件(携带表单数据)
function addPhoto(photo) {
    // 使用当前时间戳作为图片记录的id
    photo.id = new Date().getTime()
    // 插入至数组开头位置
    photos.unshift(photo)
    // 保存数据至本地存储
    wx.setStorageSync('photos', photos)
}

module.exports = {
    getPhotos, addPhoto
}