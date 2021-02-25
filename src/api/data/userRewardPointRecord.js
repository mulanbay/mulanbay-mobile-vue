import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/userRewardPointRecord/getData',
    method: 'get',
    params: query
  })
}

export function getUserRewardPointRecord(id) {
  return request({
    url: '/userRewardPointRecord/get',
    method: 'get',
    params: { id }
  })
}

export function getMessageContent(id) {
  return request({
    url: '/userRewardPointRecord/getMessageContent',
    method: 'get',
    params: { id }
  })
}

export function createUserRewardPointRecord(data) {
  return request({
    url: '/userRewardPointRecord/create',
    method: 'post',
    data
  })
}

export function updateUserRewardPointRecord(data) {
  return request({
    url: '/userRewardPointRecord/edit',
    method: 'post',
    data
  })
}
export function deleteUserRewardPointRecord(ids) {
  const data = {
      ids
  }
  return request({
    url: '/userRewardPointRecord/delete',
    method: 'post',
    data
  })
}

export function getUserRewardPointRecordSourceStat(query) {
  return request({
    url: '/userRewardPointRecord/pointsSourceStat',
    method: 'get',
    params: query
  })
}

export function getUserRewardPointRecordValueStat(query) {
  return request({
    url: '/userRewardPointRecord/pointsValueStat',
    method: 'get',
    params: query
  })
}

export function getUserRewardPointRecordTimelineStat(query) {
  return request({
    url: '/userRewardPointRecord/pointsTimelineStat',
    method: 'get',
    params: query
  })
}

export function dailyStat(query) {
  return request({
    url: '/userRewardPointRecord/dailyStat',
    method: 'get',
    params: query
  })
}

export function getUserRewardPointRecordFullStat(query) {
  return request({
    url: '/userRewardPointRecord/fullStat',
    method: 'get',
    params: query
  })
}
