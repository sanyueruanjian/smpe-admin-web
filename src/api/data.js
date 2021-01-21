import request from '@/utils/request'
import qs from 'qs'

export function initData(url, params) {
  return request({
    url: url + '?' + qs.stringify(params, { indices: false }),
    method: 'get'
  })
}

export function download(url, params) {
  console.log(url, '2')
  // console.log(params,"2")
  return request({
    url: url + '?' + qs.stringify(params, { indices: false }),
    method: 'get',
    responseType: 'blob'
  })
}
