import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/budget/getData',
    method: 'get',
    params: query
  })
}

export function changeBudgetStatus(id,status) {
  const data = {
      id,
      status
  }
  return request({
    url: '/budget/changeStatus',
    method: 'post',
    params: data
  })
}

export function getBudget(id) {
  return request({
    url: '/budget/get',
    method: 'get',
    params: { id }
  })
}

export function createBudget(data) {
  return request({
    url: '/budget/create',
    method: 'post',
    data
  })
}

export function updateBudget(data) {
  return request({
    url: '/budget/edit',
    method: 'post',
    data
  })
}

export function deleteBudget(ids) {
  const data = {
      ids
  }
  return request({
    url: '/budget/delete',
    method: 'post',
    data
  })
}

export function getBudgetTree(needRoot,filterEmpty) {
  return request({
    url: '/budget/getBudgetTree',
    method: 'get',
    params: { needRoot,filterEmpty }
  })
}

export function getBudgetStat(query) {
  return request({
    url: '/budget/stat',
    method: 'get',
    params: query
  })
}

export function getBudgetTimelineStat(query) {
  return request({
    url: '/budget/timelineStat',
    method: 'get',
    params: query
  })
}

export function reStatBudgetTimeline(data) {
  return request({
    url: '/budget/reStatTimeline',
    method: 'post',
    data
  })
}

export function getBudgetAnalyse(query) {
  return request({
    url: '/budget/analyse',
    method: 'get',
    params: query
  })
}

export function getInfoList(query) {
  return request({
    url: '/budget/getInfoList',
    method: 'get',
    params: query
  })
}