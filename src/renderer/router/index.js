/**
 * 所有的路由都在这个文件里配置
 */
import Vue from 'vue'
import Router from 'vue-router'

import ResetPasswordPage from '@/components/ResetPasswordPage'
import LoginPage from '@/components/LoginPage'
// import HomePage from '@/components/HomePage'
// import NewUserPage from '@/components/NewUserPage'
import UpdateUserPage from '@/components/UpdateUserPage'

import ConfigPage from '@/components/ConfigPage'
import FileSystem from '@/components/ConfigPage/FileSystem'
import Cert from '@/components/ConfigPage/Cert'
import GlobalPara from '@/components/ConfigPage/GlobalPara'
import MountNode from '@/components/ConfigPage/MountNode'
import CreatDir from '@/components/ConfigPage/CreatDir'
import AddDir from '@/components/ConfigPage/AddDir'
import UpdateDir from '@/components/ConfigPage/UpdateDir'
import SystemStructure from '@/components/ConfigPage/SystemStructure'


import MonitorPage from '@/components/MonitorPage'
import FSEorrorPage from '@/components/MonitorPage/FSEorrorPage'
import NodeStatusPage from '@/components/MonitorPage/NodeStatusPage'
import EDataEorrorPage from '@/components/MonitorPage/EDataEorrorPage'

import MounterPage from '@/components/MounterPage'
import MounterManage from '@/components/MounterPage/MounterManage'
import MountFS from '@/components/MounterPage/MountFS'
import ShowFSMount from '@/components/MounterPage/ShowFSMount'
import AddMounter from '@/components/MounterPage/AddMounter'
import UpdateMounter from '@/components/MounterPage/UpdateMounter'

import AuthManagePage from '@/components/AuthManagePage'
import ErrorFileManage from '@/components/AuthManagePage/ErrorFileManage'
import DownloadErrorFile from '@/components/AuthManagePage/DownloadErrorFile'
import ErrorFS from '@/components/AuthManagePage/ErrorFS'
import ErrorNotify from '@/components/AuthManagePage/ErrorNotify'
import ErrorMessage from '@/components/AuthManagePage/ErrorMessage'
import SystemLog from '@/components/AuthManagePage/SystemLog'


import UserManagePage from '@/components/UserManagePage'
import UserListPage from '@/components/UserManagePage/UserListPage'
import GroupManagePage from '@/components/UserManagePage/GroupManagePage'
import ChangePassword from '@/components/UserManagePage/ChangePassword'
import NewUserPage from '@/components/UserManagePage/NewUserPage'
import UserAudit from '@/components/UserManagePage/UserAudit'

import Summary from '@/components/Summary'

import Content from '@/components/Content'

import ConsoleConfig from '@/components/ConsoleConfig'
import ConsolePermission from '@/components/ConsoleConfig/ConsolePermission'
import GroupManage from '@/components/ConsoleConfig/GroupManage'
import AddACUser from '@/components/ConsoleConfig/GroupManage/AddACUser'
import UpdateACUser from '@/components/ConsoleConfig/GroupManage/UpdateACUser'
import ConsoleLock from '@/components/ConsoleConfig/ConsoleLock'
import LockPage from '@/components/ConsoleConfig/ConsoleLock/LockPage'
import ChangeCurUserPwd from '@/components/ConsoleConfig/ChangeCurUserPwd'

import ReportForm from '@/components/ReportForm'
import FSSafe from '@/components/ReportForm/FSSafe'


Vue.use(Router)

let router = new Router({
	routes:[
    {
      path:'/content',
      component: Content,
      children:[
      		{
      			path:'summary',
      			component: Summary,
            meta:{
              title: ['概览']
            }
      		},
      		{ /*FS用户管理*/
      			path:'user',
      			component: UserManagePage,
      			// vue-router的嵌套路由
      			children:[
      				{ /*FS用户管理*/
      					path:'userlist',
      					component:UserListPage,
                meta:{
                  title: ['FS用户管理', '用户管理']}
      				},
      				{ /*FS组管理*/
      					path:'groupmanage',
      					component:GroupManagePage,
                meta:{
                  title: ['FS用户管理', '组管理']}
      				},
      				{ /*FS用户密码重置*/
      					path:'changepassword',
      					component:ChangePassword,
                meta:{
                  title: ['FS用户管理', '用户密码重置']}
      				},
              { /*FS用户审核*/
                path:'useraudit',
                component:UserAudit,
                meta:{
                  title: ['FS用户管理', '用户审核']}
              },
          		{
          			path:'newuser',
          			component: NewUserPage,
                meta:{
                  title: ['FS用户管理', '新建用户']}
          		},
      			]
      		},
      		{ /*配置管理*/
      			path:'config',
      			component: ConfigPage,
      			// vue-router的嵌套路由
      			children:[
      				{ /*文件系统配置*/
      					path:'filesystem',
      					component:FileSystem,
                meta:{
                  title: ['配置管理', '文件系统配置']}
      				},
      				{ /*全局证书配置*/
      					path:'cert',
      					component:Cert,
                meta:{
                  title: ['配置管理', '全局证书配置']}
      				},
      				{ /*全局参数配置*/
      					path:'globalpara',
      					component:GlobalPara,
                meta:{
                  title: ['配置管理', '全局参数配置']}
      				},
      				//
      				{ /*系统功能结构*/
      					path:'systemstructure',
      					component:SystemStructure,
                meta:{
                  title: ['配置管理', '系统功能结构']}
      				},
      				{ /*目录管理*/
      					path:'creatdir',
      					component:CreatDir,
                meta:{
                  title: ['配置管理', '目录管理']}
      				},
      				{
      					path:'adddir',
      					component:AddDir,
                meta:{
                  title: ['配置管理', '新增文件夹']}
      				},
      				{
      					path:'upadatedir/:id',
      					component:UpdateDir,
                meta:{
                  title: ['配置管理', '更新文件夹']}
      				},
              {
                path:'downloadfile/:download_info',
                component:DownloadErrorFile,
                meta:{
                  title: ['配置管理', '下载日志']}
              },
      			]
      		},
      		{ /*监控视图*/
      			path:'monitor',
      			component: MonitorPage,
      			// vue-router的嵌套路由
      			children:[
      				{ /*文件系统监控*/
      					path:'fseorror',
      					component:FSEorrorPage,
                meta:{
                  title: ['监控视图', '文件系统监控']}
      				},
      				{ /*节点状态监控*/
      					path:'nodestatus',
      					component:NodeStatusPage,
                meta:{
                  title: ['监控视图', '节点状态监控']}
      				},
      				{ /*元数据监控*/
      					path:'edataeorror',
      					component:EDataEorrorPage,
                meta:{
                  title: ['监控视图', '元数据监控']}
      				},
      			]
      		},
      		{ /*挂载管理*/
      			path:'mounter',
      			component: MounterPage,
      			// vue-router的嵌套路由
      			children:[
      				{ /*挂载节点管理*/
      					path:'mountermanage',
      					component:MounterManage,
                meta:{
                  title: ['挂载管理', '挂载节点管理']}
      				},
      				{ /*文件系统挂载关系配置*/
      					path:'mountFS',
      					component:MountFS,
                meta:{
                  title: ['挂载管理', '文件系统挂载关系配置']}
      				},
      				{ /*文件系统挂载关系展示*/
      					path:'showfsmount',
      					component:ShowFSMount,
                meta:{
                  title: ['挂载管理', '文件系统挂载关系展示']}
      				},
      				{
      					path:'addmounter',
      					component:AddMounter,
                meta:{
                  title: ['挂载管理', '添加挂载节点']}
      				},
      				{
      					path:'updatemounter/:id',
      					component:UpdateMounter,
                meta:{
                  title: ['挂载管理', '更新挂载节点']}
      				}
      			]
      		},
      		{
      			path:'updateuser/:id',
      			component: UpdateUserPage
      		},
      		{ /*异常管理*/
      			path:'auth',
      			component: AuthManagePage,
      			// vue-router的嵌套路由
      			children:[
      				{ /*异常文件管理*/
      					path:'errorfilemanage',
      					component:ErrorFileManage,
                meta:{
                  title: ['异常管理', '异常文件管理']}
      				},
      				{ /*异常文件系统管理*/
      					path:'errorfs',
      					component:ErrorFS,
                meta:{
                  title: ['异常管理', '异常文件系统管理']}
      				},
              { /*异常告警管理*/
                path:'errornotify',
                component:ErrorNotify,
                meta:{
                  title: ['异常管理', '异常告警管理']}
              },
              { /*异常信息总览*/
                path:'errormessage',
                component:ErrorMessage,
                meta:{
                  title: ['异常管理', '异常信息查询']}
              },
              { /*系统日志*/
                  path:'systemlog',
                  component:SystemLog,
                  meta:{
                    title: ['异常管理', '系统日志']}
              },
      			]
      		},
      		{ /*控制台设置*/
      			path:'consoleconfig',
      			component: ConsoleConfig,
            children:[
      				{ /*密码修改*/
      					path:'changecuruserpwd',
      					component:ChangeCurUserPwd,
                meta:{
                  title: ['控制台设置', '密码修改']}
      				},
      				{ /*控制台用户管理*/
      					path:'consolepermission',
      					component:ConsolePermission,
                meta:{
                  title: ['控制台设置', '控制台权限管理']}
      				},
      				{ /*新增控制台用户*/
      					path:'addacuser',
      					component:AddACUser,
                meta:{
                  title: ['控制台设置', '新增控制台用户']}
      				},
      				{ /*更新控制台用户*/
      					path:'updateacuser/:id',
      					component:UpdateACUser,
                meta:{
                  title: ['控制台设置', '更新控制台用户']}
      				},
      				{ /*控制台权限管理*/
      					path:'groupmanage',
      					component:GroupManage,
                meta:{
                  title: ['控制台设置', '控制台用户管理']}
      				},
      				{ /*锁定设置*/
      					path:'consolelock',
      					component:ConsoleLock,
                meta:{
                  title: ['控制台设置', '锁定设置']
                }
      				}
            ]
      		},
          {
            path:'reportform',
            component: ReportForm,
            children:[
        				{ /*系统安全报表*/
        					path:'fssafe',
        					component:FSSafe,
                  meta:{
                    title: ['系统报表', '系统安全报表']}
        				},

            ]
          }
      ]
    },
		{ /*登录页面*/
			path:'/',
			component: LoginPage
		},
    { /*忘记密码*/
      path:'/resetpassword',
      component: ResetPasswordPage
    },
    { /*锁定页面*/
      path:'/lockpage',
      component: LockPage
    }
	]
})

export default router
