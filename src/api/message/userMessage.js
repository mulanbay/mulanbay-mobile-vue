import request from '@/utils/request'

// 获取列表
export function getMyList(query) {
  return request({
    url: '/userMessage/getMyList',
    method: 'get',
    params: query
  })
}

export function deleteUserMessage(ids) {
  const data = {
      ids
  }
  return request({
    url: '/userMessage/delete',
    method: 'post',
    data
  })
}

export function resendUserMessage(id) {
  return request({
    url: '/userMessage/resend',
    method: 'get',
    params: { id }
  })
}

export function getUserMessageByUser(id) {
  return request({
    url: '/userMessage/getByUser',
    method: 'get',
    params: { id }
  })
}