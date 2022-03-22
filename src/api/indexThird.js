import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/server/post',
    method: 'post',
    data
  })
}
