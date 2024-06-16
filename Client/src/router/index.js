
import { createRouter, createWebHistory } from "vue-router";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { UserStore } from "../store";
let userStore = null
export const constantRoutes = [
    {
        path: "/",
        component: () => import('../views/layout.vue'),
        redirect: "/home",
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('../views/home.vue'),
                meta: {
                    requiresAuth: true,
                },
            },
            {
                path: '/user',
                name: 'user',
                component: () => import('../views/user.vue'),
                meta: {
                    requiresAuth: true,
                },
            },
            {
                path: '/table',
                name: 'table',
                component: () => import('../views/table.vue'),
                meta: {
                    requiresAuth: true,
                },
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login.vue'),
    },
    {
        path: '/test',
        name: 'test',
        component: () => import('../views/test.vue'),
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes
})

let whiteList = ["/login", "/404"];
router.beforeEach(async (to, from, next) => {
    if(from.path !== '/home'){
        //进度条开始
        NProgress.start()
    }
    if (userStore === null) {
        userStore = UserStore()
    }
    let token = localStorage.getItem("u_id");
    // 白名单
    console.log('to.path', to.path, from.path);
    if (whiteList.indexOf(to.path) !== -1 || from.path == "/login") {
        NProgress.done()
        next();
        return;
    } else {
        // 未登录
        if (!token) {
            NProgress.done()
            next("/login");
            return;
        } else {
            // 获取用户信息
            let uID = localStorage.getItem('u_id')
            await userStore.userGetInfo(uID)
        }
    }
    NProgress.done()
    next();
})

export default router