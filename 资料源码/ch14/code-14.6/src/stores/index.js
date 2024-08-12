import { defineStore } from 'pinia'

// 创建 Store 实例, 'rectangle' 为 store 的 id
export const useRectangleStore = defineStore('rectangle', {
  // 全局状态, 类似于组件的 data
  state: () => {
    return {
      length: 2, // 长
      width: 1,  // 宽
    }
  },
  // getter 类似于组件的 computed
  getters: {
    // 返回矩形面积
    area() {
      return this.length * this.width
    }
  },
  // action 类似于组件的 method
  actions: {
    // 长、宽变成原先的2倍
    double() {
      this.length *= 2
      this.width *= 2
    },
  },
})
