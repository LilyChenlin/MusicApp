<template>
  <div id="app">
    <MHeader></MHeader>
    <Tab></Tab>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <Player></Player>
  </div>
</template>

<script>
import {getSingerLists} from './api/singer'
import MHeader from './components/m-header/m-header.vue'
import Tab from './components/tab/tab.vue'
import Player from './components/player/player.vue'
export default {
  name: 'App',
  components: {
    MHeader,
    Tab,
    Player
  },
  async mounted () {    
    const result = await getSingerLists()    
    // console.log(result)  
  },
}
</script>
<style lang="stylus" scoped>
</style>
 