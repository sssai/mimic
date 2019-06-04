import Socket from './socket'
import * as type from './type'


/**
 * @author Craig
 * @version 1.0.0
 * @date    2018-03-15
 * @param   {Array}   idArray 包含id的数组
 * @return {Boolean} true表示正确删除，false表示出错
 * @description 删除用户，可多选
 */
export async function DeleteDataTable(nameArray){
	// TODO 交互
	// throw new Error('test delete')
	try {
		for (let i = 0; i < nameArray.length; i++) {
			await deleteOne(nameArray[i])
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
 * @param   {strign}   idArray id
 * @return  {Boolean}           true表示成功
 * @description 删除用户操作的辅助函数
 */
async function deleteOne(name){
	// TODO 交互
	// throw new Error('test delete')
	try {

		let socket = new Socket()
		let data = {
			type: 40,
			name: name
		}
		socket.write(JSON.stringify(data))
		let response = await socket.read()
		console.log(response)
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




/**
 * @author Craig
 * @version 1.0.0
 * @date    2018-03-15
 * @param   {Object}   param 包含采集数据的对象
 * @return {Boolean} true表示正确更新，false表示出错
 * @description 更新用户
 */
export async function UpdateUser(param){
	try {
		let socket = new Socket()
		let data = {
			type: 39,
			name:param.name,
			ip:param.ip,
			mac:param.mac,
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


/**
 * @author saisai
 * @version 1.0.0
 * @date    2018-05-24
 * @param   {Object}   
 * @return  {Boolean}           true表示成功
 * @description 获取所有的用户
 */
export async function GetAllUser(param){
	try {
        let datatry=[
        {
        	name:"hhh",
        	ip:"197.76.223.21",
        	mac:"xxxx"
        },
        {
        	name:"xxx",
        	ip:"223.76.89.21",
        	mac:"xxxx"
        },
        ]
       // return datatry

		let socket = new Socket()
		let data = {
			type:37,
		}
		console.log(data)
		socket.write(JSON.stringify(data))
		let response = await socket.read()
		let obj = JSON.parse(response)
		//console.log("GetAllUser",response)
		if (obj.state == 0) {

			return obj.users
		} else {
			throw new Error(obj.errormessage)
		}
	} catch (e) {
		throw new Error(e.toString())
	}
}

/**
 * @author saisai
 * @version 1.0.0
 * @date    2018-05-24
 * @param   {Object}   
 * @return  {Boolean}           true表示成功
 * @description 获取某个用户信息
 */
export async function GetOneUserInfo(param){
	try {
        let datatry=
        {
        	name:"hhh",
        	ip:"197.76.223.21",
        	mac:"xxxx"
        }   
        //return datatry
		let socket = new Socket()
		let data = {
			type:38,
			name:param,
		}
		socket.write(JSON.stringify(data))
		let response = await socket.read()
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