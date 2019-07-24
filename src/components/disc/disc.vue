<template>
  <transition name="slide">
    <MusicList :title="title" :bgImage="bgImage" :songs="songs"></MusicList>
  </transition>
</template>

<script type="text/ecmascript-6">
import MusicList from '../../components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getSongList} from '../../api/recommend'
import {createRecommendSong} from '../../common/js/song'
export default {
  computed: {
    ...mapGetters([
      'disc'
    ]),
    title () {
      return this.disc.title
    },
    bgImage () {
      return this.disc.imgurl
    }
  },
  data () {
    return {
      songs: []
    }
  },
  created () {
    this._getSongList()
  },
  methods: {
    _getSongList () {
      // 刷新页面后，没有数据，回到上一个页面内容
      if (!this.disc.dissid) {
        this.$router.push('/recommend')
        return
      }
      getSongList(this.disc.dissid).then((res) => {
        if (res.status === 200) {
          console.log(res.data.data[0].songlist)
          this.songs = this._normalizeSongs(res.data.data[0].songlist)
        }
      })
    },
    _normalizeSongs (list) {
      let ret = []
      list.forEach((musicData) => {
        // console.log(musicData)
        if (musicData.album.id && musicData.ksong.mid) {
          ret.push(createRecommendSong(musicData))
        }
      })
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
