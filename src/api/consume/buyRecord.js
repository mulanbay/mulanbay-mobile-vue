import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/buyRecord/getData',
    method: 'get',
    params: query
  })
}

export function changeBuyRecordStatus(id,status) {
  const data = {
      id,
      status
  }
  return request({
    url: '/buyRecord/changeStatus',
    method: 'post',
    params: data
  })
}


export function getBuyRecord(id) {
  return request({
    url: '/buyRecord/get',
    method: 'get',
    params: { id }
  })
}

export function createBuyRecord(data) {
  return request({
    url: '/buyRecord/create',
    method: 'post',
    data
  })
}

export function updateBuyRecord(data) {
  return request({
    url: '/buyRecord/edit',
    method: 'post',
    data
  })
}

export function deleteBuyRecord(ids) {
  const data = {
      ids
  }
  return request({
    url: '/buyRecord/delete',
    method: 'post',
    data
  })
}

export function getBuyRecordKeywordsTree(startDate,endDate,needRoot) {
  return request({
    url: '/buyRecord/getKeywordsTree',
    method: 'get',
    params: {
      startDate:startDate,
      endDate:endDate ,
      needRoot:needRoot
    }
  })
}

export function getBuyRecordAnalyseStat(query) {
  return request({
    url: '/buyRecord/analyseStat',
    method: 'get',
    params: query
  })
}

export function getBuyRecordGoodsNameAvgSimilarity(query) {
  return request({
    url: '/buyRecord/getGoodsNameAvgSimilarity',
    method: 'get',
    params: query
  })
}

export function getBuyRecordUseTimeStat(query) {
  return request({
    url: '/buyRecord/useTimeStat',
    method: 'get',
    params: query
  })
}

export function getBuyRecordDateStat(query) {
  return request({
    url: '/buyRecord/dateStat',
    method: 'get',
    params: query
  })
}

export function getBuyRecordYoyStat(query) {
  return request({
    url: '/buyRecord/yoyStat',
    method: 'get',
    params: query
  })
}

export function getBuyRecordKeywordsStat(query) {
  return request({
    url: '/buyRecord/keywordsStat',
    method: 'get',
    params: query
  })
}

export function getBuyRecordKeywordsDetailStat(query) {
  return request({
    url: '/buyRecord/keywordsDetailStat',
    method: 'get',
    params: query
  })
}

export function getBuyRecordWordCloudStat(query) {
  return request({
    url: '/buyRecord/statWordCloud',
    method: 'get',
    params: query
  })
}

export function aiMatch(goodsName) {
  const data = {
      goodsName
  }
  return request({
    url: '/buyRecord/aiMatch',
    method: 'post',
    data
  })
}

export function statWithTreat(query) {
  return request({
    url: '/buyRecord/statWithTreat',
    method: 'get',
    params: query
  })
}
