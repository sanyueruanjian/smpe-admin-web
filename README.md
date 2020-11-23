# smpe-admin-web
三月软件通用框架前端框架

### 项目简介

#### 用户账号密码

- 管理员： ```admin```
- 测试用户： ```test```
- 密码： ```123456```

#### 运行：

```
# 配置镜像加速
https://www.ydyno.com/archives/1219.html

# 安装依赖
npm install

# 启动服务 localhost:8013
npm run dev

# 构建生产环境
npm run build:prod
```

#### 技术栈

- ```Vue```
- ```vue-router```
- ```vuex```
- ```axios```
- ```element ui```

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

