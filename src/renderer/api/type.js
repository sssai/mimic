// localTest，本地自测试时设为true，联调设为false，使用了该变量的方法请见变量下一行的注释
export const LOCAL_TEST = true
// api
//  ├─acUserTable.js
//  │   ├─GetDataTable()
//  │   └─UpdateAcUser(param)
//  ├─consoleConfig.js
//  │   ├─UnlockConsole(param)
//  │   └─UpdateLockState(param)
//  ├─reportForm.js
//  │   └─GetFSSafeReport(payload)
//  ├─socket.js
//  ├─summary.js
//  │   ├─GetMDFsStateSummary()
//  │   └─GetBottomFsStateSummary()
//  └─user.js
//    ├─CheckUser(username, password)
//    ├─ GetPermissionTree(param)
//    └─ChangePass(param)

// 新建用户，测试通过
export const USER_CREATE = 8

// 删除用户，可多选，测试通过
export const USER_DELETE = 9

// 获取一定量的用户列表，测试通过
export const USER_GET = 10

// update操作接口，测试通过
export const USER_UPDATE = 11

// 全局证书有效期设置，之前的用户有效期不是证书的，测试通过
export const CERT_EXPIRE = 12

// 挂载服务器的全局参数，测试通过
export const MOUNT_CONFIG = 13

// Mount节点上线下线，接口测试通过，本地显示出错
export const MOUNT_SCHEDULE = 14

// 请求节点状态图的数据，接口测试通过，本地显示出错
export const GET_NODE_STATUS = 15

// 获取mount节点状态，测试通过
export const GET_MOUNT_NODE = 16

// 管理员登录，测试通过
export const LOGIN = 17

// MANAGE_USER 管理用户启用禁用，测试通过
export const MANAGE_USER = 18

// GET_USER_NODE 获取user信息，测试通过
export const GET_USER_NODE = 19

// MDFS状态监控
export const GET_MDFS_STATE = 20

// 底层文件系统监控
export const GET_BOTTOM_FS_STATE = 21

// FS_ADD 新增文件系统，测试通过
// export const FS_ADD = 20

// 文件系统监控界面 获取视图数据，测试通过
// export const MONITOR_FS = 22

// 修改密码第一步获取验证码，测试通过
export const GET_CAPTCHA = 23

// ROOTCHANGEPASS 修改密码第二步发送验证码和新密码，测试通过
export const CHANGE_PASS = 24

//元数据错误监控页面饼图数据
export const MON_PIE = 28

//元数据错误监控页面点击饼图表格展示详细数据
export const MON_PIETOTABLE = 29

// 管理单个挂载节点信息的增删改查
export const MOUNTER_MANAGE = 31

//在前端页面配置文件系统与mount节点之间的映射关系，添加文件系统的挂载节点
export const MountFS_ADD = 32

// 获取每个挂载节点中文件系统挂载信息
export const SHOW_FS_MOUNT = 33

// 获取所有的挂载节点信息
export const GET_MOUNTERS = 34

// 管理用户权限目录信息
export const MANAGE_DIRS = 35

//管理用户组中的用户
export const ManageUserAndGroup = 36

//查询组内成员信息及不属于该组的用户信息
export const GROUP_INFO = 39

//修改组名
export const CHANGE_GROUPNAME = 40

//删除选中组群
export const DELETE_GROUP = 41

//新建组群
export const CREATE_GROUP = 42

//查询所有组群
export const GET_GROUP = 43

//修改用户目录
export const CHANGE_DIR = 44

//查询所有的异常文件
export const GET_ERRORfILES = 45

//异常文件下载
export const DOWNLOAD_ERRORfILES = 46

//查询所有的文件系统的相关信息
export const GET_FS = 47

//对可清洗的文件系统进行清洗
export const CLEAN_FS = 48

//查询CM信息，CM返回正在运行的CM信息
export const RUNING_CM_INFO = 49

//查询FS信息，分类返回
export const SIX_FS_INFO = 51

//文件系统池的基本信息
export const FSPOOL_INFO = 52

//根据ID查询特定文件系统的基本信息
export const FSBYID = 53

//查询所有文件系统的综合状态
export const GET_SUMMARY = 54

//查询所有的未审核用户信息
export const GET_USERAUDIT= 56

//返回管理员审核用户结果
export const AUDITRESULT= 57

//修改密码相关信息
export const CHANGE_CUR_PSW= 58

//获取ac用户信息
export const GET_AC_USER= 59

//添加ac用户
export const ADD_AC_USER= 60

//更新ac用户信息
export const UPDATE_AC_USER= 61

//删除ac用户
export const DELETE_AC_USER= 62

//注销用户
export const LOGOUT= 65

// 获取权限列表
export const GET_PERMISSION_TREE = 66

//权限管理-修改用户类型
export const PERMESSION_UPDATE_USER_TYPE= 67

//解除控制台锁定状态
export const UNLOCK_CONSOLE= 68

//查询邮箱列表
export const GET_EMAIL= 69

//添加邮箱
export const ADD_EMAIL= 70

//删除邮箱
export const DELETE_EMAIL= 71

//某个邮箱禁用或启用
export const CHANGE_EMAIL_STATUS= 72

//变更产生异常时全局邮件发送状态
export const CHANGE_EMAILSENDSTATUS= 73

// 更新锁定状态和时间
export const UPDATE_LOCK_STATE = 74

// 获取报表
export const GET_AC_REPORT = 75




/*****************************取消实现的接口***********************************************/

// MOUNT_ADD 新增挂载节点，这个已经取消
export const MOUNT_ADD = 111


/*****************************MDFS接口***********************************************/
//查询最新的20条异常信息
export const RECENT_ERROR_MESSAGE=22
//按时间查询异常信息
export const ERROR_MESSAGE_BY_TIME=23
//查询最新的20条日志信息
export const RECENT_LOG=24
//按时间查询日志信息
export const GRT_LOG_BY_TIME=25
