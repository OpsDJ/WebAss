<template>
  <p class="greeting">{{ greeting }}</p>
  <p>{{ msg }}</p>
  <button @click="showChinese()">Chinese</button>
</template>

<script>
export default {
  name: 'HelloWorld',
  // 组件属性, msg为属性名, String表明该属性仅可接受字符型数据
  props: { msg: String },
  data() {
    return {
      greeting: 'Hello!'
    }
  },
  methods: {
    showChinese() {
      this.greeting = '你好!'
    }
  }
}
</script>

<style>
.greeting {
  color: red;
  font-weight: bold;
}
</style>