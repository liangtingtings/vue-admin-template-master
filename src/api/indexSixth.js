import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/webServer/workOrderList',
    method: 'post',
    data
  })
}
export function getDetail(data) {
    return request({
      url: '/webServer/workOrderDetail',
      method: 'post',
      data
    })
  }
  export function homework(data) {
    return request({
      url: '/webServer/homework',
      method: 'post',
      data
    })
  } 
  export function IsAdopt(data) {
    return request({
      url: '/webServer/IsAdopt',
      method: 'post',
      data
    })
  }  

  export function gettrack(data) {
    return request({
      url: '/webServer/track',
      method: 'post',
      data
    })
  }   
  export function getisEnd(data) {
    return request({
      url: '/webServer/isEnd',
      method: 'post',
      data
    })
  }    
  export function signComplete(data) {
    return request({
      url: '/webServer/signComplete',
      method: 'post',
      data
    })
  }   