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