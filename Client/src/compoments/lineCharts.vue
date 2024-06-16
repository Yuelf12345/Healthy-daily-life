<template>
    <div>每周体重变化折线图</div>
    <div class="charts" ref="chartRef"></div>
</template>
  
<script setup>
import * as echarts from 'echarts'
import { onMounted, onUnmounted, ref } from 'vue'

const chartRef = ref(null)
let chartInstance
onMounted(() => {
    setTimeout(() => {
        initChart();
    }, 0);
    // 注意：在Vue中，当组件销毁时，需要清理ECharts实例，避免内存泄漏
})

onUnmounted(() => {
    chartInstance.dispose()
})
const initChart = () => {
    chartInstance = echarts.init(chartRef.value)

    // 模拟每周体重数据
    const weightData = [
        { week: '1', weight: 60 },
        { week: '2', weight: 64.5 },
        { week: '3', weight: 70.8 },
        { week: '4', weight: 71.2 },
        { week: '5', weight: 60 },
        { week: '6', weight: 71.8 },
        { week: '7', weight: 72 }
    ]
    // 模拟每周体重数据
    const targetWeightData = [
        { week: '1', weight: 65 },
        { week: '2', weight: 65 },
        { week: '3', weight: 65 },
        { week: '4', weight: 65 },
        { week: '5', weight: 65 },
        { week: '6', weight: 65 },
        { week: '7', weight: 65 }
    ]

    // 准备配置项
    const option = {
        title: {
            text: ''
        },
        tooltip: {},
        xAxis: {
            type: 'category',
            name: '周',
            data: weightData.map(item => item.week),
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
            data: targetWeightData.map(item => item.weight),
            type: 'line',
            smooth: true, // 是否平滑曲线
            lineStyle: {
                color: '#E6A23C'
            },
            // areaStyle: {  }
        }]
    }

    // 使用刚指定的配置项和数据显示图表。
    chartInstance.setOption(option)
}
</script>
  
<style scoped>
.charts {
    width: 100%;
    height: 400px;
}
</style>