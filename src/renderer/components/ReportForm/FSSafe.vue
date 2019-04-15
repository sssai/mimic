<template>
<el-row style="height:100%;width:100%">
  <el-col :span="8" style="height:10%;padding-top:50px">
    <el-form ref="form" :model="form" label-width="90px">
      <el-form-item label="报表类型">
        <el-radio-group v-model="form.charttype">
          <el-radio-button label="bar">柱状图</el-radio-button>
          <el-radio-button label="line">折线图</el-radio-button>
          <el-radio-button label="pie">饼图</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="报表周期">
        <el-radio-group v-model="form.chartspan">
          <el-radio-button label="date">日</el-radio-button>
          <!--<el-radio-button label="week">周</el-radio-button>-->
          <el-radio-button label="month">月</el-radio-button>
          <el-radio-button label="year">年</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="选择时间" prop="time" :rules="[{ type: 'date', required: true, message: '请选择时间' , trigger: 'change' }]">
        <el-date-picker v-model="form.time" :type="getformspan" placeholder="选择时间段" validate-event>
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">预览</el-button>
        <el-button type="primary" @click="exportExcel('form')">导出Excel</el-button>
      </el-form-item>
    </el-form>
  </el-col>
  <el-col :span="16" id="resultchart" style="height:400px;">
  </el-col>
</el-row>
</template>

<script>
import Vue from 'vue'
import echarts from 'echarts'
import * as reportForm from '@/api/reportForm'
import {
  export_json_to_excel
} from 'vendor/Export2Excel.js'
import {
  Button,
  Input,
  Form,
  FormItem,
  Message,
  DatePicker,
  Row,
  Col
} from 'element-ui'
import {
  dialog
} from 'electron'

Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(DatePicker)
Vue.use(Row)
Vue.use(Col)

export default {
  name: 'fssafe',
  data() {
    return {
      form: {
        charttype: 'bar',
        chartspan: 'date',
        time: ''
      },
      myChart: [],
    }
  },
  computed: {
    getformspan() {
      return this.form.chartspan
    },
    getformtype() {
      return this.form.charttype
    },
    getOption() {
      let opt = {
        series: [{
          data: [],
          type: this.getformtype
        }]
      }
      // 如果是柱状图和折线图，则使用默认option即可，若为饼图，则需要进一步添加option的参数
      if (this.getformtype == 'pie') {
        opt.tooltip = {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        }
        opt.legend = {
          type: 'scroll',
          orient: 'vertical',
          right: 10,
          top: 20,
          bottom: 20,
          data: [],
        }
      } else {
        opt.xAxis = {
          type: 'category',
          data: []
        }
        opt.yAxis = {
          type: 'value'
        }
      }
    },
    getChartData() {
      // 获取报表的数据
      return this.$store.getters.getInfo
    },
    getChartTime() {
      // 获取报表的数据
      return this.$store.getters.getTime
    },
    getChartOpt() {
      // 获取图表的设置
      return this.$store.getters.getChartOpt
    },
    getExportData() {
      return this.$store.getters.getExportData
    },
    getChartspan() {
      return this.$store.getters.getChartspan
    }
  },
  watch: {
    getChartOpt: function() {
      // 这里用于监视图表是否有变化，有的话更新数据图
      let dom = document.getElementById("resultchart");
      let option = this.getChartOpt;
      if (option.series[0].data.length <= 0 || option.series[0].data == undefined) {
        Message({
          showClose: true,
          message: "选择的时间段没有异常数据，请重新选择时间",
          type: 'error',
          duration: 2000
        })
      } else {
        /* // 打印图表的option信息
        console.log("option:" + JSON.stringify(option));*/
        this.myChart = echarts.init(dom, null, {
          renderer: 'canvas'
          /*renderer: 'svg'*/
        });
        this.myChart.hideLoading()
        this.myChart.setOption(option, true);
        window.onresize = this.myChart.resize;
      }
    }
  },
  methods: {
    async onSubmit(formName) {
      let year = []
      await this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            charttype: this.form.charttype,
            chartspan: this.form.chartspan,
            time: this.form.time
          };
          this.$store.dispatch('getfssafereport', {
            data
          }).catch((e) => {
            Message({
              showClose: true,
              message: e.message,
              type: 'error',
              duration: 2000
            })
            if (e.message == "Error: 您已在另一地点登录，请重新登录！") {
              this.$router.push({
                path: global_.LOGIN_PAGE
              })
            }
          })
        } else {
          Message({
            showClose: true,
            message: "请选择时间",
            type: 'error',
            duration: 2000
          })
          return false;
        }
      });
    },
    async createGraph() {
      let thisVue = this; // 作用域问题，在getOverViewEveryTwoSec中直接使用的this指向global对象而非VueComponent
      let opt = thisVue.getChartOpt;
      let firstRefreshPie = async function() {
        let dom = document.getElementById("resultchart");
        //获取父容器的宽度具体数值直接赋值给图表以达到宽度100%的效果
        /*document.getElementById("resultchart").css('width', document.getElementById("pane-0").width);*/
        /*数据量少且简单，使用svg性能更优*/
        thisVue.myChart = echarts.init(dom, null, {
          renderer: 'canvas'
          /*renderer: 'svg'*/
        });
        thisVue.myChart.showLoading({
          text: '',
          zlevel: 0,
          maskColor: 'rgba(255, 255, 255, 0)',
        });
        let app = {};
        let option = opt;
        if (option && typeof option === "object") {
          thisVue.myChart.hideLoading()
          // console.log("thisVue.myChart.setOption(option, true):" + JSON.stringify(option));
          thisVue.myChart.setOption(option, true);
        }
        window.onresize = thisVue.myChart.resize;
      }
      firstRefreshPie();
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    exportExcel(formName) {
      // 保存文件的路径
      // let savefilepath = ''
      let thisVue = this
      /*这两个用不上了，因为已经放弃自己获取地址来保存文件的方式，找到了第三方包，可以更方便的直接生成，无需做这些底层操作。
      但是对后续还有参考意义，所以暂时保留
      const {
        dialog
      } = require('electron').remote;
      const {
        BrowserWindow
      } = require('electron').remote*/
      if (this.form.time == '') {
        Message({
          showClose: true,
          message: "请选择日期",
          type: 'error',
          duration: 2000
        })
      } else if (this.getChartData == "" || this.getChartTime != this.form.time || this.getChartspan != this.getformspan) {
        // 通过判断vuex中的图表信息是否为空，vuex中的图表时间和提交时的表单时间是否一致，以及vuex中时间间隔和表单中的时间间隔是否一致
        // 来判断用户是否有重新生成预览的表单，若没有重新生成，则不给导出数据
        Message({
          showClose: true,
          message: "请先生成图表，再导出数据",
          type: 'error',
          duration: 2000
        })
      } else if (this.getChartOpt.series[0].data.length <= 0 || this.getChartOpt.series[0].data == undefined) {
        // 如果图标数据为空或者未定义，说明没有成功生成图表数据或生成图表数据失败，此时数据为空，导出数据无意义，不给导出数据
        Message({
          showClose: true,
          message: "选择的时间段没有异常数据，请重新选择时间",
          type: 'error',
          duration: 2000
        })

      } else {
        let savefilename = this.form.time.getFullYear()
        // 设置要导出的文件标题
        if (this.form.chartspan == "year") {
          savefilename = savefilename + "年全年异常情况"
        } else if (this.form.chartspan == "month") {
          savefilename = savefilename + '年' + (this.form.time.getMonth() + 1) + "月全月异常情况"
        } else {
          savefilename = savefilename + '年' + (this.form.time.getMonth() + 1) + '月' + this.form.time.getDate() + "日全天整体异常情况"
        }
        /*这个是通过electron调用原生的文件保存窗口，通过这个可以让用户选择自己想要保存的位置，然后会把位置以字符串的形式返回
          但是这个后来发现导出Excel的工具中会自动弹出这个窗口，所以这个方法用不上了
          但是仍有保存的意义，后续可以作为其他类似开发的参考
          savefilepath = dialog.showSaveDialog(
          BrowserWindow.getFocusedWindow(), // 返回此应用程序中当前获得焦点的窗口，即主窗体，防止多开文件保存窗口
          {
            defaultPath: savefilename, // 设置默认文件名
            title: "数据保存的位置",
            filters: [{
              name: 'Ecxel',
              extensions: ['xlsx']
            }]
          },
          function(filename) { // 弹出对话框，操作之后的回调函数
          }
        )*/
        require.ensure([], () => {
          // 表头
          let tHeader = ['异常事件id', '异常时间'];
          //表头对应字段名，要和下面数据key对应
          let filterVal = ['id', 'time'];
          // 数据来源
          // let list = this.serachData;
          //模拟数据
          let list = []
          // 获取要导出的数据，后端传来的数据处理后为map类型的
          let map = this.getExportData
          // 把vuex中保存的map 转为list
          for (let key in map) {
            list.push(map[key]);
          }
          //数据格式化，把数组转为索引数组
          let data = this.formatJson(filterVal, list);
          //导出文件
          export_json_to_excel(tHeader, data, savefilename);
        })
      }
    }
  },
  mounted: async function() {
    setTimeout(() => {
      this.createGraph()
    }, 0)
  },
}
</script>
<style media="screen">
.fullScreen {
  height: 100%
}

.el-tabs__content .el-tab-pane {
  height: 100%;
  width: 100%
}
</style>
