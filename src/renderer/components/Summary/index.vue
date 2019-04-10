<template>
<el-container class='fullScreen' v-loading="loading">
  <el-header style="background-color:#f9fafc;">
    <h1 id="head">
      <el-breadcrumb separator="/">概览</el-breadcrumb>
    </h1>
  </el-header>
  <el-main id="main">

    <el-row class="monitor_row">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span><strong>MDFS状态监控</strong></span>
        </div>
        <el-row class="mdfs_monitor_row">
          <el-col :span="6" class="mdfs_left_col">
            <el-row class="mycard text item card_beauty">
              <el-col :span="12">
                MDFS状态
              </el-col>
              <el-col :span="12">
                <div v-if='getMdfsState.state == "0"' style="color:green;
              display: flex;
              align-items: center;
              justify-content: center;">
                  <i class="el-icon-check"></i>
                  <strong>正常</strong>
                </div>
                <div v-else style="color:red;
              display: flex;
              align-items: center;
              justify-content: center;">
                  <i class="el-icon-close"></i>
                  异常
                </div>
              </el-col>
            </el-row>
            <el-row class="mdfs_state_panl card_beauty">
              MDFS总容量
              <el-row style="height:25px;font-size:30px;font-family:'微软雅黑';margin-top:10px;
              display: flex;
              align-items: center;
              justify-content: center;">{{ formateMdfsStorage || 0}}G</el-row>
            </el-row>
            <el-row class="card_beauty mdfs_state_panl">
              MDFS可用容量
              <el-row style="height:25px;font-size:30px;font-family:'微软雅黑';margin-top:10px;
              display: flex;
              align-items: center;
              justify-content: center;">{{ formateMdfsAvailable || 0}}G</el-row>
            </el-row>
          </el-col>
          <el-col :span="18" class="mdfs_rigth_col text">
            <el-row class="mycard card_beauty">当前MDFS挂载路径：<strong>{{getMdfsState.mdfsInfo.mdfsMntPath}}</strong></el-row>
            <el-row class="text item">
              <el-col :span="12">
                <div id="upRateChart" ref="upRateChart" class="rate_panl card_beauty">
                  加载中...
                </div>
              </el-col>
              <el-col :span="12">
                <div id="downRateChart" ref="downRateChart" class="rate_panl card_beauty">
                  加载中...
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
    <el-row class="monitor_row">

      
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span><strong>底层文件系统状态监控</strong></span>
        </div>
        <el-row id="fstable_row">
          <el-table :data="bottomfsStateList" height="250" border style="width: 100%">
            <el-table-column prop="bottomFsId" label="文件系统id" width="110">
            </el-table-column>
            <el-table-column prop="fsStorage" label="存储容量" width="150">
            </el-table-column>
            <el-table-column prop="fsAvailable" label="可用容量" width="150">
            </el-table-column>
            <el-table-column prop="fsType" label="文件系统类型" width="150">
            </el-table-column>
            <el-table-column prop="fsMntPath" label="挂载路径">
            </el-table-column>
            <el-table-column prop="fsStatus" label="运行状态" width="80">
            </el-table-column>
          </el-table>
        </el-row>
        <el-row style="text-align:center">
          <div style="margin:5px">
            <el-button plain v-if="!openTable" size="mini" @click="changeTabelHeigth()"><i class="el-icon-caret-bottom"></i>展开表格</el-button>
            <el-button plain v-else size="mini" @click="changeTabelHeigth()"><i class="el-icon-caret-top"></i>收回表格</el-button>
          </div>
          <!-- <el-pagination background layout="prev, pager, next" :total="1000">
          </el-pagination> -->
        </el-row>
      </el-card>
    </el-row>
  </el-main>
  <foot></foot>
</el-container>
</template>

<script>
import {
  Message,
  Loading,
  Card,
} from 'element-ui'
import {
  mapState
} from 'vuex'
import echarts from 'echarts'
import Foot from '@/components/common/Foot'

export default {
  components: {
    Foot
  },
  computed: {
    isInSummary() {
      return this.$store.getters.getInSummary
    },
    getMdfsState() {
      return this.$store.getters.getMdfsState
    },
    getBottomfsState() {
      return this.$store.getters.getBottomfsState
    },
    formateMdfsStorage() {
      return (this.getMdfsState.mdfsInfo.mdfsStorage).toFixed(2)
    },
    formateMdfsAvailable() {
      return (this.getMdfsState.mdfsInfo.mdfsAvailable).toFixed(2)
    }
  },
  data() {
    return {
      mdfsState: true,
      bottomfsDataTable: [],
      openTable: false,
      loading: true,
      bottomfsStateList: []
    }
  },
  mounted() {
    setTimeout(this.updateSummary, 1000);
    setTimeout(this.drawLine, 1000);
  },
  methods: {
    async updateSummary() {
      await this.$store.dispatch('getmdfsstate', {}).catch((e) => {
        if (this.$store.getters.getInSummary) {
          Message({
            showClose: true,
            /*message: "获取异常：" + e.toString(),*/
            message: "系统信息获取异常",
            type: 'error',
            duration: 2000
          });
        }
      });
      await this.$store.dispatch('getbottomfsstate', {}).catch((e) => {
        if (this.$store.getters.getBottomFsState) {
          Message({
            showClose: true,
            /*message: "获取异常：" + e.toString(),*/
            message: "系统信息获取异常",
            type: 'error',
            duration: 2000
          });
        }
      });
      /*console.log("【this.$store.getters.getInSummary】" + this.$store.getters.getInSummary);*/
      /*console.log("【this.isInSummary】" + this.isInSummary);*/
      // 递归调度，自动从后台获取overview对象，用于更新数据
      if (this.$store.getters.getInSummary) {
        setTimeout(this.updateSummary, 4000);
      }
      this.loading = false
    },
    drawLine() {
      try {
        // 基于准备好的dom，初始化echarts实例
        let upRateChart = echarts.init(this.$refs.upRateChart)
        let downRateChart = echarts.init(this.$refs.downRateChart)
        upRateChart.showLoading();
        downRateChart.showLoading();
        console.log("upRateChart", upRateChart);
        console.log("downRateChart", downRateChart);
        // 绘制图表
        upRateChart.setOption({
          animation: false,
          title: {
            text: '当前上行速率：0 k/s',
            textStyle: {
              fontSize: 17,
              fontWeight: "normal",
              fontFamily: "Microsoft YaHei"
            },
            left: 'left'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              label: {
                backgroundColor: '#6a7985'
              },
              animation: false
            },
            formatter: function(params, ticket, callback) {
              let a = params[0].value
              if (a > 1024) {
                a = (a / 1024).toFixed(2)
                a = a + ' M/s'
              } else {
                a = a + ' k/s'
              }
              return a;
            }
          },
          grid: {
            x: "5%",
            y: "20%",
            x2: "5%",
            y2: "10%",
            borderWidth: 1
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisTick: {
              show: false
            },
            data: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
          },
          yAxis: {
            type: 'value',
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            }
          },
          series: [{
            type: 'line',
            hoverAnimation: false,
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            areaStyle: {}
          }]
        });
        downRateChart.setOption({
          animation: false,
          title: {
            text: '当前下行速率：0 k/s',
            textStyle: {
              fontSize: 17,
              fontWeight: "normal",
              fontFamily: "Microsoft YaHei"
            },
            left: 'left'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              label: {
                backgroundColor: '#6a7985'
              }
            },
            formatter: function(params, ticket, callback) {
              let a = params[0].value
              if (a > 1024) {
                a = (a / 1024).toFixed(2)
                a = a + ' M/s'
              } else {
                a = a + ' k/s'
              }
              return a;
            }
          },
          grid: {
            x: "5%",
            y: "20%",
            x2: "5%",
            y2: "10%",
            borderWidth: 1
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisTick: {
              show: false
            },
            data: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
          },
          yAxis: {
            type: 'value',
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            }
          },
          series: [{
            type: 'line',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            hoverAnimation: false,
            areaStyle: {
              color: '#AED4C2'
            },
            lineStyle: {
              color: '#91C7AE'
            },
            itemStyle: {
              color: '#91C7AE'
            }
          }]
        });
        upRateChart.hideLoading();
        downRateChart.hideLoading();
        console.log("upRateChart.getOption()", upRateChart.getOption());
        // 随屏幕大小改变大小
        window.onresize = function() {
          upRateChart.resize()
          downRateChart.resize()
        };
      } catch (e) {
        setTimeout(
          this.drawLine, 1000);
      }
    },
    changeTabelHeigth() {
      this.openTable = !this.openTable
      let panl = document.getElementById("fstable_row")
      let table = (document.getElementsByClassName('el-table'))[0]
      let table_head = document.getElementsByClassName('has-gutter')[0]
      if (this.openTable) {
        panl.style.height = "530px"
        table.style.height = "530px"
      } else {
        panl.style.height = "250px"
        table.style.height = "250px"
      }
      table_head.style.width = '100%'
    },
  },
  watch: {
    isInSummary: function() {
      if (this.$store.getters.getInSummary == true) {
        this.updateSummary()
      }
    },
    getMdfsState: function() {
      let upRateChart = echarts.init(document.getElementById('upRateChart'))
      let upRateChartOption = upRateChart.getOption()
      let currentUpRate = this.getMdfsState.mdfsInfo.upLinkSpeed
      let arr_upRate = upRateChartOption.series[0].data
      arr_upRate.push(currentUpRate)
      arr_upRate.shift()
      upRateChartOption.series[0].data = arr_upRate
      if (currentUpRate > 1024) {
        currentUpRate = (currentUpRate / 1024).toFixed(2)
        currentUpRate = currentUpRate + ' M/s'
      } else {
        currentUpRate = currentUpRate + ' k/s'
      }
      upRateChartOption.title[0].text = '当前上行速率：' + currentUpRate
      upRateChart.setOption(upRateChartOption)

      let downRateChart = echarts.init(document.getElementById('downRateChart'))
      let downRateChartOption = downRateChart.getOption()
      let currentDownRate = this.getMdfsState.mdfsInfo.downLinkSpeed
      let arr_downRate = downRateChartOption.series[0].data
      arr_downRate.push(currentDownRate)
      arr_downRate.shift()
      downRateChartOption.series[0].data = arr_downRate
      if (currentDownRate > 1024) {
        currentDownRate = (currentDownRate / 1024).toFixed(2)
        currentDownRate = currentDownRate + ' M/s'
      } else {
        currentDownRate = currentDownRate + ' k/s'
      }
      downRateChartOption.title[0].text = '当前下行速率：' + currentDownRate
      downRateChart.setOption(downRateChartOption)
    },
    getBottomfsState: function() {
      this.bottomfsStateList = []
      for (let tempState of this.getBottomfsState.fsInfo) {
        tempState.fsAvailable = (tempState.fsAvailable).toFixed(2) + " G"
        tempState.fsStorage = (tempState.fsStorage).toFixed(2) + " G"
        this.bottomfsStateList.push(tempState)
      }
    }
  }
}
</script>
<style>
#main {
  background-color: #f9fafc;
  width: 100%
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.monitor_row {
  width: 100%;
  min-height: 360px;
  margin: 10px;
}

.box-card {
  height: 100%;
  min-height: 360px;
  width: 100%
}

.mdfs_state_monitor {}

.mdfs_monitor_row {
  height: 254px
}

.mdfs_left_col {
  height: 254px
}

.mdfs_rigth_col {
  height: 254px
}

.mycard {
  height: 60px;
  border-radius: 5px;
  margin: 5px;
  padding: 20px;
}

.mdfs_state_panl {
  margin: 5px;
  padding: 20px;
  height: 90;
}

.card_beauty {
  border: 1px solid #DDDDDD;
  border-radius: 5px;
  transition: background-color 0.4s, border 0.4s;
}

.card_beauty:hover {
  border: 1px solid #00C1DE;
  border-radius: 5px;
  background-color: #f9fafc;
}


.rate_panl {
  margin: 0 5px 0 5px;
  height: 200px
}
</style>
