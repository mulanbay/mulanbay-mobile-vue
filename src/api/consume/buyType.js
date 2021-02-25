import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/buyType/getData',
    method: 'get',
    params: query
  })
}

export function changeBuyTypeStatus(id,status) {
  const data = {
      id,
      status
  }
  return request({
    url: '/buyType/changeStatus',
    method: 'post',
    params: data
  })
}


export function getBuyType(id) {
  return request({
    url: '/buyType/get',
    method: 'get',
    params: { id }
  })
}

export function getBuyTypeTree(pid,needRoot) {
  return request({
    url: '/buyType/getBuyTypeTree',
    method: 'get',
    params: {
      pid:pid,
      needRoot:needRoot
    }
  })
}

export function createBuyType(data) {
  return request({
    url: '/buyType/create',
    method: 'post',
    data
  })
}

export function updateBuyType(data) {
  return request({
    url: '/buyType/edit',
    method: 'post',
    data
  })
}
export function deleteBuyType(ids) {
  const data = {
      ids
  }
  return request({
    url: '/buyType/delete',
    method: 'post',
    data
  })
}
