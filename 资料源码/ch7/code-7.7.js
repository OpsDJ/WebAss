// 桌面上所有小球组成的数组, 初始时为空
const balls = []
// 全局定时器, 所有小球使用同一定时器进行控制
let timer

// 开始运行
function start() {
  // 若尚未创建小球则创建之
  if (!balls.length) {
    createBalls()
  }
  // 每10毫秒调用move函数一次, 让所有小球移动1帧
  if (!timer) {
    timer = setInterval(move, 10)
  }
}

// 创建10个小球
function createBalls() {
  // 依次创建小球
  for (let i = 0; i < 10; i++) {
    // 取随机数作为小球每帧的位移量
    const dx = Math.random(), dy = Math.random()
    // 创建小球对象, Ball类的定义见后
    const ball = new Ball(dx, dy)
    // 将新建的小球对象添加到balls数组, 以便统一控制
    balls.push(ball)
  }
}

// 将所有小球移动1帧
function move() {
  balls.forEach(ball => {
    ball.move()
  })
}

// 暂停
function pause() {
  // 若定时器未启动则忽略
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

// 注册按钮点击事件监听
document.querySelector('#btn-start').onclick = start
document.querySelector('#btn-pause').onclick = pause