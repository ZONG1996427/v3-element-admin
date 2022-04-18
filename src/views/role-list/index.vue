<template>
  <div>
    <el-select
      @change="checkChange"
      clearable
      size="small"
      v-model="checkValue"
      placeholder="请选择"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
    <div id="stacked" style="width: 100%; height: 400px"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onActivated, ref, computed, watch, nextTick } from 'vue'
import { useStore } from 'vuex'
import { getRoleEchartsData } from '@/api/role'
const checkChange = (val) => {
  if (val) {
    getData()
  }
}
const checkValue = ref(0)
const getOptionsList = () => {
  const list = []
  for (let index = 0; index < 8; index++) {
    list.push({
      label: `类型${index + 1}`,
      value: index
    })
  }
  return list
}
const options = ref([...getOptionsList()])
const store = useStore()
const sidebarOpened = computed(() => {
  return store.getters.sidebarOpened
})
let time = null
watch(sidebarOpened, () => {
  time = setTimeout(() => {
    StackedEcharts.resize()
    clearTimeout(time)
  }, 300)
})
onActivated(() => {
  getData()
  getEcharts()
  getOptionsList()
})
let StackedEcharts = null
const getEcharts = () => {
  StackedEcharts = echarts.init(document.getElementById('stacked'))
  window.onresize = function () {
    // 自适应大小
    StackedEcharts.resize()
  }
}
const EchartsData = ref({})
const getData = () => {
  getRoleEchartsData().then((res) => {
    for (const key in res) {
      if (res[key]) {
        if (!EchartsData.value.key) {
          EchartsData.value[key] = []
        }
        res[key].forEach((item, index) => {
          EchartsData.value[key].push(item.value)
        })
        nextTick(() => {
          StackedEcharts.setOption({
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {},
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'value'
            },
            yAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            series: [
              {
                name: 'Direct',
                type: 'bar',
                stack: 'total',
                label: {
                  show: true
                },
                emphasis: {
                  focus: 'series'
                },
                data: EchartsData.value[key]
              },
              {
                name: 'Mail Ad',
                type: 'bar',
                stack: 'total',
                label: {
                  show: true
                },
                emphasis: {
                  focus: 'series'
                },
                data: EchartsData.value[key]
              },
              {
                name: 'Affiliate Ad',
                type: 'bar',
                stack: 'total',
                label: {
                  show: true
                },
                emphasis: {
                  focus: 'series'
                },
                data: EchartsData.value[key]
              },
              {
                name: 'Video Ad',
                type: 'bar',
                stack: 'total',
                label: {
                  show: true
                },
                emphasis: {
                  focus: 'series'
                },
                data: EchartsData.value[key]
              },
              {
                name: 'Search Engine',
                type: 'bar',
                stack: 'total',
                label: {
                  show: true
                },
                emphasis: {
                  focus: 'series'
                },
                data: EchartsData.value[key]
              }
            ]
          })
        })
      }
    }
  })
}
</script>

<style lang="scss" scoped></style>
