
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
  </div>
</template>

<script setup>
import { ref, onActivated } from 'vue'
import { getDashboard } from '@/api/user'
const DashboardData = ref({})
onActivated(() => {
  getDashboardData()
})
const getDashboardData = () => {
  getDashboard().then((result) => {
    DashboardData.value = result
  })
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
