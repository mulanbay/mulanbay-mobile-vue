import request from '@/utils/request'

/**
 * 获取枚举参数
 * @param {Object} enumClass
 * @param {Object} idType
 * @param {Object} needRoot
 */
export function getEnumTree(enumClass,idType,needRoot) {
  return request({
    url: '/common/getEnumTree',
    method: 'get',
    params: {
      enumClass:enumClass,
      idType:idType,
      needRoot:needRoot
    }
  })
}

export function getDictItemTree(code,needRoot) {
  return request({
    url: '/dictItem/getDictItemTree',
    method: 'get',
    params: {
      code:code,
      needRoot:needRoot,
      status:'ENABLE'
    }
  })
}

export function getYearTree(needRoot) {
  return request({
    url: '/common/getYearTree',
    method: 'get',
    params: {
      needRoot:needRoot
    }
  })
}

export function getBussTypeTree(needRoot) {
  return request({
    url: '/common/getBussTypeTree',
    method: 'get',
    params: {
      needRoot:needRoot
    }
  })
}

export function getEnumClassNamesTree(needRoot) {
  return request({
    url: '/common/getEnumClassNamesTree',
    method: 'get',
    params: {
      needRoot:needRoot
    }
  })
}

export function getAllProvince() {
  return request({
    url: '/province/getAll',
    method: 'get'
  })
}

export function getCityList(provinceId) {
  return request({
    url: '/city/getCityList',
    method: 'get',
    params: {
      provinceId:provinceId
    }
  })
}

export function getDistrictList(cityId) {
  return request({
    url: '/district/getDistrictList',
    method: 'get',
    params: {
      cityId:cityId
    }
  })
}