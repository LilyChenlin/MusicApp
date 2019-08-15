<template>
  <transition name="slide">
    <div class="user-center">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <div class="switches-wrapper">
        <switches :switches="switches" @switch="switchItem" :currentIndex="currentIndex"></switches>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on:currentIndex === 0}">
            <!-- 手机登录 -->
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
            </section>
            <section class="login_verification">
              <input type="password" maxlength="20" placeholder="密码" v-model="password">
            </section>
          </div>
          <div :class="{on:currentIndex === 1}">
            <!-- 邮箱登录 -->
            <section>
              <section class="login_message">
                <input type="text" maxlength="20" placeholder="邮箱" v-model="email">
              </section>
              <section class="login_verification">
                <input type="text" maxlength="20" placeholder="密码" v-model="password" v-if="showPwd">
                <input type="password" maxlength="20" placeholder="密码" v-else v-model="password">
                <div class="switch_button" :class="showPwd?'on':'off'" @click="showPwd=!showPwd">
                  <div class="switch_circle" :class="{right: showPwd}"></div>
                  <span class="switch_text">{{showPwd ? 'abc' : '...'}}</span>
                </div>
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
    <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"></AlertTip>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import AlertTip from '../../base/alertTip/alertTip'
import Switches from '../../base/switches/switches'
import {phoneLogin, emailLogin} from '../../api/login.js'

export default {
  data () {
    return {
      loginWay: false,
      computeTime: 0,
      phone: '',
      currentIndex: 0, // 0 手机号登录 1邮箱
      captcha: '', // 短信验证码
      email: '',
      password: '',
      showPwd: false,
      alertText: '',
      alertShow: false,
      switches: [
        {
          name: '手机登录'
        },
        {
          name: '邮箱登录'
        }
      ]
    }
  },
  computed: {
    rightPhone () {
      return /^1\d{10}$/.test(this.phone)
    }
  },
  methods: {
    showAlert (alertText) {
      this.alertShow = true
      this.alertText = alertText
    },
    closeTip () {
      this.alertShow = false
      this.alertText = ''
    },
    // async getCode () {
    //   if (!this.computeTime) {
    //     this.computeTime = 30
    //     this.intervalId = setInterval(() => {
    //       this.computeTime--
    //       if (this.computeTime <= 0) {
    //         // 停止计时
    //         clearInterval(this.intervalId)
    //       }
    //     }, 1000)
    //     // 发送请求 获取验证码
    //     const result = await getCode(this.phone)
    //     if (result.code === 200) {
    //       alert('发送验证码成功')
    //       if (this.computeTime) {
    //         this.computeTime = 0
    //         clearInterval(this.intervalId)
    //         this.intervalId = undefined
    //       }
    //     }
    //   }
    // },
    async login () {
      let result
      // 改进login方法
      if (this.currentIndex === 0) {
        // 手机短信登录~
        const {rightPhone, phone, password} = this
        if (!rightPhone) {
          // 手机号不正确
          this.showAlert('手机号不正确')
          return
        } else if (!password) {
          this.showAlert('密码不能为空')
          return
        }
        try {
          result = await phoneLogin(phone, password)
          if (result.data.code === 200) {
            let user = result.data.account
            this.$store.dispatch('recordUser', user)
            this.$router.replace('/userCenter')
          } else {
            this.showAlert('请求接口失败')
          }
        } catch (err) {
          console.log(err)
        }
      } else {
        // 邮箱密码登录
        const {email, password} = this
        // 邮箱正则表达式
        const reg = new RegExp('^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$')
        if (!(reg.test(email))) {
          this.showAlert('邮箱格式不正确')
          return
        } else if (!password) {
          this.showAlert('密码不为空')
          return
        }
        try {
          result = await emailLogin(email, password)
          console.log(result)
          if (result.status === 200) {
            // console.log('运行到这里了')
            let user = result.data.account
            this.$store.dispatch('recordUser', user)
            this.$router.replace('/userCenter')
          } else {
            this.showAlert('请求接口失败')
          }
        } catch (err) {
          console.log(err)
        }
      }
      // 停止计时
      if (this.computeTime) {
        this.computeTime = 0
        clearInterval(this.intervalId)
        this.intervalId = undefined
      }
    },
    back () {
      this.$router.back()
    },
    switchItem (index) {
      this.currentIndex = index
    }
  },
  components: {
    Switches,
    AlertTip
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .user-center
    position: fixed
    top: 0
    bottom: 0
    z-index: 100
    width: 100%
    background: $color-background
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .switches-wrapper
      margin: 10px 0 30px 0
    .login_content
      >form
        >div
          display none
          &.on
            display block
          input
            width 100%
            height 100%
            background $color-highlight-background
            padding-left 10px
            box-sizing border-box
            border none
            border-radius 10px
            outline 0
            font 400 14px Arial
            color $color-theme
            &:focus
              border 1px solid  $color-theme
          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.right_phone
                color $color-theme
          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color .3s,border-color .3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              &.off
                background #fff
                .switch_text
                  float right
                  color #ddd
              &.on
                background $color-theme
              >.switch_circle
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                transition transform .3s
                &.right
                  transform translateX(30px)
        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background $color-theme
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0
      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999      
</style>
