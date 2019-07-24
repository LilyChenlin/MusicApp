import jsonp from '../common/js/jsonp'
export function getLyric (mid) {
  const url = 'https://v1.itooi.cn/tencent/lrc'
  const data = Object.assign({}, {
    id: mid
  })
  return jsonp(url, data)
}
