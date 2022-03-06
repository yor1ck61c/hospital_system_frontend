import request from '@/utils/request'

export function myLogin(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data: JSON.stringify(data)
  })
}

export function myGetUserInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

export function myLogout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
