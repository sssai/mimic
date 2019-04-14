<template>
<div style="height:100%">
  <el-row style="height:30%;padding-bottom:0px">
    <el-col :span="24" style="height:100%">
      <div class="center fsStateTitle ">文件系统</div>
    </el-col>
  </el-row>
  <el-row style="height:80%;padding-top:0px">
    <el-col class="center" :span="8" style="height:100%">
      <div class="center fsSumTitle">总数量</div>
      <div class="fsSum">{{ fssum }}</div>
      <!--<div class="fsSum" v-show='fssum != undefined'>{{ fssum }}</div>
      <div class="fsSum" v-show='fssum == undefined'>0</div>-->
      <!--<div class="fsSum">9</div>-->
    </el-col>
    <el-col class="center" :span="8" style="height:100%">
      <div class="center runningTitle">使用中</div>
      <div class="running">{{fsonline}}</div>
    </el-col>
    <el-col class="center" :span="8" style="height:100%">
      <div class="center readyingTitle">后备中</div>
      <div class="readying">{{fsready}}</div>
    </el-col>
  </el-row>
</div>
<!--<el-row class="center">
    <el-col class="center fsSum" :span="8">
      <div class="grid-content bg-purple-dark">9</div>
    </el-col>
    <el-col class="center running" :span="8">
      <div class="grid-content bg-purple-dark">3</div>
    </el-col>
    <el-col class="center readying" :span="8">
      <div class="grid-content bg-purple-dark">1</div>
    </el-col>
  </el-row>-->
</div>
</template>

<script>
import {
  mapState
} from 'vuex'
export default {
  name: 'fsstate',
  computed: {
    fssum() {
      return this.$store.getters.getSummaryFsSum
    },
    fsonline() {
      return this.$store.getters.getSummaryFsOnline
    },
    fsready() {
      return this.$store.getters.getSummaryFsReady
    }
  }
}
</script>
<style>
.center {
  text-align: center;
}

.fsStateTitle {
  height: 100%;
  border: 1px;
  font-size: 14px;
  border-color: #D3D3D3;
  background-color: #EEEEEE;
  border-style: solid solid none solid;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fsSum {
  font-size: 30px;
  border: 1px solid;
  border-color: #D3D3D3;
  border-style: dotted solid solid solid;
  background-color: white;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fsSumTitle {
  font-size: 15px;
  border: 1px solid;
  border-color: #D3D3D3;
  border-style: none solid none solid;
  background-color: white;
  height: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.running {
  font-size: 30px;
  color: #32CD32;
  border: 1px solid;
  border-color: #D3D3D3;
  border-style: dotted solid solid none;
  background-color: white;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.runningTitle {
  font-size: 15px;
  border: 1px solid;
  border-color: #D3D3D3;
  border-style: none solid none none;
  background-color: white;
  height: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/*.readying {
  font-size: 25px;
  padding-bottom: 8px;
  color: #4169E1;
  border: 1px solid;
  border-color: #D3D3D3;
  border-style: none solid solid none;
  background-color: white;
}

.repairing {
  font-size: 25px;
  padding-bottom: 8px;
  color: #DAA520;
  border: 1px solid;
  border-color: #D3D3D3;
  border-style: none solid solid none;
  background-color: white;
}*/

.readying {
  font-size: 30px;
  color: #26A0DA;
  border: 1px solid;
  border-color: #D3D3D3;
  border-style: dotted solid solid none;
  background-color: white;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.readyingTitle {
  font-size: 15px;
  border: 1px solid;
  border-color: #D3D3D3;
  border-style: none solid none none;
  background-color: white;
  height: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
