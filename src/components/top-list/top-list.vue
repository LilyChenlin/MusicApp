<template>
  <transition name="slide">
    <MusicList :title="title"  :bgImage="bgImage" :songs="songs" :rank="rank"></MusicList>
  </transition>
</template>

<script type="text/ecmascript-6">
import MusicList from '../../components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getTopMusicList} from '../../api/rank'
import {createTopListSong} from '../../common/js/song'
export default {
  data () {
    return {
      songs: [],
      rank: true
    }
  },
  created () {
    this._getTopMusicList()
  },
  computed: {
    title () {
      return this.topList.topTitle
    },
    bgImage () {
      if (this.songs.length) {
        return this.songs[0].image
      }
    },
    ...mapGetters([
      'topList'
    ])
  },
  methods: {
    _getTopMusicList () {
      if (!this.topList.id) {
        this.$router.push('/rank')
        return
      }
      getTopMusicList(this.topList.id).then((res) => {
        // console.log(res)
        if (res.status === 200) {
          // console.log(res.data.data)
          this.songs = this._normalizeSongs(res.data.data)
          console.log(this.songs)
        }
      })
    },
    _normalizeSongs (list) {
      let ret = []
      list.forEach((musicData) => {
        if (musicData.album.id && musicData.ksong.mid) {
          ret.push(createTopListSong(musicData))
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
    transition: all 0.3s ease

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
