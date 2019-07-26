<template>
  <transition name="slide">
    <musicList :songs="songs" :title="title" :bgImage="bgImage"></musicList>
  </transition>

</template>

<script>
import {mapGetters} from 'vuex'
import {createSong} from '../../common/js/song'
import {getSingerDetail} from '../../api/singer'
import musicList from '../music-list/music-list'
const ERR_OK = 200
export default {
  computed: {
    title () {
      // console.log(this.singer)
      return this.singer.name
    },
    bgImage () {
      return this.singer.avatar
    },
    ...mapGetters([
      'singer'
    ])
  },
  data () {
    return {
      songs: []
    }
  },
  created () {
    this._getSingerList()
  },
  methods: {
    _getSingerList () {
      getSingerDetail(this.singer.id).then(res => {
        if (res.status === ERR_OK) {
          this.songs = this._normalizeSongs(res.data.data)
          // console.log(res.data.data)
          console.log(this.songs)
        }
      })
    },
    _normalizeSongs (list) {
      let ret = []
      list.forEach((item) => {
        let {musicData} = item
        // console.log(musicData)
        if (musicData.songid && musicData.albumid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  },
  components: {
    musicList
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
