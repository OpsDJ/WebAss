// 引入 Vue Router 模块中的方法
import { createRouter, createWebHashHistory } from 'vue-router'

// 分别引入两个子组件
import HomePanel from './components/HomePanel'
import AboutPanel from './components/AboutPanel'

// 定义路由配置, 每个路由映射到一个组件
const routes = [
  { path: '/', component: HomePanel },
  { path: '/about', component: AboutPanel },
]

// 创建路由实例
const router = createRouter({
  // 使用 hash 模式记录访问历史
  history: createWebHashHistory(),
  // routes为前面定义的数组，其中存储了路由配置
  routes,
})

export { router }
