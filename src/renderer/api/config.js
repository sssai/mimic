import * as type from './type'
import Socket from './socket'
/**
 * @author Craig
 * @version 1.0.0
 * @date    2018-04-06
 * @param   {Object}   data 一个对象，包含一个字段expire
 * @return  {Boolean}        true为正确提交，报错则不正确
 * @description 全局证书有效期设置，之前的用户有效期不是证书的
 */
export async function submitCertExpire(param) {
	try {
		// return true
		let socket = new Socket()
		let data = {
			type: type.CERT_EXPIRE,
			certExpire: param.expire
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
 * @date    2018-07-28
 * @param   {Object}   data 一个对象，包含下面的字段
 * @return  {Boolean}        true为正确提交，报错则不正确
 * @description 新增文件系统
 */
export async function submitFS(param) {
	try {
		// return true
		let socket = new Socket()
		let data = {
			type: type.FS_ADD,
			fsId: param.fsId, // 文件系统名称
			fsName: param.fsName, // 文件系统名称
			fsType: param.fsType, // 文件系统名称
			mountPoint: param.mountPoint, //文件系统挂载路径————新增字段
			matadatePool: param.matadatePool, // 元数据池名称
			dataPools: param.dataPools, // 数据池名称
			fsIP: param.fsIP, // 文件服务器地址
			fsPort: param.fsPort, // 端口号
			privateKey: param.privateKey, // 私钥文件
			configFile: param.configFile, // 配置文件
			storage: param.storage // 存储空间，单位为G
		}
		let d = JSON.stringify(data)
		let f = JSON.parse(d)
		console.log(f.privateKey)
		socket.write(JSON.stringify(data))
		let response = await socket.read()
		console.log(response,2)
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
 * @date    2018-04-06
 * @param   {Object}   data 一个对象，包含下面的字段
 * @return  {Boolean}        true为正确提交，报错则不正确
 * @description 新增挂载节点
 */
export async function submitMount(param) {
	try {
		// TODO 接口格式
		// return true
		let socket = new Socket()
		let data = {
			type: type.MOUNT_ADD,
			mountName: param.mountName,
			mountIP: param.mountIP,
			mountMAC: param.mountMAC,
			sleepTime: param.sleepTime,
			waitingTime: param.waitingTime
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
 * @author Craig
 * @version 1.0.0
 * @date    2018-04-06
 * @param   {Object}   data 一个对象，包含下面的字段
 * @return  {Boolean}        true为正确提交，报错则不正确
 * @description 挂载服务器的全局参数
 */
export async function submitGlobal(param) {
	try {
		// TODO 接口格式
		// return true
		let socket = new Socket()
		let data = {
			type: type.MOUNT_CONFIG,
			sleepTime: param.sleepTime,
			waitingTime: param.waitingTime,
			schedulingInterval: param.schedulingInterval
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
 * @date    2018-06-24
 * @param   {Object}   data 一个对象，包含下面的字段
 * @return  {Boolean}        true为正确提交，报错则不正确
 * @description 新增文件系统挂载节点mountFs
 */
export async function submitMountFS(param) {
	try {
		// return true
		let socket = new Socket()
		let data = {
			type: type.MountFS_ADD,
			mounterId: param.mounterId, //挂载节点的id，与cmNode的id保持一致
			fsId:param.fsId,  //文件系统id			
			mountAddr:param.mountAddr,  //文件系统的挂载路径          
		}
		let d = JSON.stringify(data)
		let f = JSON.parse(d)

		socket.write(JSON.stringify(data))
		
		let response = await socket.read()
		console.log(response,2)
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
