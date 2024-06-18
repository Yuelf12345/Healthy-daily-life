<template>
    <div class="table-line">
        <div class="header">
            <h2>体重变化折线图</h2>
        </div>
        <div class="charts" ref="chartRef"></div>
    </div>
</template>
  
<script setup>
import * as echarts from 'echarts'
import { onMounted, onUnmounted, ref, computed ,watch} from 'vue'
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

watch(() => userStore.weight.weightData, () => {
    initChart()
})
let weightData;

const initChart = async () => {
    if (chartInstance) chartInstance.dispose()
    chartInstance = echarts.init(chartRef.value)
    await userStore.weightByType(type.value).then(() => {
        weightData = userStore.weight.weightData
        const chartOption = {
            title: {
                text: ''
            },
            tooltip: {},
            xAxis: {
                type: 'category',
                name: '序号',
                data: Array.from({length: weightData.length}, (_, index) => index + 1),
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
                data: weightData.map(item => item.weight),
                type: 'line',
                smooth: true, // 是否平滑曲线
                lineStyle: {

                    color: '#5470c6'
                },
                // areaStyle: { } // 可以设置区域填充颜色
            }, {
                name: '目标体重',
                data: weightData.map(item => item.targetWeight),
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
        console.log('weightData', weightData);
    })
}

window.addEventListener('resize', function () {
    // 记得在resize事件中调用echarts的resize方法
    chartInstance.resize();
});
</script>
  
<style scoped>
.table-line {
    width: 100%;
}

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