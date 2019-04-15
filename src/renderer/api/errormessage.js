import * as type from './type'
import Socket from './socket'

/**
 * @author saisai
 * @version 1.1.0
 * @date    2019-03-17
 * @param   {Object}   data 一个对象，包含下面的字段
 * @return  {Boolean}        true为正确提交，报错则不正确
 * @description 查询最新的20条异常信息
 */
export async function GetRecentError(param) {
	try {        

		let socket = new Socket()
		let data = {
			type: type.RECENT_ERROR_MESSAGE,
		}
		socket.write(JSON.stringify(data))

		let response = await socket.read()
		console.log('MDFS22',response)
		let obj = JSON.parse(response)
		//console.log('afterJSON',JSON.stringify(obj))
		// TODO 后台返回的结果缺少表示错误的字段，state and errormessage
		if (obj.state == 0|| obj.type !=64) {

			return obj
			
		} else {
			throw new Error(obj.errormessage)
		}
	} catch (e) {
		throw new Error(e.toString())
	}
}

/**
 * @author saisai
 * @version 1.1.0
 * @date    2019-03-17
 * @param   {Object}   data 一个对象，包含下面的字段
 * @return  {Boolean}        true为正确提交，报错则不正确
 * @description 按照时间查询异常信息
 */
export async function GetErrorByTime(startTime,endTime) {
	try {        

		let socket = new Socket()
		let data = {
			type: type.ERROR_MESSAGE_BY_TIME,
			startTime: startTime,
			endTime:endTime,
		}
		socket.write(JSON.stringify(data))
        console.log('23data',data)
		let response = await socket.read()
		console.log('MDFS23',response)
		let obj = JSON.parse(response)
		// TODO 后台返回的结果缺少表示错误的字段，state and errormessage
		if (obj.state == 0|| obj.type !=64) {

			return obj
			
		} else {
			throw new Error(obj.errormessage)
		}
	} catch (e) {
		throw new Error(e.toString())
	}
}

/**
 * @author saisai
 * @version 1.1.0
 * @date    2019-03-17
 * @param   {Object}   data 一个对象，包含下面的字段
 * @return  {Boolean}        true为正确提交，报错则不正确
 * @description 查询最新的20条日志
 */
export async function GetRecentLog(param) {
	try {        

		let socket = new Socket()
		let data = {
			type: type.RECENT_LOG,
		}
		socket.write(JSON.stringify(data))

		let response = await socket.read()
		//console.log('MDFS24',response)
		let obj = JSON.parse(response)
		// TODO 后台返回的结果缺少表示错误的字段，state and errormessage
		if (obj.state == 0|| obj.type !=64) {

			return obj.logInfo
			
		} else {
			throw new Error(obj.errormessage)
		}
	} catch (e) {
		throw new Error(e.toString())
	}
}

/**
 * @author saisai
 * @version 1.1.0
 * @date    2019-03-17
 * @param   {Object}   data 一个对象，包含下面的字段
 * @return  {Boolean}        true为正确提交，报错则不正确
 * @description 按照时间查询日志信息
 */
export async function GetLogByTime(startTime,endTime) {
	try {        

		let socket = new Socket()
		let data = {
			type: type.GRT_LOG_BY_TIME,
			startTime: startTime,
			endTime:endTime,
		}
		socket.write(JSON.stringify(data))
        console.log('MDFS25data',data)
		let response = await socket.read()
		console.log('MDFS25',response)
		let obj = JSON.parse(response)
		// TODO 后台返回的结果缺少表示错误的字段，state and errormessage
		if (obj.state == 0|| obj.type !=64) {

			return obj.logInfo
			
		} else {
			throw new Error(obj.errormessage)
		}
	} catch (e) {
		throw new Error(e.toString())
	}
}
