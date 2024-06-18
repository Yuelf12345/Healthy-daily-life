import request from '../utils/request'

//登录接口
export function apiLogin(data) {
    return request({
        url: '/api/login',
        method: 'post',
        data
    })
}
//注册接口
export function apiRegister(data) {
    return request({
        url: '/api/register',
        method: 'post',
        data
    })
}
//获取用户信息接口
export function apiUserInfo(data) {
    return request({
        url: '/api/userInfo',
        method: 'post',
        data
    })
}
//用户信息修改接口
export function apiUserEdit(data) {
    return request({
        url: '/api/userEdit',
        method: 'post',
        data
    })
}
//修改用户头像接口
export function apiUploadAvatar(data) {
    return request({
        url: '/api/uploadAvatar',
        method: 'post',
        data,
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
}
