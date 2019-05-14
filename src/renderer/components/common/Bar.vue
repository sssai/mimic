<template>
<el-aside id="aside" width="210px">
  <!--<el-aside style="height:100%;border-right:2px solid;border-right-color:#f0f0f0">-->
  <el-menu :default-active="$route.path" class="el-menu-demo" unique-opened mode="vertical" background-color="#252a2f" text-color="white" active-text-color="#00c1de" style="border:solid 1px #252a2f" @select="" v-bind:router="true">
    <el-menu-item :index="summary" v-if="getPermissionTree.summary">
      <i class="el-icon-menu"></i>
      <span slot="title">概览</span>
    </el-menu-item>
    <el-submenu :index="fsUserManage" v-if="getFsUserManagePerminssion">
      <template slot='title'>
        <i class="el-icon-document"></i>
        <span>FS用户管理</span>
      </template>
      <el-menu-item :index="userlist" v-if="getPermissionTree.user_manage">用户管理</el-menu-item>
      <el-menu-item :index="groupmanage" v-if="getPermissionTree.group_manage">组管理</el-menu-item>
      <!-- <el-menu-item :index="changepassword" v-if="getPermissionTree.user_pwd_init">用户密码重置</el-menu-item> -->
      <el-menu-item :index="useraudit" v-if="getPermissionTree.user_check">用户审核</el-menu-item>
    </el-submenu>

    <el-submenu :index="cmConfig" v-if="getCmConfigPerminssion">
      <template slot='title'>
        <i class="el-icon-setting"></i>
        <span>配置管理</span>
      </template>
      <el-menu-item :index="filesystem" v-if="getPermissionTree.fs_manage">文件系统配置</el-menu-item>
      <!-- <el-menu-item :index="mountnode">挂载节点配置</el-menu-item> -->
      <el-menu-item :index="cert" v-if="getPermissionTree.global_cert_manage">全局证书配置</el-menu-item>
      <el-menu-item :index="globalpara" v-if="getPermissionTree.global_param_manage">全局参数配置</el-menu-item>
      <el-menu-item :index="systemstructure" v-if="getPermissionTree.system_func_structure">系统功能结构</el-menu-item>
      <el-menu-item :index="creatdir" v-if="getPermissionTree.director_manage">目录管理</el-menu-item>
    </el-submenu>

    <el-submenu :index="monitor" v-if="getMonitorPerminssion">
      <template slot='title'>
        <i class="el-icon-view"></i>
        <span>监控视图</span>
      </template>
      <el-menu-item :index="fseorror" v-if="getPermissionTree.fs_monitor">文件系统监控</el-menu-item>
      <el-menu-item :index="nodestatus" v-if="getPermissionTree.node_status_monitor">节点状态监控</el-menu-item>
      <el-menu-item :index="edataeorror" v-if="getPermissionTree.meta_data_monitor">元数据监控</el-menu-item>
    </el-submenu>

    <el-submenu :index="mounter" v-if="getMounterPerminssion">
      <template slot='title'>
        <i class="el-icon-info"></i>
        <span>挂载管理</span>
      </template>
      <el-menu-item :index="mountFS" v-if="getPermissionTree.fs_mnt_manage">文件系统挂载关系配置</el-menu-item>
      <el-menu-item :index="showfsmount" v-if="getPermissionTree.fs_mnt_view">文件系统挂载关系展示</el-menu-item>
      <el-menu-item :index="mountermanage" v-if="getPermissionTree.mnt_node_manage">挂载节点管理</el-menu-item>
    </el-submenu>

    <el-submenu :index="auth" v-if="getAuthPerminssion">
      <template slot='title'>
        <i class="el-icon-bell"></i>
        <span>异常管理</span>
      </template>
      <el-menu-item :index="errorfilemanage">异常文件管理</el-menu-item>
      <el-menu-item :index="errorfs">异常文件系统管理</el-menu-item>
      <el-menu-item :index="errornotify">异常告警管理</el-menu-item>
    </el-submenu>

    <el-submenu :index="reportform" v-if="getReportFormPerminssion">
      <template slot='title'>
        <i class="el-icon-download"></i>
        <span>系统报表</span>
      </template>
      <el-menu-item :index="fssafe" v-if="getPermissionTree.fssafe">系统安全报表</el-menu-item>
    </el-submenu>

    <el-submenu :index="consoleConfig" v-if="getConsoleConfigPerminssion">
      <template slot='title'>
        <i class="el-icon-more"></i>
        <span>控制台设置</span>
      </template>
      <el-menu-item :index="changecuruserpwd" v-if="getPermissionTree.password_change">密码修改</el-menu-item>
      <el-menu-item :index="acgroupmanage" v-if="getPermissionTree.ac_user_manage">控制台用户管理</el-menu-item>
      <el-menu-item :index="consolepermission" v-if="getPermissionTree.ac_authority_manage">控制台权限管理</el-menu-item>
      <el-menu-item :index="consolelock" v-if="getPermissionTree.lock_manage">锁定设置</el-menu-item>
    </el-submenu>
  </el-menu>
</el-aside>
</template>

<script>
/**
 * @author Craig
 * @version 1.0.0
 * @date    2018-05-03
 * @description 导航栏的代码，所见即所得，没有逻辑代码
 */
import Vue from 'vue'
import global_ from '@/utils/Global'
import permission_ from '@/utils/Permission'
import {
  Aside,
  Menu,
  MenuItem,
  Submenu
} from 'element-ui'

Vue.use(Aside)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
export default {
  name: 'Bar',
  data() {
    return {
      summary: global_.SUMMARY,
      fsUserManage: global_.FS_USER_MANAGE.indexpage,
      userlist: global_.FS_USER_MANAGE.userlist,
      groupmanage: global_.FS_USER_MANAGE.groupmanage,
      changepassword: global_.FS_USER_MANAGE.changepassword,
      useraudit: global_.FS_USER_MANAGE.useraudit,
      cmConfig: global_.CM_CONFIG.indexpage,
      filesystem: global_.CM_CONFIG.filesystem,
      cert: global_.CM_CONFIG.cert,
      globalpara: global_.CM_CONFIG.globalpara,
      systemstructure: global_.CM_CONFIG.systemstructure,
      creatdir: global_.CM_CONFIG.creatdir,
      monitor: global_.MONITOR.indexpage,
      fseorror: global_.MONITOR.fseorror,
      nodestatus: global_.MONITOR.nodestatus,
      edataeorror: global_.MONITOR.edataeorror,
      mounter: global_.MOUNTER.indexpage,
      mountFS: global_.MOUNTER.mountFS,
      showfsmount: global_.MOUNTER.showfsmount,
      mountermanage: global_.MOUNTER.mountermanage,
      auth: global_.AUTH.indexpage,
      errorfilemanage: global_.AUTH.errorfilemanage,
      errorfs: global_.AUTH.errorfs,
      errornotify: global_.AUTH.errornotify,
      consoleConfig: global_.CONSOLE_CONFIG.indexpage,
      changecuruserpwd: global_.CONSOLE_CONFIG.changecuruserpwd,
      acgroupmanage: global_.CONSOLE_CONFIG.groupmanage,
      consolepermission: global_.CONSOLE_CONFIG.consolepermission,
      consolelock: global_.CONSOLE_CONFIG.consolelock,
      reportform: global_.REPORT_FORM.indexpage,
      fssafe: global_.REPORT_FORM.fssafe,
    }
  },
  mounted: function() {

  },
  computed: {
    getPermissionTree() {
      console.log(this.$store.getters.getPermission);
      return this.$store.getters.getPermission
    },
    getFsUserManagePerminssion(){
      return this.getPermissionTree.user_manage &&
        this.getPermissionTree.group_manage &&
        this.getPermissionTree.user_pwd_init &&
        this.getPermissionTree.user_check
    },
    getCmConfigPerminssion() {
      return this.getPermissionTree.fs_manage &&
        this.getPermissionTree.global_cert_manage &&
        this.getPermissionTree.global_param_manage &&
        this.getPermissionTree.system_func_structure &&
        this.getPermissionTree.director_manage
    },
    getMonitorPerminssion() {
      return this.getPermissionTree.fs_monitor &&
      this.getPermissionTree.node_status_monitor &&
      this.getPermissionTree.meta_data_monitor
    },
    getMounterPerminssion() {
      return this.getPermissionTree.fs_mnt_manage &&
      this.getPermissionTree.fs_mnt_view &&
      this.getPermissionTree.mnt_node_manage
    },
    getAuthPerminssion() {
      console.log("getAuthPerminssion:"+this.getPermissionTree.exception_file_manage &&
        this.getPermissionTree.exception_fs_manage);
      return this.getPermissionTree.exception_file_manage &&
        this.getPermissionTree.exception_fs_manage
    },
    getReportFormPerminssion() {
      console.log("this.getPermissionTree.fssafe:"+this.getPermissionTree.fssafe);
      for(let i in this.getPermissionTree){
        console.log("this.getPermissionTree["+i+"]"+this.getPermissionTree[i]);
      }
      return this.getPermissionTree.fssafe
    },
    getConsoleConfigPerminssion() {
      return this.getPermissionTree.password_change &&
        this.getPermissionTree.ac_user_manage &&
        this.getPermissionTree.ac_authority_manage &&
        this.getPermissionTree.lock_manage
    }
  }
}
</script>
<style>
#aside {
  background-color: #252a2f;
  padding-top: 10px;
}
</style>
