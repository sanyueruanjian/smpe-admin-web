# SMPE-ADMIN-WEB
SMPE-ADMIN通用框架前端

## 项目简介
一个基于[EL-ADMIN](https://el-admin.vip/)、Spring Boot 2.1.0 、 Mybatis Plus、JWT + Spring Security、Redis、Vue的前后端分离的后台管理系统

**[官方文档](https://sanyueruanjian.github.io/smpe-admin-doc/)**

## 项目源码

|     |   后端源码  |   前端源码  |
|---  |--- | --- |
|  GitHub  | https://github.com/sanyueruanjian/smpe-admin |   https://github.com/sanyueruanjian/smpe-admin-web  |

### 项目结构

```
|-- public 存放静态资源，存放在该文件夹的东西不会被打包影响，而是会原封不动的输出到dist文件夹中
    |-- favicon.ico 网站图标
    |-- index.html 主页，项目入口
|-- src
    |-- api  后端请求接口文件
    |- assets  静态资源
    |-- components  公用组件
    |-- layout  系统布局：头部、侧边栏、设置、中间内容页面
    |-- mixins  混入文件
    |-- router  路由配置
    |-- store  vuex存放数据
    |-- utils  工具包
    |-- views  页面
    |-- app.vue  根组件
|-- main.js  入口文件
|-- settings.js  全局配置文件，存储一些键和值，供全局调用
|-- .gitignore  git忽略上传的文件格式
|-- .env.development  开发环境下的接口地址配置
|-- .env.production 生产环境下的接口地址配置
|-- .eslintignore  不用校验的文件
|-- .eslintrc.js  ES-lint校验(编码规范、校验规则)
|-- vue.config.js  cli配置文件
```

## 使用指南
### 用户账号密码

- 管理员： ```admin```
- 测试用户： ```test```
- 密码： ```123456```

### 运行：

```
# 配置镜像加速
https://www.ydyno.com/archives/1219.html

# 安装依赖
npm install

# 启动服务 localhost:8013
npm run dev

# 构建生产环境
npm run build
```

### 技术栈

- ```Vue```
- ```vue-router```
- ```vuex```
- ```axios```
- ```element ui```

## 服务器部署
参考：
1. [docker安装及docker常用命令](https://blog.csdn.net/qq_42937522/article/details/106274293)
2. [docker 构建git+maven+jdk8的centos7环境，实现轻量级的springboot项目的自动化部署](https://blog.csdn.net/qq_42937522/article/details/107755941)
3. [docker安装nginx规范所有项目的反向代理(一个项目一个反向代理的conf配置文件)](https://blog.csdn.net/qq_42937522/article/details/108179441)
4. [docker 构建centos7+git+nvm镜像，实现自主切换node版本统一部署前端vue项目](https://blog.csdn.net/qq_42937522/article/details/108702775)

# 鸣谢
- 感谢 [EL-ADMIN](https://el-admin.vip/) 开源框架
- 感谢[@shiwei-Ren](https://github.com/shiwei-Ren)、[@jiaoqianjin](https://github.com/jiaoqianjin)、[@Nancy](https://github.com/NancyDancy)参与初版的开发维护
- 感谢每一位为 SMPE-ADMIN 做出过贡献的开发者

# 反馈交流
QQ交流群：571506692