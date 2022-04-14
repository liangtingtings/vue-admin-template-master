import request from '@/utils/request'

export function trendList(data) {
  return request({
    url: '/webServer/trend',
    method: 'post',
    data
  })
}

export function getInitTrendList(data) {
  return request({
    url: '/webServer/InitTrend',
    method: 'post',
    data
  })
}
export function getselectTrendList(data) {
  return request({
    url: '/webServer/selectTrend',
    method: 'post',
    data
  })
}

export function getselectTrendTableList(data) {
  return request({
    url: '/webServer/selectTrendTable',
    method: 'post',
    data
  })
}

export function getstartStop(data) {
  return request({
    url: '/webServer/startStop',
    method: 'post',
    data
  })
}


export function getInitStartStop(data) {
  return request({
    url: '/webServer/InitStartStop',
    method: 'post',
    data
  })
}
