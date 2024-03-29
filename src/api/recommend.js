import jsonp from '../common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'
// 获取轮播图推荐数据
export function getRecommend () {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return jsonp(url, data, options)
}
// 获取热门推荐歌单
export function getDiscList () {
  const url = '/api/getDiscList'
  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 获取点击热门推荐歌单下的歌单
export function getSongList (id) {
  const url = 'https://v1.itooi.cn/tencent/songList'
  const data = Object.assign({}, {
    id: id
  })
  return jsonp(url, data)
}
