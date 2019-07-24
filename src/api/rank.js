import jsonp from '../common/js/jsonp'
import {commonParams, options} from '../api/config'

export function getTopList () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
  const data = Object.assign({}, commonParams, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })
  return jsonp(url, data, options)
}

export function getTopMusicList (topid) {
  const url = 'https://v1.itooi.cn/tencent/topList'
  const data = Object.assign({}, {
    id: topid
  })
  return jsonp(url, data)
}
