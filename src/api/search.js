import jsonp from '../common/js/jsonp'
import {commonParams, options} from './config'

export function getHotKey () {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
  const data = Object.assign({}, commonParams, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })
  return jsonp(url, data, options)
}
export function search (query, type) {
  const url = 'https://v1.itooi.cn/tencent/search'
  const data = Object.assign({}, {
    keyword: query,
    type: type
  })
  return jsonp(url, data)
}
