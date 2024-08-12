// 获得所有<p>元素组成的NodeList
// NodeList类似数组，但非数组类型(Array)
const paragraphs = document.querySelectorAll('p')

// 遍历每一个<p>元素为其注册点击事件监听
paragraphs.forEach(p => {
  p.onclick = function() {
    // 改变当前点击的<p>元素背景色
    this.style.backgroundColor = 'yellowgreen'
  }
})