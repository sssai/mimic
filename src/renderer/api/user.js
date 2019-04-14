import Socket from './socket'
import * as type from './type'
var md5 = require('md5.js')

/**
 * @author Craig
 * @version 1.0.0
 * @date    2018-03-07
 * @param   {string}   username 用户名
 * @param   {string}   password 密码
 * @return {boolean} 校验用户名和密码后的返回值
 */
export async function CheckUser(username, password) {
  try {
    // 本地自测模块
    // if (type.LOCAL_TEST) {
    if (true) {
      let obj = {
        type: 17,
        state: 0,
        errormessage: '',
        userType: 1,
        lockstatus: 0,
        locktime: 4
      }
      console.log("obj.type:" + obj.type);
      console.log("obj.state:" + obj.state);
      console.log("obj.errormessage:" + obj.errormessage);
      console.log("obj.userType:" + obj.userType);
      console.log("obj.lockstatus:" + obj.lockstatus);
      console.log("obj.locktime:" + obj.locktime);
      return obj
    }
    let socket = new Socket()
    var md5stream = new md5()
    md5stream.end(password)
    let data = {
      type: type.LOGIN,
      username: username,
      password: md5stream.read().toString('hex'), // 使用MD5加密密码
    }
    socket.write(JSON.stringify(data))
    let response = await socket.read()
    console.log("response:" + response);
    let obj = JSON.parse(response)
    if (obj.state == 0) {
      return obj
    } else {
      throw new Error(obj.errormessage)
    }
  } catch (e) {
    throw new Error(e.toString())
  }
}

/**
 * @author Craig
 * @version 1.0.0
 * @date    2018-03-07
 * @param   {string}   username 用户名
 * @param   {string}   password 密码
 * @return {boolean} 校验用户名和密码后的返回值
 */
export async function GetPermissionTree(param) {
  try {
    // 本地自测模块
    // if (type.LOCAL_TEST) {
    if (true) {
      let obj = {
        type: 76,
        state: 0,
        errormessage: '',
        summary: true,
        user_manage: true,
        group_manage: true,
        user_pwd_init: true,
        user_check: true,
        fs_manage: true,
        global_cert_manage: true,
        global_param_manage: true,
        system_func_structure: true,
        director_manage: true,
        fs_monitor: true,
        node_status_monitor: true,
        meta_data_monitor: true,
        fs_mnt_manage: true,
        fs_mnt_view: true,
        mnt_node_manage: true,
        exception_file_manage: true,
        exception_fs_manage: true,
        password_change: true,
        ac_user_manage: true,
        ac_authority_manage: true,
        lock_manage: true,
        fssafe: true
      }
      return obj
    }
    let socket = new Socket()
    let data = {
      type: type.GET_PERMISSION_TREE,
      name: param.username
    }
    socket.write(JSON.stringify(data))
    let response = await socket.read()
    let obj = JSON.parse(response)
    for (let i in obj) {
      if (i != "type" && i != "state" && i != "errormessage") {
        if (obj[i] == 1) {
          obj[i] = true
        } else {
          obj[i] = false
        }
      }
    }
    if (obj.state == 0) {
      return obj
    } else {
      throw new Error(obj.errormessage)
    }
  } catch (e) {
    throw new Error(e.toString())
  }
}

/**
 * @author Craig
 * @version 1.0.0
 * @date    2018-05-03
 * @param   {Object}   param 参数如下param
 * @description 修改密码
 */
export async function ChangePass(param) {
  try {
    // 本地自测模块
    if (type.LOCAL_TEST) {
      return true
    }
    let socket = new Socket()
    var md5stream = new md5()
    md5stream.end(param.password)
    let data = {
      type: type.CHANGE_PASS,
      email: param.email,
      captcha: param.captcha,
      password: md5stream.read().toString('hex'),
    }
    socket.write(JSON.stringify(data))
    let response = await socket.read()
    let obj = JSON.parse(response)
    console.log(obj);
    if (obj.state == 0) {
      return true
    } else {
      throw new Error(obj.errormessage)
    }
  } catch (e) {
    throw new Error(e.toString())
  }
}
/**
 * @author Craig
 * @version 1.0.0
 * @date    2018-05-03
 * @param   {Object}   param 参数对象，包含一个email值
 * @description 获取发送到邮箱的验证码
 */
export async function GetCaptcha(param) {
  try {
    // return true
    let socket = new Socket()
    let data = {
      type: type.GET_CAPTCHA,
      email: param.email
    }
    socket.write(JSON.stringify(data))
    let response = await socket.read()
    let obj = JSON.parse(response)
    if (obj.state == 0) {
      return true
    } else {
      throw new Error(obj.errormessage)
    }
  } catch (e) {
    throw new Error(e.toString())
  }
}
