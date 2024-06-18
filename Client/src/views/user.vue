<template>
    <p class="title">
        个人中心
    </p>
    <div class="body">
        <div>
            <el-avatar shape="circle" :size="100" :src="userInfo.avatar" />
            <el-upload ref="upload" action="#" :show-file-list="false" accept=".jpg, .jpeg, .png, .gif .webp .svg"
                :http-request="onUploadAvatar">
                <template #trigger>
                    <div class="upload-btn --el-box-shadow-light">
                        <el-icon :size="20" color="#000">
                            <Edit />
                        </el-icon>
                    </div>
                </template>
            </el-upload>
        </div>
        <el-form class="mainForm" :model="form" label-width="auto" style="max-width: 600px" :disabled="!isEdit">
            <el-form-item label="账号">
                <el-input v-model="form.username" />
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password" type="password" placeholder="请输入密码" show-password />
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="form.gender">
                    <el-radio :value="0">男</el-radio>
                    <el-radio :value="1">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="年龄">
                <el-input-number v-model="form.age" :min="1" :max="100" />
            </el-form-item>
        </el-form>
    </div>
    <div class="formBtn">
        <el-button type="primary" :loading="isLoading" :disabled="isLoading" @click="onSubmit">{{ isEdit ? '保存'
            : '修改' }}</el-button>
    </div>
</template>
  
<script  setup>
import { ref, reactive, onBeforeMount } from 'vue'
import { cloneDeep } from "lodash"
import { storeToRefs } from 'pinia'
import { UserStore } from "../store"
import { ElLoading } from "element-plus"
import { Edit } from '@element-plus/icons-vue'
const userStore = UserStore()
let { userInfo } = storeToRefs(userStore)
const isEdit = ref(false)
const isLoading = ref(false)
const form = reactive(cloneDeep(userInfo))

const onSubmit = () => {
    isEdit.value = !isEdit.value
    if (!isEdit.value) {
        isLoading.value = true
        userStore.userEdit(form).then(() => {
            isLoading.value = false
        })
    }
}


// 上传图片
const onUploadAvatar = async (file) => {
    const formData = new FormData()
    formData.append('id', userInfo.value.id);
    formData.append('avatar', file.file);
    const loading = ElLoading.service({
        lock: true,
        text: '上传中...',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    await userStore.uploadAvatar(formData).then(() => {
        loading.close()
    })
}
</script>
<style lang="scss">
.title {
    text-align: center;
    color: #030712;
    font-weight: 600;
    font-size: 30px;
    margin: 0 0 8px;
}

.body {
    display: flex;
    justify-content: center;
    gap: 4rem;

    .upload-btn {
        background-color: #f0e4fa;
        padding: 0.2rem 0.6rem;
        border-radius: 10%;
        line-height: 1rem;
        position: relative;
        left: 4rem;
        bottom: 2rem;
    }
}

.mainForm {
    width: 60vw;
    // margin: 0 auto;
}

.formBtn {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>