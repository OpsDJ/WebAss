import { ref, onMounted, watch } from 'vue'
// 封装查询客户订单相关的逻辑
// 形参user为订单所属的客户
export default function useUserOrders(user) {
  // 客户订单（响应式数据）
  // ref()函数将普通数据封装为响应式数据, 参看14.6节
  let orders = ref([])
  // 向服务端发送请求, 获取当前客户所有订单
  const getOrders = async () => {
    // 下面使用静态数据模拟, 真实场景可发送异步请求从服务端获取数据, 例如:
    // orders.value = (await axios.post('/getUserOrders', user)).data
    orders.value = [
      { id: '1', title: 'Apple' },
      { id: '2', title: 'Banana' },
    ]
  }

  // vue实例装载就绪则获取客户订单
  onMounted(getOrders)
  // 若客户变化, 取得该客户订单
  watch(user, getOrders)

  // 向外暴露订单数据和获取订单的方法
  return { orders, getOrders }
}