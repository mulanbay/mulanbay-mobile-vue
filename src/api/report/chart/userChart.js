import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/userChart/getData',
    method: 'get',
    params: query
  })
}

export function getUserChart(id) {
  return request({
    url: '/userChart/get',
    method: 'get',
    params: { id }
  })
}

export function getShowIndexChart(index) {
  return request({
    url: '/userChart/getShowIndexChart',
    method: 'get',
    params: { index }
  })
}

export function createUserChart(data) {
  return request({
    url: '/userChart/create',
    method: 'post',
    data
  })
}

export function updateUserChart(data) {
  return request({
    url: '/userChart/edit',
    method: 'post',
    data
  })
}
export function deleteUserChart(ids) {
  const data = {
      ids
  }
  return request({
    url: '/userChart/delete',
    method: 'post',
    data
  })
}

export function getUserChartTree(needRoot,relatedBeans) {
  return request({
    url: '/userChart/getUserChartTree',
    method: 'get',
    params: {
      needRoot:needRoot,
      relatedBeans:relatedBeans
    }
  })
}

export function getChartPara(userChartId) {
  return request({
    url: '/userChart/getChartPara',
    method: 'get',
    params: { userChartId }
  })
}

export function statChart(url,para) {
  return request({
    url: url,
    method: 'get',
    params: para
  })
}
