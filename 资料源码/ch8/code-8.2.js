Vue.createApp({
  data() {
    return {
      timer: null,  // 定时器
      balls: [],    // 所有小球数据集合
    }
  },
  // 创建Vue实例时初始化构建10个小球
  created() {
    for (let i = 0; i < 10; i++) {
      this.balls.push({
        x: 0,
        y: 0,
        dx: Math.random(),
        dy: Math.random(),
      })
    }
  },
  methods: {
    // 点击Start按钮时启动定时器
    start() {
      if (!this.timer) {
        // 每隔10毫秒移动所有小球1帧
        this.timer = setInterval(this.move, 10)
      }
    },
    // 将所有小球移动一帧
    move() {
      this.balls.forEach((ball) => {
        if (ball.x > 470 || ball.x < 0) ball.dx = -ball.dx
        if (ball.y > 170 || ball.y < 0) ball.dy = -ball.dy

        ball.x += ball.dx
        ball.y += ball.dy
      })
    },
    // 暂停移动
    pause() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    },
  },
}).mount('#app')
