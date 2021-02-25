import request from '@/utils/request'

/**
 * 概要统计
 * @param {Object} query
 */
export function generalStat(query) {
  return request({
    url: '/main/generalStat',
    method: 'get',
    params: query
  })
}
