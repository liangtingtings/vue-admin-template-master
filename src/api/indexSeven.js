import request from '@/utils/request'

export function getpersonThresholdList(data) {
  return request({
    url: '/webServer/personThresholdList',
    method: 'post',
    data
  })
}

export function getpersonThresholdDetail(data) {
  return request({
    url: '/webServer/personThresholdDetail',
    method: 'post',
    data
  })
}
export function personThresholdSave(data) {
  return request({
    url: '/webServer/personThresholdSave',
    method: 'post',
    data
  })
}
export function commonThresholdList(data) {
  return request({
    url: '/webServer/commonThresholdList',
    method: 'post',
    data
  })
}

export function commonThresholdDetail(data,type) {
  return request({
    url: type==1?'/webServer/commonThresholdDetail':'/webServer/otherThresholdDetail',
    method: 'post',
    data
  })
}
 
export function commonThresholdSave(data,type) {
  return request({
    url: type == 1?'/webServer/commonThresholdSave':'/webServer/otherThresholdSave',
    method: 'post',
    data
  })
}

export function otherThresholdList(data,type) {
  return request({
    url:'/webServer/otherThresholdList',
    method: 'post',
    data
  })
} 
 
