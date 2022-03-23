import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/webServer/alarmList',
    method: 'post',
    data
  })
}
export function getDetail(data) {
  return request({
    url: '/webServer/alarmDetails',
    method: 'post',
    data
  })
}

export function getCreateDetail(data) {
  return request({
    url: '/webServer/gongdanCreate',
    method: 'post',
    data
  })
}
export function gongdanConfirm(data) {
  return request({
    url: '/webServer/gongdanConfirm',
    method: 'post',
    data
  })
} 
export function alarmShield(data) {
  return request({
    url: '/webServer/alarmShield',
    method: 'post',
    data
  })
}  