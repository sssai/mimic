/**
 * @author Craig
 * @version 1.0.0
 * @date    2018-03-09
 * @description 系统报表
 *              这里的actions采用了async await，并且把错误抛出，交给调用者处理。
 */
import * as types from '../mutation-types'
import * as reportForm from '@/api/reportForm'
/**
 * user的初始状态
 * @type {Object}
 */
const state = {
  charttype: '',
  chartspan: '',
  time: '',
  info: [],
  chartopt: {
    series: [{
      data: [],
      type: 'bar'
    }]
  },
  exportdata: [] // 用于保存导出报表的数据
}

const getters = {
  getCharttype: state => {
    return state.charttype
  },
  getChartspan: state => {
    return state.chartspan
  },
  getTime: state => {
    return state.time
  },
  getInfo: state => {
    return state.info
  },
  getChartOpt: state => {
    return state.chartopt
  },
  getExportData: state => {
    return state.exportdata
  }
}
const mutations = {
  [types.GET_FS_SAFE_REPORT_FORMAT](state, payload) {
    state.charttype = payload.charttype
    state.chartspan = payload.chartspan
    state.chartopt = payload.chartopt
    state.time = payload.time
    state.type = payload.type
    state.exportdata = payload.exportdata
  },
  [types.GET_FS_SAFR_REPORT_INFO](state, payload) {
    state.info = payload.info
  }
}

const actions = {
  async getfssafereport({
    commit
  }, payload) {
    // 从后台获取异常日志信息info[]
    payload = payload.data
    // 从后台获取报表的信息，保存到data的info中
    let data = await reportForm.GetFSSafeReport(payload)
    console.log("payload.charttype:"+payload.charttype);
    let datanew = data || {
      info: []
    }
    datanew.charttype = payload.charttype
    datanew.chartspan = payload.chartspan
    datanew.time = payload.time
    datanew.chartopt = {
      title: {
        text: '',
        x: '50%',
        textAlign: 'center'
      },
      series: [{
        data: [],
        type: payload.charttype
      }]
    }
    datanew.exportdata = []
    // 用户希望展示的报表周期，如年、月、日
    let chartspan = payload.chartspan
    // 用户要获取的报表的年份
    let targetYear = payload.time.getFullYear()
    // 用户要获取的报表的月份，若没有则空
    let targetMonth = payload.time.getMonth()
    // 用户要获取的报表的日期，若没有则空
    let targetDay = payload.time.getDate()
    let resultReportMap = new Map()
    // 报表周期对应的时间轴，如x轴分为12个月，31天，或24小时，分别对应年、月、日
    let dataspan
    // 判断用户要获取的报表周期
    if (chartspan == "year") {
      dataspan = 12
      datanew.exportdata = datanew.info
      for (let i = 0; i < datanew.info.length; i++) {
        let opera_date = ChangeStrToDate(datanew.info[i].time)
        // 查看目标年份各月份的故障数量
        if (opera_date.getFullYear() == targetYear) {
          if (!resultReportMap.has(opera_date.getMonth() + 1)) {
            resultReportMap.set((opera_date.getMonth() + 1), 1)
          } else {
            resultReportMap.set((opera_date.getMonth() + 1),
              (resultReportMap.get(opera_date.getMonth() + 1) + 1))
          }
        }
      }
      datanew.chartopt.title.text = targetYear + "年各月份异常情况"
    } else if (chartspan == "month") {
      // 获取当月天数
      let d = new Date(targetYear, targetMonth, 0);
      dataspan = d.getDate()
      for (let i = 0; i < datanew.info.length; i++) {
        let opera_date = ChangeStrToDate(datanew.info[i].time)
        // 查看目标月份每天的故障数量
        if (opera_date.getFullYear() == targetYear &&
          opera_date.getMonth() == targetMonth) {
          if (!resultReportMap.has(opera_date.getDate())) {
            resultReportMap.set(opera_date.getDate(), 1)
          } else {
            resultReportMap.set(opera_date.getDate(), (resultReportMap.get(opera_date.getDate()) + 1))
          }
          datanew.exportdata.push(datanew.info[i])
        }
      }
      datanew.chartopt.title.text = targetYear + "年" + (targetMonth + 1) + "月每日异常情况"
    } else {
      // 用户选择了日，跳转到这里，此时的x轴为24小时
      dataspan = 24
      for (let i = 0; i < datanew.info.length; i++) {
        let opera_date = ChangeStrToDate(datanew.info[i].time)
        // 查看目标日每小时的故障情况
        if (opera_date.getFullYear() == targetYear &&
          opera_date.getMonth() == targetMonth &&
          opera_date.getDate() == targetDay) {
          if (!resultReportMap.has(opera_date.getHours())) {
            resultReportMap.set(opera_date.getHours(), 1)
          } else {
            resultReportMap.set(opera_date.getHours(), (resultReportMap.get(opera_date.getHours()) + 1))
          }
          datanew.exportdata.push(datanew.info[i])
        }
      }
      datanew.chartopt.title.text = targetYear + "年" + (targetMonth + 1) + "月" + targetDay + "日每小时异常情况"
    }
    // 开始设置图标的参数
    if (datanew.charttype == "pie") {
      // 若为饼图，需option的参数
      datanew.chartopt.tooltip = {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      }
      datanew.chartopt.legend = {
        type: 'scroll',
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data: [],
      }
      let chartdata = []
      let legendData = []
      for (let i = 0; i < dataspan; i++) {
        let a = i
        if (chartspan == "month") {
          a = i + 1
        }
        // 如果获取到的数据汇中含有异常信息，则加入到图表的信息中
        if (resultReportMap.get(a)) {
          if (chartspan == "year") {
            chartdata.push({
              value: resultReportMap.get(a) | 0,
              name: a +"月"
            })
            legendData.push(a +"月")
          } else if (chartspan == "month") {
            chartdata.push({
              value: resultReportMap.get(a) | 0,
              name: a +"日"
            })
            legendData.push(a +"日")
          } else {
            chartdata.push({
              value: resultReportMap.get(a) | 0,
              name: a +"时"
            })
            legendData.push(a +"时")
          }
        }
      }
      datanew.chartopt.tooltip.formatter = "{b} ：异常{c}次 <br/>占总比例{d}%"
      datanew.chartopt.series[0].data = chartdata
      datanew.chartopt.legend.data = legendData
    } else {
      // 如果是柱状图和折线图，则使用默认option即可，若为饼图，则需要进一步添加option的参数
      datanew.chartopt.tooltip = {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      }
      datanew.chartopt.xAxis = {
        type: 'category',
        "axisLabel": {
          interval: 0
        },
        name: 'X Axis',
        data: []
      }
      datanew.chartopt.yAxis = {
        type: 'value',
        name: '异常次数'
      }
      if (chartspan == "year") {
        datanew.chartopt.tooltip.formatter = "{b} 月 ：异常{c}次"
        datanew.chartopt.xAxis.name = "月份"
      } else if (chartspan == "month") {
        datanew.chartopt.tooltip.formatter = "{b} 号 ：异常{c}次"
        datanew.chartopt.xAxis.name = "日期"
      } else {
        datanew.chartopt.tooltip.formatter = "{b} 时 ：异常{c}次"
        datanew.chartopt.xAxis.name = "小时"
      }
      let x = []
      let y = []
      for (let i = 0; i < dataspan; i++) {
        if (chartspan == "date") {
          x.push(i)
          y.push({
            value: resultReportMap.get(i) | 0,
            name: i
          })
        } else {
          x.push(i + 1)
          y.push({
            value: resultReportMap.get(i + 1) | 0,
            name: (i + 1)
          })
        }
      }
      datanew.chartopt.xAxis.data = x
      datanew.chartopt.series[0].data = y
    }
    commit(types.GET_FS_SAFE_REPORT_FORMAT, datanew)
    commit(types.GET_FS_SAFR_REPORT_INFO, datanew)
    if (!data) {
      throw new Error('服务器出错！')
    }
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}


function ChangeStrToDate(date_string) {
  /*用于校验日期格式的正则表达式，用于确认输入的date_string格式为"2018-02-01 00:01:59"，正则表达式的可视图见地址：
  https://jex.im/regulex/#!embed=true&flags=&re=%5E(%5Cd%7B4%7D)(-(%5Cd%7B2%7D))%7B2%7D%5Cs(%5B0-1%5D%5B0-9%5D%7C2%5B0-3%5D)(%3A%5B0-5%5D%5B0-9%5D)%7B2%7D%24*/
  /*console.log("date_string:" + JSON.stringify(date_string));
  console.log("date_string:" + date_string);*/
  let reg = date_string.match(/^(\d{4})(-(\d{2})){2}\s([0-1][0-9]|2[0-3])(:[0-5][0-9]){2}$/)
  if (reg == null) {
    return undefined
  }
  let str = (date_string).replace(/-/g, "/")
  return new Date(str)
}
