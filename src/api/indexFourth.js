import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/webServer/onTimeMonitor',
    method: 'post',
    data
  })
}
export function getByqNumber(data) {
    return request({
      url: '/webServer/getByqNumber',
      method: 'post',
      data
    })
  } 