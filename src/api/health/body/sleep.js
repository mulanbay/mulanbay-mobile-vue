import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/sleep/getData',
    method: 'get',
    params: query
  })
}

export function getSleep(id) {
  return request({
    url: '/sleep/get',
    method: 'get',
    params: { id }
  })
}

export function createSleep(data) {
  return request({
    url: '/sleep/create',
    method: 'post',
    data
  })
}

export function updateSleep(data) {
  return request({
    url: '/sleep/edit',
    method: 'post',
    data
  })
}

export function sleep(data) {
  return request({
    url: '/sleep/sleep',
    method: 'post',
    data
  })
}

export function getUp(data) {
  return request({
    url: '/sleep/getUp',
    method: 'post',
    data
  })
}
export function deleteSleep(ids) {
  const data = {
      ids
  }
  return request({
    url: '/sleep/delete',
    method: 'post',
    data
  })
}

export function getSleepAnalyseStat(query) {
  return request({
    url: '/sleep/analyseStat',
    method: 'get',
    params: query
  })
}
