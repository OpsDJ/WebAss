<template>
  <UserOrders />
</template>

<script>
import UserOrders from './components/UserOrders.vue'

export default {
  name: 'App',
  components: {
    UserOrders
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
