/*这是一个用于管理全局路由的组件，新增或修改组件路由，除了在router中修改之外，
在这边修改后，在需要用到的地方引用该组件，后续如果路由有修改，
只需要修改该全局路由组件和router即可，无需在每个引用路由的页面进行修改*/
export const inSummary = false

export const LOGIN_PAGE = "/"

// 概览
export const SUMMARY = "/content/summary"

// 重置当前ac用户密码
export const RESET_PSW = '/resetpassword'

// 锁定页面
export const LOCK_PAGE = "/lockpage"

// FS用户管理
export const FS_USER_MANAGE = {
  indexpage: "/content/user",
  // FS用户管理--用户管理
  userlist: "/content/user/userlist",
  // FS用户管理--组管理
  groupmanage: "/content/user/groupmanage",
  // FS用户管理--用户密码重置
  changepassword: "/content/user/changepassword",
  // FS用户管理--用户审核
  useraudit: "/content/user/useraudit",
  // FS用户管理--新建用户
  newuser: "/content/user/newuser",
  // FS用户管理--新建用户
  updateuser: "/content/updateuser/",
}


// 配置管理
export const CM_CONFIG = {
  indexpage: "/content/config",
  // 配置管理--文件系统配置
  filesystem: "/content/config/filesystem",
  // 配置管理--全局证书配置
  cert: "/content/config/cert",
  // 配置管理--全局参数配置
  globalpara: "/content/config/globalpara",
  // 配置管理--系统功能结构
  systemstructure: "/content/config/systemstructure",
  // 配置管理--目录管理
  creatdir: "/content/config/creatdir",
}

// 监控视图
export const MONITOR = {
  indexpage: "/content/monitor",
  // 监控视图--文件系统监控
  fseorror: "/content/monitor/fseorror",
  // 监控视图--节点状态监控
  nodestatus: "/content/monitor/nodestatus",
  // 监控视图--元数据监控
  edataeorror: "/content/monitor/edataeorror",
}

// 挂载管理
export const MOUNTER = {
  indexpage: "/content/mounter",
  // 挂载管理--文件系统挂载关系配置
  mountFS: "/content/mounter/mountFS",
  // 挂载管理--文件系统挂载关系展示
  showfsmount: "/content/mounter/showfsmount",
  // 挂载管理--挂载节点管理
  mountermanage: "/content/mounter/mountermanage",
}

// 异常管理
export const AUTH = {
  indexpage: "/content/auth",
  // 异常管理--异常文件管理
  errorfilemanage: "/content/auth/errorfilemanage",
  // 异常管理--异常文件系统管理
  errorfs: "/content/auth/errorfs",
  // 异常管理--异常告警管理
  errornotify: "/content/auth/errornotify",
  //异常信息总览
  errormessage:"/content/auth/errormessage",
    //系统日志
  systemlog:"/content/auth/systemlog"
}

// 控制台设置
export const CONSOLE_CONFIG = {
  indexpage: "/content/consoleconfig",
  // 控制台设置--密码修改
  changecuruserpwd: "/content/consoleconfig/changecuruserpwd",
  // 控制台设置--控制台权限管理
  consolepermission: "/content/consoleconfig/consolepermission",
  // 控制台设置--控制台用户管理
  groupmanage: "/content/consoleconfig/groupmanage",
  // 控制台设置--新增控制台用户
  addacuser: "/content/consoleconfig/addacuser",
  // 控制台设置--更新控制台用户
  updateacuser: "/content/consoleconfig/updateacuser/",
  // 控制台设置--锁定设置
  consolelock: "/content/consoleconfig/consolelock",
}

export const REPORT_FORM = {
  indexpage: "/content/reportform",
  // 系统报表-系统安全报表
  fssafe: "/content/reportform/fssafe",
}

export default {
  inSummary,
  LOGIN_PAGE,
  SUMMARY,
  RESET_PSW,
  LOCK_PAGE,
  FS_USER_MANAGE,
  CM_CONFIG,
  MONITOR,
  MOUNTER,
  AUTH,
  CONSOLE_CONFIG,
  REPORT_FORM,
}
