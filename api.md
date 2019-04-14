### 前端API接口文档说明

type字段修改为数字，需要配合对应文档查看具体的请求码

```
// login管理员或普通用户登录
req：
{
	username:'', // 字符串
	password:''  // 字符串
}
res:
{
	type:'login',
	state: 0,  // 错误类型码，0表示成功
	errormessage:'' // 错误信息
}

// addUser新建用户
req：
{
	type:'*addUser', // 对应的请求码是8
	username:'',
	email:'',
	ip:'',
	mac:'',
	expire:'',
	cpu:'',
	mainboard:'',
	os:''
}
res:
{
	type:'addUser',
	state: 0,  // 错误类型码，0表示成功
	errormessage:'' // 错误信息
}

// deleteUser删除用户，可多选
req：
{
	type:'*deleteUser', // 对应的请求码是9
	id:[] // 包含id的数组
}
res:
{
	type:'deleteUser',
	state: 0,  // 错误类型码，0表示成功
	errormessage:'' // 错误信息
}

// getDataTable获取一定量的用户列表
req：
{
	type:'*getDataTable', // 对应的请求码是10
	pageSize: 10, // 每一页包含10行数据
	currentPage: 1 // 当前页为第一页
}
res:
{
	type:'getDataTable',
	state: 0, // 错误类型码，0 表示成功
	errormessage:'' // 错误信息
	dataTable: [  // 返回的数据数组
		{
		id: '12',
		status:0,
		last:'2017-04-03 22:32:22',
		username: 'craig',
		email: '1@1.com',
		expire: '2019-04-03 22:32:22',
		ip: '219.223.1.1',
		mac: 'xxxxxxx',
		os: 'windows',
		cpu: 'xxx',
		mainboard: 'xx'
		}
	],
	total: 100, // 一共有多少项
	pageSize: 10,  // 一页可以有多少项
	currentPage: 2  // 当前页码
}

// 用户update操作接口
req:
{
	type:'*updateUser', // 对应的请求码是11
	id: '12', // 这个是必须的，根据id进行更新操作，下面的字段有更新则写入res传送，没有更新则不。
	status:0,
	email: '1@1.com',
	expire: '2019-04-03 22:32:22',
	ip: '219.223.1.1',
	mac: 'xxxxxxx',
	os: 'windows',
	cpu: 'xxx',
	mainboard: 'xx'
}
res:
{
	type:'updateUser',
	state: 0, // 错误类型码，0 表示成功
	errormessage:'' // 错误信息
}

// 获取mount节点状态，节点运行状态页面
req:
{
	type:'getMountNode', // 对应的请求码是16
	id:0
}
res:
{
	type:'getMountNode',
	state: 0,  // 错误类型码，0表示成功
	errormessage:'', // 错误信息
	id:0,
	name:'Mount node2', // 主机名
	cpu:'x86', // cpu的架构信息
	os:'Linux', // 操作系统类型
	status:'action',  // 节点状态
	duration:'8分钟', // 状态持续时间
	user:'guest1、guest2' // 连接的用户
}

// 获取user节点状态，节点运行状态页面
req:
{
	type:'getUserNode', // 对应的请求码是19
	id:0
}
res:
{
	type:'getUserNode',
	state: 0,  // 错误类型码，0表示成功
	errormessage:'', // 错误信息
	id:0,
	name:'guest', // 用户节点名
	ip:'192.168.1.1',
	mac:'00.as.12.df.3d.4f.23',
	duration:'35分钟' // 登录时长
}

// 节点下线，上线 ，
req:
{
	type:'manageMount', // 对应的请求码是14
	id:0,
	state:1 // 1表示action，3表示shutdown
}
res:
{
	type:'manageMount',
	state: 0,  // 错误类型码，0表示成功
	errormessage:'' // 错误信息
}

// 用户禁用启用，
req:
{
	type:'manageUser', // 对应的请求码是18
	id:0,
	state:1 // 待定
}
res:
{
	type:'manageUser',
	state: 0,  // 错误类型码，0表示成功
	errormessage:'' // 错误信息
}

// 请求节点状态图的数据，挂载节点运行界面中，获取连接情况的数据
req:
{
	type:'getNodeStatus'  // 对应的请求码是15
}
res:
{
	type:'getNodeStatus',
	state: 0,  // 错误类型码，0表示成功
	errormessage:'' // 错误信息
	node:[
		{
			id:0,	//	节点id
			type: 'mount', // mount 或 user 分别表示挂载节点和用户节点，mount_server 0,store_server 1,manage_server 2,
			name: 'Mount1', // 节点
			status: 'action', // 2种状态，action、shutdown有用，sleeping、ready暂时不用了
			target: 'Mount1'	// user连接的mount节点，若为mount节点则为自身
		}
	]
}

// 新增文件系统
req:
{
	type:'addFS',   // 对应的请求码是20
    id:’1’,			//文件系统id
	fsName:'ceph1',   // 文件系统名称
	fsType:'ceph',   // 文件系统类型
    mountPoint:’/mnt/fs1’,	//文件系统挂载路径    ------------新增字段
	matadatePool:'ceph mata', // 元数据池名称
	dataPools:'ceph data',  // 数据池名称
	fsIP:'127.0.0.1',  // 文件服务器地址
	fsPort:10086,     // 端口号
	privateKey:'88',  // 私钥文件
	configFile:'88', // 配置文件
	storage:23 // 存储空间，单位为G
}
res:
{
	type:'addFS',
	state: 0,  // 错误类型码，0表示成功
	errormessage:'' // 错误信息
}


// 新增挂载节点 这个功能已经取消
req:
{
	type:'addMountNode',
	mountName:'ceph1',   // 节点名称
	mountIP:'ceph mata', // 节点IP
	mountMAC:'ceph data',  // 节点MAC
}
res:
{
	type:'addMountNode',
	state: 0,  // 错误类型码，0表示成功
	errormessage:'' // 错误信息
}

// 全局证书有效期设置，之前的用户有效期不是证书的
req:
{
	type:'certExpire',          // 对应的请求码是12
	certExpire:'2018-04-01',   // 证书有效期
}
res:
{
	type:'certExpire',
	state: 0,  // 错误类型码，0表示成功
	errormessage:'' // 错误信息
}

// 挂载服务器的全局参数
req:
{
	type:'mountConfig', // 对应的请求码是13
	sleepTime:60,   // 休眠时长，单位为秒
	waitingTime:60, // 等待时长，单位为秒
	schedulingInterval:5,  // 调度间隔时长，单位为分钟
}
res:
{
	type:'mountConfig',   
	state: 0,  // 错误类型码，0表示成功
	errormessage:'' // 错误信息
}

// 文件系统监听界面，获取所有数据的接口
req：
{
	type:'monitorFS',  // 对应的请求码是22
}
res:
{
	type:'monitorFS',
	state: 0,       // 错误类型码，0表示成功
	errormessage:'' // 错误信息
	fs:[            // 暂定：最多3个文件系统
		{
		id:99,           // 这个文件系统的id
		fs_name:'fs1',   // 这个文件系统的name
		fs_type:'ceph',  // 这个文件系统的类型
		fs_error:[{      // 这个文件系统内的出错或告警信息，暂定：最多15条全量新错误
			file_name:'/temp',     // 当前错误对应的文件目录
			time:'2018-08-16 11:20:07',	   // 产生时间
			repair: 1,             // 是否修复，修复则需要下面的内容
			repair_fs:'fs2',       // 修复来自哪个文件系统
		}],  
	}
	]
}

// 重置密码第一步发送邮箱名称，获取验证码
req:
{
	type:'*getCaptcha',   // 23
	email: '1@1.com'
}
res:
{
	type:'getCaptcha',
	state: 0,       // 错误类型码，0表示成功
	errormessage:'' // 错误信息
}

// 重置密码第二步发送验证码和新密码
req:
{
	type:'*changePass',  // 24
	email: '1@1.com',
	captcha:'hello',
	password: 'password'
}
res:
{
	type:'getCaptcha',
	state: 0,       // 错误类型码，0表示成功
	errormessage:'' // 错误信息
}

// 元数据监控页面，获取饼图数据接口
req：
{
	type:'*getPie',  // 对应的请求码是
}
res:
{
	type: '*getPie',
	state: 0,  // 错误类型码，0表示成功
	errormessage:'', // 错误信息
	data:[{
		id:1,  			// 文件系统id
		sum:33, 		// 这个文件系统出错的数量
		fs_name:'fs1',  // 文件系统name
	},{
		id:2,  			// 文件系统id
		sum:33, 		// 这个文件系统出错的数量
		fs_name:'fs2',  // 文件系统name
	}]
}


// 元数据监控页面，根据id获取这个文件系统的错误信息
req：
{
	type:'*getPieFS',  	// 对应的请求码是
	id:1				// 文件系统的id
}
res:
{
	type: '*getPieFS',
	state: 0,  // 错误类型码，0表示成功
	errormessage:'', // 错误信息
	data:[{
		id:1,  								// 这条错误的id
		time:'2018-05-24 12:20:30', 		// 这条错误的产生时间
		fs_name:'fs1',  					// 所属文件系统的name
		user:'test1',  						// 导致这个错误的user
		node:'node1',  						// 导致这个错误的所在的nfs节点
	},{
		id:1,  								// 这条错误的id
		time:'2018-05-24 12:20:30', 		// 这条错误的产生时间
		fs_name:'fs1',  					// 所属文件系统的name
		user:'test1',  						// 导致这个错误的user
		node:'node1',  						// 导致这个错误的所在的nfs节点
	}]
}

// 挂载节点管理界面，mount节点的增删改查
Req：
{
	"type":"mounterManage",//对应的请求码是31
	"operation";"add",//表示操作类型，查(query=1)、增（add=2）、删(del=3)、改(update=4)
	"id":"21",//表示mounter的id
	"mounterType":"CentOS",//mounter所在操作系统的类型，查询操作时这个字段也要填，为空字符
	"address":"192.168.1.100",//mounter所在机器的ip，查询操作时这个字段也要填，为空字符
	}
Resp：// 查询返回的结果
{
	"type": "mounterManage",//对应的请求码是31
	"id":"21",//表示mounter的id
	"mounterType":"CentOS",//mounter所在操作系统的类型
	"address":"192.168.1.100",//mounter所在机器的ip
	"status":"init"	//	mounter的状态
	"online":"1"//是否在线，0：不在线  1：在线
}
Resp: // 其他操作返回的结果
{
	"type":"mountFs",//请求码是31
	"state":" 0",  // 错误类型码，0表示成功
	"errormessage":"" // 错误信息
}

// 挂载节点管理界面，返回所有的mount节点信息：

Req:
{
         "type":"getMounters"    //请求码是34
}
Resp:
{
         "type":"getMounters",   //请求码是34
         "detail":" [{
                   "id":"21",//mounter的id
                   "os":"CentOS",//操作系统类型
                   "ip","192.168.1.130",//mounter的ip
                   "state":"initing",//mounter的状态,与单个挂载节点的state不一致
                   "online":"1"     //表示mounter是否上线，0：下线，1：上线
}]"
}

// 文件系统挂载关系配置页面，文件系统挂载
Req:
{
	"type":"mountFs",//请求码是32
	"mounterId":"101",//挂载节点的id，与cmNode的id保持一致
	"fsId":"21",//文件系统id
	"mountAddr":"/mnt/fs1",//文件系统的挂载路径
}

Resp:
{
	"type":"mountFs",//请求码是32
	"state":" 0",  // 错误类型码，0表示成功
	"errormessage":"" // 错误信息
}

// 文件挂载关系展示页面，显示文件系统挂载信息
Req
{
	"type":"showFsMount",//请求码是33
}

Resp
{
	"type":" showFsMount",
	"detail":"[
	{
		"mounterId":"21",
		"fsId":"101",
		"mountAddr":"/mnt/fs1",
		"judge":"1",  //是否具有判决能力，1：具有判决能力  0：否
		"sync":"1"  //是否同步，1：已同步   0：未同步
}
]"
}

//管理用户权限目录：
req{
	type : manageDir 	//35
operation:search  //1: query, 2: add, 3：delete
	dirName : temp  //目录名称
	user : scott      //用户名
	group : group1   //用户组名
	auth : 755		//该目录对应的权限
pagesize :			//一也可以有多少项
currentPage :		//当前页码
}
    Add和delete操作的返回信息：
res:{
	type: manageDir,
	state: 0,  // 错误类型码，0表示成功
	errormessage:'' // 错误信息
}
    query操作的返回信息：
res:{
		//query返回信息
	type: manageDir,
	state: 0,  // 错误类型码，0表示成功
	errormessage:'' // 错误信息
total:28		//总数量
pagesize :			//一也可以有多少项
currentPage :		//当前页码
	userDir:[
		{
			id:3
			dirName : temp
			user : scott
			group : group1
			auth : 755
},
{
….
}
]
}

//修改用户目录
req:
{	type : changUserDir,		//请求码44
	id : 						//用户目录id
	path : 					//用户目录原路径，不包含目录名
	dirName :				//原目录名
	newPath : 				//新用户目录路径，不包含目录名
	newDirName : 			//新目录名
}
resp{
	type : changUserDir,		//43
state :  0,  				// 错误类型码，0表示成功
	errormessage :			// 错误信息
}




//管理用户组中的用户
req{
		type : ‘36‘’’					//请求码是36
user :‘scott’					//用户名
group :‘group1’				//用户组名
operation : add				//对应的操作分为三种  add  del  
}
res:{
type: ManageUserAndGroup,
state: 0,  // 错误类型码，0表示成功
errormessage:'' // 错误信息
}



//显示所有的组信息
req:{
	type : "43",				//请求码是43
}
resp:{
	type : "43",				//请求码是43
	state : "0",				//错误类型码，0：成功，1：表示失败
	errormessage : "",			// 错误信息
	groups : [{				//所有的组信息
	"id" : "2",				//组id
	"group" : "lzl"			//组名
},
{
	"id" : "2",				//组id
	"group" : "lzl"			//组名
}]
}


//显示组内成员信息
req : {
	type : "39",			//请求码是39
	group: "test"			//用户组名
}
resp : {
	type : "39",				//请求码是39
	state : "0",				//错误类型码，0：成功，1：表示失败
	errormessage : "",			// 错误信息
	groupUsers : [{			//该组内用户
	"id" : "2",						//用户id
	"userName" : "yuhy"			//用户名
},
{
	"id" : "6",						//用户id
	"userName" : "linzhili"			//用户名
}]，
notGroupUsers: [{			//不在该组中的用户
	"id" : "3",						//用户id
	"userName" : "lixin"			//用户名
},
{
	"id" : "4",						//用户id
	"userName" : "yongle"			//用户名
}]
}


//修改组名
req:{
	type :’ 40’,		//请求码40
	id : ‘3’,			//用户组id
	group : ‘test’		//用户组名称(修改后的名称)
}
resp : {
	type : ‘40’,			//请求码40
	state : "0",			//错误类型码，0：成功，1：表示失败
	errormessage : "",		// 错误信息
}


//删除群组
req{
type : ‘41’			//请求码是41
id： ‘2’				//群组id
groupName : ‘test’		//群组名称
}
resp : {
	type : ‘40’,			//请求码40
	state : "0",			//错误类型码，0：成功，1：表示失败
	errormessage : "",		// 错误信息
}


//新建用户组
req:{
	type :’ 42’,		//请求码42
	group : ‘test’		//用户组名称
}
resp : {
	type : ‘42’,			//请求码42
	state : "0",			//错误类型码，0：成功，1：表示失败
	errormessage : "",		// 错误信息
}


//异常文件查询

req{
	type : queryExFs	//请求码45
pageSize: 10, 		// 每一页包含10行数据
	currentPage: 1 	// 当前页为第一页
}

res{
	type : queryExFs	//请求码45
	state : 0			// 错误类型码，0 表示成功
	errormessage:'	 // 错误信息
		total :
pageSize: 10, 				// 每一页包含10行数据
		currentPage: 1 			// 当前页为第一页
	fsList : [{
		id : 			//
		fsid : 		//异常文件所在文件系统id
		exFsName : 	//异常文件名，以UUID命名
		time : 		//
		srcPath : 		//异常文件全路径
}]
}


//异常文件下载（需自行安装freeSSHd.exe）
req{
	type : downloadExFs	//请求码46
	host : 				//前端所在机器的ip地址
fsName : 			//异常文件名，以uuid命名
	newName : 			//下载到前端所在机器时的文件名
	desPath : 			//下载到前端所在机器时的路径
}
res:{
type: downloadExFs,
state: 0, // 错误类型码，0 表示成功
errormessage:'' // 错误信息

//询问文件系统相关信息
Req{
	"type" : "47"		//请求码
}
Resp{
	"type" : "47",				//请求码
	"state" : "0",				//错误类型码，0：成功，1：表示失败
	"errormessage" : "",		// 错误信息
   "fs" : [{					//所有文件系统的信息
		"id" : "2",				//文件系统id
		"name" : "fs1",			//文件系统名
		"type" : "ceph",			//文件系统类型
		"mountPoint" : "/mnt/fs1",	//文件系统挂载路径
		"mountAddr" : "192.168.1.136",	//文件服务器地址
		"mountport" : "",			//端口号
		"fssize" ："",			//存储空间
		"fsused" : "",			//已用空间
		"fsavail" : "",			//剩余空间
		"fsstate" : "",			//文件系统状态
		"judge" : "",				//是否提供判决服务1:提供判决服务 0：未提供判决服务
		"sync" : "",				//是否已同步，1：已同步  0：未同步
}]
}
其中，文件系统状态如下：
	0----running
    1----ready
	2----repairing
	3----stopping
	4----stop_breakdown
	5----stop_running
	6----stop_repairing


//前端向CM发出请求，对可清洗的文件系统进行清洗
Req{
	"type" : "48"，		//请求码
	"fsid" : ""			//文件系统id
}
Resp{
	"type" : "48",			//请求码
	"state" : "0",				//错误类型码，0：成功，1：表示失败
	"errormessage" : "",		// 错误信息
}

//查询CM信息，CM返回正在运行的CM信息
Req{
	"type" : "49"
}

Resp{
	"type" : "49",
  "state" : "0",				//错误类型码，0：成功，1：表示失败
  "errormessage" : "",		// 错误信息
  "cm" : [{					//主备CM的信息
  		"id" : "2",				// CM的id，唯一标识
  		"ip" : "192.168.1.136",	//CM的ip
  		"service" ： "1"	//表示是否是主CM，1，表示是主CM，0，表示是备CM
  }，
  {					
  		"id" : "2",				// CM的id，唯一标识
  		"ip" : "192.168.1.136",	//CM的ip
  		"service" ： "1"	//表示是否是主CM，1，表示是主CM，0，表示是备CM
  }]
  }
}

// 前端往CM发送请求数据，询问模块的总体情况，具体协议接口如下
req{
	"type" : "54"
}
resp{
	"type" : "54",		
	"state" : "0",		//0：成功   1：失败
	"errormassage" : "",	//错误信息
	"fsState" : {			//文件系统状态
		"fsSum" : "6",			//fs的总数量
		"fsOnlineNum" ： "3"	，//fs为running状态的数量
		"fsReadyNum" : "3"	//fs为ready状态的数量
  },
  "mounterState" : {
  		"mounterSum" : "5",	//mounter的总数量
  		"mounterOnlineNum" : "2",	//在线的mounter的数量
  		"mounterOfflineNum" : "3"	//离线的mounter的数量
  },
  "fsErrStatus" : {
  		"fsErrState" : "0",	//是否存在出错的fs的信息，stopping或者repairing状态的fs
  		"fsRepairingNum" : "3",		//正在修复的fs的数量
  		"fsRepairingList" : [{
  			"id" : "1",		//文件系统的id
  			"fsName" : "fs1"	//文件系统名称
  }，
  {
  ……
  }]，			//正在修复的fs的具体信息
  		"fsSyncNum" : "2",		//正在同步的fs数量，backUp节点修复的fs的数量
  		"fsSynList" : [{
  			"id" : "1",		//文件系统的id
  			"fsName" : "fs1"	//文件系统名称
  },
  {
  ……
  }],		//正在同步的fs的详细信息
  "fsStopNum" : "2",		//处于下线的fs数量
  		"fsStopList" : [{
  			"id" : "1",		//文件系统的id
  			"fsName" : "fs1"	//文件系统名称
  },
  {
  ……
  }]		//已经停止运行的fs的数量
  },
  "userInfo" : {
  	"userSum" : "66",			//用户总数量
  		"userOnlineNum" : "2",		//在线的用户数量
  		"userFreezeNum" : "3"		//冻结的用户数量
  },
  "fsCapacity": {
  	"fsSize" : "10.0",			// fs表中fssize最小的fs的fssize值
  	"fsUsed" : "6.0",			//fs表中fsstate为REPAIRING的fs数量
  	"fsAvail" : "4.0"			//fs表中fsstate为REPAIRING的全部fs信息
  }
}

//管理控制台发来未审核用户信息请求
req：
{
	type:'56', // 对应的请求码是5
}
res:
{
	type:'56',
	datatable{
[
username:'',
			email:'',
			ip:'',
			mac:'',
			cpu:'',
			mainboard:'',
			os:''
]
}
	state: 0,  // 错误类型码，0表示成功
	errormessage:'' // 错误信息
}


//管理控制台发来审核结果（一个用户发一个）
req：
{
	type:'57', // 对应的请求码是57
    email:'',
	expire：",//用户有效期
	state: '0' ,//审核结果，0-通过，1-不通过
	reasonmessage:"//审核不通过原因
}
res:
{
	type:'57',
	state: 0,  // 错误类型码，0表示成功
	errormessage:'' // 错误信息
}

// 修改管理控制台当前用户密码
req：
{
	type:'58', // 对应的请求码是58
	name:'', //用户相关信息
	newpassword:'',
	oldpassword:'',
}
res:
{
	type:'58',
	state: 0,  // 错误类型码，0表示成功
	errormessage:'' // 错误信息
}

<<<<<<< HEAD
//60  AC用户注册写入默认值
///权限管理-返回用户类型已通过本地测试
req：
{
	type:'66', // 对应的请求码是66
	name:”,
	password:''
}
res:
{
	type:'66',
	state: 0,  // 错误类型码，0表示成功
	errormessage:'' // 错误信息
	usertype:’’1”//1-是管理员。2是监控组
  summary:”1”//0-false;1-true;
  user_manage:”1”//0-false;1-true;
  group_manage:”1”//0-false;1-true;
  user_pwd_init:”1”//0-false;1-true;
  user_check:”1”//0-false;1-true;
  fs_manage:”1”//0-false;1-true;
  global_cert_manage:”1”//0-false;1-true;
  global_param_manage:”1”//0-false;1-true;
  system_func_structure:”1”//0-false;1-true;
  director_manage:”1”//0-false;1-true;
  fs_monitor:”1”//0-false;1-true;
  node_status_monitor:”1”//0-false;1-true;
  meta_data_monitor:”1”//0-false;1-true;
  fs_mnt_manage:”1”//0-false;1-true;
  fs_mnt_view:”1”//0-false;1-true;
  mnt_node_manage:”1”//0-false;1-true;
  exception_file_manage:”1”//0-false;1-true;
  exception_fs_manage:”1”//0-false;1-true;
  password_change:”1”//0-false;1-true;
  ac_user_manage:”1”//0-false;1-true;
  ac_authority_manage:”1”//0-false;1-true;
  lock_manage:”1”//0-false;1-true;
  report:”1”//0-false;1-true;
  Report:”1”//0-false;1-true;
}

=======
//查询邮箱列表：
req{
	type：69
}
resp{
	type:69
	state :
	errormessage :
	sendEmail : 			//是否发送邮件，1：发送，0：不发送
	email:{
		id:				//邮箱id
		email:			//邮箱
		status；		//邮箱的禁用启用，0：禁用    1：启用
}
}

//添加邮箱
req{
	type:70
	email:			//邮箱，邮箱添加，默认是禁用状态
}
resp{
	type:70
	state :
	errormessage :
	email:{
		id:				//邮箱id
		email:			//邮箱
		status；		//邮箱的禁用启用，0：禁用    1：启用
}}

//删除
req{
	type:71
	id:				//邮箱id
}
resp{
	type:71
	state :
	errormessage :
}
>>>>>>> origin/master

//邮箱禁用或启用
req{
	type:72
	id:				//邮箱id
	operate:		//对邮箱的操作   0：禁用，1：启用
}
resp{
	type:72
	state :
	errormessage :
}

//变更邮件发送状态
req{
	type : 73
	emailSendStatus : 	//1 ：发送，0：不发送
}
resp{
	type:73
	state :
	errormessage :
}



*************************云平台版本********************************
//MDFS状态监控
req{
       “type”:20（int型）
}
resp{
       “type”:20（int型）
       “state”:”” String型
       “errorMessage”:”” String型
       “mdfsInfo”: {
       “mdfsStatus”:“”     String型        //运行状态(0表示正常运行，1表示运行异常，若为1，此时所有的mdfsinfo数据为异常前最新的一次数据)
       “mdfsStorage”:double型           //存储容量
       “mdfsAvailable”: double型         //可用容量
       “mdfsMntPath”:    “”String型     //挂载路径
       “upLinkSpeed”:1 long型               //实时上行速率，单位为k/s
       “downLinkSpeed”:1 long型           //实时下行速率，单位为k/s
}

//底层文件系统状态监控
req{
	“type”:21（int型）
}
resp{
	“type”:21（int型）
	“state”:”” String型
	“errorMessage”:”” String型
	“fsInfo”:[	//文件系统  数组型
	{
		“bottomFsId”:1(int型)
	“fsStorage”:double型		//存储容量
	“fsAvailable”: double型		//可用容量
	“fsUserd”:	double型		//已用容量
	“fsType”:	“”String型		//文件系统类型
	“fsMntPath”:	“”String型	//挂载路径
	“fsStatus”:“”	String型		//运行状态(是否正常运行) 0：正常运行 1：异常
}
]
}

//异常信息查询
//查询最新的20条数据
req{
	type:22
}
resp{
	“type”:22（int型）
	“state”:“”String型
	“errorMessage”:“”String型
	“exStaticsDay”: String//异常统计信息： 最近一天内文件系统异常次数
“exStaticsHour”: String//异常统计信息：最近一小时内文件系统异常次数
	“exInfo”:[		//异常信息  数组型
	{
	“exDate”:“”String型		//发生时间 格式：2019-03-14 01:30:59
	“exFsId”:int型				//文件系统的id
	“exFsPath”:””String			//文件系统出错的路径
	“exFilePath”:“”	String型		//异常文件路径
	“repairType”:	“”String型	//修复类型
	“exDetail”:””				//错误详细信息
	“transferPath”:“”String型	//转储路径}
}
]
}
//可以按照时间查询数据：
req{
	“type”:23
	“startTime”:””		//格式为2019-03-14
“endTime”:””		//格式为2019-03-14
}
resp{
	“type”:23（int型）
	“state”:“”String型
	“errorMessage”:“”String型
	“exStaticsDay”: String//异常统计信息： 最近一天内文件系统异常次数
“exStaticsHour”: String//异常统计信息：最近一小时内文件系统异常次数

	“exInfo”:[		//异常信息  数组型
	{
	“exDate”:“”String型		//发生时间 格式：2019-03-14 01:30:59
	“exFsId”:int型				//文件系统的id
	“exFsPath”:””String			//文件系统出错的路径
	“exFilePath”:“”	String型		//异常文件路径
	“repairType”:	“”String型	//修复类型
	“exDetail”:””				//错误详细信息
	“transferPath”:“”String型	//转储路径}
]
}


//日志信息查询模块
//查询最新的20条数据
req{
	“type”:24（int型）
}
resp{
	“type”:24（int型）
	“state”:“”	String型
	“errorMessage”:“”String型
	“logInfo”:[   数组型
	{
	“logDate”:“”String型		//日志时间 格式：2019-03-14 01:30:59
	“logThreadId”:int
	“logLevel”:“”String型	//日志等级
	“logLevelInt”:int
	“logInfo”:”” String型	//详细日志信息
	“logLocation”:””		//日志出现的位置
}
]
}

//查询某一天的数据;
req{
	“type”:25（int型）
    “startTime”:””		//格式为2019-03-14
“endTime”:””		//格式为2019-03-14

}
resp{
	“type”:25（int型）
	“state”:“”	String型
	“errorMessage”:“”String型
	“logInfo”:[   数组型
	{
	“logDate”:“”String型		//日志时间 格式：2019-03-14 01:30:59
	“logThreadId”:int
	“logLevel”:“”String型	//日志等级
	“logLevelInt”:int
	“logInfo”:”” String型	//详细日志信息
	“logLocation”:””		//日志出现的位置
}
]
}



```
