<template>
    <div class="container">
        <div class="nav">
            <el-avatar class="nav-logo" shape="square" :size="65" :src="logo" />
            <div class="nav-bar">
                <div class="nav-item" :class="{ active: isActive === 0 }" @click="select(0, '/home')">
                    <div class="hoverindicator">
                        <div class="nav-icon">
                            <svg t="1701352100009" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                p-id="838">
                                <path
                                    d="M523.12 202.56a16 16 0 0 0-22.12 0L132.8 554.3a16 16 0 0 0-4.94 11.58L127.8 896a64 64 0 0 0 64 64H384a32 32 0 0 0 32-32V656a16 16 0 0 1 16-16h160a16 16 0 0 1 16 16v272a32 32 0 0 0 32 32h192.12a64 64 0 0 0 64-64V565.88a16 16 0 0 0-4.94-11.58z"
                                    fill="#000000" p-id="839"></path>
                                <path
                                    d="M981.82 488.3l-149.6-143.12V128a32 32 0 0 0-32-32h-96a32 32 0 0 0-32 32v64l-115.84-110.76C545.54 70.28 529.42 64 512 64c-17.36 0-33.44 6.28-44.28 17.26l-425.4 407c-12.44 12-14 31.74-2.68 44.74A32 32 0 0 0 86 535.12L501 138.56a16 16 0 0 1 22.12 0l415.04 396.56a32 32 0 0 0 45.18-0.88c12.28-12.72 11.26-33.72-1.52-45.94z"
                                    fill="#000000" p-id="840"></path>
                            </svg>
                        </div>
                    </div>

                </div>
                <div class="nav-item" :class="{ active: isActive === 1 }" @click="select(1, '/user')">
                    <div class="hoverindicator">
                        <div class="nav-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" class="ionicon s-ion-icon" viewBox="0 0 512 512">
                                <title>Person</title>
                                <path
                                    d="M332.64 64.58C313.18 43.57 286 32 256 32c-30.16 0-57.43 11.5-76.8 32.38-19.58 21.11-29.12 49.8-26.88 80.78C156.76 206.28 203.27 256 256 256s99.16-49.71 103.67-110.82c2.27-30.7-7.33-59.33-27.03-80.6zM432 480H80a31 31 0 01-24.2-11.13c-6.5-7.77-9.12-18.38-7.18-29.11C57.06 392.94 83.4 353.61 124.8 326c36.78-24.51 83.37-38 131.2-38s94.42 13.5 131.2 38c41.4 27.6 67.74 66.93 76.18 113.75 1.94 10.73-.68 21.34-7.18 29.11A31 31 0 01432 480z">
                                </path>
                            </svg>
                        </div>
                    </div>

                </div>
                <div class="nav-item" :class="{ active: isActive === 2 }" @click="select(2, '/table')">
                    <div class="hoverindicator">
                        <div class="nav-icon">
                            <svg t="1718509475026" class="ionicon s-ion-icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="9675">
                                <path
                                    d="M341.333333 640H42.666667V426.666667h298.666666z m341.333334 42.666667v256h245.333333a53.393333 53.393333 0 0 0 53.333333-53.333334v-202.666666z m0-42.666667h298.666666V426.666667h-298.666666z m298.666666-256V181.333333a53.393333 53.393333 0 0 0-53.333333-53.333333H96a53.393333 53.393333 0 0 0-53.333333 53.333333v202.666667z m-640 298.666667H42.666667v202.666666a53.393333 53.393333 0 0 0 53.333333 53.333334h245.333333z m42.666667 256h256v-256H384z m0-298.666667h256V426.666667H384z"
                                    fill="#000000" p-id="9676"></path>
                            </svg>
                        </div>
                    </div>

                </div>
            </div>
            <div class="nav-exit" @click="logout">
                <svg class="nav-icon" style="vertical-align: middle;fill: #000;overflow: hidden;" viewBox="0 0 1024 1024"
                    version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6861">
                    <path
                        d="M731.428571 219.428571h54.857143a18.285714 18.285714 0 0 1 18.285715 18.285715v548.571428a18.285714 18.285714 0 0 1-18.285715 18.285715h-54.857143a73.142857 73.142857 0 0 0-73.142857 73.142857v73.142857a73.142857 73.142857 0 0 0 73.142857 73.142857h182.857143a109.714286 109.714286 0 0 0 109.714286-109.714286V109.714286a109.714286 109.714286 0 0 0-109.714286-109.714286H731.428571a73.142857 73.142857 0 0 0-73.142857 73.142857v73.142857a73.142857 73.142857 0 0 0 73.142857 73.142857z"
                        fill="#333333" p-id="6862"></path>
                    <path
                        d="M364.068571 384h280.32a73.142857 73.142857 0 0 1 73.142858 73.142857v109.714286a73.142857 73.142857 0 0 1-73.142858 73.142857H364.068571a18.285714 18.285714 0 0 0-18.285714 18.285714v85.577143a36.571429 36.571429 0 0 1-60.16 27.794286L12.8 539.794286a36.571429 36.571429 0 0 1 0-54.857143L285.622857 252.342857a36.571429 36.571429 0 0 1 60.16 27.794286V365.714286a18.285714 18.285714 0 0 0 18.285714 18.285714z"
                        fill="#333333" p-id="6863"></path>
                </svg>
            </div>
        </div>
        <div class="main">
            <div class="main-header">
                <div style="flex:1;display: flex;">
                    <div class="user-avatar">
                        <el-avatar style="transform: rotate(-27deg);" :size="50" :src="avatar" />
                    </div>
                    <div class="user-info">
                        <div class="user-name">
                            <span>{{ userInfo.username }}</span>
                        </div>
                        <div class="user-status">
                            <span>上次登录时间: {{ new Date(userInfo.updatedAt).toLocaleString() }}</span>
                        </div>
                    </div>
                </div>
                <div class="greeting">
                    <h2>{{ judgeTimeOfDay }} Champ!</h2>
                    <p v-if="judgeTimeOfDay != 'Good Evening'">Time to seize the day 🌞</p>
                    <p v-else>Late at night, take a break early 🌙</p>
                </div>
            </div>
            <div class="main-body">
                <el-scrollbar height="60vh">
                    <router-view v-slot="{ Component }">
                        <keep-alive>
                            <component :is="Component" />
                        </keep-alive>
                    </router-view>
                </el-scrollbar>
            </div>
        </div>
    </div>
    <div class="record-weight">
        <el-button type="primary" circle style="width: 4rem;height: 4rem;" @click="onRecordWeight">
            <el-icon :size="40">
                <Edit />
            </el-icon>
        </el-button>
    </div>
    <el-dialog v-model="dialogVisible" title="记录体重" width="500" center>
        <el-form :model="form" label-width="auto">
            <el-form-item label="目标体重">
                <el-input v-model="form.targetWeight" placeholder="请输入您的目标体重" :disabled="!editTargetWeight">
                    <template #append>
                        <div>
                            <span>kg</span>
                            <el-button v-if="!editTargetWeight" :icon="Edit" @click="editTargetWeight = true"
                                style="margin-left: 1rem;" />
                        </div>
                    </template></el-input>
            </el-form-item>
            <el-form-item label="当前体重">
                <el-input v-model="form.weight" placeholder="请输入您的体重">
                    <template #append>kg</template></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" :loading="isLoading" :disabled="isLoading" @click="submit">
                    保存
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script setup>
import logo from "../assets/logo.png";
import { storeToRefs } from 'pinia'
import { ref, reactive, watch, computed } from 'vue';
import router from '../router'
import { useRoute } from 'vue-router';
const route = useRoute();
import { UserStore } from "../store";
import { ElMessage } from "element-plus";
import {
    Edit
} from '@element-plus/icons-vue'
import avatar from '../assets/avatar.webp'
const userStore = UserStore()
let { userInfo, weight } = storeToRefs(userStore)
const bgColor = ref('#fff');
const bgColors = ['#e4ecfa', '#fff6cc', '#f0e4fa'];
const isActive = ref(0);
bgColor.value = bgColors[0];
const currentPath = computed(() => route.path);
watch(currentPath, (newPath) => {
    switch (newPath) {
        case '/user':
            isActive.value = 1;
            bgColor.value = bgColors[1];
            break;
        case '/table':
            isActive.value = 2;
            bgColor.value = bgColors[2];
            break;
        default:
            isActive.value = 0;
            bgColor.value = bgColors[0];
            break;
    }
}, { immediate: true });

const select = (index, path) => {
    bgColor.value = bgColors[index];
    isActive.value = index;
    router.push({ path })
};
const logout = () => {
    userStore.logout().then(() => {
        ElMessage.success('退出成功')
    })
}

const editTargetWeight = ref(false)
const dialogVisible = ref(false)
const isLoading = ref(false)
console.log('weight', weight);
const form = reactive({
    weight: null,
    targetWeight: null
})
const onRecordWeight = () => {
    form.weight = null
    form.targetWeight = weight.value.recentWeightData[0]?.targetWeight || null
    dialogVisible.value = true
    editTargetWeight.value = false
}
const submit = () => {
    isLoading.value = true
    userStore.recordWeight(form).then(() => {
        ElMessage.success('记录成功')
        dialogVisible.value = false
        isLoading.value = false
    })
}

const judgeTimeOfDay = computed(() => {
    const now = new Date();
    const hour = now.getHours(); // 获取当前小时数（0-23）
    if (hour >= 5 && hour < 12) {
        return "Good Morning";
    } else if (hour >= 12 && hour < 18) {
        return "Good Afternoon";
    } else if ((hour >= 18 && hour < 24) || (hour >= 0 && hour < 5)) {
        return "Good Evening";
    }
})
</script>
<style langs="scss" scoped>
.container {
    cursor: pointer;
    user-select: none;
    width: 90vw;
    height: 80vh;
    border-radius: 1rem;
    display: flex;
    overflow: hidden;
    /* background: #dfe9fb; */
    background: v-bind('bgColor');
    padding: 3rem 0 4rem 0;

    .nav {
        width: 4rem;
        display: flex;
        gap: 10%;
        flex-direction: column;
        background-color: #FFF;

        .nav-bar {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 10%;

            .nav-item {
                display: flex;

                & svg {
                    z-index: 1;
                }

                .nav-icon {
                    margin: 0.5rem;
                    width: 2rem;
                    height: 2rem;
                }
            }
        }

        .nav-exit {
            margin-bottom: 2rem;

            .nav-icon {
                margin-left: 0.5rem;
                width: 1.5rem;
                height: 1.5rem;
            }
        }
    }

    .main {
        flex: 1;
        min-width: 16rem;
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow-x: hidden;
        /* background-color: #dfe9fb; */
        background: v-bind('bgColor');

        .main-header {
            padding: 0 1rem 1rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            border-bottom: 1px solid #ce88ff;
            justify-content: space-between;

            /* background-color: v-bind('bgColor'); */
            .user-avatar {
                width: 3.5rem;
                height: 3.5rem;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 4px solid #5a4ae8;
                border-left-color: transparent;
                transform: rotate(27deg);
                overflow: hidden;
            }

            .greeting {
                font-size: 20px;

                p,
                h2 {
                    margin: 0 !important;
                    padding: 0 !important;
                }
            }

            .user-info {
                .user-name {
                    font-size: 25px;
                    font-weight: 600;
                }

                .user-status {
                    font-size: calc(25px * 0.618);
                    color: #5a4ae8;
                }
            }
        }

        .main-body {
            flex: 1;
            display: flex;
            flex-direction: column;
            padding: 1rem 1rem 0 1rem;
        }
    }

    .chats {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
}

.record-weight {
    position: fixed;
    bottom: 10%;
    right: 10%;
    z-index: 999;
}

@media (hover: hover) {
    .nav-item:not(.active):hover .hoverindicator {
        opacity: 1;
        background-color: v-bind('bgColor');
        border-radius: 0.5rem;
        width: 3rem;
        transition: opacity 150ms ease;
    }
}

.hoverindicator {
    width: 3rem;
    height: 3rem;
    inset: 25% auto -25% 0%;
    transition: inset 300ms ease, opacity 300ms ease;
    opacity: 1;
    background: transparent;
}

.active .hoverindicator {
    background: v-bind('bgColor');
    opacity: 1;
    border-radius: 0.5rem;
    width: 0.3rem;
    inset: auto auto -25% -25%;
    transition: inset 300ms ease, width 300ms ease, border-radius 300ms ease;
}
</style>