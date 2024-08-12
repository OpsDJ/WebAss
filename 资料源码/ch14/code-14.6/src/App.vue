<template>
  <div class="panel">
    <h5>Length = {{ length }}, Width = {{ width }}</h5>
    <h3> Rectangle Area: {{ area }}</h3>
    <div>
      <button @click="double()">Double</button>
      <button @click="reset()">Reset</button>
    </div>
  </div>
  <div class="container">
    <ComponentLength />
    <ComponentWidth />
  </div>
</template>

<script>
import ComponentLength from './components/ComponentLength.vue'
import ComponentWidth from './components/ComponentWidth.vue'
import { mapStores, mapState, mapActions } from 'pinia'
// 引入 /src/stores/index.js 中导出的 useRectangleStore
import { useRectangleStore } from '@/stores'

export default {
  name: 'App',
  components: {
    ComponentLength, ComponentWidth
  },
  computed: {
    // mapStores 用于将 Store 映射为组件实例的属性
    // 此处将useRectangleStore映射为this.rectangleStore, 默认名称为Store的id + 'Store'
    ...mapStores(useRectangleStore),
    // mapState 用于映射 Store 中定义的 state/getter
    // 分别映射为 this.length, this.width, this.area（只读） 
    ...mapState(useRectangleStore, ['length', 'width', 'area']),
  },
  methods: {
    // mapActions 用于映射 Store 中定义的 action
    // 映射为 this.double()
    ...mapActions(useRectangleStore, ['double']),
    reset() {
      // 重置状态
      this.rectangleStore.$reset()
    }
  }
}
</script>

<style>
#app {
  width: 50vw;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 5px;
  box-shadow: 5px 5px 5px #eee;
}

.panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1em;
  background-color: #eee;
}

.panel button {
  margin-left: 1em;
}

.container {
  margin-top: 5px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
}
</style>
