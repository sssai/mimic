<template>
<div>
  <el-row type="flex" class="row-bg" justify="center">
  <el-col style="width:1700px;">
    <div>

					<el-card class="box-card">
						<div slot="header" class="clearfix">
							<span style="font-size:18px;">用户信息</span>
						</div>
						<el-row :gutter="15">
						  <el-col :span="6":offset="2"><div style="text-align:right;">IP地址&nbsp;:</div></el-col>
						  <el-col :span="8" ><div>{{user.ip}}</div></el-col>
						</el-row>
						<el-row :gutter="15">
						  <el-col :span="6":offset="2"><div style="text-align:right;">M&nbsp;A&nbsp;C&nbsp;:</div></el-col>
						  <el-col :span="8" ><div>{{user.mac}}</div></el-col>
						</el-row>
					</el-card>
		<el-row :gutter="3">
		  <el-col :span="4"><el-button  size="small" type="primary" @click="clientFormVisible = true">修改绑定终端</el-button></el-col>
		</el-row>
    </div>
</el-col>
</el-row>

	<el-dialog title="绑定终端" :visible.sync="clientFormVisible">
	  <el-form :model="clientForm" ref="clientForm" :rules="clientRules">
	    <el-form-item label="终端IP" :label-width="formLabelWidth" prop="ip">
			<el-input v-model="clientForm.ip"></el-input>
		</el-form-item>
		<el-form-item label="终端MAC" :label-width="formLabelWidth">
			<el-input v-model="clientForm.mac"></el-input>
		</el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="clientFormVisible = false">取 消</el-button>
	    <el-button type="primary" @click="submitClient">确 定</el-button>
	  </div>
	</el-dialog>
	<foot></foot>
</div>
</template>
<style>
/* 下面的代码是为了搞定时间选择器的显示问题*/
	.el-time-spinner.has-seconds .el-time-spinner__wrapper:nth-child(2) {
     margin-left: 0;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.box-card{
  position: relative;
  width: 400px;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
}
</style>
<script>
/**
 * 更新用户的页面
 */
import Bar from '@/components/common/Bar'
import Vue from 'vue'
import {
	Row,
	Col,
	Button,
	Card,
	Input,
	Form,
	FormItem,
	Dialog,
	DatePicker,
	Message
} from 'element-ui'
import * as userTable from '../../api/userTable'

Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(Card)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Dialog)
Vue.use(DatePicker)

export default {
	components: {
		Bar
	},
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
		let targetname = this.$route.params.param
		console.log(666,targetname)
		let userData = userTable.GetOneUserInfo(targetname)
		console.log(userData)

		return {

			clientFormVisible: false,
			formLabelWidth: '120px',
			user: {
				username:targetnames,
				ip: userData.ip,
				mac: userData.mac,

			},
			clientForm: {
				ip: userData.ip,
				mac: userData.mac,
			},

			clientRules: {
				ip: [{ validator: checkIP, trigger: 'blur,change' }]
			}
		}
	},
	methods:{

		submitClient(){
			this.$refs["clientForm"].validate((valid)=>{
				if (valid) {
					let data = {
						name: this.$route.params.name,
						ip: this.clientForm.ip,
						mac: this.clientForm.mac,
					}
					// TODO 逻辑处理，更新成功，提醒，处理跳转，
					userTable.UpdateUser(data).then(()=>{
							this.user.ip = data.ip
							this.user.mac = data.mac
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
		}
	}
}
</script>
