import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/sportType/getData',
    method: 'get',
    params: query
  })
}

export function changeSportTypeStatus(id,status) {
  const data = {
      id,
      status
  }
  return request({
    url: '/sportType/changeStatus',
    method: 'post',
    params: data
  })
}


export function getSportType(id) {
  return request({
    url: '/sportType/get',
    method: 'get',
    params: { id }
  })
}

export function getSportTypeTree(needRoot) {
  return request({
    url: '/sportType/getSportTypeTree',
    method: 'get',
    params: {
      needRoot:needRoot
    }
  })
}

export function createSportType(data) {
  return request({
    url: '/sportType/create',
    method: 'post',
    data
  })
}

export function updateSportType(data) {
  return request({
    url: '/sportType/edit',
    method: 'post',
    data
  })
}
export function deleteSportType(ids) {
  const data = {
      ids
  }
  return request({
    url: '/sportType/delete',
    method: 'post',
    data
  })
}
