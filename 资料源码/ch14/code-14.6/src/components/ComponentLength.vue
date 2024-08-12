<template>
  <div class="panel">
    <h5>Length: {{ length }}</h5>
    <button @click="increase()">+1</button>
  </div>
</template>

<script>
import { mapWritableState } from 'pinia'
import { useRectangleStore } from '@/stores'

export default {
  name: 'ComponentLength',
  computed: {
    // mapWritableState 用于映射 Store 中定义的 state
    // 映射为 this.length
    ...mapWritableState(useRectangleStore, ['length'])
  },
  methods: {
    increase() {
      this.length++
    }
  }
}
</script>