<template>
<el-row type="flex" align="middle" style="height:500px">
  <el-col style="height:200px;">
    <el-row type="flex" justify="center">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span><strong>{{username}}</strong> 已锁定，请输入登录密码解锁</span>
        </div>
        <el-col style="width:400px;height:180px;">
          <el-form status-icon label-width="60px" ref="userform" :model="userform" :rules="userrule">
            <el-form-item prop="password">
              <el-input clearable style="width:280px;" type="password" @keyup.enter.native="submitForm('userform')" auto-complete="off" v-model="userform.password"></el-input>
              <!-- <span style="cursor:pointer;" @click="resetPwd()">忘记密码？</span> -->
            </el-form-item>
            <el-form-item>
              <el-button  style="width:280px" type="primary" @click="submitForm('userform')" @keyup.enter="submitForm('userform')">解锁</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-card>
    </el-row>
  </el-col>
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
import global_ from '@/utils/Global'

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
      inserted: function(el) {
        // 聚焦元素
        el.querySelector('input').focus();
      }
    }
  },
  data() {
    let validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      userform: {
        password: ''
      },
      userrule: {
        password: [{
          validator: validatePassword,
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
            username: this.$store.getters.getUserName,
            password: this.userform.password
          }
          this.$store.dispatch('unlockConsole', data).then(() => {
            Message({
              showClose: true,
              message: '解锁成功！',
              type: 'success',
              duration: 2000
            })
            this.$router.push({
              path: global_.SUMMARY
            })
          }).catch((e) => {
            Message({
              showClose: true,
              message: "解锁失败，请重试！",
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
        path: global_.RESET_PSW
      })
    }
  },
  computed: {
    username: function() {
      // `this` 指向 vm 实例
      return this.$store.getters.getUserName
    }
  }
}
</script>
