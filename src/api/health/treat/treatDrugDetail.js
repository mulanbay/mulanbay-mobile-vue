import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/treatDrugDetail/getData',
    method: 'get',
    params: query
  })
}


export function getTreatDrugDetail(id) {
  return request({
    url: '/treatDrugDetail/get',
    method: 'get',
    params: { id }
  })
}

export function createTreatDrugDetail(data) {
  return request({
    url: '/treatDrugDetail/create',
    method: 'post',
    data
  })
}

export function updateTreatDrugDetail(data) {
  return request({
    url: '/treatDrugDetail/edit',
    method: 'post',
    data
  })
}
export function deleteTreatDrugDetail(ids) {
  const data = {
      ids
  }
  return request({
    url: '/treatDrugDetail/delete',
    method: 'post',
    data
  })
}

export function getTreatDrugDetailCalendarStat(query) {
  return request({
    url: '/treatDrugDetail/calendarStat',
    method: 'get',
    params: query
  })
}

export function getTreatDrugDetailStat(query) {
  return request({
    url: '/treatDrugDetail/stat',
    method: 'get',
    params: query
  })
}
