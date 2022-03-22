import request from '@/utils/request'

export function getAllList(data) { 
  return request({
    url: '/webServer/index',
    method: 'post',
    data
  })
}
