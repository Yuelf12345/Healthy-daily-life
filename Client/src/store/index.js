import { createPinia, defineStore } from 'pinia'
import { apiLogin, apiRegister, apiUserEdit, apiUserInfo } from "../api/user";
import { apiRecordWeight, apiWeightRecords,apiWeightEdit , apiWeightDel } from "../api/weight";
import router from '../router'
import { ElMessage } from "element-plus";

export const UserStore = defineStore('user', {
    state: () => ({
        userInfo: {
            id: '',
            username: '',
            password: '',
            age: null,
            gender: null,
            createdAt: '',
            updatedAt: '',
            token: '',
        },
        weight: {
            weightData: [],// 体重记录
            weightTotal: 0,
            recentWeightData: [], //最近体重记录
        }
    }),
    getters: {
        user: (state) => state
    },
    actions: {
        // 登录
        async login(query) {
            try {
                const res = await apiLogin(query)
                this.userInfo = res.data
                console.log('登录返回信息:', res);
                ElMessage.success(`欢迎登录 ${this.userInfo.username}`)
                router.push('/')
                localStorage.setItem('u_id', res.data.id)
                localStorage.setItem('token', res.data.token)
                return res
            } catch (error) {
                console.log('登录失败:', error);
            }
        },
        // 注册
        async register(query) {
            try {
                let res = await apiRegister(query)
                this.userInfo = res.data
                console.log('注册返回信息:', res);
                ElMessage.success('注册成功,请登录')
                return res
            } catch (error) {
                console.log('登录失败:', error);
            }
        },
        // 获取用户信息
        async userGetInfo(query) {
            const res = await apiUserInfo({ id: query })
            this.userInfo = res.data
            return res
        },
        // 修改用户信息
        async userEdit(query) {
            try {
                query.id = this.userInfo.id
                let res = await apiUserEdit(query)
                if (query.username != this.userInfo.username || query.password != this.userInfo.password) {
                    ElMessage.success('修改成功 请重新登录')
                    this.logout()
                } else {
                    ElMessage.success('修改成功')
                }
                console.log('用户信息修改返回信息:', res);
                return res
            } catch (error) {
                console.log('修改失败:', error);
            }
        },
        // 退出
        async logout() {
            this.userInfo = {
                id: '',
                username: '',
                password: '',
                age: null,
                gender: null,
                createdAt: '',
                updatedAt: '',
                token: '',
            }
            router.push('/login')
            localStorage.removeItem('u_id')
            localStorage.removeItem('token')
        },

        // 记录体重
        async recordWeight({ weight, targetWeight }) {
            const query = {
                userId: this.userInfo.id,
                weight,
                targetWeight
            }
            const res = await apiRecordWeight(query).then(() => {
                this.weightRecords()
                this.recentWeightRecords()
            })
            console.log('上传体重记录接口返回', res);

        },
        // 获取测量体重记录
        async weightRecords(query = {}) {
            const defaultQuery = {
                userId: this.userInfo.id,
                limit: 10,
                page: 1,
                startTime: null,
                endTime: null
            };
            query = { ...defaultQuery, ...query };
            const res = await apiWeightRecords(query)
            console.log('获取测量体重记录接口返回', res);
            this.weight.weightData = res.data.list || null
            this.weight.weightTotal = res.data.total || 0
        },
        // 获取最近10条体重记录
        async recentWeightRecords() {
            const query = {
                userId: this.userInfo.id,
                limit: 6,
                page: 1,
                startTime: null,
                endTime: null
            };
            const res = await apiWeightRecords(query)
            console.log('获取测量体重记录接口返回', res);
            this.weight.recentWeightData = res.data.list || null
        },
        async weightEdit(query) {
            const res = await apiWeightEdit(query).then(() => {
                this.weightRecords()
                this.recentWeightRecords()
            })
            console.log('修改体重记录接口返回', res);
            return res
        },
        async weightDel(params) {
            const res = await apiWeightDel(params).then(() => {
                this.weightRecords()
                this.recentWeightRecords()
            })
            console.log('删除体重记录接口返回', res);
            return res
        }
    }
})


const pinia = createPinia();

export default pinia