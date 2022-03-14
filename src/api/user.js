import request from '@/utils/login-request'
import no_cookies_request from '@/utils/no-cookie-req'

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

export function register(data) {
  return no_cookies_request({
    url: '/user/register',
    method: 'put',
    data: JSON.stringify(data)
  })
}

export function getAccountInfoList() {
  return request({
    url: '/user/list',
    method: 'get'
  })
}

export function generateHospitalNameList() {
  return request({
    url: '/user/hospital_list',
    method: 'get'
  })
}

export function handleUpdate(data) {
  return request({
    url: '/user/update',
    method: 'put',
    data: JSON.stringify(data)
  })
}
