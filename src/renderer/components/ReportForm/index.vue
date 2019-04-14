<template>
<el-container style="height:100%">
  <el-header style="background-color:#f9fafc">
    <v-title></v-title>
  </el-header>
  <el-main id="main" style="height:100%">
    <el-tabs type="border-card" style="height:100%;width:100%">
      <el-tab-pane label="异常总数量">
        <fs-safe></fs-safe>
      </el-tab-pane>
      <!-- <el-tab-pane label="异常数量占比（开发中）" disabled>异常数量占比</el-tab-pane>
      <el-tab-pane label="异常类型出现数量（开发中）" disabled>异常类型出现数量</el-tab-pane>
      <el-tab-pane label="异常类型出现数量（开发中）" disabled>异常类型出现数量</el-tab-pane> -->
    </el-tabs>
  </el-main>
  <foot></foot>
</el-container>
</template>

<script>
import Bar from '@/components/common/Bar'
import Foot from '@/components/common/Foot'
import PathTitle from '@/components/common/PathTitle'
import FsSafe from '@/components/ReportForm/FSSafe'

export default {
  components: {
    Bar,
    Foot,
    FsSafe,
    'v-title': PathTitle
  }
}
</script>
<style media="screen">
.fullScreen {
  height: 100%
}
</style>
