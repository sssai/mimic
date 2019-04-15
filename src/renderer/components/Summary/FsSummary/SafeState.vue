<template>
<div class="" style="height:100%;width:100%">
  <el-row style="height:20%;width:100%;;padding-bottom:0px">
    <el-col :span="24" style="height:100%">
      <div class="center safeStateTitle" v-show='fsIsErr'>
        文件系统　
        <div class="" style="color: red;">
          异常
        </div>
        <el-button @click="goToDetail" type="info" size="small" plain icon="el-icon-search" style="margin-left:25px;">查看详情</el-button>
      </div>
      <div class="center safeStateTitle" v-show='!fsIsErr'>
        文件系统　
        <div class="" style="color:#009900;">正常</div>
      </div>
    </el-col>
  </el-row>
  <el-row style="height:80%;width:100%;">
    <el-col class="center" :span="8" style="height:100%">
      <div class="repairTitle"> 修复中</div>
      <div class="repair">{{fsrepairing}}</div>
      <div class="repairList" v-show='!fsRepairingListNull'>
        <div class=""  v-for="item in fsrepairinglist">
          <a href="#" class="syncListLink"><i class="el-icon-arrow-right"></i> {{item.fsName}} </a>
        </div>
      </div>
      <div class="repairList" style='text-align: center;' v-show='fsRepairingListNull'>
        无
      </div>
    </el-col>
    <el-col class="center" :span="8" style="height:100%">
      <div class="syncTitle"> 同步中</div>
      <div class="sync">{{fssyn}}</div>
      <div class="syncList" v-show='!fsSynListNull'>
        <div class=""  v-for="item in fssynlist">
          <a href="#" class="syncListLink"><i class="el-icon-arrow-right"></i> {{item.fsName}} </a>
        </div>
      </div>
      <div class="syncList" style='text-align: center;' v-show='fsSynListNull'>
        无
      </div>
    </el-col>
    <el-col class="center" :span="8" style="height:100%">
      <div class="fsOfflineTitle"> 已离线</div>
      <div class="fsOffline">{{fsstop}}</div>
      <div class="syncList" v-show='!fsStopingListNull'>
        <div class=""  v-for="item in fsstoplist">
          <a href="#" class="syncListLink"><i class="el-icon-arrow-right"></i> {{item.fsName}} </a>
        </div>
      </div>
      <div class="syncList" style='text-align: center;' v-show='fsStopingListNull'>
        无
      </div>
    </el-col>
  </el-row>
</div>
</template>
<script type="text/javascript">
import { mapState } from 'vuex'
export default {
  name: 'safestate',
  computed: {
    fserrstate () {
      return this.$store.getters.getSummaryFsErrState
    },
    fsrepairing () {
      return this.$store.getters.getSummaryFsRepairing
    },
    fsrepairinglist () {
      return this.$store.getters.getSummaryFsRepairingList
    },
    fssyn () {
      return this.$store.getters.getSummaryFsSyn
    },
    fssynlist () {
      return this.$store.getters.getSummaryFsSynList
    },
    fsstop () {
      return this.$store.getters.getSummaryFsStop
    },
    fsstoplist () {
      return this.$store.getters.getSummaryFsStopList
    },
    fsIsErr(state) {// 0: 成功 1：失败
      if(this.fsstop > 0)
        return true
      return false
    },
    fsRepairingListNull(state) {
      if(state.fsrepairinglist == undefined || this.$store.getters.getSummaryFsRepairing < 1)
        return true
      return false
    },
    fsSynListNull(state) {
      if(state.fssynlist == undefined || this.$store.getters.getSummaryFsSyn < 1)
        return true
      return false
    },
    fsStopingListNull(state) {
      if(state.fsstoplist == undefined || this.$store.getters.getSummaryFsStop < 1)
        return true
      return false
    },


  },

  methods:{
     goToDetail() {
         this.$router.push({ path: '/content/auth/errorfs'})

    }
  }
}
</script>
<style media="screen">
.center {
  text-align: center;
}

.safeStateTitle {
  border: 1px;
  font-size: 16px;
  border-color: #D3D3D3;
  background-color: #EEEEEE;
  height: 100%;
  border-style: solid solid none solid;
  display: flex;
  align-items: center;
  justify-content: center;
}

.repair {
  font-size: 17px;
  /*padding-bottom: 8px;*/
  height: 10%;
  border: 1px solid;
  border-color: #D3D3D3;
  border-style: none solid solid solid;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.repairTitle {
  font-size: 15px;
  /*padding-top: 5px;*/
  height: 10%;
  border: 1px solid;
  border-color: #D3D3D3;
  border-style: none solid none solid;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sync {
  font-size: 17px;
  /*padding-bottom: 8px;*/
  height: 10%;
  border: 1px solid;
  border-color: #D3D3D3;
  border-style: none solid solid none;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.syncTitle {
  font-size: 15px;
  /*padding-top: 5px;*/
  height: 10%;
  border: 1px solid;
  border-color: #D3D3D3;
  border-style: none solid none none;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fsOffline {
  font-size: 17px;
  /*padding-bottom: 8px;*/
  height: 10%;
  border: 1px solid;
  border-color: #D3D3D3;
  border-style: none solid solid none;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fsOfflineTitle {
  font-size: 15px;
  /*padding-top: 5px;*/
  height: 10%;
  border: 1px solid;
  border-color: #D3D3D3;
  border-style: none solid none none;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.syncListLink {
  color: black;
  text-decoration: none;
}

.syncListLink:hover {
  color: #0A96AD;

}

.repairList {
  font-size: 15px;
  /*padding-top: 5px;*/
  padding-left: 10px;
  padding-right: 10px;
  border: 1px solid;
  border-color: #D3D3D3;
  border-style: none solid solid solid;
  background-color: white;
  text-align: left;
  height: 80%
}

.syncList {
  font-size: 15px;
  /*padding-top: 5px;*/
  padding-left: 10px;
  padding-right: 10px;
  border: 1px solid;
  border-color: #D3D3D3;
  border-style: none solid solid none;
  background-color: white;
  text-align: left;
  height: 80%;
  word-break: break-all;
  overflow: auto;
}

.fsOfflineList {
  font-size: 15px;
  /*padding-top: 5px;*/
  padding-left: 10px;
  padding-right: 10px;
  border: 1px solid;
  border-color: #D3D3D3;
  border-style: none solid solid none;
  background-color: white;
  text-align: left;
  height: 74%
}
</style>
