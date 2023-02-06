import request from '@/utils/request'

// 获取字典选择框列表
export function optionselect() {
  return request({
    url: '/dict/type/optionselect',
    method: 'get'
  })
}
