import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/treatDrug/getData',
    method: 'get',
    params: query
  })
}


export function getTreatDrug(id) {
  return request({
    url: '/treatDrug/get',
    method: 'get',
    params: { id }
  })
}

export function getLastTreatDrug(name) {
  return request({
    url: '/treatDrug/getLastTreatDrug',
    method: 'get',
    params: { name }
  })
}

export function createTreatDrug(data) {
  return request({
    url: '/treatDrug/create',
    method: 'post',
    data
  })
}

export function updateTreatDrug(data) {
  return request({
    url: '/treatDrug/edit',
    method: 'post',
    data
  })
}
export function deleteTreatDrug(ids) {
  const data = {
      ids
  }
  return request({
    url: '/treatDrug/delete',
    method: 'post',
    data
  })
}


export function getTreatDrugCategoryTree(groupField,needRoot) {
  return request({
    url: '/treatDrug/getTreatDrugCategoryTree',
    method: 'get',
    params: {
      groupField:groupField,
      needRoot:needRoot
    }
  })
}

