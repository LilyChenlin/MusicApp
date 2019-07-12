import originJsonp from 'jsonp'
import axios from 'axios'
export default function jsonp (url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

  return new Promise((resolve, reject) => {
    if (option) {
      originJsonp(url, option, (err, data) => {
        if (!err) {
          // console.log(data)
          resolve(data)
        } else {
          reject(err)
        }
      })
    } else {
      console.log('滴滴')
      axios.get(url).then((res) => {
        // console.log(res.data)
        resolve(res)
        // console.log(res.status)
      }).catch((err) => {
        reject(err)
      })
    }
  })
}
export function param (data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}
