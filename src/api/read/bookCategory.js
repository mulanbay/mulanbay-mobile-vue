import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/bookCategory/getData',
    method: 'get',
    params: query
  })
}

export function getBookCategory(id) {
  return request({
    url: '/bookCategory/get',
    method: 'get',
    params: { id }
  })
}

export function getBookCategoryTree(needRoot) {
  return request({
    url: '/bookCategory/getBookCategoryTree',
    method: 'get',
    params: {
      needRoot:needRoot
    }
  })
}

export function createBookCategory(data) {
  return request({
    url: '/bookCategory/create',
    method: 'post',
    data
  })
}

export function updateBookCategory(data) {
  return request({
    url: '/bookCategory/edit',
    method: 'post',
    data
  })
}
export function deleteBookCategory(ids) {
  const data = {
      ids
  }
  return request({
    url: '/bookCategory/delete',
    method: 'post',
    data
  })
}
