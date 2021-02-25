import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/income/getData',
    method: 'get',
    params: query
  })
}

export function changeIncomeStatus(id,status) {
  const data = {
      id,
      status
  }
  return request({
    url: '/income/changeStatus',
    method: 'post',
    params: data
  })
}


export function getIncome(id) {
  return request({
    url: '/income/get',
    method: 'get',
    params: { id }
  })
}


export function createIncome(data) {
  return request({
    url: '/income/create',
    method: 'post',
    data
  })
}

export function updateIncome(data) {
  return request({
    url: '/income/edit',
    method: 'post',
    data
  })
}
export function deleteIncome(ids) {
  const data = {
      ids
  }
  return request({
    url: '/income/delete',
    method: 'post',
    data
  })
}

export function getIncomeStat(query) {
  return request({
    url: '/income/stat',
    method: 'get',
    params:query
  })
}

export function getIncomeDateStat(query) {
  return request({
    url: '/income/dateStat',
    method: 'get',
    params:query
  })
}

