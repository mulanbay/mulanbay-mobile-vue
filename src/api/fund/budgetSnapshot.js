import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/budgetSnapshot/getData',
    method: 'get',
    params: query
  })
}

export function getList(query) {
  return request({
    url: '/budgetSnapshot/getList',
    method: 'get',
    params: query
  })
}


export function stat(query) {
  return request({
    url: '/budgetSnapshot/stat',
    method: 'get',
    params: query
  })
}
