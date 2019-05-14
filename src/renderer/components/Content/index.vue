<template>
  <!--这里 direction必须为vertical，否则默认使用horizontal会出现布局混乱,head不会在顶部栏-->
  <el-container style="height:100%">
  <bar />
    <el-container style="height:100%" direction='vertical'>
      <!-- <setting-header /> -->
      <router-view></router-view>
    </el-container>
  </el-container>
</template>

<script>
import Vue from 'vue'
import Bar from '@/components/common/Bar'
import Foot from '@/components/common/Foot'
import SettingHeader from '@/components/common/SettingHeader'

export default {
  components: {
    Bar,
    Foot,
    SettingHeader
  }
}
</script>
