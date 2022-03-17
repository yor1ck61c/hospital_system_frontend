import request from '@/utils/get-resource-req'

export function addCenter(data) {
  return request({
    url: '/center/add',
    method: 'post',
    data: JSON.stringify(data)
  })
}

export function saveTempGrand(data) {
  return request({
    url: '/center/grand',
    method: 'post',
    data: JSON.stringify(data)
  })
}

export function updateCenter(data) {
  return request({
    url: '/center/update',
    method: 'post',
    data: JSON.stringify(data)
  })
}

export function getCenterTableData() {
  return request({
    url: '/center/list',
    method: 'get'
  })
}

export function getViceCenterName(data) {
  return request({
    url: '/center/vice_center',
    method: 'post',
    data: JSON.stringify(data)
  })
}

export function deleteCenter(data) {
  return request({
    url: '/center/delete',
    method: 'delete',
    data: JSON.stringify(data)
  })
}

export function deleteTempAuth(data) {
  return request({
    url: '/center/delete_temp',
    method: 'delete',
    data: JSON.stringify(data)
  })
}

export function generateHospitalTableData(data) {
  return request({
    url: '/center/list_by_id',
    method: 'post',
    data: JSON.stringify(data)
  })
}

export function generateTempAuthTableData(data) {
  return request({
    url: '/center/temp_list',
    method: 'post',
    data: JSON.stringify(data)
  })
}
