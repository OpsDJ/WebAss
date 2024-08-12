class Ball {
  x = 0     // 实例属性, 小球当前x坐标
  y = 0     // 实例属性, 小球当前y坐标
  ball      // 实例属性, 小球的HTML元素对象

  // 构造函数, 接收 new Ball() 时传入的 dx,dy
  constructor(dx, dy) {
    this.dx = dx
    this.dy = dy

    // 创建小球的HTML元素对象
    this.ball = document.createElement('div')
    // 添加样式类
    this.ball.classList.add('ball')
    // 将小球的HTML元素对象作为桌面节点的子节点添加到DOM树
    document.getElementById('desk').appendChild(this.ball)
  }

  // 当前小球移动1帧
  move() {
    if (this.x > 470 || this.x < 0) this.dx = -this.dx
    if (this.y > 170 || this.y < 0) this.dy = -this.dy
    
    this.x += this.dx
    this.y += this.dy

    // 更新界面
    this.updateView()
  }

  // 更新当前小球样式表以同步小球位置
  updateView() {
    this.ball.style.left = this.x + 'px'
    this.ball.style.top  = this.y + 'px'
  }
}