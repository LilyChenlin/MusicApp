<!--  -->
<template>
  <div class="singer" ref="singer">
    <ListView :data="singers" @select="selectSinger" ref="list"></ListView>
    <router-view></router-view>
  </div>
</template>

<script>
import {ERR_OK} from '../../api/config'
import {getSingerList} from '../../api/singer'
import Singer from '../../common/js/singer'
import ListView from '../../base/listview/listview'
import {playListMixin} from '../../common/js/mixin'
import {mapMutations} from 'vuex'
const HOT_NAME = '热门'
const HOT_SINGER_NUM = 10
export default {
  mixins: [playListMixin],
  data () {
    return {
      singers: []
    }
  },
  created () {
    this._getSingerList()
  },

  methods: {
    handlePlayList (playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.singer.style.bottom = bottom
      this.$refs.list.refresh()
    },
    selectSinger (singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      // console.log(singer)
      this.setSinger(singer)
    },
    _getSingerList () {
      getSingerList().then(res => {
        // console.log(res)
        if (res.code === ERR_OK) {
          this.singers = this._normalizeSinger(res.data.list)
          console.log(this.singers)
        }
      })
    },
    _normalizeSinger (list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGER_NUM) {
          map.hot.items.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          }))
        }

        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          name: item.Fsinger_name,
          id: item.Fsinger_mid
        }))
      })

      // 为了得到有序列表，map是对象结构，所以处理map
      let ret = []
      let hot = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  components: {
    ListView
  }
}
</script>
<style lang="stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
