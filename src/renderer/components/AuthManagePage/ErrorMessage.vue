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
    <el-button icon="el-icon-search" @click="geterrorInfo(tableData1)" style="position:absolute;left:355px;"></el-button> 
    <el-col :span="8" inline>文件系统异常次数统计（单位：次）</el-col>
    <el-col :span="4" inline>一小时内 : {{ exStaticsHour }} </el-col> <el-col :span="3" inline justify="end">一天内 : {{ exStaticsDay }} </el-col>
  </el-row>

  <el-table
    stripe
      stripe
  
    :data="tableData1"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">

          <el-form-item label="详细信息">
            <span >{{ props.row.exDetail }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>

    <el-table-column
      label="发生时间"
      align="center"
      prop="exDate">
    </el-table-column>

    <el-table-column
      label="文件系统id"
      prop="exFsId"
      align="center"
      width="100">
    </el-table-column>

    <el-table-column
      label="文件系统出错的路径"
      prop="exFsPath"
      align="center"
      width="160">
    </el-table-column> 

    <el-table-column
      label="异常文件路径"
      align="center"
      prop="exFilePath">
    </el-table-column> 

    <el-table-column
      label="转储路径"
      prop="transferPath"
      align="center"
      width="220">
    </el-table-column> 

    <el-table-column
      label="修复类型"
      prop="repairType"
      align="center"
      width="210">
    </el-table-column> 

  </el-table>


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
import * as errormessage from '../../api/errormessage'

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

        time_error:'',
        exStaticsHour:'',
        exStaticsDay:'',

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
        timevalue: '',

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
 		let tableData = await errormessage.GetRecentError()
    //console.log('hhhhhh',tableData)
        this.tableData1 = tableData.exInfo
        //this.exStatics= tableData.exStatics
        this.exStaticsHour = tableData.exStaticsHour
       this.exStaticsDay= tableData.exStaticsDay

    },

    async geterrorInfo(){
      console.log(this.timevalue[0])
      let startTime = this.timevalue[0] + ' 00:00:00'
      let endTime = this.timevalue[1] +' 23:59:59'
      let tableData= await errormessage.GetErrorByTime(startTime,endTime)
      this.tableData1 = tableData.exInfo
      this.exStaticsHour = tableData.exStaticsHour
      this.exStaticsDay= tableData.exStaticsDay


    }


	}

  }

</script>

<style>
 .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
   /* width: 200px;*/
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 70%;
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
.stat{
  color:  #696969;
}
.stat-answer{
  color:  #696969;
/*  position: absolute;
  top: -45px;
  left: 666px;*/
}

</style>