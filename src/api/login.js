import request from '@/utils/request'

export function login(username, password, code, uuid) {
  return request({
    url: 'api/login',
    method: 'post',
    data: {
      username,
      password,
      code,
      uuid
    }
  })
}

export function getInfo() {
  return request({
    url: 'api/info',
    method: 'get'
  })
}

export function getCodeImg() {
  return request({
    url: 'api/code',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: 'api/logout',
    method: 'delete'
  })
}
