// 封装axios
import axios from 'axios'
import { ElMessage } from "element-plus";
import { UserStore } from "../store";
let userStore = null
const service = axios.create({
    baseURL: '/',
    timeout: 1000 * 60 * 60,   // 请求超时时间
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})

// 请求拦截
service.interceptors.request.use(
    config => {
        config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token'); // Token认证
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)
// 响应拦截
service.interceptors.response.use(
    async response => {
        if (userStore === null) {
            userStore = UserStore()
        }
        const { code, msg } = response.data

        console.log('code', code);
        if (code == 401) {
            userStore.logout()
            ElMessage({
                message: msg,
                type: 'error',
            })
        }
        if (code !== 200) {
            ElMessage({
                message: msg,
                type: 'error',
            })
            return Promise.reject(new Error(msg || 'Error'))
        }
        return response.data
    },
    error => {
        return Promise.reject(error)
    })

export default service