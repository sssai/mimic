# mdfs_AC

> An electron-vue project
> 主要用到element-ui、vuex、vue-router和vue，需要熟悉这些内容的API以及ES6（参考阮一峰的网站es6.ruanyifeng.com）的用法

#### Build Setup

```bash
# install dependencies
# 项目所在的位置不应该有中文，应该在纯英文路径上，否则项目在打包时可能会出现异常
yarn install

# serve with hot reload at localhost:9080
# 若报错显示无法解析某一模块，一般都是因为该模块没有安装，使用yarn install ****或npm install*****来安装它，安装完成后再次执行yarn install，才来执行yarn run dev
yarn run dev

# build electron application for production
# 若报错显示无法解析某一模块，一般都是因为该模块没有安装，使用yarn install ****或npm install*****来安装它，安装完成后再次执行yarn install，才来执行yarn run dev
yarn run build

# run unit & end-to-end tests
yarn test
```

这个应用设置了一个serverConfig.json，用来保存服务器地址，格式就是标准的json格式，如下
```js
{
	"host":"219.223.199.154",
	"hostBackup":"192.168.1.14"
}
```
这个文件被放置在Windows中%APPDATA%目录下的mdfs_AC文件夹中，一般是C:\Users\xxx\AppData\Roaming\mdfs_AC

在开发过程中为了方便本地自测，在src/render/api/type.js下设置了一个LOCAL_TEST变量。当设为true时，为本地自测模式，某些api的js会因为设置了这个之后进入测试模式，比如user.js里面的登录方法会因为这个为true而登录时不会验证用户密码的正确性，可以直接登录等，所有和这个变量相关的方法都在type.js的该变量前注释了。如果要进入联调或者打包使用，请去修改这个变量为false关闭自测或把该变量以及相关方法中的自测部分删除。

****注意！还需自行安装freeSSHd.exe********

### 统计代码的行数
```bash
 find -name "*[.vue|.js]" -type f | xargs cat | wc -l
```

### d3的学习, v3.5.17

defs---建议把所有需要再次使用的引用元素定义在defs元素里面。

select---可以select不存在的元素，然后append上去，很神奇。其实不是这样的，如下
```js
svg.selectAll("rect")    
          .data(dataset)    
          .enter()    // 这个enter很重要，当元素不足时，它可以根据后续的append自动添加元素
          .append("rect")  
```

移除某个特定的node是可以的，node.exit().remove()

d是一个描述path的属性，很复杂！！
```
M0,-5A3,4 0 0,1 5,5
// 大写的字母是绝对位置，小写是相对当前的位置
// M代表moveto，一般第一步都是拎起画笔定位第一个点
// A代表arcto，是椭圆弧曲线的移动

viewBox是一个属性，可以生成类似内部容器元素的东西，以包裹元素

marker是绘制箭头的元素

force.nodes([nodes]) 设置布局的相关节点为指定的nodes数组

force.links([links]) 设置布局的相关链接为指定的links 数组

动态力导向图的绘制：
1. 区分挂载节点和普通节点，位置和半径需要设置`
{ type:'mountNode',radius:15,},
{ type:'clientNode',radius:5,}
`
2. 加上path
```
### 用户是否在线与redirect的结合

### d3版本更迭

Error in mounted hook: "TypeError: Cannot read property 'force' of undefined"，简单来说就是force函数是v3版本的，
v4没有这个函数了，相应的功能已经变成了forceSimulation

d3 v3的API 有函数不会用可以直接搜 https://github.com/d3/d3-3.x-api-reference/blob/master/API-Reference.md

### 代码的权限控制
