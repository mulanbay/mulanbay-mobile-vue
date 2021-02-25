import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/diet/getData',
    method: 'get',
    params: query
  })
}

export function getDiet(id) {
  return request({
    url: '/diet/get',
    method: 'get',
    params: { id }
  })
}

export function getDietLastLocation() {
  return request({
    url: '/diet/getLastLocation',
    method: 'get'
  })
}

export function createDiet(data) {
  return request({
    url: '/diet/create',
    method: 'post',
    data
  })
}

export function updateDiet(data) {
  return request({
    url: '/diet/edit',
    method: 'post',
    data
  })
}

export function deleteDiet(ids) {
  const data = {
      ids
  }
  return request({
    url: '/diet/delete',
    method: 'post',
    data
  })
}

export function getFoodsTree(needRoot) {
  return request({
    url: '/diet/getFoodsTree',
    method: 'get',
    params: {
      needRoot:needRoot
    }
  })
}

export function getShopTree(needRoot) {
  return request({
    url: '/diet/getShopTree',
    method: 'get',
    params: {
      needRoot:needRoot
    }
  })
}

export function getTagsTree(needRoot) {
  return request({
    url: '/diet/getTagsTree',
    method: 'get',
    params: {
      needRoot:needRoot
    }
  })
}

export function getDietAnalyse(query) {
  return request({
    url: '/diet/analyse',
    method: 'get',
    params: query
  })
}

export function getDietCompare(query) {
  return request({
    url: '/diet/compare',
    method: 'get',
    params: query
  })
}

export function getDietPriceAnalyse(query) {
  return request({
    url: '/diet/priceAnalyse',
    method: 'get',
    params: query
  })
}

export function getFoodsAvgSimilarity(query) {
  return request({
    url: '/diet/getFoodsAvgSimilarity',
    method: 'get',
    params: query
  })
}

export function statFoodsAvgSimLog(query) {
  return request({
    url: '/diet/statFoodsAvgSimLog',
    method: 'get',
    params: query
  })
}

export function statDietWordCloud(query) {
  return request({
    url: '/diet/statWordCloud',
    method: 'get',
    params: query
  })
}

export function getDietStat(query) {
  return request({
    url: '/diet/stat',
    method: 'get',
    params: query
  })
}

export function getDietTimeStat(query) {
  return request({
    url: '/diet/timeStat',
    method: 'get',
    params: query
  })
}
