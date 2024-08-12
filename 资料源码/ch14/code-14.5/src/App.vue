<template>
  <h1>Vue Router</h1>
  <nav>
    <!-- 使用 router-link 组件生成导航按钮 -->
    <!-- 其中 to 属性指向路由中定义的 path -->
    <!-- <router-link> 最终将转换为一个带有正确 href 属性的 <a> 元素 -->
    <router-link to="/">Home</router-link>
    <router-link to="/customer">Customers</router-link>
    <router-link to="/about">About</router-link>
  </nav>

  <div id="content">
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  width: 50vw;
  margin: auto;
}

h1 {
  border-bottom: 1px solid #aaa;
  color: #385098;
}

nav {
  display: flex;
  margin-bottom: 20px;
}

nav a {
  padding: 0 0.8em;
  text-decoration: none;
  text-align: center;
  border-radius: 3px;
  color: #333;
}

nav a.router-link-active {
  background-color: #111031;
  color: white;
}

#content {
  padding: 1em;
  background-color: #f5f5f5;
  border-radius: 5px;
}
</style>
