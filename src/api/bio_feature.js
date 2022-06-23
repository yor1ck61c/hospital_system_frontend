import request from '@/utils/get-resource-req'

export function getItemNameList() {
  return request({
    url: '/bio_feature/single_item_name_list',
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

export function getCombinedItemNameTableData() {
  return request({
    url: '/bio_feature/combined_list',
    method: 'get'
  })
}

export function deleteCombinedItem(data) {
  return request({
    url: '/bio_feature/delete_combined',
    method: 'delete',
    data: JSON.stringify(data)
  })
}

export function addCombinedItem(data) {
  return request({
    url: '/bio_feature/add_combined',
    method: 'post',
    data: JSON.stringify(data)
  })
}

export function saveValueCacheByYear(data) {
  return request({
    url: '/bio_feature/save_single_cache',
    method: 'post',
    data: JSON.stringify(data)
  })
}

export function getValueTableData(data) {
  return request({
    url: '/bio_feature/value',
    method: 'post',
    data: JSON.stringify(data)
  })
}

export function getValueCacheTableData(data) {
  return request({
    url: '/bio_feature/value_cache',
    method: 'post',
    data: JSON.stringify(data)
  })
}

export function deleteValueCache(data) {
  return request({
    url: '/bio_feature/value_cache',
    method: 'delete',
    data: JSON.stringify(data)
  })
}

export function generateOtherHospitalData(userId) {
  return request({
    url: '/bio_feature/other_hospital_info',
    method: 'post',
    data: JSON.stringify(userId)
  })
}

export function commitValueCache(data) {
  return request({
    url: '/bio_feature/commit_cache',
    method: 'post',
    data: JSON.stringify(data)
  })
}

export function updateValueByYear(data) {
  return request({
    url: '/bio_feature/update_value',
    method: 'post',
    data: JSON.stringify(data)
  })
}

export function deleteValue(data) {
  return request({
    url: '/bio_feature/delete_value',
    method: 'delete',
    data: JSON.stringify(data)
  })
}

export function getSingleItemData(data) {
  return request({
    url: '/bio_feature/single_item',
    method: 'post',
    data: JSON.stringify(data)
  })
}

// 批量提交缓存数据
export function batchCommitValueCacheByHospitalName(data) {
  return request({
    url: '/bio_feature/batch_commit_cache',
    method: 'post',
    data: JSON.stringify(data)
  })
}
