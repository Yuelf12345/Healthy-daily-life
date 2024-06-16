<template>
    <p class="title">
        个人中心
    </p>
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
    <div class="formBtn">
        <el-button type="primary" :loading="isLoading" :disabled="isLoading" @click="onSubmit">{{ isEdit ? '保存'
            : '修改' }}</el-button>
    </div>
</template>
  
<script  setup>
import { ref, reactive } from 'vue'
import { cloneDeep } from "lodash";
import { UserStore } from "../store";
const userStore = UserStore()
let { userInfo } = userStore
const isEdit = ref(false)
const isLoading = ref(false)
const form = reactive(cloneDeep(userInfo))

const onSubmit = () => {
    isEdit.value = !isEdit.value
    console.log(isEdit.value);
    if (!isEdit.value) {
        isLoading.value = true
        userStore.userEdit(form).then(() => {
            isLoading.value = false
        })
    }
    console.log('submit!')
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

.mainForm {
    width: 60vw;
    margin: 0 auto;
}

.formBtn {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>