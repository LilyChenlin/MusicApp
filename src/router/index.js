import Vue from 'vue'
import Router from 'vue-router'

const Recommend = () => import('../components/recommend/recommend.vue')
const Singer = () => import('../components/singer/singer.vue')
const Rank = () => import('../components/rank/rank.vue')
const Search = () => import('../components/search/search.vue')
const Login = () => import('../components/login/login.vue')
const SingerDetail = () => import('../components/singer-detail/singer-detail.vue')
const Disc = () => import('../components/disc/disc.vue')
const TopList = () => import('../components/top-list/top-list.vue')
const UserCenter = () => import('../components/userCenter/userCenter.vue')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: TopList
        }
      ]
    },
    {
      path: '/search',
      component: Search,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/Login',
      component: Login
    },
    {
      path: '/userCenter',
      component: UserCenter
    }
  ]
})
