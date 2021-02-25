import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/commonRecordType/getData',
    method: 'get',
    params: query
  })
}

export function getCommonRecordType(id) {
  return request({
    url: '/commonRecordType/get',
    method: 'get',
    params: { id }
  })
}

export function getCommonRecordTypeTree(needRoot) {
  return request({
    url: '/commonRecordType/getCommonRecordTypeTree',
    method: 'get',
    params: {
      needRoot:needRoot
    }
  })
}

export function createCommonRecordType(data) {
  return request({
    url: '/commonRecordType/create',
    method: 'post',
    data
  })
}

export function updateCommonRecordType(data) {
  return request({
    url: '/commonRecordType/edit',
    method: 'post',
    data
  })
}
export function deleteCommonRecordType(ids) {
  const data = {
      ids
  }
  return request({
    url: '/commonRecordType/delete',
    method: 'post',
    data
  })
}
