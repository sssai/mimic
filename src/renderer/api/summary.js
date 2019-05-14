import * as type from './type'
import Socket from './socket'
/**
 * @author Sam
 * @version 1.0.0
 * @date    2018-10-21
 * @description 获取所有监控的信息
 */
export async function GetSummary() {
  try {
    let socket = new Socket()
    let data = {
      type: type.GET_SUMMARY
    }
    let obj
    if (type.LOCAL_TEST) {
      let Mock = require('mockjs')
      obj = Mock.mock({
      	"type": "54",
      	"state": "0",
      	"errormassage": "",
      	"fsState": {
      		"fsSum": "6",
      		"fsOnlineNum": "3",
      		"fsReadyNum": "3"
      	},
      	"mounterState": {
      		"mounterSum": "5",
      		"mounterOnlineNum": "2",
      		"mounterOfflineNum": "3"
      	},
      	"fsErrStatus": {
      		"fsErrState": "0",
      		"fsRepairingNum": "3",
      		"fsRepairingList": [{
      			"id": "1",
      			"fsName": "fs1"
      		}, {
      			"id": "2",
      			"fsName": "fs2"
      		}, {
      			"id": "3",
      			"fsName": "fs3"
      		}],
      		"fsSyncNum": "2",
      		"fsSynList": [{
      				"id": "1",
      				"fsName": "fs1"
      			},
      			{
      				"id": "2",
      				"fsName": "fs2"
      			}
      		],
      		"fsStopNum": "2",
      		"fsStopList": [{
      				"id": "1",
      				"fsName": "fs1"
      			},
      			{
      				"id": "2",
      				"fsName": "fs2"
      			}
      		]
      	},
      	"userInfo": {
      		"userSum": "66",
      		"userOnlineNum": "2",
      		"userFreezeNum": "3"
      	},
      	"fsCapacity": {
      		"fsSize|1-50000.1": 100.0,
      		"fsUsed|1-50000.1": 60.0,
      		"fsAvail|1-50000.1": 40.0
      	}
      })
    } else {
      socket.write(JSON.stringify(data))
      let response = await socket.read()
      let obj = JSON.parse(response)
    }
    // 没有出错则为0
    if (obj.state == 0 && obj.type != 64) {
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
 * @date    2018-10-21
 * @description 获取所有监控的信息
 */
export async function GetPieCapacity() {
  try {
    let socket = new Socket()
    let data = {
      type: type.GET_SUMMARY
    }
    socket.write(JSON.stringify(data))
    let response = await socket.read()
    let obj = JSON.parse(response)
    /*let Mock = require('mockjs')
    let obj = Mock.mock({
    	"type": "54",
    	"state": "0",
    	"errormassage": "",
    	"fsState": {
    		"fsSum": "6",
    		"fsOnlineNum": "3",
    		"fsReadyNum": "3"
    	},
    	"mounterState": {
    		"mounterSum": "5",
    		"mounterOnlineNum": "2",
    		"mounterOfflineNum": "3"
    	},
    	"fsErrStatus": {
    		"fsErrState": "0",
    		"fsRepairingNum": "3",
    		"fsRepairingList": [{
    			"id": "1",
    			"fsName": "fs1"
    		}, {
    			"id": "2",
    			"fsName": "fs2"
    		}, {
    			"id": "3",
    			"fsName": "fs3"
    		}],
    		"fsSyncNum": "2",
    		"fsSynList": [{
    				"id": "1",
    				"fsName": "fs1"
    			},
    			{
    				"id": "2",
    				"fsName": "fs2"
    			}
    		],
    		"fsStopNum": "2",
    		"fsStopList": [{
    				"id": "1",
    				"fsName": "fs1"
    			},
    			{
    				"id": "2",
    				"fsName": "fs2"
    			}
    		]
    	},
    	"userInfo": {
    		"userSum": "66",
    		"userOnlineNum": "2",
    		"userFreezeNum": "3"
    	},
    	"fsCapacity": {
    		"fsSize|1-99999.1": 10.0,
    		"fsUsed|1-50000.1": 6.0,
    		"fsAvail|1-50000.1": 4.0
    	}
    })*/
    // 没有出错则为0
    if (obj.state == 0&& obj.type !=64) {
      return obj.fsCapacity
    } else {
      throw new Error(obj.errormessage)
    }
  } catch (e) {
    throw new Error(e.toString())
  }
}
