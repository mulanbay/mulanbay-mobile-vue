import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/readingRecord/getData',
    method: 'get',
    params: query
  })
}

export function getReadingRecord(id) {
  return request({
    url: '/readingRecord/get',
    method: 'get',
    params: { id }
  })
}

export function getReadingRecordCostTimes(id) {
  return request({
    url: '/readingRecord/getCostTimes',
    method: 'get',
    params: { id }
  })
}

export function createReadingRecord(data) {
  return request({
    url: '/readingRecord/create',
    method: 'post',
    data
  })
}

export function updateReadingRecord(data) {
  return request({
    url: '/readingRecord/edit',
    method: 'post',
    data
  })
}
export function deleteReadingRecord(ids) {
  const data = {
      ids
  }
  return request({
    url: '/readingRecord/delete',
    method: 'post',
    data
  })
}

export function getReadingRecordDateStat(query) {
  return request({
    url: '/readingRecord/dateStat',
    method: 'get',
    params: query
  })
}


export function getReadingRecordAnalyseStat(query) {
  return request({
    url: '/readingRecord/analyseStat',
    method: 'get',
    params: query
  })
}

export function getReadingRecordFullStat(query) {
  return request({
    url: '/readingRecord/fullStat',
    method: 'get',
    params: query
  })
}

