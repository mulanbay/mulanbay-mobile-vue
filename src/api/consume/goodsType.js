import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/goodsType/getData',
    method: 'get',
    params: query
  })
}

export function changeGoodsTypeStatus(id,status) {
  const data = {
      id,
      status
  }
  return request({
    url: '/goodsType/changeStatus',
    method: 'post',
    params: data
  })
}


export function getGoodsType(id) {
  return request({
    url: '/goodsType/get',
    method: 'get',
    params: { id }
  })
}

export function getGoodsTypeTree(pid,rootType,needRoot) {
  return request({
    url: '/goodsType/getGoodsTypeTree',
    method: 'get',
    params: { 
      pid:pid,
      rootType:rootType ,
      needRoot:needRoot
    }
  })
}

export function createGoodsType(data) {
  return request({
    url: '/goodsType/create',
    method: 'post',
    data
  })
}

export function updateGoodsType(data) {
  return request({
    url: '/goodsType/edit',
    method: 'post',
    data
  })
}

export function deleteGoodsType(ids) {
  const data = {
      ids
  }
  return request({
    url: '/goodsType/delete',
    method: 'post',
    data
  })
}
