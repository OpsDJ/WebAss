<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld :msg="msg" @change-msg="changeMsg" />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      msg: 'Welcome'
    }
  },
  methods: {
    // 事件处理函数
    changeMsg(msg) {
      this.msg = msg
    }
  }
}
</script>

<style>
#app {
  text-align: center;
  margin-top: 60px;
}
</style>