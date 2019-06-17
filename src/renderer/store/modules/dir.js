/**
 * @author Sai
 * @version 
 * @date    2018-07-29
 * @description  目录管理
 *              这里的actions采用了async await，并且把错误抛出，交给调用者处理。
 */
import * as types from '../mutation-types'
import * as authGroup from '../../api/authGroup'
/**
 * user的初始状态
 * @type {Object}
 */
const state = {
	dirs: []
}

const getters = {
	getDirs: state => {
		return state.dirs
	}
}
const mutations = {
	[types.DELETE_DIRS](state, payload) {
		//console.log(777,payload)
		state.dirs = [
			...state.dirs.filter(value => {
				return !payload.id.includes(value.id)
			})
		]
	},
	[types.GET_DIRS](state, payload) {
		state.dirs = payload
		//console.log("state.dirs",state.dirs);
	}
}

const actions = {
	async deletedirs({ commit }, payload) {
		console.log("deletedirs",payload);
		let result = await authGroup.DeleteDirs(payload.id,payload.dirNameArray)
		commit(types.DELETE_DIRS, payload)
	},
	async getdirs({ commit }, payload) {
		let data = await authGroup.GetDirs(payload)
	    //console.log("getdirs",payload);
		let datanew = data || {
			dirs: []
		}
		//console.log("getdirs",data);
		commit(types.GET_DIRS, datanew)
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
