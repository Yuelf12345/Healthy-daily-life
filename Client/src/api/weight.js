import request from '../utils/request'

//记录体重
export function apiRecordWeight(data) {
    return request({
        url: '/api/recordWeight',
        method: 'post',
        data
    })
}
//获取体重记录
export function apiWeightRecords(data) {
    return request({
        url: '/api/weightRecords',
        method: 'post',
        data
    })
}
//修改体重记录
export function apiWeightEdit(data) {
    return request({
        url: '/api/weightEdit',
        method: 'post',
        data
    })
}
//删除体重记录
export function apiWeightDel(params) {
    return request({
        url: '/api/weightDel',
        method: 'delete',
        params
    })
}