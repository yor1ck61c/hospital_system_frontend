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
