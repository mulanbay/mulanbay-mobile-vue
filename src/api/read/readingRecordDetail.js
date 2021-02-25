import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/readingRecordDetail/getData',
    method: 'get',
    params: query
  })
}

export function getReadingRecordDetail(id) {
  return request({
    url: '/readingRecordDetail/get',
    method: 'get',
    params: { id }
  })
}

export function createReadingRecordDetail(data) {
  return request({
    url: '/readingRecordDetail/create',
    method: 'post',
    data
  })
}

export function updateReadingRecordDetail(data) {
  return request({
    url: '/readingRecordDetail/edit',
    method: 'post',
    data
  })
}
export function deleteReadingRecordDetail(ids) {
  const data = {
      ids
  }
  return request({
    url: '/readingRecordDetail/delete',
    method: 'post',
    data
  })
}

export function getReadingRecordDetailDateStat(query) {
  return request({
    url: '/readingRecordDetail/dateStat',
    method: 'get',
    params: query
  })
}
