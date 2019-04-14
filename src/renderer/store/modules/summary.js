/**
 * @author Sam
 * @version 1.0.0
 * @date    2018-10-21
 * @description 系统状态概览
 *              这里的actions采用了async await，并且把错误抛出，交给调用者处理。
 */
import * as types from '../mutation-types'
import * as summary from '@/api/summary'
/**
 * summary的初始状态
 * @type {Object}
 */
const state = {
  // mdfs系统状态
  mdfsState: {},
  // 底层文件系统状态
  bottomfsState: {},
  inSummary: true,
}

const getters = {
  getInSummary: state => state.inSummary,
  getMdfsState: state => {
    return state.mdfsState
  },
  getBottomfsState: state => {
    return state.bottomfsState
  },

}
const mutations = {
  [types.UPDATE_USER_IN_SUMMARY](state, payload) {
    state.inSummary = payload
  },
  [types.GET_BOTTOM_FS_STATE](state, payload) {
    state.bottomfsState = payload
  },
  // 如果用下面这段就识别不到，很奇怪
  // [types.GET_BOTTOM_FS_STATE](state, payload) {
  //   state.bottomfsState = payload
  // },
  [types.GET_MDFS_STATE](state, payload) {
    state.mdfsState = payload
  },
}

const actions = {
  async getmdfsstate({
    commit
  }) {
    let data = await summary.getMdfsStateData();
    console.log("data",JSON.stringify(data));
    commit(types.GET_MDFS_STATE, data);
    if (!data) {
      throw new Error('服务器出错！')
    }
  },
  async getbottomfsstate({
    commit
  }) {
    let data = await summary.getBottomFsStateData();
    commit(types.GET_BOTTOM_FS_STATE, data);
    if (!data) {
      throw new Error('服务器出错！')
    }
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
