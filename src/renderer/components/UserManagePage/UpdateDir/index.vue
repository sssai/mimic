<template>
	<div>
  		<el-row type="flex" justify="center">
  		<el-col style="width:500px;">
		<div style="margin:20px 0;">
			<el-form status-icon label-width="120px" ref="changedirform" :model="changedirform" :rules="newrule">
				<el-form-item label="目录id" prop="id" >
					<el-input size="small" v-model="changedirform.id" disabled></el-input>
				</el-form-item>
<!-- 				<el-form-item label="目录原名称" prop="dirName" >
					<el-input size="small" v-model="changedirform.dirName" disabled></el-input>
				</el-form-item> -->
				<el-form-item label="目录新名称" prop="newDirName" >
					<el-input size="small" v-model="changedirform.newDirName"></el-input>
				</el-form-item>
<!-- 				<el-form-item label="目录原路径" prop="path " >
					<el-input size="small" v-model="changedirform.path " disabled></el-input>
				</el-form-item> -->
				<el-form-item label="目录新路径" prop="newPath " >
					<el-input size="small" v-model="changedirform.newPath"></el-input>
				</el-form-item>


            <div class="btn_grap">
				<el-form-item >
					<el-button type="primary" @click="submitForm('changedirform')">提交</el-button>
					<el-button @click="resetForm('changedirform')">重置</el-button>
				</el-form-item>
			</div>
			</el-form>
		</div>
		</el-col>
		</el-row>
	</div>
</template>

<script>

import Vue from 'vue'
import {
	Button,
	Input,
	Form,
	FormItem,
	Message,
	Row,
	Col
} from 'element-ui'
import * as authGroup from '../../../api/authGroup'


Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Row)
Vue.use(Col)
export default {
	data() {
		let targetID = this.$route.params.id
		console.log(targetID)
	    // let dir = this.$store.getters.getDirs.find(value=> value.id == targetID)
	    // console.log(dir)
		return {
			changedirform: {

				// id：dir.id,
				// path: dir.path,
				// dirName: dir.dirName,
				// newPath:dir.path,
				// newDirName:dir.dirName,

				id:targetID,
				path:'/fs1',
				dirName:'yu1',
				newPath:'',
				newDirName:'',
			},
			// group:group,
			newrule: {
				newPath:[
					{ required:true, message:'请输入新用户目录路径，不包含目录名', trigger:'blur'}
				],
				newDirName:[
					{ required:true, message:'请输入新目录名', trigger:'blur'}
				],
			}
		}
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					let data = {
						id: this.changedirform.id,
						path: this.changedirform.path,
						dirName:this.changedirform.dirName,
						newPath:this.changedirform.newPath,
						newDirName:this.changedirform.newDirName,
					}
					authGroup
						.UpdateDir(data)
						.then(function(result) {
							if (result == true) {
								Message({
									showClose: true,
									message: '提交成功',
									type: 'success',
									duration: 2000
								})
							}
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

			this.changedirform.id = this.dir.id,
			this.changedirform.path = this.dir.path,
			this.changedirform.dirName = this.dir.dirName,
			this.changedirform.newPath = this.dir.newPath,
			this.changedirform.newDirName = this.dir.newDirName
		}
	}
}
</script>

<style>

	.btn_grap{
		display: block;
		margin-left: 20%;
	}
</style>
