import * as type from './type'
import Socket from './socket'

/**
 * @author saisai
 * @version 1.1.0
 * @date    2019-06-06
 * @param   {Object}   data 一个对象，包含下面的字段
 * @return  {Boolean}        obj
 * @description 查询所有用户的登录、注销日志
 */
export async function GetUserLog(pageSize,currentPage) {
	try {        
        let trydata=[
        	{
        		userName:"yhy",
        		loginTime:"2019-06-05 09:42:03",
        		logoutTime:"2019-06-06 09:42:03",
        		ipAddr:"219.223.197.76",
        	},
        	{
        		userName:"xpc",
        		loginTime:"2019-06-03 09:42:03",
        		logoutTime:"2019-06-06 09:42:03",
        		ipAddr:"219.223.197.76",
        	},
        ]
       // return trydata
		let socket = new Socket()
		let data = {
			type: 44,
			pageSize:pageSize,
			currentPage:currentPage
		}
		socket.write(JSON.stringify(data))

		let response = await socket.read()
		console.log('userLogInfo',response)
		let obj = JSON.parse(response)
		//console.log('afterJSON',JSON.stringify(obj))
		// TODO 后台返回的结果缺少表示错误的字段，state and errormessage
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
 * @author saisai
 * @version 1.1.0
 * @date    2019-06-06
 * @param   {Object}   data 一个对象，包含下面的字段
 * @return  {Boolean}        obj
 * @description 查询所有用户的登录、注销日志
 */
export async function GetUserLogByTime(userName,startTime,endTime,pageSize,currentPage) {
	try {        
        let trydata=[
        	{
        		userName:"yhy",
        		loginTime:"2019-06-05 09:42:03",
        		logoutTime:"2019-06-06 09:42:03",
        		ipAddr:"219.223.197.76",
        	},
        	{
        		userName:"yhy",
        		loginTime:"2019-06-03 09:42:03",
        		logoutTime:"2019-06-06 09:42:03",
        		ipAddr:"219.223.197.76",
        	},
        ]
        //return trydata
		let socket = new Socket()
		let data = {
			type: 45,
			userName:userName,
			startTime:startTime,
			endTime:endTime,
			pageSize:pageSize,
			currentPage:currentPage,
		}
		socket.write(JSON.stringify(data))

		let response = await socket.read()
		console.log('oneuserLogInfo',response)
		let obj = JSON.parse(response)
		//console.log('afterJSON',JSON.stringify(obj))
		// TODO 后台返回的结果缺少表示错误的字段，state and errormessage
		if (obj.state == 0) {

			return obj
			
		} else {
			throw new Error(obj.errormessage)
		}
	} catch (e) {
		throw new Error(e.toString())
	}
}