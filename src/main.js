import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import './common/stylus/index.styl'
import store from './store'
Vue.config.productionTip = false
FastClick.attach(document.body)

Vue.use(VueLazyload, {
  loading: require('./common/image/default.png')
})
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
