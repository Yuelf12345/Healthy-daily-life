<template lang="">
    <div class="tabel-container">
        <div class="header">
            <span class="title">测量记录</span>
            <div class="search">
                <el-date-picker
        v-model="queryForm.dateArr"
        type="datetimerange"
        start-placeholder="Start date"
        end-placeholder="End date"
        format="YYYY-MM-DD HH:mm:ss"
        @change="getMainList"
      />
        <el-button :icon="Search" type="primary" @click="onSearch" :loading="isLoading" :disabled=isLoading>搜索</el-button>
            </div>
        </div>
        <div class="body">
            <el-table class="main-table" :data="weight.weightData">
                <el-table-column prop="index" label="序号"  width="60"  align="center">
                    <template #default="{ $index }">
                        <span>{{$index+1}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="weight" label="测量体重(kg)" align="center" width="110">
                    <template #default="{ row }">
                        <span>{{ row.weight || '--' }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="targetWeight" label="目标体重(kg)" align="center" width="110">
                    <template #default="{ row }">
                        <span>{{ row.targetWeight || '--' }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="createdAt" label="创建时间" width="180" align="center">
                    <template #default="{ row }">
                        <span>{{ new Date(row.createdAt).toLocaleString() }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="updatedAt" label="更新时间" width="180" align="center">
                    <template #default="{ row }">
                        <span>{{ new Date(row.updatedAt).toLocaleString() }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="options" label="操作" width="130" align="center" fixed="right">
                    <template #default="{ row }">
                        <el-button text size="small" type="primary" @click="onEdit(row)">编辑</el-button>
                        <el-button text size="small" type="danger" @click="onDelete(row.weightId)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <TableLineCharts class="line"/>
        </div>
        <el-pagination
        class="pagination"
      v-model:current-page="queryForm.page"
      v-model:page-size="queryForm.limit"
      :page-sizes="[10, 20, 30, 40]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total,sizes, prev, pager, next"
      :total="weight.weightTotal"
      @size-change="getMainList"
      @current-change="getMainList"
    />
    </div>
    <el-dialog v-model="dialogVisible" title="记录体重" width="500" center>
        <el-form :model="form" label-width="auto">
            <el-form-item label="目标体重">
                <el-input v-model="form.targetWeight" placeholder="请输入您的目标体重">
                    <template #append>kg</template></el-input>
            </el-form-item>
            <el-form-item label="当前体重">
                <el-input v-model="form.weight" placeholder="请输入您的体重">
                    <template #append>kg</template></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" :loading="isEditLoading" :disabled="isEditLoading" @click="submit">
                    保存
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import TableLineCharts from '../compoments/tableLineCharts.vue'
import { Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { cloneDeep } from "lodash";
import { UserStore } from "../store";
const userStore = UserStore()
let { weight } = userStore
onMounted(async () => {
    if (!weight) {
        await userStore.weightRecords()
    }
    getMainList()
})
const queryForm = reactive({
    dateArr: [],
    limit: 10,
    page: 1
})
const isLoading = ref(false)
const onSearch = () => {
    getMainList()
}
const getMainList = async () => {
    if (!queryForm.dateArr) queryForm.dateArr = []
    const query = {
        limit: queryForm.limit,
        page: queryForm.page,
        startTime: queryForm.dateArr[0],
        endTime: queryForm.dateArr[1]
    }
    isLoading.value = true
    userStore.weightRecords(query).then(() => {
        isLoading.value = false
    })
}
// 编辑
const dialogVisible = ref(false)
const form = ref({
    weightId: null,
    weight: null,
    targetWeight: null
})
const onEdit = ({ weightId, weight, targetWeight }) => {
    form.value = cloneDeep({ weightId, weight, targetWeight })
    dialogVisible.value = true
}
const isEditLoading = ref(false)
const submit = () => {
    isEditLoading.value = true
    userStore.weightEdit(form.value).then(() => {
        ElMessage.success('修改成功')
        dialogVisible.value = false
        isEditLoading.value = false
    })
}

const onDelete = (weightId) => {
    ElMessageBox.confirm(
        '确定删除该条数据?',
        '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
        }
    )
        .then(async () => {
            await userStore.weightDel({ weightId }).then((res) => {
                if (res.success) ElMessage.success(res.msg)
            })
        })
        .catch()
}
</script>
<style lang="scss">
.tabel-container {
    display: flex;
    flex-direction: column;

    .header {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 2rem
    }

    .body {
        display: flex;
        gap: 2rem;
        .main-table {
            width: 52vw;
        }

        .line {
            flex: 1;
        }
    }

    .title {
        font-size: 2rem;
        font-weight: bold;
    }

    .search {
        display: flex;
        gap: 1rem;
        width: 400px;
    }


}

.pagination {
    position: fixed;
    bottom: 3rem;
    z-index: 999;
}
</style>