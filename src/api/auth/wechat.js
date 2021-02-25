import request from '@/utils/request'

export function getUserWxpayInfo() {
  return request({
    url: '/wechat/getUserWxpayInfo',
    method: 'get'
  })
}

export function getWxAppInfo() {
  return request({
    url: '/wechat/getWxAppInfo',
    method: 'get'
  })
}
