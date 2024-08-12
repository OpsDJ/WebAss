<template>
  <div>
    <!-- 筛选条件输入框, 绑定筛选关键字filter -->
    Filter: <input type="text" v-model="filter">
    <!-- 刷新按钮, 点击则重新获取当前客户订单数据 -->
    <button @click="getOrders()">Refresh</button>
    <!-- 展示客户所有订单 -->
    <h3>All Orders:</h3>
    <div v-for="order in orders" :key="order.id">{{ order }}</div>
    <!-- 展示满足筛选条件的订单 -->
    <h3>Filtered Orders:</h3>
    <div v-for="order in filteredOrders" :key="order.id">{{ order }}</div>
  </div>
</template>
<script>
import useUserOrders from '../composables/useUserOrders'
import useOrderFilter from '../composables/useOrderFilter'
import { toRefs } from 'vue'
export default {
  props: ['user'],     // 客户信息
  setup(props) {
    // 解构响应式对象时, toRefs()函数保持其属性的响应性, 参看14.6节
    const { user } = toRefs(props)
    const { orders, getOrders } = useUserOrders(user)
    const { filter, filteredOrders } = useOrderFilter(orders)
    
    // 供组件其余部分使用
    return { 
      getOrders, orders,
      filter, filteredOrders 
    }
  }
}
</script>