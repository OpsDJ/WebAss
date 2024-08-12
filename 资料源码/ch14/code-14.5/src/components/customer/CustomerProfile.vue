<template>
  <div>
    <div>Name: {{ $route.params.name }}</div>
    <div>Prop-Name: {{ name }}</div>
  </div>
</template>

<script>
export default ({
  props: { name: { type: String, default: 'unknown' } }
})
</script>