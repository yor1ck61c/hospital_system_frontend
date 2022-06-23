import request from '@/utils/get-resource-req'

export function countSingleItem(data) {
  return request({
    url: '/data_analyze/count_single',
    method: 'post',
    data: JSON.stringify(data)
  })
}

export function countCombinedItem(data) {
  return request({
    url: '/data_analyze/count_combined',
    method: 'post',
    data: JSON.stringify(data)
  })
}

export function compareSingle(data) {
  return request({
    url: '/data_analyze/compare_single',
    method: 'post',
    data: JSON.stringify(data)
  })
}

export function compareCombined(data) {
  return request({
    url: '/data_analyze/compare_combined',
    method: 'post',
    data: JSON.stringify(data)
  })
}

// 对单个数据排行
export function rankSingle(data) {
  return request({
    url: '/data_analyze/rank_single',
    method: 'post',
    data: JSON.stringify(data)
  })
}

// 对组合数据排行
export function rankCombined(data) {
  return request({
    url: '/data_analyze/rank_combined',
    method: 'post',
    data: JSON.stringify(data)
  })
}

// 获取组合指标类型
export function getTypeList() {
  return request({
    url: '/data_analyze/get_combined_type',
    method: 'get'
  })
}

// 根据组合指标类型id获取组合指标名称列表
export function getCombinedItemNameList(data) {
  return request({
    url: '/data_analyze/get_combined_item_by_type_id',
    method: 'post',
    data: JSON.stringify(data)
  })
}

// 根据类型获取比较对象列表
export function getCombinedItemCompareObj(data) {
  return request({
    url: '/data_analyze/get_combined_item_compare_obj',
    method: 'post',
    data: JSON.stringify(data)
  })
}
