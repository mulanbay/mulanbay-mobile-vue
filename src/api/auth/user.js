// axios
import request from '@/utils/request'

// 获取用户详细信息
export function getProfile() {
  return request({
    url: '/user/getProfile',
    method: 'get'
  })
}

export function editProfile(data) {
  return request({
    url: '/user/editProfile',
    method: 'post',
    data: data
  })
}

//获取用户评分(和上一天的比对)
export function getScoreCompare(query) {
  return request({
    url: '/user/getScoreCompare',
    method: 'get',
    params: query
  })
}

export function getUserResidentCity() {
  return request({
    url: '/user/getResidentCity',
    method: 'get'
  })
}
