Vue.createApp({
  data() {
    return {
      serverResponse: '', // 服务端的回应数据
    }
  },
  methods: {
    // 从服务端获取信息
    async getMessage() {
      try {
        this.serverResponse = (await axios.post('/getMessage')).data
      } catch (ex) {
        this.serverResponse = ex.message
      }
    },
    // 发送登录请求
    async login() {
      try {
        const loginInfo = { user: 'Johnny', pass: 'Johnny' }
        this.serverResponse = (await axios.post('/login', loginInfo)).data
      } catch (ex) {
        this.serverResponse = ex.message
      }
    },
  },
}).mount('#app')