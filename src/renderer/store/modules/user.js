/**
 * @author Craig
 * @version 1.0.0
 * @date    2018-03-07
 * @description 登录的用户信息管理
 *              这里的actions采用了async await，并且把错误抛出，交给调用者处理。
 */
import * as types from '../mutation-types'
import * as user from '../../api/user'
/**
 * user的初始状态
 * @type {Object}
 */
const state = {
  username: null,
  /*password: null,*/
  userType: 2,
  lockstatus: false,
  locktime: 5,
  permission: {
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
    report: true,
  }
}

const getters = {
  getUserName: state => {
    return state.username
  },
  /*getPassWord: state => {
    return state.password
  },*/
  getUserType: state => {
    return state.userType
  },
  getLockstatus: state => {
    return state.lockstatus
  },
  getLocktime: state => {
    return state.locktime
  },
  getPermission: state => {
    return state.permission
  }
}
const mutations = {
  [types.CHECK_USER](state, payload) {
    state.username = payload.username
    /*state.password = payload.password*/
    state.userType = payload.userType
    state.locktime = payload.locktime
    if (payload.lockstatus == 0) {
      state.lockstatus = false
    } else {
      state.lockstatus = true
    }
  },
  [types.UPDATE_LOCK_STATE](state, payload) {
    state.lockstatus = payload
  },
  [types.UPDATE_LOCK_TIME](state, payload) {
    state.locktime = payload
  },
  [types.GET_PERMISSION_TREE](state, payload) {
    state.permission.summary = payload.summary
    state.permission.user_manage = payload.user_manage
    state.permission.group_manage = payload.group_manage
    state.permission.user_pwd_init = payload.user_pwd_init
    state.permission.user_check = payload.user_check
    state.permission.fs_manage = payload.fs_manage
    state.permission.global_cert_manage = payload.global_cert_manage
    state.permission.global_param_manage = payload.global_param_manage
    state.permission.system_func_structure = payload.system_func_structure
    state.permission.director_manage = payload.director_manage
    state.permission.fs_monitor = payload.fs_monitor
    state.permission.node_status_monitor = payload.node_status_monitor
    state.permission.meta_data_monitor = payload.meta_data_monitor
    state.permission.fs_mnt_manage = payload.fs_mnt_manage
    state.permission.fs_mnt_view = payload.fs_mnt_view
    state.permission.mnt_node_manage = payload.mnt_node_manage
    state.permission.exception_file_manage = payload.exception_file_manage
    state.permission.exception_fs_manage = payload.exception_fs_manage
    state.permission.password_change = payload.password_change
    state.permission.ac_user_manage = payload.ac_user_manage
    state.permission.ac_authority_manage = payload.ac_authority_manage
    state.permission.lock_manage = payload.lock_manage
    state.permission.fssafe = payload.report
  }
}

const actions = {
  async checkuser({
    commit
  }, payload) {
    let result = await user.CheckUser(payload.username, payload.password)
    result.username = payload.username
    if (result.state == 0) {
      commit(types.CHECK_USER, result)
      let permissionresult = await user.GetPermissionTree(payload)
      if (permissionresult.state == 0) {
        commit(types.GET_PERMISSION_TREE, permissionresult)
      } else {
        throw new Error('用户或密码不对')
      }
    } else {
      throw new Error('用户或密码不对')
    }
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
