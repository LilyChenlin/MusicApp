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
import {getSingerLists} from './api/singer'
import MHeader from './components/m-header/m-header.vue'
import Tab from './components/tab/tab.vue'
export default {
  name: 'App',
  components: {
    MHeader,
    Tab
  },
  async mounted () {    
    const result = await getSingerLists()    
    // console.log(result)  
  },
}
</script>
<style lang="stylus" scoped>
</style>
