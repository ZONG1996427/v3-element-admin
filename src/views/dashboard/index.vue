
<template>
  <div>
    <el-row>
      <el-col :span="8">
        <el-card shadow="hover" style="margin: 0 5px">
          <div>
            <div class="user-container">
              <svg-icon
                class="user-avatar"
                style="
                  font-size: 100px;
                  box-shadow: 0 0 9px 1px #999;
                  border-radius: 50%;
                "
                icon="user-icon"
              ></svg-icon>
              <div class="user-right-content">
                <p class="user-name">{{ $store.getters.userInfo.title }}</p>
                <p class="user-lavel">{{ $store.getters.userInfo.lavel }}</p>
              </div>
            </div>
            <el-divider></el-divider>
            <div class="login-info">
              <div class="login-info-item">
                <span>当前登录时间：</span>
                <span>{{ $moment().format('YYYY-MM-DD HH:mm:ss') }}</span>
              </div>
              <div class="login-info-item">
                <span>当前登录地点：</span>
                <span>{{ $store.getters.userInfo.address }}</span>
              </div>
            </div>
          </div>
        </el-card>
        <el-card shadow="hover" style="margin: 15px 5px">
          <div>
            <p class="title">语言详情</p>
            <div
              class="progress-content"
              v-for="item in DashboardData.codeDetailsList"
              :key="item.value"
            >
              <p>{{ item.type }}</p>
              <el-progress :percentage="item.value" :color="item.color" />
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <div class="el-rows">
          <div class="el-cols">
            <i class="el-icon-user icon-init"></i>
            <div class="data-item">
              <div>
                {{ DashboardData.val1 }}
              </div>
              <div>用户访问量</div>
            </div>
          </div>
          <div class="el-cols">
            <i class="el-icon-bell icon-init"></i>
            <div class="data-item">
              <div>
                {{ DashboardData.val2 }}
              </div>
              <div>系统信息</div>
            </div>
          </div>
          <div class="el-cols">
            <i class="el-icon-star-off icon-init"></i>
            <div class="data-item">
              <div>
                {{ DashboardData.val3 }}
              </div>
              <div>数量</div>
            </div>
          </div>
        </div>
        <el-card shadow="hover" style="margin: 15px 5px 0 5px">
          <div style="height: 418px">
            <p class="title">今日任务</p>
            <el-table
              :show-header="false"
              :data="DashboardData.taskList"
              style="width: 100%"
            >
              <el-table-column width="40">
                <template #default="scope">
                  <el-checkbox v-model="scope.row.status"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column>
                <template #default="scope">
                  <div
                    class="todo-item"
                    :class="{
                      'todo-item-del': scope.row.status
                    }"
                  >
                    {{ scope.row.desc }}
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-card style="margin-right: 10px">
          <h6>用户访问极坐标柱状图</h6>
          <div style="width: 100%; height: 300px" id="customerChart"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card style="margin-right: 10px">
          <h6>系统信息雷达图</h6>
          <div style="width: 100%; height: 300px" id="systemChart"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <h6>南丁格尔图</h6>
          <div style="width: 100%; height: 300px" id="numChart"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px">
      <el-col>
        <el-card>
          <h6>折线图</h6>
          <div style="width: 100%; height: 350px" id="lineChart"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onActivated, onMounted, watch, computed } from 'vue'
import { getDashboard } from '@/api/Dashboard'
import * as echarts from 'echarts'
import { useStore } from 'vuex'
const store = useStore()
let time = null
const sidebarOpened = computed(() => {
  return store.getters.sidebarOpened
})
watch(sidebarOpened, () => {
  time = setTimeout(() => {
    userInfoEchart.resize()
    systemEchart.resize()
    numEchart.resize()
    lineChart.resize()
    clearTimeout(time)
  }, 300)
})
const DashboardData = ref({})
onActivated(() => {
  getDashboardData()
  getEcharts()
})
onMounted(() => {
  // getEcharts()
})
const getDashboardData = () => {
  getDashboard().then((result) => {
    DashboardData.value = result
  })
}

var userInfoEchart = null
var systemEchart = null
var numEchart = null
var lineChart = null

const getEcharts = () => {
  // 极坐标柱状图
  userInfoEchart = echarts.init(document.getElementById('customerChart'))
  userInfoEchart.setOption({
    radiusAxis: {
      type: 'category',
      data: ['a', 'b', 'c', 'd']
    },
    polar: {
      radius: [30, '80%']
    },
    angleAxis: {
      max: 4,
      startAngle: 75
    },
    series: {
      color: '#409eff',
      type: 'bar',
      data: [2, 1.2, 2.4, 3.6],
      coordinateSystem: 'polar',
      label: {
        show: true,
        position: 'middle',
        formatter: '{b}: {c}'
      }
    }
  })
  // 雷达图
  systemEchart = echarts.init(document.getElementById('systemChart'))
  systemEchart.setOption({
    color: ['#67F9D8', '#FFE434', '#56A3F1', '#FF917C'],
    legend: {},
    radar: [
      {
        indicator: [
          { text: 'Indicator1' },
          { text: 'Indicator2' },
          { text: 'Indicator3' },
          { text: 'Indicator4' },
          { text: 'Indicator5' }
        ],
        radius: 120,
        startAngle: 90,
        splitNumber: 4,
        shape: 'circle',
        axisName: {
          formatter: '【{value}】',
          color: '#428BD4'
        },
        splitArea: {
          areaStyle: {
            color: ['#77EADF', '#26C3BE', '#64AFE9', '#428BD4'],
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            shadowBlur: 10
          }
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(211, 253, 250, 0.8)'
          }
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(211, 253, 250, 0.8)'
          }
        }
      }
    ],
    series: [
      {
        type: 'radar',
        emphasis: {
          lineStyle: {
            width: 4
          }
        },
        data: [
          {
            value: [100, 8, 0.4, -80, 2000],
            name: 'Data A'
          },
          {
            value: [60, 5, 0.3, -100, 1500],
            name: 'Data B',
            areaStyle: {
              color: 'rgba(255, 228, 52, 0.6)'
            }
          }
        ]
      }
    ]
  })
  // 南丁格尔图
  numEchart = echarts.init(document.getElementById('numChart'))
  numEchart.setOption({
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    series: [
      {
        name: 'Area Mode',
        type: 'pie',
        radius: [20, 140],
        roseType: 'area',
        itemStyle: {
          borderRadius: 5
        },
        data: [
          { value: 30, name: 'rose 1' },
          { value: 28, name: 'rose 2' },
          { value: 26, name: 'rose 3' },
          { value: 24, name: 'rose 4' },
          { value: 22, name: 'rose 5' },
          { value: 20, name: 'rose 6' },
          { value: 18, name: 'rose 7' },
          { value: 16, name: 'rose 8' }
        ]
      }
    ]
  })

  // 折线图
  lineChart = echarts.init(document.getElementById('lineChart'))
  lineChart.setOption({
    xAxis: {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      boundaryGap: false,
      axisTick: {
        show: false
      }
    },
    grid: {
      left: 10,
      right: 10,
      bottom: 20,
      top: 30,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      },
      padding: [5, 10]
    },
    yAxis: {
      axisTick: {
        show: false
      }
    },
    legend: {
      data: ['expected', 'actual']
    },
    series: [
      {
        name: 'expected',
        itemStyle: {
          normal: {
            color: '#FF005A',
            lineStyle: {
              color: '#FF005A',
              width: 2
            }
          }
        },
        smooth: true,
        type: 'line',
        data: [120, 132, 101, 134, 90, 230, 210],
        animationDuration: 2800,
        animationEasing: 'cubicInOut'
      },
      {
        name: 'actual',
        smooth: true,
        type: 'line',
        itemStyle: {
          normal: {
            color: '#3888fa',
            lineStyle: {
              color: '#3888fa',
              width: 2
            },
            areaStyle: {
              color: '#f3f8ff'
            }
          }
        },
        data: [220, 182, 191, 234, 290, 330, 310],
        animationDuration: 2800,
        animationEasing: 'quadraticOut'
      }
    ]
  })
  window.onresize = function () {
    // 自适应大小
    userInfoEchart.resize()
    systemEchart.resize()
    numEchart.resize()
    lineChart.resize()
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/common.scss';
.user-container {
  display: flex;
  align-items: center;
  .user-right-content {
    padding-left: 70px;
    .user-name {
      font-size: 30px;
      color: #222;
    }
    .user-lavel {
      margin-top: 5px;
      color: $color99;
      font-size: 14px;
    }
  }
}
.login-info {
  font-size: 14px;
  color: $color99;
  padding: 5px 0;
  .login-info-item {
    display: flex;
    align-items: center;
    margin-top: 10px;
    span {
      &:nth-child(2) {
        padding-left: 68px;
      }
    }
  }
}
.el-rows {
  display: flex;
  align-items: center;
  margin-left: -5px;
  margin-right: -5px;
}
.el-icon-user {
  background-color: #2d8cf0;
}
.el-icon-bell {
  background-color: #2d8cf0;
}
.el-icon-star-off {
  background-color: #f25e43;
}
.icon-init {
  font-size: 50px;
  color: #ffffff;
  padding: 20px;
}
.el-cols {
  width: 33%;
  border-radius: 3px;
  overflow: hidden;
  display: flex;
  align-items: center;
  // padding: 0 10px;
  margin: 0 10px;
  background-color: #fff;
  box-sizing: border-box;
}
.data-item {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
  > div:nth-child(1) {
    font-size: 30px;
    color: #2d8cf0;
  }
}
.todo-item-del {
  text-decoration: line-through;
  color: #999;
}

.progress-content {
  margin-top: 20px;
}
</style>
