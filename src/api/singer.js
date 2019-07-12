import jsonp from '../common/js/jsonp'
import {commonParams, options} from './config'
import ajax from './ajax'
const BASE_URL = 'https://v1.itooi.cn/tencent'
export function getSingerList () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  })
  return jsonp(url, data, options)
}

export function getSingerDetail (id) {
  const url = 'https://v1.itooi.cn/tencent/song/artist'
  const data = Object.assign({}, {
    id: id
  })
  return jsonp(url, data)
}
export const getSingerLists = () => ajax(BASE_URL + '/artist/category')
