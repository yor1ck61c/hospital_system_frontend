import request from '@/utils/get-resource-req'

export function getItemNameList() {
  return request({
    url: '/bio_feature/name_list',
    method: 'get'
  })
}

export function saveBioFeatureInfo(data) {
  return request({
    url: '/bio_feature/save',
    method: 'patch',
    data: JSON.stringify(data)
  })
}

export function getCombinedBioFeatureData(data) {
  return request({
    url: '/bio_feature/combined_bio_feature_data',
    method: 'post',
    data: JSON.stringify(data)
  })
}

export function getCombinedBioFeatureItemNameList() {
  return request({
    url: '/bio_feature/combined_bio_feature_name_list',
    method: 'get'
  })
}

export function getItemNameTableData() {
  return request({
    url: '/bio_feature/single_list',
    method: 'get'
  })
}

export function addItem(data) {
  return request({
    url: '/bio_feature/insert',
    method: 'post',
    data: JSON.stringify(data)
  })
}

export function deleteItem(data) {
  return request({
    url: '/bio_feature/delete',
    method: 'delete',
    data: JSON.stringify(data)
  })
}
