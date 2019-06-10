<template>
	<div>
  <el-row type="flex" class="row-bg" justify="center">
  <el-col style="width:1100px;">
  <div class="grid-content">
 <el-row type="flex" style="margin-top:20px;"  inline class="stat">
    <el-col :span="15" inline>
              <el-date-picker
                  v-model="timevalue"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions2"
                  style="margin-bottom:15px;">
                </el-date-picker>
    </el-col>
    <el-col><el-input  v-model="name" placeholder="请输入用户名" style="width:200px;height:35px;left:-58px"></el-input></el-col>
    <el-button icon="el-icon-search" @click="getlogInfo()" style="position:absolute;left:580px;"></el-button> 
  </el-row>


  <el-table
    stripe
    stripe  
    :data="tableData1"
    style="width: 100%">


    <el-table-column
      label="用户名"
      align="center"
      prop="userName"
      width="150">
    </el-table-column>

    <el-table-column
      label="登录时间"
      align="center"
      prop="loginTime"
      width="200">
    </el-table-column>

    <el-table-column
      label="注销时间"
      align="center"
      prop="logoutTime"
      >
    </el-table-column> 

    <el-table-column
      label="用户登录机器的IP地址"
      align="center"
      prop="ipAddr"
      >
    </el-table-column> 

</el-table>

    <el-row type="flex" class="row-bg" justify="center">
      <el-col style="width:200px;">
        <div class="divide">
          <el-pagination
            background
            layout="total, prev, pager, next"
            :page-size="pageSize"
            :total="total"
            :current-page="currentPage"
            @current-change="handleCurrentChange1">
          </el-pagination>
        </div>
      </el-col>
    </el-row>

      </div>
  </el-col>
  </el-row>
</div>
</template>

<script>
import {
  Table,
  TableColumn,
  Pagination,
  Button,
  Row,
  Col,
  Message,
  MessageBox,

} from 'element-ui'
import Vue from 'vue'
import * as logmessage from '@/api/logmessage'

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)

export default {

    data() {
      return {
        timer:null,
      	      	//表内数据
        tableData1: [], //
        name:'',
        total:'',
        currentPage:'1',
        pageSize:20,

        timevalue:'',
        startTime:'',
        endTime:'',

        pickerOptions2: {
                  shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                      picker.$emit('pick', [start, end]);
                    }
                  }, {
                    text: '最近一个月',
                    onClick(picker) {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                      picker.$emit('pick', [start, end]);
                    }
                  }, {
                    text: '最近三个月',
                    onClick(picker) {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                      picker.$emit('pick', [start, end]);
                    }
                  }]
                },
        
      }
    },
  mounted: async function() {
    await this.updatePage()  
   

    // this.timer = setInterval(async () => {
    //   if(this.tableData1==""){
    //      await this.updatePage()
    //   }
    // }, 4000)

  },
  // destroyed: function(){
  //   clearInterval(this.timer)
  // },

methods: {
     // 将更新整个页面的功能抽离成一个公共函数
    async updatePage(){
    
 		let tableData = await logmessage.GetUserLog(this.pageSize,this.currentPage)
    //this.pageSize= 10
    this.total=+ tableData.total
    this.currentPage= +tableData.currentPage
    this.tableData1 = tableData.userLogInfo
    },

    async handleCurrentChange1(val){

        this.currentPage= val
        // this.pageSize= 10
        if(this.timevalue){
            this.startTime = this.timevalue[0] + ' 00:00:00'
            this.endTime = this.timevalue[1] +' 23:59:59'
        }
        if(this.timevalue||this.name){
            let tableData= await logmessage.GetUserLogByTime(this.name,this.startTime,this.endTime,this.pageSize,this.currentPage)
            this.tableData1 = tableData.userLogInfo
            this.currentPage= +tableData.currentPage
            this.total= +tableData.total
        }    
    },
    async getlogInfo(){
      if(this.timevalue||this.name){
           if(this.timevalue){
              this.startTime = this.timevalue[0] + ' 00:00:00'
              this.endTime = this.timevalue[1] +' 23:59:59'
          }
          let tableData= await logmessage.GetUserLogByTime(this.name,this.startTime,this.endTime,this.pageSize,"1")
          this.tableData1 = tableData.userLogInfo
          this.currentPage= +tableData.currentPage
          this.total= +tableData.total  
          this.startTime=''
          this.endTime=''     
      }else{
          let tableData = await logmessage.GetUserLog(this.pageSize,this.currentPage)
          //this.pageSize= 10
          this.total=+ tableData.total
          this.currentPage= +tableData.currentPage
          this.tableData1 = tableData.userLogInfo        
      }
     
    }


	}

  }

</script>

<style>
 .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

 .divide {
  margin: 20px 0;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>