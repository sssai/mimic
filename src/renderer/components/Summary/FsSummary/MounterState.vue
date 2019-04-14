<template id="">
<div style="height:100%">
  <el-row style="height:30%;padding-bottom:0px">
    <el-col :span="24" style="height:100%">
      <div class="fsStateTitle">挂载节点</div>
    </el-col>
  </el-row>
  <el-row style="height:80%;padding-top:0px">
    <el-col class="center" :span="8" style="height:100%">
      <div class="mouterSumTitle">总数量</div>
      <div class="mouterSum">{{mountersum}}</div>
    </el-col>
    <el-col class="center" :span="8" style="height:100%">
      <div class="onlineTitle">在线</div>
      <div class="onlineNum">{{mounteronline}}</div>
    </el-col>
    <el-col class="center" :span="8" style="height:100%">
      <div class="offlineTitle">离线</div>
      <div class="offlineNum">{{ mounteroffline }}</div>
    </el-col>
  </el-row>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'mounterstate',
  computed: {
    mountersum () {
      return this.$store.getters.getSummaryMounterSum
    },
    mounteronline () {
       return this.$store.getters.getSummaryFsOnline
     },
     mounteroffline () {
       return this.$store.getters.getSummaryMounterOffline
     }
  }
}
</script>
<style>
.center {
  text-align: center;
}

.fsStateTitle {
  border: 1px;
  font-size: 14px;
  border-color: #D3D3D3;
  background-color: #EEEEEE;
  border-style: solid solid none solid;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mouterSum {
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

.mouterSumTitle {
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

.onlineNum {
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

.onlineTitle {
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

.offlineNum {
  font-size: 30px;
  color: #ACACAC;
  border: 1px solid;
  border-color: #D3D3D3;
  border-style: dotted solid solid none;
  background-color: white;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.offlineTitle {
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
