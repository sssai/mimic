<template>
<el-row type="flex" align="middle" style="height:500px">
  跳转加载中，请稍候
  <!-- <el-col style="height:200px;">
    <el-row type="flex" justify="center">
      <el-col style="width:400px;height:200px;">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>拟态存储系统管理控制台（云平台版）</span>
          </div>
          <el-col style="width:400px;height:300px;">
            <el-form status-icon label-width="60px" ref="userform" :model="userform" :rules="userrule">
            <el-form-item>
            </el-form-item>
              <el-form-item label="用户名" prop="username">
                <el-input clearable v-focus style="width:250px;" v-model="userform.username"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input clearable style="width:250px;" type="password" @keyup.enter.native="submitForm('userform')" auto-complete="off" v-model="userform.password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button style="width:250px" type="primary" @click="submitForm('userform')" @keyup.enter="submitForm('userform')">登录</el-button>
              </el-form-item>
              <el-form-item>
                <el-button style="width:250px" @click="resetForm('userform')">重置</el-button>
              </el-form-item>

              <el-button type='text' size='small' @click="resetPwd()">忘记密码？</el-button>
            </el-form>
          </el-col>
        </el-card>

      </el-col>
    </el-row>
  </el-col> -->
</el-row>
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

Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
/**
 * 说明：用户登录表单，记录了用户名和密码，需要在每次跳转的检验用户是否登录的状态，redirect
 *
 */
export default {
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el) {
        // 聚焦元素
        el.querySelector('input').focus();
      }
    }
  },
  mounted() {
    this.$router.push({
      path: '/content/summary'
    })
  },
  data() {
    let validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    let validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    return {
      userform: {
        username: '',
        password: ''
      },
      userrule: {
        password: [{
          validator: validatePassword,
          trigger: 'blur'
        }],
        username: [{
          validator: validateUsername,
          trigger: 'blur'
        }]
      },

    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            username: this.userform.username,
            password: this.userform.password
          }
          this.$store.dispatch('checkuser', data).then(() => {
            Message({
              showClose: true,
              message: '登录成功',
              type: 'success',
              duration: 2000
            })
            this.$router.push({
              path: '/content/summary'
            })
          }).catch((e) => {
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
    resetPwd() {
      this.$router.push({
        path: '/resetpassword'
      })
    }
  }
}
</script>
