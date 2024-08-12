<template>
  <div class="container">
    <nav>
      <router-link to="/profile1/johnny">Johnny</router-link>
      <router-link to="/profile2/jackie">Jackie</router-link>
      <router-link to="/profile3">Joanna</router-link>
      <router-link to="/profile4?name=peter">Peter</router-link>
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