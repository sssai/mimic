<template>
  <div class="usersState">
      <el-row style="height:20%;padding:0px">
        <el-col :span="24" class="usersStateTitle" style="height:100%" >
          <div class="center">用户情况</div>
        </el-col>
      </el-row>
    <div class=""  style="height:80%;background-color:white">
      <div class="usersNumTitle">
        <div class="usersStateDetailTitle">
          总数量
        </div>
        <div class="usersStateDetail">{{userssum}}</div>
      </div>
      <div class="usersNumTitle">
        <div class="usersStateDetailTitle">
          在线
        </div>
        <div class="usersStateDetail onlineUserNum">{{usersonline}}</div>
      </div>
      <div class="usersNumTitle">
        <div class="usersStateDetailTitle">
          冻结
        </div>
        <div class="usersStateDetail freezeUserNum">{{usersfreeze}}</div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { mapState } from 'vuex'
export default{
  name:"usersstate",
  computed: mapState({
    userssum () {
      return this.$store.getters.getSummaryUsersSum
    },
    usersonline () {
      return this.$store.getters.getSummaryUsersOnline;
    },
    usersfreeze () {
      return this.$store.getters.getSummaryUsersFreeze
    }
  })
}
</script>
<style media="screen">

/*.spaceTitle{
  padding: 0px 0px 0px 10px;
  font-size: 14px;
  width: 100%
}*/
.usersState {
  border: 1px;
  padding-left: 0px;
  font-size: 14px;
  border-color: #D3D3D3;
  border-style: solid;
  height: 100%;
  background-color: white;
}

.usersStateTitle {
  border: 1px;
  font-size: 16px;
  border-color: #D3D3D3;
  background-color: #EEEEEE;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.usersStateDetailTitle {
  font-size: 14px;
  padding: 5px 0px 5px 10px;
}
.usersStateDetail {
  font-size: 30px;
  padding: 0px 0px 10px 19px;
}
.usersNumTitle{
  height:33.3%;
}
.onlineUserNum{
  color: #32CD32;
}
.freezeUserNum{
  color: #ACACAC;
}
</style>
