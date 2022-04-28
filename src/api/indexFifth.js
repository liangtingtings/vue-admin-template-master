import request from '@/utils/request'

export function initHistoryData(data) { 
  return request({
    url: '/webServer/initHistoryData',
    method: 'post',
    data
  })
}

export function formLoad(data) { 
    return request({
      url: '/webServer/formLoad',
      method: 'post',
      data
    })
  } 

  export function downLoaddcbb(type) { 
    return request({
      url: type == 'date'?'/webServer/dcbbday':'/webServer/dcbb',
      method: 'post', 
    })
  } 
 