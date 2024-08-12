const ball = document.querySelector('#ball')  	// 小球的引用
let x = 0, y = 0                              		// 小球当前x,y坐标
let dx = 1, dy = 1                            		// 每帧移动量
let timer                                     		// 周期触发的定时器

// 注册按钮点击事件监听
// 注意等号后应为函数名start，而非start()
document.querySelector('#btn-start').onclick = start
document.querySelector('#btn-pause').onclick = pause

// 开始移动
function start() {
  // timer为定时器，若timer为falsy表明尚未开始移动，此时启动周期性定时器
  // 否则说明已开始运动，应忽略if语句块中的代码，避免启动多个定时器导致小球移动加速
  if (!timer) {
    ball.className = 'scrolling'    			// 添加小球滚动样式
    timer = setInterval(move, 10)   			// 每10毫秒移动1帧
  }
}

// 小球移动1帧
function move() {
  // 小球碰到边界时将每帧移动量取相反数
  // 以改变移动方向
  // 小球坐标为左上角坐标，因此须扣除小球宽/高
  if (x > 470 || x < 0) dx = -dx
  if (y > 170 || y < 0) dy = -dy
  
  // 计算下一帧位置
  x += dx
  y += dy

  // 更新小球位置
  updateView()
}

// 更新样式表以同步小球位置
function updateView() {
    ball.style.left = x + 'px'
    ball.style.top  = y + 'px'
}

// 暂停移动
function pause() {
  // 若未启动则忽略
  if (timer) {
    clearInterval(timer)        // 取消定时器
    timer = null
    ball.className = ''         // 移除滚动样式类
  }
}
