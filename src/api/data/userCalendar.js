import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/userCalendar/getData',
    method: 'get',
    params: query
  })
}

export function getList(query) {
  return request({
    url: '/userCalendar/getList',
    method: 'get',
    params: query
  })
}

export function dailyCount() {
  return request({
    url: '/userCalendar/dailyCount',
    method: 'get'
  })
}


export function getUserCalendar(id) {
  return request({
    url: '/userCalendar/get',
    method: 'get',
    params: { id }
  })
}

export function getUserCalendarBySource(sourceType,sourceId) {
  return request({
    url: '/userCalendar/getBySource',
    method: 'get',
    params: { sourceType,sourceId }
  })
}

export function getUserCalendarSource(id) {
  return request({
    url: '/userCalendar/getSource',
    method: 'get',
    params: { id }
  })
}

export function createUserCalendar(data) {
  return request({
    url: '/userCalendar/create',
    method: 'post',
    data
  })
}

//日历插件使用
export function createUserCalendar2(data) {
  return request({
    url: '/userCalendar/create2',
    method: 'post',
    data
  })
}

//日历插件使用
export function updateUserCalendar(data) {
  return request({
    url: '/userCalendar/update',
    method: 'post',
    data
  })
}

//这个是比较正常更新
export function editUserCalendar(data) {
  return request({
    url: '/userCalendar/edit',
    method: 'post',
    data
  })
}

export function deleteUserCalendar(ids) {
  const data = {
      ids
  }
  return request({
    url: '/userCalendar/delete',
    method: 'post',
    data
  })
}

//发送给我
export function sendCalendarMessage(data) {
  return request({
    url: '/userCalendar/sendCalendarMessage',
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

export function finishUserCalendar(id) {
  const data = {
      id
  }
  return request({
    url: '/userCalendar/finish',
    method: 'post',
    data
  })
}

export function reOpenUserCalendar(id) {
  const data = {
      id
  }
  return request({
    url: '/userCalendar/reOpen',
    method: 'post',
    data
  })
}