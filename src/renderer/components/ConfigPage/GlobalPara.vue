<template>
	<div>
  		<el-row type="flex" justify="center">
  		<el-col style="width:500px;">
		<div style="margin:20px 0;">
			<el-form status-icon label-width="240px" ref="authInfoform" :model="authInfoform" >
				<el-form-item label="运行的脚本所在服务器地址" prop="nisAddr">
					<el-input size="small" v-model="authInfoform.nisAddr" :placeholder="oldnisAddr"></el-input>
				</el-form-item>
				<el-form-item label="运行的脚本所在服务器的用户名" prop="userName">
					<el-input size="small" v-model="authInfoform.userName" :placeholder="olduserName"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="shellPwd">
					<el-input size="small" v-model="authInfoform.shellPwd" :placeholder="oldshellPwd"></el-input>
				</el-form-item>
				<el-form-item label="UserAuthorityRenew脚本名" prop="fileName">
					<el-input size="small" v-model="authInfoform.fileName" :placeholder="oldfileName"></el-input>
				</el-form-item>
				<el-form-item label="UserAuthorityRenew脚本所在目录" prop="filePath">
					<el-input size="small" v-model="authInfoform.filePath" :placeholder="oldfilePath"></el-input>
				</el-form-item>
				<el-form-item label="UserDirectoryRenew脚本名" prop="userDirFile">
					<el-input size="small" v-model="authInfoform.userDirFile" :placeholder="olduserDirFile"></el-input>
				</el-form-item>
				<el-form-item label="UserDirectoryRenew脚本所在目录" prop="userFilePath">
					<el-input size="small" v-model="authInfoform.userFilePath" :placeholder="olduserFilePath"></el-input>
				</el-form-item>
				<el-form-item label="创建用户目录所在的根目录" prop="userDir">
					<el-input size="small" v-model="authInfoform.userDir" :placeholder="olduserDir"></el-input>
				</el-form-item

				<el-form-item>
					<div style="margin-left:40%">
					<el-button type="primary" @click="submitForm('authInfoform')">提交</el-button>
					<el-button @click="resetForm('authInfoform')">重置</el-button>						
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
			authInfoform:{
				nisAddr:null,//运行的脚本所在服务器地址
				userName:null,//运行的脚本所在服务器的用户名
				shellPwd:null,//密码
				fileName:null,// UserAuthorityRenew脚本名
				filePath:null,//服务器中UserAuthorityRenew脚本所在目录
				userDirFile:null,// UserDirectoryRenew脚本名
				userFilePath:null,//UserDirectoryRenew脚本在服务器上的目录
				userDir:null,//创建用户目录所在的根目录
			},
			oldnisAddr:'',
			olduserName:'',
			oldshellPwd:'',
			oldfileName:'',
			oldfilePath:'',
			olduserDirFile:'',
			olduserFilePath:'',
			olduserDir:'',
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
	 		var authInfo= await config.GetauthInfo()
	 		console.log(authInfo)
	 		this.oldnisAddr=authInfo.nisAddr
	 		this.olduserName= authInfo.userName
	 		this.oldshellPwd=authInfo.shellPwd
	 		this.oldfileName=authInfo.fileName
	 		this.oldfilePath=authInfo.filePath
	 		this.olduserDirFile=authInfo.userDirFile
	 		this.olduserFilePath=authInfo.userFilePath
	 		this.olduserDir=authInfo.userDir

	 		this.authInfoform.nisAddr=authInfo.nisAddr
	 		this.authInfoform.userName= authInfo.userName
	 		this.authInfoform.shellPwd=authInfo.shellPwd
	 		this.authInfoform.fileName=authInfo.fileName
	 		this.authInfoform.filePath=authInfo.filePath
	 		this.authInfoform.userDirFile=authInfo.userDirFile
	 		this.authInfoform.userFilePath=authInfo.userFilePath
	 		this.authInfoform.userDir=authInfo.userDir
	 	},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					let data_nisAddr = {
						key:"nisAddr",
						value:this.authInfoform.nisAddr,
					}
					let data_userName ={
						key:"userName",
						value:this.authInfoform.userName,
					}
					let data_shellPwd ={
						key:"shellPwd",
						value:this.authInfoform.shellPwd,
					}
					let data_fileName ={
						key:"fileName",
						value:this.authInfoform.fileName,
					}
					let data_filePath ={
						key:"filePath",
						value:this.authInfoform.filePath,
					}
					let data_userDirFile ={
						key:"userDirFile",
						value:this.authInfoform.userDirFile,
					}
					let data_userFilePath ={
						key:"userFilePath",
						value:this.authInfoform.userFilePath,
					}
					let data_userDir ={
						key:"userDir",
						value:this.authInfoform.userDir,
					}
					let final_data=[]
					final_data.push(data_nisAddr)
					final_data.push(data_userName)
					final_data.push(data_shellPwd)
					final_data.push(data_fileName)
					final_data.push(data_filePath)
					final_data.push(data_userDirFile)
					final_data.push(data_userFilePath)
					final_data.push(data_userDir)

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
