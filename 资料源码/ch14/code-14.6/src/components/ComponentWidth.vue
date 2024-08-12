<template>
  <div class="panel">
    <h5>Width: {{ width }}</h5>
    <button @click="increase()">+1</button>
  </div>
</template>

<script>
import { mapWritableState } from 'pinia'
import { useRectangleStore } from '@/stores'

export default {
  name: 'ComponentWidth',
  computed: {
    // mapWritableState 用于映射 Store 中定义的 state
    // 映射为 this.width
    ...mapWritableState(useRectangleStore, ['width'])
  },
  methods: {
    increase() {
      this.width++
    }
  }
}
</script>