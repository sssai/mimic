import Socket from './socket'
import * as type from './type'
var md5 = require('md5.js')
/**
 * @author Craig
 * @version 1.0.0
 * @date    2018-03-14
 * @param   {String}   pageSize    一页有几行数据
 * @param   {String}   currentPage 请求的页码
 * @return {Object} 返回数据结果，出错返回null
 * @description 获取一定量的用户列表
 */
export async function GetDataTable() {
  try {
    // 本地自测模块
  if (type.LOCAL_TEST) {
      let obj = {
        type: 59,
        state: 0,
        errormessage: '',
        loginUsers: [{
          id: "001",
          name: "sam",
          loginUserType: 1
        }, {
          id: "002",
          name: "admin",
          loginUserType: 1
        }, {
          id: "003",
          name: "monitor",
          loginUserType: 2
        }, {
          id: "004",
          name: "344879362",
          loginUserType: 1
        }, {
          id: "005",
          name: "xiexin",
          loginUserType: 1
        }, {
          id: "006",
          name: "0755",
          loginUserType: 1
        }]
      }
      return obj
    }
    let socket = new Socket()
    let data = {
      type: type.GET_AC_USER
    }
    socket.write(JSON.stringify(data))
    let response = await socket.read()
    let obj = JSON.parse(response)
    // 没有出错是0
    if (obj.state == 0 || obj.type != 64) {
      return obj
    } else {
      return null
    }
  } catch (e) {
    throw new Error(e.toString())
  }
}

/**
 * @author Craig
 * @version 1.0.0
 * @date    2018-03-15
 * @param   {Array}   userArray 包含id的数组
 * @return {Boolean} true表示正确删除，false表示出错
 * @description 删除用户，可多选
 */
export async function DeleteDataTable(parm) {
  // TODO 交互
  // throw new Error('test delete')
  let ids = parm.curid
  try {
    for (let i = 0; i < ids.length; i++) {
      await deleteOne(ids[i], parm.curUserName)
    }
    return true
  } catch (e) {
    throw new Error(e.toString())
  }
}
/**
 * @author Craig
 * @version 1.0.0
 * @date    2018-04-08
 * @param   {strign}   userArray id
 * @return  {Boolean}           true表示成功
 * @description 删除用户操作的辅助函数
 */
async function deleteOne(userId, userName) {
  // TODO 交互
  // throw new Error('test delete')
  try {
    // 本地自测模块
      let obj = {
        type: 61,
        state: 0,
        errormessage: ''
      }
      return obj
    }
    let socket = new Socket()
    let data = {
      type: type.DELETE_AC_USER,
      userName: userName,
      id: userId
    }
    socket.write(JSON.stringify(data))
    let response = await socket.read()
    console.log("response:"+response)
    let obj = JSON.parse(response)
    if (obj.state == 0 || obj.type != 64) {
      return obj
    } else {
      throw new Error(obj.errormessage)
    }
  } catch (e) {
    throw new Error(e.toString())
  }
}

/**
 * @author Sam
 * @version 1.0.0
 * @date    2019-01-15
 * @param   {Object}   param 包含采集数据的对象
 * @return {Boolean} true表示正确更新，false表示出错
 * @description 更新用户
 */
export async function UpdateAcUser(param) {
  var md5stream = new md5()
  try {
    // 本地自测模块
  if (type.LOCAL_TEST) {
      return true
    }
    let socket = new Socket()
    let data = {
      type: type.UPDATE_AC_USER,
      userName: param.userName,
      id: param.id,
      name: param.name,
      passwd: param.passwd,
      addr: param.addr,
      loginUserType: param.loginUserType,
    }
    md5stream.end(data.passwd)
    data.passwd = md5stream.read().toString('hex')
    socket.write(JSON.stringify(data))
    let response = await socket.read()
    console.log("response:" + response);
    let obj = JSON.parse(response)
    if (obj.state == 0 || obj.type != 64) {
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
 * @date    2018-03-15
 * @param   {Object}   data 包含新建用户必要的信息
 * @return {Boolean} true表示新增成功，false则失败
 */
export async function AddUser(param) {
  try {
    var md5stream = new md5()
    let socket = new Socket()
    let data = {
      type: type.ADD_AC_USER,
      userName: param.username,
      name: param.name,
      password: param.password,
      loginUserType: param.usertypes,
      addr: param.addr
    }
    md5stream.end(data.password)
    data.password = md5stream.read().toString('hex')
    console.log("data.userName:" + data.username);
    console.log("data.name:" + data.name);
    console.log("data.password:" + data.password);
    console.log("data.loginUserType:" + data.loginUserType);
    console.log("data.addr:" + data.addr);
    socket.write(JSON.stringify(data))
    let response = await socket.read()
    let obj = JSON.parse(response)
    if (obj.state == 0 || obj.type != 64) {
      return obj
    } else {
      throw new Error(obj.errormessage)
    }
  } catch (e) {
    throw new Error(e.toString())
  }
}
