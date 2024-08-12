import { createRouter, createWebHashHistory } from 'vue-router'
import HomePanel from './components/HomePanel'
import AboutPanel from './components/AboutPanel'
import CustomerInfo from './components/customer/CustomerInfo'
import CustomerProfile from './components/customer/CustomerProfile'

// 定义路由, 每个路由映射到一个组件
const routes = [
  { path: '/', component: HomePanel },
  {
    path: '/customer',
    component: CustomerInfo,
    // 嵌套路由
    children: [
      {
        path: '/profile1/:name',
        component: CustomerProfile,
      },
      {
        path: '/profile2/:name',
        component: CustomerProfile,
        props: true,
      },
      {
        path: '/profile3',
        component: CustomerProfile,
        props: { name: 'joanna' },
      },
      {
        path: '/profile4',
        component: CustomerProfile,
        props: (route) => ({ name: route.query.name }),
      },
    ],
  },
  { path: '/about', component: AboutPanel },
]

// 创建路由实例
const router = createRouter({
  // 使用 hash 模式记录访问历史
  history: createWebHashHistory(),
  // 使用上面routes常量定义的路由配置
  routes,
})

export { router }
