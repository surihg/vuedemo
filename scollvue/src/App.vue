<template>
  <div id="app">
    <hello></hello>
  </div>
</template>

<script>
  import hello from './components/HelloWorld.vue'
export default {
  

  components: {
      'hello': hello
    }
}
</script>

<style>
#app {
  height: 100%;
  width: 100%
}
</style>
