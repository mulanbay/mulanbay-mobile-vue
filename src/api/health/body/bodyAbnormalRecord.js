import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/bodyAbnormalRecord/getData',
    method: 'get',
    params: query
  })
}

export function getBodyAbnormalRecord(id) {
  return request({
    url: '/bodyAbnormalRecord/get',
    method: 'get',
    params: { id }
  })
}

export function createBodyAbnormalRecord(data) {
  return request({
    url: '/bodyAbnormalRecord/create',
    method: 'post',
    data
  })
}

export function updateBodyAbnormalRecord(data) {
  return request({
    url: '/bodyAbnormalRecord/edit',
    method: 'post',
    data
  })
}
export function deleteBodyAbnormalRecord(ids) {
  const data = {
      ids
  }
  return request({
    url: '/bodyAbnormalRecord/delete',
    method: 'post',
    data
  })
}

export function getBodyAbnormalRecordDateStat(query) {
  return request({
    url: '/bodyAbnormalRecord/dateStat',
    method: 'get',
    params: query
  })
}

export function getBodyAbnormalRecordStat(query) {
  return request({
    url: '/bodyAbnormalRecord/stat',
    method: 'get',
    params: query
  })
}

export function getBodyAbnormalRecordAnalyse(query) {
  return request({
    url: '/bodyAbnormalRecord/analyse',
    method: 'get',
    params: query
  })
}

export function getAbnormalCategoryTree(groupField,needRoot) {
  return request({
    url: '/bodyAbnormalRecord/getAbnormalCategoryTree',
    method: 'get',
    params: {
      groupField:groupField,
      needRoot:needRoot
    }
  })
}
