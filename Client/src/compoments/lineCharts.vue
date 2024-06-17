<template>
    <div class="header">
        <h2>近期体重变化折线图</h2>
        <el-radio-group v-model="type" size="small" @change="initChart">
            <el-radio-button label="日" value="DAY" />
            <el-radio-button label="周" value="WEEK" />
            <el-radio-button label="月" value="MONTH" />
        </el-radio-group>
    </div>
    <div class="charts" ref="chartRef"></div>
</template>
  
<script setup>
import * as echarts from 'echarts'
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { UserStore } from "../store";
const userStore = UserStore()
const type = ref('WEEK')


// 折线图
const chartRef = ref(null)
let chartInstance
onMounted(() => {
    initChart();
})

onUnmounted(() => {
    chartInstance.dispose()
})



let weightTypeData;
let xData = computed(() => {
    let xDataArr = weightTypeData.map(i => {
        let date = new Date(i.updatedAt);
        return getDateLabel(date, type.value);
    });
    return xDataArr
})
const getDateLabel = (date, type) => {
    if (type === 'DAY') {
        return `${date.getHours()}h`;
    } else if (type === 'WEEK') {
        return `${date.getDate()} ${date.getHours()}h`;
    } else {
        return `${date.getDate()}`;
    }
}
const xName = computed(() => {
    if (type.value === 'DAY') {
        return '日'
    } else if (type.value === 'WEEK') {
        return '周'
    } else {
        return '月'
    }
})
const initChart = async () => {
    if (chartInstance) chartInstance.dispose()
    chartInstance = echarts.init(chartRef.value)
    await userStore.weightByType(type.value).then(() => {
        weightTypeData = userStore.weight.weightTypeData
        const chartOption = {
            title: {
                text: ''
            },
            tooltip: {},
            xAxis: {
                type: 'category',
                name: xName.value,
                data: xData.value,
                axisLabel: {
                    rotate: 40 // 旋转x轴标签，防止重叠
                }
            },
            yAxis: {
                type: 'value',
                name: '体重(kg)',
                min: 45,
            },
            legend: {
                data: [{
                    name: '测量体重'
                }, {
                    name: '目标体重'
                }],
            },
            series: [{
                name: '测量体重',
                data: weightTypeData.map(item => item.weight),
                type: 'line',
                smooth: true, // 是否平滑曲线
                lineStyle: {

                    color: '#5470c6'
                },
                // areaStyle: { } // 可以设置区域填充颜色
            }, {
                name: '目标体重',
                data: weightTypeData.map(item => item.targetWeight),
                type: 'line',
                smooth: true, // 是否平滑曲线
                lineStyle: {
                    color: '#E6A23C'
                },
                // areaStyle: {  }
            }]
        }
        chartInstance.setOption(chartOption)
        console.log('xData', xData);
        console.log('weightTypeData', weightTypeData);
    })
}

window.addEventListener('resize', function () {
    // 记得在resize事件中调用echarts的resize方法
    chartInstance.resize();
});
</script>
  
<style scoped>
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
}

.charts {
    width: 100%;
    height: 400px;
}
</style>