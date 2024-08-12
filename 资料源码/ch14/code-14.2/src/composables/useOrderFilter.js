import { ref, computed } from 'vue'
// 封装筛选订单相关的逻辑
// 形参orders为所有客户订单(响应式数据)
export default function useOrderFilters(orders) {
  // 筛选关键字（响应式数据, 参看14.6节）
  const filter = ref('')
  // 计算属性, 满足筛选条件的订单
  const filteredOrders = computed(() => {
    // 返回标题含有指定关键字的订单
    // 取得ref对象的内部值须访问其value属性, 参看14.6节
    return orders.value.filter(
      order => order.title.includes(filter.value)
    )
  })

  // 向外暴露订单过滤条件和满足条件的订单
  return { filter, filteredOrders }
}