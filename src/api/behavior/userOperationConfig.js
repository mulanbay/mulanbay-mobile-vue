import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/userOperationConfig/getData',
    method: 'get',
    params: query
  })
}

export function getUserOperationConfig(id) {
  return request({
    url: '/userOperationConfig/get',
    method: 'get',
    params: { id }
  })
}

export function getUserOperationConfigTree(needRoot) {
  return request({
    url: '/userOperationConfig/getUserOperationConfigTree',
    method: 'get',
    params: { needRoot }
  })
}


export function createUserOperationConfig(data) {
  return request({
    url: '/userOperationConfig/create',
    method: 'post',
    data
  })
}

export function updateUserOperationConfig(data) {
  return request({
    url: '/userOperationConfig/edit',
    method: 'post',
    data
  })
}
export function deleteUserOperationConfig(ids) {
  const data = {
      ids
  }
  return request({
    url: '/userOperationConfig/delete',
    method: 'post',
    data
  })
}

export function getUserOperationConfigStat(query) {
  return request({
    url: '/userOperationConfig/userOperationStat',
    method: 'get',
    params: query
  })
}


export function getUserOperationConfigWordCloudStat(query) {
  return request({
    url: '/userOperationConfig/wordCloudStat',
    method: 'get',
    params: query
  })
}
