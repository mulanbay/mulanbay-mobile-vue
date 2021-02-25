import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/budgetLog/getData',
    method: 'get',
    params: query
  })
}

export function getBudgetLog(id) {
  return request({
    url: '/budgetLog/get',
    method: 'get',
    params: { id }
  })
}

export function createBudgetLog(data) {
  return request({
    url: '/budgetLog/create',
    method: 'post',
    data
  })
}

export function updateBudgetLog(data) {
  return request({
    url: '/budgetLog/edit',
    method: 'post',
    data
  })
}

export function deleteBudgetLog(ids) {
  const data = {
      ids
  }
  return request({
    url: '/budgetLog/delete',
    method: 'post',
    data
  })
}

export function getBudgetLogStat(query) {
  return request({
    url: '/budgetLog/stat',
    method: 'get',
    params: query
  })
}

export function getBudgetLogValueErrorStat(query) {
  return request({
    url: '/budgetLog/valueErrorStat',
    method: 'get',
    params: query
  })
}

export function getBudgetLogPeriodStat(query) {
  return request({
    url: '/budgetLog/getPeriodStat',
    method: 'get',
    params: query
  })
}

export function reSaveBudgetLog(id) {
  const data = {
      id
  }
  return request({
    url: '/budgetLog/reSave',
    method: 'post',
    data
  })
}