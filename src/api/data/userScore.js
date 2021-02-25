import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/userScore/getData',
    method: 'get',
    params: query
  })
}

export function getUserScore(id) {
  return request({
    url: '/userScore/get',
    method: 'get',
    params: { id }
  })
}

export function getScoreDetail(id) {
  return request({
    url: '/userScore/getScoreDetail',
    method: 'get',
    params: { id }
  })
}

export function reSaveUserScore(data) {
  return request({
    url: '/userScore/reSave',
    method: 'post',
    data
  })
}

export function createUserScore(data) {
  return request({
    url: '/userScore/create',
    method: 'post',
    data
  })
}

export function updateUserScore(data) {
  return request({
    url: '/userScore/edit',
    method: 'post',
    data
  })
}
export function deleteUserScore(ids) {
  const data = {
      ids
  }
  return request({
    url: '/userScore/delete',
    method: 'post',
    data
  })
}

export function getUserScoreStat(query) {
  return request({
    url: '/userScore/stat',
    method: 'get',
    params: query
  })
}

export function getUserScoreAnalyse(query) {
  return request({
    url: '/userScore/analyse',
    method: 'get',
    params: query
  })
}

export function getUserScorePointsCompare(query) {
  return request({
    url: '/userScore/scorePointsCompare',
    method: 'get',
    params: query
  })
}

export function getUserScoreNextId(query) {
  return request({
    url: '/userScore/getNextId',
    method: 'get',
    params: query
  })
}

export function userScoreSelfJudge(data) {
  return request({
    url: '/userScore/selfJudge',
    method: 'post',
    data
  })
}