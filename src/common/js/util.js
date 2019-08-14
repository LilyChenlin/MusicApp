//  打乱歌曲列表 洗牌
function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
export function shuffle (arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}
export function validatePhone (number) {
  const reg = new RegExp(/^1\d{10}$/)
  return reg.test(number)
}
export function validateEmail (email) {
  const reg = new RegExp('^[a-z0-9] + ([._\\-] * [a-z0-9]) * @([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$')
  return reg.test(email)
}
