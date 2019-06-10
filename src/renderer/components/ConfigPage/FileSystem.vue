<template>
	<div>
  		<el-row type="flex" justify="center">
  		<el-col style="width:500px;">
		<div style="margin:20px 0;">
			<el-form status-icon label-width="140px" ref="dbInfoform" :model="dbInfoform" >
				<el-form-item label="数据库地址" prop="db_url">
					<el-input size="small" v-model="dbInfoform.db_url" :placeholder="olddb_url"></el-input>
				</el-form-item>
				<el-form-item label="登录名称" prop="user">
					<el-input size="small" v-model="dbInfoform.user" :placeholder="olduser"></el-input>
				</el-form-item>
				<el-form-item label="登录密码" prop="password">
					<el-input size="small" v-model="dbInfoform.password" :placeholder="oldpassword"></el-input>
				</el-form-item>

				<el-form-item >
					<div style="margin-left:20%">
						<el-button type="primary" @click="submitForm('dbInfoform')">提交</el-button>
						<el-button @click="resetForm('dbInfoform')">重置</el-button>
					</div>
				</el-form-item>
			</el-form>
		</div>
		</el-col>
		</el-row>
	</div>
</template>

<script>
/**
 * 这个文件是文件系统配置页面
 */
import Vue from 'vue'
import { Button, Input, Form, FormItem, Message, DatePicker, Row, Col, Upload } from 'element-ui'
import * as config from '../../api/config'

Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(DatePicker)
Vue.use(Row)
Vue.use(Col)
Vue.use(Upload)
export default {
	data(){

		return {
			dbInfoform:{
				db_url:null,
				user:null,
				password:null,
			},
			olddb_url:'',
			olduser:'',
			oldpassword:'',
			// newrule:{
			// 	fsId:[
			// 		{ required:true, message:'请输入文件系统id', trigger:'blur'}
			// 	],
			// 	fsName:[
			// 		{ required:true, message:'请输入文件系统名称', trigger:'blur'}
			// 	],
			// 	fsType:[
			// 		{ required:true, message:'请输入文件系统类型及版本号', trigger:'blur'}
			// 	],
			// 	mountPoint:[
			// 		{ required:true, message:'请输入文件系统挂载路径', trigger:'blur'}
			// 	],
			// 	matadatePool:[
			// 		{ required:true, message:'请输入元数据池名称', trigger:'blur'}
			// 	],
			// 	dataPools:[
			// 		{ required:true, message:'请输入数据池名称', trigger:'blur'}
			// 	],
			// 	fsIP:[
			// 		{ required:true, message:'请输入文件服务器IP', trigger:'blur'}
			// 	],
			// 	fsPort:[
			// 		{ required:true, message:'请输入端口号', trigger:'blur'},
			// 		{ type: 'number', message: '请输入数字', trigger: 'blur,change' }
			// 	],
			// 	privateKey:[
			// 		{ required:true, message:'请上传私钥文件', trigger:'blur'}
			// 	],
			// 	configFile:[
			// 		{ required:true, message:'请上传配置文件', trigger:'blur'}
			// 	],
			// 	storage:[
			// 		{ required:true, message:'请输入端口号', trigger:'blur'},
			// 		{ type: 'number', message: '请输入数字', trigger: 'blur,change' }
			// 	],
			// }
		}
	},
  mounted: async function() {
    await this.updatePage()  

  },
	methods:{
     // 将更新整个页面的功能抽离成一个公共函数
	    async updatePage(){
	 		var dbInfo= await config.GetdbInfo()
	 		console.log(dbInfo)
	 		this.oldpassword=dbInfo.password
	 		this.olduser= dbInfo.user
	 		this.olddb_url=dbInfo.db_url

	 		this.dbInfoform.db_url=dbInfo.db_url
	 		this.dbInfoform.user=dbInfo.user
	 		this.dbInfoform.password=dbInfo.password

	 	},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					let data_url = {
						key:"db_url",
						value:this.dbInfoform.db_url,
					}
					let data_user ={
						key:"user",
						value:this.dbInfoform.user,
					}
					let data_password ={
						key:"password",
						value:this.dbInfoform.password,
					}
					let final_data=[]
					final_data.push(data_url)
					final_data.push(data_user)
					final_data.push(data_password)

					config.submitData(final_data).then(function(result){
						if (result == true) {
							Message({
								showClose: true,
								message:'提交成功',
								type:'success',
								duration:2000
							})
						}
					}).catch((e)=>{
							Message({
								showClose: true,
								message:e.message,
								type:'error',
								duration:2000
							})
     
						})

				} else {
					return false
				}
			})
		},
		resetForm(formName) {
			this.$refs[formName].resetFields()
		},
	}
}
</script>
