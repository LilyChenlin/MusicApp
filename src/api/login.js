import jsonp from '../common/js/jsonp'

const BASE_URL = 'http://localhost:3000'
export function getCode (phone) {
  const url = BASE_URL + '/captcha/sent'
  const data = Object.assign({}, {
    phone: phone
  })
  return jsonp(url, data)
}

// 手机验证码登录
export function phoneLogin (phone, captcha) {
  const url = BASE_URL + '/captcha/verify'
  const data = Object.assign({}, {
    phone: phone,
    captcha: captcha
  })
  return jsonp(url, data)
}
export function emailLogin (email, password) {
  const url = BASE_URL + '/login'
  const data = Object.assign({}, {
    email: email,
    password: password
  })
  return jsonp(url, data)
}