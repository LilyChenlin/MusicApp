<template>
  <transition name="slide">
    <div class="singer-detail">SingerDetail</div>
  </transition>

</template>

<script>
import {mapGetters} from 'vuex'

import {getSingerDetail} from '../../api/singer'
// import {ERR_OK} from '../../api/config'
const ERR_OK = 0
export default { 
  computed: {
    ...mapGetters([
      'singer'
    ])
  },
  created () {
    this._getSingerList()
  },
  methods: {
    
    _getSingerList () {

      getSingerDetail(this.singer.id).then(res => {
        if (res.status === 200) {
          console.log(res.data)
        }
      })
    }
  }
}
</script>
<style lang="stylus">
  @import '../../common/stylus/variable';

  .singer-detail 
    position: fixed
    z-index: 100
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: $color-background


  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)

    
</style>
