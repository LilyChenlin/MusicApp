<template>
  <div id="app">
    <MHeader></MHeader>
    <Tab></Tab>
    <keep-alive>
      <router-view/>
    </keep-alive>

  </div>
</template>

<script>
import MHeader from './components/m-header/m-header.vue'
import Tab from './components/tab/tab.vue'
export default {
  name: 'App',
  components: {
    MHeader,
    Tab
  }
}
</script>
<style lang="stylus" scoped>
</style>
