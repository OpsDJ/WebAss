// Vue实例
Vue.createApp({
  data() {
    return {
      a: 0,
      b: 0,
      s: 0,
    }
  },
  methods: {
    // 当点击 "=" 按钮时触发
    sum() {
      this.s = this.a + this.b
    },
  },
}).mount('#app') // 将Vue实例的渲染结果应用于#app元素
