import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/sportExercise/getData',
    method: 'get',
    params: query
  })
}

export function getSportExercise(id) {
  return request({
    url: '/sportExercise/get',
    method: 'get',
    params: { id }
  })
}

export function getSportExerciseByMultiStat(query) {
  return request({
    url: '/sportExercise/getByMultiStat',
    method: 'get',
    params: query
  })
}

export function createSportExercise(data) {
  return request({
    url: '/sportExercise/create',
    method: 'post',
    data
  })
}

export function createSportExerciseByTemplate(data) {
  return request({
    url: '/sportExercise/createByTemplate',
    method: 'post',
    data
  })
}


export function updateSportExercise(data) {
  return request({
    url: '/sportExercise/edit',
    method: 'post',
    data
  })
}

export function deleteSportExercise(ids) {
  const data = {
      ids
  }
  return request({
    url: '/sportExercise/delete',
    method: 'post',
    data
  })
}

export function getSportExerciseMultiStat(query) {
  return request({
    url: '/sportExercise/multiStat',
    method: 'get',
    params: query
  })
}

export function refreshSportExerciseMaxStat(query) {
  return request({
    url: '/sportExercise/refreshMaxStat',
    method: 'get',
    params: query
  })
}

export function getSportExerciseAchieveMilestones(query) {
  return request({
    url: '/sportExercise/getAchieveMilestones',
    method: 'get',
    params: query
  })
}

export function getSportExerciseNextAchieveMilestone(query) {
  return request({
    url: '/sportExercise/getNextAchieveMilestone',
    method: 'get',
    params: query
  })
}

export function getSportExerciseDateStat(query) {
  return request({
    url: '/sportExercise/dateStat',
    method: 'get',
    params: query
  })
}

export function getSportExerciseYoyStat(query) {
  return request({
    url: '/sportExercise/yoyStat',
    method: 'get',
    params: query
  })
}

