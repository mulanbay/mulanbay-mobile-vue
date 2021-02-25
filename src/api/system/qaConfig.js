import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/qaConfig/getData',
    method: 'get',
    params: query
  })
}

export function getQaConfig(id) {
  return request({
    url: '/qaConfig/get',
    method: 'get',
    params: { id }
  })
}

export function getQaConfigTree(needRoot) {
  return request({
    url: '/qaConfig/getQaConfigTree',
    method: 'get',
    params: {
      needRoot:needRoot
    }
  })
}

export function createQaConfig(data) {
  return request({
    url: '/qaConfig/create',
    method: 'post',
    data
  })
}

export function updateQaConfig(data) {
  return request({
    url: '/qaConfig/edit',
    method: 'post',
    data
  })
}

export function deleteQaConfig(ids) {
  const data = {
      ids
  }
  return request({
    url: '/qaConfig/delete',
    method: 'post',
    data
  })
}

export function reloadCache() {
  return request({
    url: '/qaConfig/reloadCache',
    method: 'post'
  })
}

export function getQaConfigTreeView(name) {
  return request({
    url: '/qaConfig/treeView',
    method: 'get',
    params: { name }
  })
}

export function textReq(data) {
  return request({
    url: '/qaConfig/textReq',
    method: 'post',
    data
  })
}