import request from '@/utils/request'

// 登录
export function loginAuth(data) {
  return request({
    url: '/main/loginAuth',
    method: 'post',
    data
  })
}

// 注册
export function userRegister(data) {
  return request({
    url: '/main/userRegister',
    method: 'post',
    data
  })
}


// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/user/getMyInfoWithPerms',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/main/logout',
    method: 'post'
  })
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: '/captcha/captchaImage',
    method: 'get'
  })
}
