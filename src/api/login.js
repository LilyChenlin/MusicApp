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
export function phoneLogin (phone, password) {
  const url = BASE_URL + '/login/cellphone'
  const data = Object.assign({}, {
    phone: phone,
    password: password
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
// 尝试带有token的login
export function tokenLogin (email, password) {
  const url = '129.204.186.24:8000/api/auth/login'
  const data = Object.assign({}, {
    email: email,
    password: password
  })
  return jsonp(url, data)
}
