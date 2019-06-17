import * as type from './type'
import Socket from './socket'

/**
 * @author saisai
 * @version 1.1.0
 * @date    2018-07-28
 * @param   {Object}   data 一个对象，包含下面的字段
 * @return  {Boolean}        true为正确提交，报错则不正确
 * @description 新建权限目录
 */
export async function submitAuth(param) {
	try {
		// TODO 接口格式
		// return true
		let socket = new Socket()
		let data = {
			type: 30,
			dirName : param.dirName ,
			user : param.user ,
			group : param.group,
			auth  : param.auth ,

		}
		socket.write(JSON.stringify(data))
		console.log(JSON.stringify(data))
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
 * @version 1.1.0
 * @date    2018-08-01
 * @param   {Object}   data 一个对象，包含下面的字段
 * @return  {Boolean}        true为正确提交，报错则不正确
 * @description 删除目录
 */

export async function DeleteDirs(idArray,dirNameArray) {
	try {
		// console.log(idArray)
		// console.log(dirNameArray)
		for (let i = 0; i < idArray.length; i++) {
			await deletedirsHelper(idArray[i],dirNameArray[i])
		}
		return true
	} catch (e) {
		throw new Error(e.toString())
	}
}

async function deletedirsHelper(id,dirName){
	try {
        console.log("删除")
        //return true
		let socket = new Socket()
		let data = {
			type: 31,
			dirId:id,
			dirName :dirName,
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
 * @version
 * @date    2018-09-14
 * @param   {Object}   data 一个对象，包含下面的字段
 * @return  {Boolean}        true为正确提交，报错则不正确
 * @description 向某个组中添加用户
 */
export async function AddUserToGroup(User,Group) {
	try {
		// return true
		let socket = new Socket()
		let data = {
			type: 35 ,
			userName: User ,
			groupName:Group ,
		}

		let d = JSON.stringify(data)
		let f = JSON.parse(d)

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
 * @version
 * @date    2018-09-14
 * @param   {Object}   data 一个对象，包含下面的字段
 * @return  {Boolean}        true为正确提交，报错则不正确
 * @description 从某个组中删除用户
 */
export async function DeleteUserFromGroup(User,Group) {
	try {
		// return true
		let socket = new Socket()
		let data = {
			type: 36 ,
			userName: User ,
			groupName:Group ,
			
		}

		let d = JSON.stringify(data)
		let f = JSON.parse(d)

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
 * @author Saisai
 * @version 1.0.0
 * @date    2018-07-29
 * @param   {Object}   null
 * @description 获取所有用户组权限的信息
 */
export async function GetDirs(param) {
	try {

        let trydata={
        	pageSize:"10",
        	currentPage:"1",
        	total:"15",
        	userDir:[
        		{
        			id:"5555",
        			dirName:"666666",
        			user:"fff",
        			group:"222",
        			auth:"20",
        		},
        		{
        			id:"4444",
        			dirName:"77777",
        			user:"fff",
        			group:"222",
        			auth:"20",
        		}
        	]
        }
        console.log("查询")
        //return trydata
		let socket = new Socket()
		let data = {
			type: 32,
			pageSize :param.pageSize,
			currentPage : param.currentPage ,
		}
		socket.write(JSON.stringify(data))

		let response = await socket.read()
		let obj = JSON.parse(response)
		// TODO 后台返回的结果缺少表示错误的字段，state and errormessage
		if (obj) {

			// console.log(obj)
			return {
				dirs:obj
			}
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
 * @date    2018-08-09
 * @param   {Object}   data 一个对象，包含下面的字段
 * @description 修改组群
 */
export async function UpdateDir(param) {
	try {

		let socket = new Socket()
		let data = {
			type: 33,
			id:param.id,
			path:param.path,
			dirName:param.dirName,
			newPath:param.newPath,
			newDirName:param.newDirName,

		}
		socket.write(JSON.stringify(data))
		let response = await socket.read()
		let obj = JSON.parse(response)
		// console.log('更新挂载节点的返回结果：',obj)
		if (obj.state == 0|| obj.type !=64) {
			return true
		} else {
			throw new Error(obj.errormessage)
		}
	} catch (e) {
		throw new Error(e.toString())
	}
}



/**
 * @author Saisai
 * @version 1.0.0
 * @date    2018-09-14
 * @param   {Object}   null
 * @description 查询所有群组信息
 */
export async function GetGroups() {
	try {
        let datatry=[
        {
        	id:1,
        	group:"hhh"
        },
        {
        	id:2,
        	group:"xxx"
        },
        ]
        return datatry

		let socket = new Socket()
		let data = {
			type: 29,
		}
		socket.write(JSON.stringify(data))

		let response = await socket.read()
		console.log(29,response)
		let obj = JSON.parse(response)
		// TODO 后台返回的结果缺少表示错误的字段，state and errormessage
		if (obj) {

			console.log(obj.groups )
			return obj.groups
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
 * @date    2018-09-14
 * @param   {Object}   data 一个对象，包含下面的字段
 * @return  {Boolean}        true为正确提交，报错则不正确
 * @description 删除组群
 */
export async function DeleteGroup2(id,groupname){
	console.log(id)
	try {
		let socket = new Socket()
		let data = {
			type: 28,
			id:id,
			ugroup : groupname,

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
 * @version 1.1.0
 * @date    2018-09-14
 * @param   {Object}   data 一个对象，包含下面的字段
 * @return  {Boolean}        true为正确提交，报错则不正确
 * @description 新建组群
 */
export async function CreateGroup(param) {
	try {
		// TODO 接口格式
		// return true
		let socket = new Socket()
		let data = {
			type: 26,
			ugroup: param,
		}
		console.log(data)
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
 * @date    2018-09-14
 * @param   {Object}   data 一个对象，包含下面的字段
 * @description 修改组名
 */
export async function ChangeGroupName(ID,newGroupName) {
	try {

		let socket = new Socket()
		let data = {
			type: 27,
			id:ID,
			ugroup:newGroupName,
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
 * @author Saisai
 * @version 1.0.0
 * @date    2018-09-14
 * @param   {Object}   null
 * @description 查询组内成员信息及不属于该组的用户信息
 */
export async function GroupUserRela(groupname,dataType) {
	try {


		let socket = new Socket()
		let data = {
			type: 34,
			groupName:groupname,
		}
		socket.write(JSON.stringify(data))
		let response = await socket.read()
		let obj = JSON.parse(response)
		console.log(34,response)
		// TODO 后台返回的结果缺少表示错误的字段，state and errormessage
		if (obj.state == 0) {
			if(dataType=="notGroupUsers")
			{
				return obj.notGroupUsers
			}else{
				return obj.groupUsers
			}

		} else {
			throw new Error(obj.errormessage)
		}
	} catch (e) {
		throw new Error(e.toString())
	}
}
