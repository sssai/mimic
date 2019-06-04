<template>
<div style="height:100%">
  <el-row type="flex" class="row-bg" justify="center">
  <el-col style="width:900px;">
  <div class="grid-content">
  <el-row type="flex" justify="end" style="margin-bottom:10px;">
      <el-col>
        <el-input v-model="input" placeholder="请输入用户名称" style="width:250px;"></el-input>
        <el-button icon="el-icon-search" @click="getuserInfo()" style="position:absolute;left:255px;"></el-button> 
      </el-col>
      <el-col style="width:80px;">
        <div>
        <!-- <el-button type="primary" size="medium" @click="goToNewUser" round>新建</el-button> -->
        <el-button type="primary" size="medium" @click="deleteUsers" round >删除</el-button>
        <!-- <el-button type="primary" size="medium" @click="goToUpdateUser" round>修改</el-button> -->
        </div>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      stripe
      border
      style="width: 100%;height:100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="50"
        align="center">
      </el-table-column>
      <el-table-column
        prop="name"
        label="用户名"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="ip"
        label="登录终端IP"
        align="center">
      </el-table-column>
      <el-table-column
        prop="mac"
        label="登录终端MAC"
        align="center">
      </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="70"
      align="center">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="goToUpdateUser(scope.$index)"
          type="text"
          size="small">
          修改
        </el-button>
      </template>
    </el-table-column>
    </el-table>

<el-dialog title="修改终端信息" :visible.sync="clientFormVisible">
    <el-label>当前选定用户：{{this.updateusername}}</el-label>
    <el-form :model="clientForm" ref="clientForm" :rules="clientRules">
      <el-form-item label="终端IP" :label-width="formLabelWidth" prop="ip">
      <el-input v-model="clientForm.ip" :placeholder="oldip"></el-input>
    </el-form-item>
    <el-form-item label="终端MAC" :label-width="formLabelWidth">
      <el-input v-model="clientForm.mac" :placeholder="oldmac"></el-input>
    </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="clientFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitClient">确 定</el-button>
    </div>
  </el-dialog>    

    </div>
  </el-col>
  </el-row>
</div>
</template>

<script>
/**
 * 这个文件是用户管理页面中的所有内容
 */
import {
  Table,
  TableColumn,
  Pagination,
  Button,
  Row,
  Col,
  Message,
  Dialog
} from 'element-ui'
import Vue from 'vue'
import global_ from '@/utils/Global'
import * as userTable from '@/api/userTable'

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Dialog)

export default {
  data() {
    let checkIP = (rule, value, callback) => {
      let reg = /([0-9]{1,3}\.{1}){3}[0-9]{1,3}/
      let valid = reg.exec(value)
      if (valid == null) {
        callback(new Error('请输入正确的IP地址'))
      } else {
        callback()
      }
    }
    return {
      tableData:[],
      input:'',
      clientFormVisible:false,
      clientForm: {
        ip: '',
        mac: '',
      },
      dialogtitle:'',
      updateusername:'',
      updateuserindex:'',
      clientRules: {
        ip: [{ validator: checkIP, trigger: 'blur,change' }]
      },
      oldip:'',
      oldmac:'',
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
    
    this.tableData = await userTable.GetAllUser()

    },

    goToUpdateUser(index) {
      // if (this.multipleSelection.length !== 1) {
      //   Message({
      //     showClose: true,
      //     message: '请选择一项用户进行修改',
      //     type: 'error',
      //     duration: 2000
      //   })
      //   return false
      // }
      // let name = this.multipleSelection[0].name
     // console.log(name)
      // this.$router.push({ path: global_.FS_USER_MANAGE.updateuser + name })
      console.log(this.tableData[index].ip)
      console.log(this.tableData[index].mac)
      this.updateusername=this.tableData[index].name
      this.updateuserindex=index
      this.oldip="当前IP："+this.tableData[index].ip
      this.oldmac="当前MAC："+this.tableData[index].mac
      this.clientFormVisible=true

    },

     //删除行
     deleteRow(index, rows) {
        rows.splice(index, 1);
      },

    async deleteUsers() {
      if (this.multipleSelection.length === 0) {
        Message({
          showClose: true,
          message: '请选择需要删除的用户',
          type: 'error',
          duration: 2000
        })
        return false
      }
     let name = this.multipleSelection.map(({ name }) => name)
           // TODO 返回结果的处理
      await userTable.DeleteDataTable(name)
                      .then(() => {
                            Message({
                              showClose: true,
                              message: '操作成功',
                              type: 'success',
                              duration: 2000
                            })
                          })
                        .catch(e => {
                          Message({
                            showClose: true,
                            message: e.message,
                            type: 'error',
                            duration: 2000
                          })
                        })
    
      this.multipleSelection.forEach((value,index,array)=>{
        this.tableData.forEach((v,i,a)=>{
          if(value.name==v.name){
            let row_index=i
            let select_user= this.tableData[row_index].name
            this.deleteRow(row_index,this.tableData) //执行对应行相关操作
          }
          
        })
      })

    },

    async getuserInfo(){
        let targetName=this.input
        //console.log(targetName)
        let data = await userTable.GetOneUserInfo(targetName)
        //在表格中置顶显示出来
                     var list = {
                          name: data.name,
                          ip: data.ip,
                          mac: data.mac
                      }
                        this.tableData.unshift(list)

    },

    submitClient(){
      this.$refs["clientForm"].validate((valid)=>{
        if (valid) {
          let data = {
            name: this.updateusername,
            ip: this.clientForm.ip,
            mac: this.clientForm.mac,
          }
          // TODO 逻辑处理，更新成功，提醒，处理跳转，
          userTable.UpdateUser(data).then(()=>{
            this.tableData[this.updateuserindex].ip=data.ip
            this.tableData[this.updateuserindex].mac=data.mac
              // this.user.ip = data.ip
              // this.user.mac = data.mac
              Message({
                showClose: true,
                message:'提交成功',
                type:'success',
                duration:2000
              })
            }).catch((e)=>{
              Message({
                showClose: true,
                message:e.message,
                type:'error',
                duration:2000
              })
            })


        }else{
          return false
        }
        this.clientFormVisible = false
      })
    },

    handleSelectionChange(val) {
      // 选中的都是一整行数据
      this.multipleSelection = val
    }
  }

}
</script>

<style>
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
