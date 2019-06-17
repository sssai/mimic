<template>
<div>
  <el-row type="flex" class="row-bg" justify="center">

  <!-- 组列表 -->
  <el-col style="width:350px;">
 	<!-- <el-row type="flex" justify="center">组列表</el-row> -->
    <!-- 组管理操作按钮 -->
    <el-row type="flex" justify="end">
        <el-button type="primary" size="medium" @click="CreatGroup(tableData1)" round class="btn-operation">+</el-button>
    </el-row>

    <el-table
      ref="singleTable"
      highlight-current-row
      :data="tableData1"
      stripe
      border
      style="width: 100%"
      height="400"
      @current-change="Select_group">

      <el-table-column
        prop="id"
        label="id"
        width="85">
      </el-table-column>
      <el-table-column
        prop="group"
        label="组群名称"
        width="120">
      </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="DeleteGroup(scope.$index, tableData1)"
          type="text"
          size="small">
          删除
        </el-button>
<!--         <el-button
          @click.native.prevent="RenameGroup(scope.$index, tableData1)"
          type="text"
          size="small">
          重命名
        </el-button> -->
      </template>
    </el-table-column>
    </el-table>



  </el-col>

 <el-col style="width:100px;">
 </el-col>

<!-- 组内成员 -->
  <el-col style="width:250px;">
<!--  	<el-row type="flex" justify="center">组内成员</el-row> -->
 	<el-row type="flex" justify="end">
        <el-button type="primary" size="medium"  @click="DeleteChoose()" round class="btn-operation">-</el-button>
 	</el-row>

    <el-table
      ref="GroupUsersTable"
      :data="tableData2"
      stripe
      border
      style="width: 100%"
      height="400"
      @selection-change="handleSelectionChange_group">

      <el-table-column
        type="selection"
        width="50">
      </el-table-column>

      <el-table-column
        prop="userName"
        label="组内成员"
        width="199">
      </el-table-column>

    </el-table>

  </el-col>

<!-- 组内用户管理操作按钮 -->
 <el-col style="width:100px;">

 </el-col>


<!-- 用户列表 -->
  <el-col style="width:250px;">
<!--  	<el-row type="flex" justify="center">可选用户</el-row> -->

 	<el-row type="flex" justify="end">
         <el-button type="primary" size="medium" @click="AddChoose()" round class="btn-operation">+</el-button>
 	</el-row>

    <el-table
      ref="UsersTable"
      :data="tableData3"
      stripe
      border
      style="width: 100%"
      height="400"
      @selection-change="handleSelectionChange_user">
      <el-table-column
        type="selection"
        width="50">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="可选用户"
        width="199">
      </el-table-column>

    </el-table>


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
import * as authGroup from '../../../api/authGroup'

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
// Vue.use(Message)
// Vue.use(MessageBox)

export default {
  mounted: async function() {
    await this.updatePage()
  },

 data() {
      return {

        multipleSelection_groupmember: [],
        multipleSelection_user: [],
        select_group:0,
      	//表内数据
        tableData1: [], //组
        tableData2: [], //组成员
        tableData3: [], //用户
      }
    },

 methods: {
     // 将更新整个页面的功能抽离成一个公共函数
    async updatePage(){
 		   this.tableData1 = await authGroup.GetGroups()
    },

     //删除行
     deleteRow(index, rows) {
        rows.splice(index, 1);
      },

     //删除组
    DeleteGroup(index, rows) {
        let select_id= rows[index].id
        let select_group= rows[index].group
   
        console.log(select_group)
        authGroup.DeleteGroup2(select_id,select_group)
        .then(() => {
          rows.splice(index, 1);
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
                    if(e.message=="Error: 您已在另一地点登录，请重新登录！"){
                     this.$router.push({ path: '/'})
                    }
        })
      },

     //新建组
     CreatGroup(table){

        MessageBox.prompt('请输入新组名', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',

          //设置输入格式
          // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          // inputErrorMessage: '邮箱格式不正确',
        }).then(({ value }) => {

              //反馈更名信息至后台
              console.log(value)
              authGroup.CreateGroup(value)
               .then(() => {
                    Message({
                      showClose: true,
                      message: '成功创建新组：'+ value,
                      type: 'success',
                      duration: 2000
                    })
                        //将新组在表格中显示出来
                      var list = {
                          id: "#",
                          group: value
                      }
                        table.unshift(list)
                  })
                  .catch(e => {
                   // console.log(555,e.message)       
                    Message({
                      showClose: true,
                      message: e.message,
                      type: 'error',
                      duration: 2000
                    })
                    if(e.message=="Error: 您已在另一地点登录，请重新登录！"){
                     this.$router.push({ path: '/'})
                    }

                  })
        }).catch(() => {
          Message({
            type: 'info',
            message: '取消输入',
            duration: 2000
          });
        });
     },

     //重命名组
     RenameGroup(index, rows){
        MessageBox.prompt('请输入新组名', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',

          //设置输入格式
          // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          // inputErrorMessage: '邮箱格式不正确',
        }).then(({ value }) => {
           //反馈更名信息至后台
           console.log("new name now")
           let selectID = rows[index].id
           let selectGroup = rows[index].group
           authGroup.ChangeGroupName(selectID,value)
               .then(() => {
                    Message({
                      showClose: true,
                      message: selectGroup +' 组的名字已更新为：'+ value,
                      type: 'success',
                      duration: 2000
                    })
                    //将表格中替换为新组名
                    rows[index].group=value
                  })
                  .catch(e => {
                   // console.log(555,e.message)       
                    Message({
                      showClose: true,
                      message: e.message,
                      type: 'error',
                      duration: 2000
                    })
                    if(e.message=="Error: 您已在另一地点登录，请重新登录！"){
                     this.$router.push({ path: '/'})
                    }

                  })
        }).catch(() => {
          Message({
            type: 'info',
            message: '取消输入'
          });
        });
      },


      //删除某组内全部用户

      DeleteChoose(){
        //获取勾选行index
        let row_index='';
        let choosen=[];

        this.multipleSelection_groupmember.forEach((value,index,array)=>{
        	   //将选择对象从组内成员表中移除
        		this.tableData2.forEach((v,i,a)=>{
        			if(value.userName==v.userName){
        				row_index=i
        				let select_user= this.tableData2[row_index].userName
        				authGroup.DeleteUserFromGroup(select_user,this.select_group,'del')
                        .then(() => {
                            this.deleteRow(row_index,this.tableData2) //执行对应行相关操作
                            //将选择对象添加至用户列表中
                            if(choosen.indexOf(value)==-1){
                              choosen.push(value)
                              let list = {
                                userName: value.userName
                               };
                               this.tableData3.unshift(list)
                             }
                            Message({
                              showClose: true,
                              message: '操作成功',
                              type: 'success',
                              duration: 2000
                            })
                          })
                          .catch(e => {
                           // console.log(555,e.message)       
                            Message({
                              showClose: true,
                              message: e.message,
                              type: 'error',
                              duration: 2000
                            })
                            
                            if(e.message=="Error: 您已在另一地点登录，请重新登录！"){
                             this.$router.push({ path: '/'})
                            }

                          })
        			}
        		})

        })

      },

      //添加用户列表中全部用户至某组中
    AddChoose(){
        let row_index='';
        let choosen=[];

        this.multipleSelection_user.forEach((value,index,array)=>{
            //将选择对象从用户列表中移除
        	this.tableData3.forEach((v,i,a)=>{
        			if(value.userName==v.userName){
        				row_index=i
        				let select_user= this.tableData3[row_index].userName
        				authGroup.AddUserToGroup(select_user,this.select_group)
                        .then(() => {
                      this.deleteRow(row_index,this.tableData3) //执行对应行相关操作
                      //将选择对象添加至组内成员表中
                      if(choosen.indexOf(value)==-1){
                        choosen.push(value)
                        let list = {
                          userName: value.userName
                         };
                         this.tableData2.unshift(list)
                       }

                            Message({
                              showClose: true,
                              message: '操作成功',
                              type: 'success',
                              duration: 2000
                            })
                          })
                          .catch(e => {
                           // console.log(555,e.message)       
                            Message({
                              showClose: true,
                              message: e.message,
                              type: 'error',
                              duration: 2000
                            })
                            
                            if(e.message=="Error: 您已在另一地点登录，请重新登录！"){
                             this.$router.push({ path: '/'})
                            }

                          })

        			}
        		})
        })

      },

      //选择当前组查看其成员
    async Select_group(val){

     	let selectGroup = val.group

     	this.select_group= selectGroup
     	// console.log(this.select_group)


     	this.tableData2 = await authGroup.GroupUserRela(selectGroup,"groupUsers") //获取对应组内成员数据
     	this.tableData3 = await authGroup.GroupUserRela(selectGroup,"notGroupUsers") //获取对应可选用户列表数据
     },

      //处理组内成员列表多选
	     handleSelectionChange_group(val) {
	      // 选中的都是一整行数据
	      this.multipleSelection_groupmember = val

	    },

      //处理用户列表多选
	     handleSelectionChange_user(val) {
	      // 选中的都是一整行数据
	      this.multipleSelection_user = val

	    },

    },





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
.btn-operation{
	position: absolute;
	margin-top: 3px;

	z-index: 50;
	background-color:transparent;
	color: #66b1ff;
	border: none;
	font-size: 23px;
	font-weight:bold;
	height: 40px;
	text-align: center;
}
</style>
