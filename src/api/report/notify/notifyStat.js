import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/notifyStat/getData',
    method: 'get',
    params: query
  })
}
