<!--  -->
<template>
  <scroll @scroll="scroll"
          class="listview"
          :probe-type="probeType"
          :data="data"
          ref="listview"
          :listenScroll = "listenScroll"
  >
      <ul>
          <li v-for="group in data" class="list-group" :key="group.index" ref="listGroup">
            <h2 class="list-group-title">{{group.title}}</h2>
            <ul>
              <li
                v-for="item in group.items"
                :key="item.index"
                class="list-group-item"
                @click="select(item)"
              >
                <img v-lazy="item.avatar" class="avatar">
                <span class="name">{{item.name}}</span>
              </li>
            </ul>
          </li>
      </ul>
      <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
          <ul>
              <li v-for="(item,index) in shortCutList" :key="index" class="item" :data-index="index" :class="{'current':currentIndex===index}">
                {{item}}
              </li>
          </ul>
      </div>
      <div class="list-fixed" v-show="fixedTitle" ref="fixed">
        <div class="fixed-title">{{fixedTitle}}</div>
      </div>
      <div class="loading-container" v-show="!data.length">
        <Loading></Loading>
      </div>
  </scroll>
</template>

<script>
import scroll from '../scroll/scroll'
import {getData} from '../../common/js/dom'
import Loading from '../loading/loading'
//  设置描点的高度 该高度为css中设置
const ANCHOR_HEIGHT = 18
const TITLE_HEIGHT = 30
export default {
  created () {
    this.touch = {}
    this.listenScroll = true
    this.listHeight = []
    this.probeType = 3
  },
  data () {
    return {
      currentIndex: 0,
      scrollY: -1,
      diff: -1
    }
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  computed: {
    shortCutList () {
      return this.data.map((group) => {
        return group.title.substr(0, 1)
      })
    },
    fixedTitle () {
      if (scrollY > 0) {
        return
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  methods: {
    select (item) {
      this.$emit('select', item)
    },
    onShortcutTouchStart (e) {
      let anchoIndex = getData(e.target, 'index')
      // 获取第一次点击时的位置
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchoIndex = anchoIndex
      this._scrollTo(anchoIndex)
    },
    onShortcutTouchMove (e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      // 0 相当于math.floor向下取整
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      let anchoIndex = parseInt(this.touch.anchoIndex) + delta
      this._scrollTo(anchoIndex)
    },
    scroll (pos) {
      // console.log('调用到这个函数了')
      this.scrollY = pos.y
      // console.log(this.scrollY)
    },
    refresh () {
      this.$refs.listview.refresh()
    },
    _scrollTo (index) {
      // console.log(index)
      if (!index && index !== 0) {
        return
      }

      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length) {
        index = this.listHeight.length - 2
      }
      this.scrollY = -this.listHeight[index]
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
    },
    _calculateHeight () {
      this.listHeight = []
      const list = this.$refs.listGroup
      // console.log(list.length)
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
      // console.log(this.listHeight)
    }
  },
  watch: {
    data () {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    scrollY (newY) {
      const listHeight = this.listHeight
      // 当滚动到顶部
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      // 在中间滚动
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          // console.log(this.currentIndex)
          this.diff = height2 + newY
          return
        }
      }
      // 当滚动到底部
      this.currentIndex = listHeight.length - 2
    },
    diff (newVal) {
      let fixTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
      if (this.fixTop === fixTop) {
        return
      }
      this.fixTop = fixTop
      this.$refs.fixed.style.transform = `transform3d(0,${fixTop},0)`
    }
  },
  components: {
    scroll,
    Loading
  }
}

</script>
<style lang="stylus" scoped>
  @import '../../common/stylus/variable.styl';

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
