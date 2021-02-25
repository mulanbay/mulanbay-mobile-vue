import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/userBehavior/getData',
    method: 'get',
    params: query
  })
}

export function getUserBehavior(id) {
  return request({
    url: '/userBehavior/get',
    method: 'get',
    params: { id }
  })
}

export function createUserBehavior(data) {
  return request({
    url: '/userBehavior/create',
    method: 'post',
    data
  })
}

export function updateUserBehavior(data) {
  return request({
    url: '/userBehavior/edit',
    method: 'post',
    data
  })
}
export function deleteUserBehavior(ids) {
  const data = {
      ids
  }
  return request({
    url: '/userBehavior/delete',
    method: 'post',
    data
  })
}

/**
 * 过滤等级
 * @param {Object} needRoot
 */
export function getUserBehaviorConfigTree(needRoot) {
  return request({
    url: '/userBehavior/getUserBehaviorConfigTree',
    method: 'get',
    params: {
      needRoot:needRoot
    }
  })
}

export function getUserBehaviorTree(behaviorType,needRoot) {
  return request({
    url: '/userBehavior/getUserBehaviorTree',
    method: 'get',
    params: {
      behaviorType:behaviorType,
      needRoot:needRoot
    }
  })
}

export function getUserBehaviorKeywordsTree(id,needRoot) {
  return request({
    url: '/userBehavior/getUserBehaviorKeywordsTree',
    method: 'get',
    params: {
      id:id,
      needRoot:needRoot
    }
  })
}

export function getUserBehaviorStat(query) {
  return request({
    url: '/userBehavior/stat',
    method: 'get',
    params: query
  })
}

export function getUserBehaviorHourStat(query) {
  return request({
    url: '/userBehavior/hourStat',
    method: 'get',
    params: query
  })
}

export function getUserBehaviorCalendarStat(query) {
  return request({
    url: '/userBehavior/calendarStat',
    method: 'get',
    params: query
  })
}

export function getUserBehaviorCompare(query) {
  return request({
    url: '/userBehavior/compare',
    method: 'get',
    params: query
  })
}

export function getAfterEightHourAnalyseStat(query) {
  return request({
    url: '/dataAnalyse/afterEightHourAnalyseStat',
    method: 'get',
    params: query
  })
}

