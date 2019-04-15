<template>
<el-container class='fullScreen'>
  <el-header style="background-color:#f9fafc;">
    <h1 id="head">
      <el-breadcrumb separator="/">概览</el-breadcrumb>
    </h1>
  </el-header>
  <el-main id="main" class='fullScreen'>
    <el-row :gutter="20" class='fullScreen'>
      <!-- <el-col :span="16" class='fullScreen'>
        <el-row :gutter="20" class='fullScreen'> -->
      <div style="height:50%">
        <el-col :span="12" class='fullScreen'>
          <fs-state style="height:45%" />
          <div class="" style="height:5%"></div>
          <mounter-state style="height:45%" />
          <div class="" style="height:5%"></div>
        </el-col>
        <el-col :span="12" class='fullScreen'>
          <keep-alive>
            <space-used style="height:95%" />
          </keep-alive>
          <div class="" style="height:5%"></div>
        </el-col>
      </div>
      <div style="height:50%;">
        <el-col :span="16" class='fullScreen'>
          <safe-state class='fullScreen' />
        </el-col>
        <el-col :span="8" class='fullScreen'>
          <users-state class='fullScreen' />
        </el-col>
      </div>
      <!-- </el-row>
      </el-col>
      <el-col :span="8" class='fullScreen'>
        <fs-logs class='fullScreen' />
      </el-col> -->
    </el-row>
  </el-main>
  <foot></foot>
</el-container>
</template>

<script>
import Vue from 'vue'
import FsState from '@/components/Summary/FsSummary/FsState'
import SpaceUsed from '@/components/Summary/FsSummary/SpaceUsed'
import SafeState from '@/components/Summary/FsSummary/SafeState'
import MounterState from '@/components/Summary/FsSummary/MounterState'
import UsersState from '@/components/Summary/FsSummary/UsersState'
import FsLogs from '@/components/Summary/Logs/FsLogs'
import SafeEventLogs from '@/components/Summary/Logs/SafeEventLogs'
import UserLogs from '@/components/Summary/Logs/UserLogs'
import Foot from '@/components/common/Foot'

import {
  Message,
  Loading
} from 'element-ui'
import {
  mapState
} from 'vuex'

export default {
  components: {
    FsState,
    FsLogs,
    SpaceUsed,
    SafeEventLogs,
    UserLogs,
    SafeState,
    MounterState,
    UsersState,
    Foot
  },
  /*computed: {
    isInSummary() {
      return this.$store.getters.getInSummary
    }
  },*/
  mounted: async function() {
    this.updateSummary()
  },
  methods: {
    async updateSummary() {
      await this.$store.dispatch('getsummary', {}).catch((e) => {
        if (this.$store.getters.getInSummary) {
          Message({
            showClose: true,
            /*message: "获取异常：" + e.toString(),*/
            message: "系统信息获取异常",
            type: 'error',
            duration: 2000
          });
        }
      });
      /*console.log("【this.$store.getters.getInSummary】" + this.$store.getters.getInSummary);*/
      /*console.log("【this.isInSummary】" + this.isInSummary);*/
      // 递归调度，自动从后台获取overview对象，用于更新数据
      if (this.$store.getters.getInSummary) {
        setTimeout(this.updateSummary, 2000);
      }
    }
  },
  watch: {
    isInSummary: function() {
      if (this.$store.getters.getInSummary == true) {
        this.updateSummary()
      }
    }
  }
}
</script>
<style>
#main {
  background-color: #f9fafc;
}
</style>
