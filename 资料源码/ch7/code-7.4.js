// 获得网页中id为btn的按钮的引用
const btn = document.getElementById('btn')
// 为按钮注册点击事件处理函数
btn.onclick = function() {
  // 改变<button>元素的文本内容
  this.innerText = 'Hello, DOM'
  // 更改样式
  this.style.backgroundColor = 'yellowgreen'
}