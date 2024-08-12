<template>
  <div class="container">
    <nav>
      <router-link to="/profile/johnny">Johnny</router-link>
      <router-link to="/profile/jackie">Jackie</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
}

nav {
  display: block;
  border-right: 1px dashed #ddd;
  margin-right: 2em;
  padding-right: 1em;

  a {
    display: block;
    background: none;
    text-align: left;
    margin-bottom: 1em;

    &.router-link-active {
      color: #673AB7;
      font-weight: bold;
    }
  }
}
</style>