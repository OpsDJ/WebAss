import { createApp } from 'vue'
import App from './App.vue'

// 引入 router.js 中定义的路由实例
import { router } from './router.js'

const app = createApp(App)
// 装载路由
app.use(router)
app.mount('#app')
