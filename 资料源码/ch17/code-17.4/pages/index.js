// 监听 "start/pause" 事件的 API, 参见 preload.js
const { onStartOrPause } = myApi

// 辅助函数: 将数值补足 2 位, 例如: 1 => 01
function padDigits(n) {
  return n < 10 ? '0' + n : n
}

// 创建 Vue 应用程序
Vue.createApp({
  data() {
    return {
      time: 0,        // 计时时长(秒)
      running: false, // 是否正在倒计时
    }
  },
  // 计算属性, 将时长分解为小时、分钟、秒, 并补足 2 位, 用于前端呈现
  computed: {
    hours() {
      return padDigits(Math.floor(this.time / 3600))
    },
    minutes() {
      return padDigits(Math.floor((this.time - this.hours * 3600) / 60))
    },
    seconds() {
      return padDigits(this.time - this.hours * 3600 - this.minutes * 60)
    },
  },
  methods: {
    // 在计时器数值(时/分/秒)上方滚动鼠标滚轮时, 调整计时时长
    // evt.deltaY 为滚轮滚动的步长, 正数为向上滚动(数值增加)
    // sec 为每次滚轮事件增减的时长 3600/60/1（1小时/分钟/秒, 参见 index.html）
    onMousewheel(evt, sec) {
      // 若正在倒计时不作响应(禁用计时调整)
      if (this.running) return
      // 调用 setTime() 函数更新时长
      this.setTime(this, evt.deltaY > 0 ? 1 : -1, sec)
    },
    // 设置计时时长
    // 借助 lodash 库实现节流(throttle), 避免滚轮事件过快触发(用户操作不便)
    // 100 毫秒内多次触发滚轮事件时仅响应一次
    // delta : 数值调整方向, -1/1（减少/增加）
    // sec :   增减的秒数（3600/60/1）
    setTime: _.throttle((vm, delta, sec) => {
      // 避免调整时长越界
      if (delta > 0) {
        if ((sec === 3600 && vm.hours === 23) 
            || (sec === 60 && vm.minutes === 59) 
            || (sec === 1 && vm.seconds === 59))
          return
      } else {
        if ((sec === 3600 && vm.hours < 1) 
            || (sec === 60 && vm.minutes < 1) 
            || (sec === 1 && vm.seconds < 1)) 
          return
      }
      // 更新时长
      vm.time += Math.floor(delta * sec)
    }, 100),
    // 开始倒计时
    start() {
      if (this.time <= 0) return
      this.running = true
      this.timer = setInterval(() => {
        this.time--
        if (this.time < 1) this.timeout()
      }, 1000)
    },
    // 暂停倒计时
    pause() {
      clearInterval(this.timer)
      this.running = false
      // 使用 Electron 的 Notification 模块发送系统通知
      // 用户点击通知则继续倒计时
      new Notification('计时器', { body: '计时暂停, 点击继续计时... ' }).onclick = () => {
        this.start()
      }
    },
    // 倒计时结束
    timeout() {
      clearInterval(this.timer)
      this.running = false
      new Notification('计时器', { body: '时间到了!' })
    },
  },
  created() {
    // 程序启动时监听主进程发送的 "start/pause" 事件，启动/暂停倒计时
    onStartOrPause(() => {
      // 若正在倒计时则暂停, 反之启动倒计时
      this.running ? this.pause() : this.start()
    })
  },
}).mount('#app')