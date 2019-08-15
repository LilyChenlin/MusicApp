<template>
  <scroll class="suggest"
          ref="suggest"
          :data="result"
          :pullup="pullup"
          :beforeScroll="brforeScroll"
          @scrollEnd = "searchMore"
          @beforeScroll = "listScroll"
  >
    <ul class="suggest-list">
      <li @click="selectItem(item)" class="suggest-item" v-for="item in result" :key="item.index">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=""></loading>
    </ul>
    <div v-show="!hasMore && !result.length" class="no-result-wrapper">
      <NoResult title="抱歉，暂无搜索结果"></NoResult>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
import Scroll from '../../base/scroll/scroll'
import {search} from '../../api/search'
import {createZhiDa} from '../../common/js/zhida'
// import {commonParams} from '../../api/config'
import {createSong} from '../../common/js/song'
import Loading from '../../base/loading/loading'
import Singer from '../../common/js/singer'
import {mapMutations, mapActions} from 'vuex'
import NoResult from '../../base/no-result/no-result'
const TYPE_SINGER = 'singer'
export default {
  props: {
    query: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'song'
    }
  },
  data () {
    return {
      result: [],
      pullup: true,
      hasMore: false,
      page: 1,
      brforeScroll: true
    }
  },
  methods: {
    listScroll () {
      this.$emit('listScroll')
    },
    refresh () {
      this.$refs.suggest.refresh()
    },
    getIconCls (item) {
      if (item.type === TYPE_SINGER) {
        return 'icon-mine'
      } else {
        return 'icon-music'
      }
    },
    getDisplayName (item) {
      if (item.type === TYPE_SINGER) {
        return item.singername
      } else {
        return `${item.name} - ${item.singer}`
      }
    },
    _getSearch () {
      this.page = 1
      this.hasMore = true
      this.$refs.suggest.scrollTo(0, 0)
      // 第一次发送这个请求
      search(this.query, this.type).then((res) => {
        if (res.status === 200) {
          // console.log(res.data.data)
          this.result = this._getResult(res.data.data.list)
          // console.log(this.result)
          this._checkMore(res.data.data)
        }
      })
    },
    searchMore () {
      if (!this.hasMore) {
        return
      }
      this.page++
      search(this.query, this.type).then((res) => {
        if (res.status === 200) {
          this.result = this.result.concat(this._getResult(res.data.data.list))
          this._checkMore(res.data.data)
        }
      })
    },
    _checkMore (data) {
      if (!data.list || (data.curnum + data.curpage * 20) > data.totalnum) {
        this.hasMore = false
      } else {
        this.hasMore = true
      }
    },
    _getResult (list) {
      let ret = []
      let flag = 0
      list.forEach((musicData) => {
        // console.log(musicData)
        if (flag === 0) {
          if (musicData.albumid && musicData.singer[0].id) {
            let zhida = createZhiDa(musicData)
            // console.log(zhida)
            ret.push({...zhida, ...{type: TYPE_SINGER}})
            // console.log(ret)
            flag = 1
          }
        }
      })
      ret = ret.concat(this._normalizeSongs(list))
      // console.log(ret)
      return ret
    },
    _normalizeSongs (list) {
      let ret = []
      list.forEach((musicData) => {
        // console.log(musicData)
        if (musicData.albummid && musicData.singer[0].id) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    },
    selectItem (item) {
      // console.log(item)
      if (item.type === TYPE_SINGER) {
        var singer = new Singer({
          id: item.singermid,
          name: item.singername
        })
        this.$router.push({
          path: `/search/${singer.id}`
        })
        // console.log(singer)
        this.setSinger(singer)
      } else {
        // console.log(item)
        this.insertSong(item)
      }
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    ...mapActions([
      'insertSong'
    ])
  },
  watch: {
    query (newQuery) {
      this._getSearch(newQuery)
    }
  },
  components: {
    Scroll,
    Loading,
    NoResult
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/variable'
  @import '../../common/stylus/mixin'
  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
