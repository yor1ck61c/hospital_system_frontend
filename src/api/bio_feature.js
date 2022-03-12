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

