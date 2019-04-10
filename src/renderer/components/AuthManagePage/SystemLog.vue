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
    <el-button icon="el-icon-search" @click="getlogInfo()" style="position:absolute;left:355px;"></el-button> 
  </el-row>
<!-- 
   <div style="margin-top: 15px; margin-bottom:10px;">
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
    <el-button icon="el-icon-search" @click="getlogInfo()" style="position:absolute;left:515px;"></el-button> 
   </div> -->

  <el-table
    stripe
      stripe
  
    :data="tableData1"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">

          <el-form-item label="详细信息">
            <span>{{ props.row.logInfo }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>

    <el-table-column
      label="日志时间"
      align="center"
      prop="logDate">
    </el-table-column>

    <el-table-column
      label="日志线程Id"
      align="center"
      prop="logThreadId">
    </el-table-column>

    <el-table-column
      label="日志类型"
      align="center"
      prop="logLevel"
      width="160">
    </el-table-column> 

    <el-table-column
      label="对应级别"
      align="center"
      prop="logLevelInt"
      width="160">
    </el-table-column> 


    <el-table-column
      label="日志出现的位置"
      align="center"
      prop="logLocation">
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
            @current-change="handleCurrentChange">
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
import * as errormessage from '@/api/errormessage'

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
        total:0,
        currentPage:1,
        pageSize:20,

        timevalue:'',

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
    console.log()

    this.timer = setInterval(async () => {
      if(this.tableData1==""){
         await this.updatePage()
      }
    }, 4000)

  },
  destroyed: function(){
    clearInterval(this.timer)
  },

methods: {
     // 将更新整个页面的功能抽离成一个公共函数
    async updatePage(){
    
 		let tableData = await errormessage.GetRecentLog()
    this.pageSize= 20
    this.total=20
    this.tableData1 = tableData.logInfo

    },

    async handleCurrentChange(val){

        this.currentPage= val
        this.pageSize= 10

        let startTime = this.timevalue[0] + ' 00:00:00'
        let endTime = this.timevalue[1] +' 23:59:59'
        let tableData= await errormessage.GetLogByTime(startTime,endTime,this.pageSize,this.currentPage)
        this.tableData1 = tableData.logInfo
        this.currentPage= +tableData.currentPage
        this.total= +tableData.total
    
    },
    async getlogInfo(){
        let startTime = this.timevalue[0] + ' 00:00:00'
        let endTime = this.timevalue[1] +' 23:59:59'
        this.pageSize= 10
        let tableData= await errormessage.GetLogByTime(startTime,endTime,this.pageSize,this.currentPage)
        this.tableData1 = tableData.logInfo
        this.currentPage= +tableData.currentPage
        this.total= +tableData.total
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