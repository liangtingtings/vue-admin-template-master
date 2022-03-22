import request from '@/utils/request'

export function getAllList(data) { 
  return request({
    url: '/server/post',
    method: 'post',
    data
  })
}
