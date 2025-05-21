<template>
  <div class="layout">
    <Header/>
  </div>
    <router-view></router-view>
  
</template>

<script  setup>
import Header from './Header/index.vue'
</script>
<style lang=scss scoped>
.layout{
  max-width: 1400px;
  margin: 0 auto;
}
</style>
