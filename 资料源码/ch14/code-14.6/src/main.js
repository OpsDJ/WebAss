import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

// 装载 pinia
app.use(pinia)
app.mount('#app')
