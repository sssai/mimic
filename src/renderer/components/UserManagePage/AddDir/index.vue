<template>
	<div>
  		<el-row type="flex" justify="center">
  		<el-col style="width:500px;">
		<div style="margin:20px 0;">
			<el-form status-icon label-width="120px" ref="dirform" :model="dirform" :rules="newrule">



				<el-form-item label="目录名称" prop="dirName" >
					<el-input size="small"  v-model="dirform.dirName"></el-input>
				</el-form-item>

				<el-form-item label="用户名" prop="user" >
					<el-input size="small"  v-model="dirform.user"></el-input>
				</el-form-item>

				<el-form-item label="用户组名" prop="group" >
					<el-input size="small" v-model="dirform.group"></el-input>
				</el-form-item>

<!-- 				<el-form-item label="目录对应权限" prop="auth" >
					<el-input size="small" v-model.number="dirform.auth" placeholder="如：755"></el-input>
				</el-form-item> -->

<!-- 				<el-form-item label="目录对应权限" prop="auth" >
					<el-input size="small" v-model.number="dirform.auth" placeholder="如：755"></el-input>
				</el-form-item>    -->

                 <el-form-item label="目录对应权限" prop="auth"></el-form-item>

                 <div class="auth_grap">

                 <el-form-item label="拥有者：">
				    <el-checkbox v-model="checkeduser_r" label="r"></el-checkbox>
				    <el-checkbox v-model="checkeduser_w" label="w"></el-checkbox> 
				    <el-checkbox v-model="checkeduser_x" label="x"></el-checkbox>                   
				</el-form-item>

				 <el-form-item label="用户组：">
 				    <el-checkbox v-model="checkedgroup_r" label="r"></el-checkbox>
				    <el-checkbox v-model="checkedgroup_w" label="w"></el-checkbox> 
				    <el-checkbox v-model="checkedgroup_x" label="x"></el-checkbox>                
				</el-form-item>

				 <el-form-item label="其他：">
 				    <el-checkbox v-model="checkedother_r" label="r"></el-checkbox>
				    <el-checkbox v-model="checkedother_w" label="w"></el-checkbox> 
				    <el-checkbox v-model="checkedother_x" label="x"></el-checkbox>                
				</el-form-item>
			   </div>

				<div class="btn_grap">
				<el-form-item  >
					<el-button type="primary" @click="submitForm('dirform')">提交</el-button>
					<el-button @click="resetForm('dirform')">重置</el-button>
				</el-form-item>
			</div>
			</el-form>
		</div>
		</el-col>
		</el-row>
	</div>
</template>

<script>
/**
 * 这个文件是全局参数配置的页面
 */
import Vue from 'vue'
import {
	Button,
	Input,
	Form,
	FormItem,
	Message,
	Row,
	Col,
	Checkbox,
	CheckboxGroup,

} from 'element-ui'
import * as authGroup from '../../../api/authGroup'

Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)


export default {
	data() {
		return {

			    checkeduser_r:0,
			    checkeduser_w:0,
			    checkeduser_x:0,

			    checkedgroup_r:0,
			    checkedgroup_w:0,
			    checkedgroup_x:0,

			    checkedother_r:0,
			    checkedother_w:0,
			    checkedother_x:0,

                checkeduser:0,
                checkedgroup:0,
                checkedother:0,

                checkauth:0,
		
			dirform: {
		
				dirName:'',
				user:'',
				group: '',
				auth: '',
				type: "createDir ",
				
			},


			newrule: {

				dirName:[
					{ required:true, message:'请输入目录名称', trigger:'blur'}
				],
				user:[
					{ required:true, message:'请输入拥有者的用户名', trigger:'blur'}
				],
				group:[
					{ required:true, message:'请输入用户组名称', trigger:'blur'}
				],
				auth:[
					{ message:'请输入该目录权限', trigger:'blur'},
					// { type: 'number', message: '请输入数字', trigger: 'blur,change' }
				],
			}
		}
	},
	methods: {
		submitForm(formName) {

			this.getAuth()

			this.$refs[formName].validate(valid => {
				if (valid) {
					let data = {
						dirName: this.dirform.dirName,
						user: this.dirform.user,
						group: this.dirform.group,
						auth: this.auth
					}
					console.log("data",data)
					// TODO 逻辑处理，根据返回结果做出相应提示再跳转
					authGroup
						.submitAuth(data)
						.then(function(result) {
							if (result == true) {
								Message({
									showClose: true,
									message: '提交成功',
									type: 'success',
									duration: 2000
								})
							}
							console.log(555,"jjj")
						})
						.catch(e => {
							Message({
								showClose: true,
								message: e.message,
								type: 'error',
								duration: 2000
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

		getAuth(){

			this.checkeduser_r= +this.checkeduser_r+''
			this.checkeduser_w= +this.checkeduser_w+''
			this.checkeduser_x= +this.checkeduser_x+''
			this.checkeduser= this.checkeduser_r + this.checkeduser_w + this.checkeduser_x

			this.checkedgroup_r= +this.checkedgroup_r+''
			this.checkedgroup_w= +this.checkedgroup_w+''
			this.checkedgroup_x= +this.checkedgroup_x+''
			this.checkedgroup= this.checkedgroup_r + this.checkedgroup_w + this.checkedgroup_x


			this.checkedother_r= +this.checkedother_r+''
			this.checkedother_w= +this.checkedother_w+''
			this.checkedother_x= +this.checkedother_x+''
			this.checkedother= this.checkedother_r + this.checkedother_w + this.checkedother_x


			this.checkeduser=parseInt( this.checkeduser,2)+''
			this.checkedgroup=parseInt( this.checkedgroup,2)+''
			this.checkedother=parseInt( this.checkedother,2)+''

			this.auth=this.checkeduser+this.checkedgroup+this.checkedother
			this.auth=parseInt(this.auth)
			console.log(this.auth)


			// console.log(this.auth)
			this.checkeduser_r=0
			this.checkeduser_w=0
			this.checkeduser_x=0

			this.checkedgroup_r=0
			this.checkedgroup_w=0
			this.checkedgroup_x=0

			this.checkedother_r=0
			this.checkedother_w=0
			this.checkedother_x=0			

		},




	}


}

</script>

<style>
	.auth_grap{
		display: block;
		margin-left: 25%;

		/*text-align: center;*/
	}
	.btn_grap{
		display: block;
		margin-left: 20%;
	}
</style>
