<template>
    <div class="home-container">
        <div class="flex-area-1">
            <div class="left-card">
                <div class="distance">
                    <section class="distance__section distance__cycling">
                        <p>目标体重</p>
                        <h2>{{ recentWeightData[0]?.targetWeight || 0 }}(kg)</h2>
                        <svg t="1718520898000" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="7227" width="50" height="50">
                            <path
                                d="M755.375672 511.868742A243.503273 243.503273 0 1 1 511.872399 268.365469a216.447354 216.447354 0 0 1 36.562053 3.290585L606.933737 9.140513A511.868742 511.868742 0 1 0 1023.741142 511.868742z"
                                p-id="7228" fill="#76BDA4"></path>
                            <path
                                d="M508.947435 461.77873l17.184165-79.705276a144.054489 144.054489 0 0 0-28.152781-2.924964A132.720252 132.720252 0 1 0 631.064692 511.868742h-67.639798l107.126815-85.189583 70.930383 9.140513L952.810759 255.934371l-122.482878-15.356062 4.387447-123.579739-211.328667 179.8853L621.558558 372.932941z"
                                p-id="7229" fill="#76BDA4"></path>
                        </svg>
                    </section>
                    <section class="distance__section distance__running">
                        <p>最近一次测量</p>
                        <h2>{{ new Date(recentWeightData[0]?.updatedAt).toLocaleString() || '- -' }}</h2>
                        <svg t="1718520757118" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="4310" width="50" height="50">
                            <path
                                d="M975.80686 68.2c-30.8-30.7-72.5-47.9-116-47.9H163.70686C120.00686 20.4 78.10686 38 47.40686 69.1 16.70686 100.2-0.39314 142.3 0.00686 186l61.4 653c0.1 90.4 73.4 163.6 163.7 163.7h573.7c89.7 0.1 162.8-72.1 163.7-161.8l61.4-656.9c0-43.4-17.3-85.1-48.1-115.8zM766.70686 240.8l-73.3 146.7c-12 24.4-39.2 37.3-65.7 31.3-76.4-18-156-18-232.4 0-26.5 5.9-53.6-7-65.7-31.3l-73.3-146.7c-7.8-15.7-8.3-34.1-1.3-50.1 7-16.1 20.8-28.3 37.6-33.2 142.9-43.6 295.5-43.6 438.3 0a59.36 59.36 0 0 1 37.3 33.3c6.9 16 6.3 34.4-1.5 50z"
                                p-id="4311" fill="#76BDA4"></path>
                            <path
                                d="M718.70686 197.9c-135-41.3-279.3-41.3-414.2 0-4.7 1.4-8.6 4.9-10.5 9.4-1.9 4.5-1.8 9.7 0.5 14.1l73.3 146.7c3.4 6.8 10.9 10.4 18.3 8.7 34.3-7.7 69.2-12.4 104.3-14.1V253.4c0-10.2 8.3-18.5 18.5-18.5h5.5c10.2 0 18.5 8.3 18.5 18.5v109.4c35.1 1.6 70 6.3 104.3 14.1 7.4 1.7 15-1.9 18.3-8.7l73.3-146.7v0.4c2.4-4.6 2.5-10 0.2-14.7-1.8-4.6-5.6-7.9-10.3-9.3z"
                                p-id="4312" fill="#76BDA4"></path>
                        </svg>
                    </section>
                    <section class="distance__section distance__swimming">
                        <p>体重状态</p>
                        <h2>{{ recentWeightData[0]?.weight || 0 }}(kg)偏胖</h2>
                        <!-- 偏胖 -->
                        <svg v-if="recentWeightStatus === 0" t="1718520951427" class="icon" viewBox="0 0 1024 1024"
                            version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8543" width="50" height="50">
                            <path
                                d="M655.002494 252.80798C614.144638 232.379052 563.072319 219.610973 512 219.610973c-53.625935 0-102.144638 12.76808-145.55611 35.750623-94.483791 51.072319-160.877805 148.109726-160.877805 263.022444V566.902743c2.553616 15.321696 15.321696 30.643392 33.197007 30.643392 17.875312 0 30.643392-12.76808 33.197008-30.643392v-71.501247c0-35.750623 10.214464-66.394015 25.536159-97.037406 2.553616-5.107232 5.107232-10.214464 10.214464-15.321696 5.107232-2.553616 10.214464-7.660848 17.875312-7.660848 12.76808 0 22.982544 7.660848 25.53616 17.875312 0 7.660848-2.553616 15.321696-2.553616 25.536159-2.553616 86.822943 0 168.538653 0 237.486285 2.553616 53.625935 2.553616 211.950125 15.321695 301.326683v2.553616c0 7.660848 2.553616 12.76808 2.553616 20.428928 2.553616 7.660848 7.660848 15.321696 12.76808 20.428927 12.76808 12.76808 28.089776 20.428928 48.518703 20.428928h10.214464c25.53616-5.107232 45.965087-22.982544 51.072319-48.518703v-199.182045c0-10.214464 7.660848-17.875312 17.875312-17.875312h5.107232c10.214464 0 17.875312 7.660848 17.875312 17.875312v196.628429c5.107232 25.53616 22.982544 45.965087 51.072319 51.072319 5.107232 0 10.214464 2.553616 12.76808 2.553616 20.428928 0 38.304239-10.214464 51.072319-22.982544 2.553616-2.553616 5.107232-7.660848 7.660848-10.214463 0 2.553616-2.553616 2.553616-2.553616 5.107231 0-2.553616 2.553616-2.553616 2.553616-5.107231 0 0 0-2.553616 2.553616-2.553616 2.553616-5.107232 5.107232-7.660848 5.107232-10.214464 10.214464-125.127182 12.76808-283.451372 12.768079-324.309227 0-68.947631 7.660848-150.663342 0-237.486285v-12.768079c2.553616-12.76808 12.76808-22.982544 28.089776-22.982544 7.660848 0 15.321696 2.553616 20.428928 7.660848 2.553616 2.553616 5.107232 7.660848 7.660848 10.214464 17.875312 28.089776 28.089776 63.840399 28.089775 99.591022v71.501247c2.553616 15.321696 15.321696 28.089776 33.197008 28.089776 17.875312 0 30.643392-12.76808 33.197007-28.089776v-51.072319c-5.107232-114.912718-71.501247-214.503741-168.538653-265.57606z m-2.553616 732.887781c2.553616-2.553616 2.553616-5.107232 2.553616-10.214464 0 2.553616 0 7.660848-2.553616 10.214464z m5.107232-15.321696v-2.553616 2.553616z"
                                fill="#EE6557" p-id="8544"></path>
                            <path
                                d="M512 99.591022m-99.591022 0a99.591022 99.591022 0 1 0 199.182044 0 99.591022 99.591022 0 1 0-199.182044 0Z"
                                fill="#EE6557" p-id="8545"></path>
                            <path
                                d="M644.78803 993.356608c-2.553616 2.553616-2.553616 5.107232-5.107232 5.107232 2.553616 0 5.107232-2.553616 5.107232-5.107232z"
                                fill="#EE6557" p-id="8546"></path>
                        </svg>
                        <!-- 标准 -->
                        <svg v-if="recentWeightStatus === 1" t="1718521105191" class="icon" viewBox="0 0 1024 1024"
                            version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16379" width="50" height="50"
                            fill="#76BDA4">
                            <path d="M512 88m-88 0a88 88 0 1 0 176 0 88 88 0 1 0-176 0Z" p-id="16380" fill="#76BDA4"></path>
                            <path
                                d="M744.9 619.6c-21.3 5.7-43.3-6.9-49-28.3l-64.1-239c-1.2-4.5-7.9-3.6-7.9 1V1008c0 8.8-7.2 16-16 16h-64c-8.8 0-16-7.2-16-16V640c0-8.8-7.2-16-16-16s-16 7.2-16 16v368c0 8.8-7.2 16-16 16h-64c-8.8 0-16-7.2-16-16V353.3c0-4.7-6.7-5.6-7.9-1l-64.1 239c-5.7 21.3-27.7 34-49 28.3-21.3-5.7-34-27.6-28.3-49l69.5-260C339 240.7 402.4 192 474.8 192h74.3c72.5 0 135.9 48.7 154.6 118.7l69.5 260c5.7 21.3-6.9 43.2-28.3 48.9z"
                                p-id="16381" fill="#76BDA4"></path>
                        </svg>
                        <!-- 偏瘦 -->
                        <svg v-if="recentWeightStatus === 2" t="1718520995653" class="icon" viewBox="0 0 1024 1024"
                            version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9785" width="50" height="50">
                            <path
                                d="M646.697948 397.695778a313.448236 313.448236 0 0 0-36.571429-118.449971c-18.063621-30.64893-42.64199-50.785425-81.582417-49.600926-42.938115 1.332562-85.876229 1.1845-128.814344 0A80.990168 80.990168 0 0 0 328.807838 267.548872 266.512435 266.512435 0 0 0 287.054223 380.520532a1114.466165 1114.466165 0 0 0-10.21631 233.938693A25.318681 25.318681 0 0 0 304.821719 641.554656c14.806246-0.888375 23.986119-10.956622 23.838057-29.612493v-93.427415a626.896472 626.896472 0 0 1 13.177559-143.02834c4.737999-21.765182 12.437247-42.938115 18.803933-64.407171l5.626373 1.036437v16.879121q2.220937 224.16657-9.03181 448.037015c-3.553499 66.628109-5.922499 133.256217-8.43956 199.884326A41.753615 41.753615 0 0 0 388.180886 1022.667438a40.86524 40.86524 0 0 0 45.751301-42.04974q8.143436-188.483516 15.694622-377.263158c0-11.252747 4.293811-14.806246 14.806246-13.917871s16.138809 1.332562 16.434934 14.065934c2.665124 85.728167 5.922499 171.604396 9.327935 257.332562 1.77675 41.753615 3.997687 83.50723 6.958936 125.112782a42.197802 42.197802 0 0 0 63.074609 31.981492 44.418739 44.418739 0 0 0 22.20937-44.418739c-5.330249-122.151533-11.548872-244.303065-14.806247-366.454598-2.665124-94.759977-1.628687-189.519954-2.072874-284.131868a86.172354 86.172354 0 0 1 1.924812-13.473685c4.441874 9.772123 8.143436 16.138809 10.512435 22.949682a514.961249 514.961249 0 0 1 24.282244 152.060151c1.1845 42.197802 0 84.395604 0 126.741469a38.792366 38.792366 0 0 0 3.701561 18.951995 23.986119 23.986119 0 0 0 29.612493 10.660498 25.910931 25.910931 0 0 0 18.951996-27.391556 1192.495084 1192.495084 0 0 0-7.847311-215.72701zM465.469492 193.51764a95.056102 95.056102 0 0 0 97.128977-96.388664 97.128976 97.128976 0 0 0-194.257953 0A94.315789 94.315789 0 0 0 465.469492 193.51764z"
                                fill="#47A3FF" p-id="9786"></path>
                        </svg>
                    </section>
                </div>
                <section class="weekly">
                    <div class="table-header">
                        <h2>最近测量记录</h2>
                        <span @click="jumpTable">查看全部 ></span>
                    </div>
                    <el-table :data="weight.recentWeightData" style="width: 100%">
                        <el-table-column prop="updatedAt" label="测量时间" width="180" align="center">
                            <template #default="{ row }">
                                <span>{{ new Date(row.updatedAt).toLocaleString() }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="weight" label="测量体重(kg)" align="center" width="130" />
                        <el-table-column prop="targetWeight" label="目标体重(kg)" align="center" width="130" />
                        <el-table-column prop="status" label="状态" align="center" width="130">
                            <template #default="{ row }">
                                <el-tag v-if="weightStatus(row) == 0" type="warning">偏胖</el-tag>
                                <el-tag v-else-if="weightStatus(row) == 1" type="success">标准</el-tag>
                                <el-tag v-else type="primary">偏瘦</el-tag>
                            </template>
                        </el-table-column>
                    </el-table>
                </section>
            </div>
            <div class="right-card">
                <!-- <section class="weekly">
                    <h2>每周目标</h2>
                    <el-table :data="targetWeightData" style="width: 100%">
                        <el-table-column prop="date" label="时间" width="180" align="center" />
                        <el-table-column prop="targetWeight" label="目标体重" align="center" width="100">
                            <template #default="scope">
                                <span>{{ scope.row.targetWeight || 60 }}KG</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </section> -->
                <div class="line-card">
                    <LineCharts />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive, onMounted, computed } from 'vue';
import LineCharts from '../compoments/lineCharts.vue'
import { UserStore } from "../store";
import router from '../router';
const userStore = UserStore()
let { weight } = userStore
onMounted(async () => {
    await userStore.recentWeightRecords()
})
const recentWeightData = computed(() => {
    return (weight.recentWeightData || [])
});

const recentWeightStatus = computed(() => {
    const { weight, targetWeight } = (recentWeightData.value[0] || [])
    if (weight && targetWeight) {
        const difference = weight - targetWeight;
        if (difference > 2.5) {
            return 0;
        } else if (difference < -2.5) {
            return 2;
        } else {
            return 1;
        }
    }
})

const weightStatus = computed(() => {
    return ({ weight, targetWeight }) => {
        const difference = weight - targetWeight;
        if (difference > 2.5) {
            return 0;
        } else if (difference < -2.5) {
            return 2;
        } else {
            return 1;
        }
    }
})

const targetWeightData = reactive([
    {
        date: '2024/6/16 15:49:22',
        targetWeight: 58,
    },
    {
        date: '2024/6/16 15:49:22',
        targetWeight: 60,
    },
    {
        date: '2024/6/16 15:49:22',
        targetWeight: 62,
    },
    {
        date: '2024/6/16 15:49:22',
        targetWeight: 65,
    },
])
const jumpTable = () => {
    router.push('/table')
}
</script>
<style lang="scss" scoped>
.home-container {
    width: 100%;
    height: 100%;
    // background-color: #fff;
    // box-shadow: 0 0 5rem rgba(0, 0, 0, .4);
    // border-radius: 2rem;
    // z-index: 5;
    // padding: 1rem 0;

    .flex-area-1 {
        display: flex;
        gap: 3rem;
        flex-wrap: wrap;

        .left-card {
            display: flex;
            flex-direction: column;
            gap: 2rem;

            .distance {
                display: flex;
                flex-wrap: wrap;
                gap: 2rem;

                section {
                    padding: 1rem;
                    background-color: #fff;
                    box-shadow: 0 0 3rem rgba(0, 0, 0, .3);
                    border-radius: .8rem;
                    width: 150px;
                    height: 100px;
                }

                h2 {
                    margin: 0 !important;
                    font-size: 15px;
                }

                p {
                    font-size: 1rem;
                    margin-top: 0px;
                    margin-bottom: 3px;
                    color: #4B888C;
                }

                svg {
                    // height: 5rem;
                    color: #4B888C;
                    margin-top: 0.5em;
                    margin-left: 3em;
                }

            }

            .weekly {
                background-color: #76BDA4;
                color: white;

                .table-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 1rem;
                }
            }
        }

        .right-card {
            flex: 1;

            .line-card {
                width: 100%;
            }
        }
    }



}
</style>