<!-- m-header -->
<template>
    <div class="m-header">
        <div class="icon"></div>
        <h1 class="text">Music</h1>
        <router-link tag="div" class="mine" :to="userInfo.id ? '/userCenter' : '/login'">
            <i class="icon-mine" v-if="userInfo.id"></i>
            <span class="login" v-else>登录</span>
        </router-link>
    </div>
</template>

<script>
import { mapState} from 'vuex'
export default {
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>
<style lang="stylus" scoped>
    @import '../../common/stylus/mixin.styl';
    @import '../../common/stylus/variable.styl';

  .m-header
    position: relative
    height: 44px
    text-align: center
    color: $color-theme
    font-size: 0
    .icon
      display: inline-block
      vertical-align: top
      margin-top: 6px
      width: 30px
      height: 32px
      margin-right: 9px
      bg-image('logo')
      background-size: 30px 32px
    .text
      display: inline-block
      vertical-align: top
      line-height: 44px
      font-size: $font-size-large
    .login 
      position: absolute
      display: inline-block
      width: 40px
      top: 15px
      right: 30px
      color: $color-theme
      font-size: $font-size-large
    .mine
      position: absolute
      top: 0
      right: 0
      
      .icon-mine
        display: block
        padding: 12px
        font-size: 20px
        color: $color-theme
</style>
