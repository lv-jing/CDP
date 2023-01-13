# CDP

## 开发环境

- [download](https://nodejs.org/en/download/) - node<sup>^8.10.0</sup> npm<sup>^5.6.0</sup>

### 安装依赖

```shell
//到达你的项目目录
cd project

//安装依赖
npm install

```

### 运行

```shell
//启动
npm start

//发布
npm run build

```

### 项目结构说明

```
project
├── config                   // umi 配置，包含路由，构建等配置
├── mock                     // 本地模拟数据
├── public                   // public资源
│   └── favicon.png          // Favicon
├── src
│   ├── assets               // 本地静态资源
│   ├── components           // 业务通用组件
│   ├── context              // 业务状态管理器
│   ├── layout               // 布局
│   ├── hooks                // 通用逻辑复用
│   ├── pages                // 业务页面入口
│   ├── router               // 路由配置文件
│   ├── utils                // 工具库
│   ├── locales              // 国际化资源
│   ├── App.js               // 组件入口
│   └── index.js             // entry JS
├── README.md
└── package.json
└── .eslintrc.js             // ESLint配置文件
└── .env.development         // 开发环境变量
└── .env.production          // build环境变量
└── jsconfig.json            // 常规配置，比如路径别名等
└── craco.config.js          // craco增强或覆盖webpack的配置
```

### 开发约定

- page页面代码结构约定
  ```
  └── pages
    ├── Home           
    |   ├── components // 放置本页面拆分的一些组件
    |   ├── hooks      // 放置本页面拆分的一些可复用逻辑
    |   ├── index.jsx  // 页面组件的代码
    |   └── index.less // 页面样式

  ```

- 项目健壮性约定
  - 子路由components通过 `React.lazy` 做处理动态引入组件。

- webpack 业务状态管理约定

    - webpack 配置功能的新增或扩展在 `craco.config.js ` 下进行。

- 目录约定

    - 应用逻辑开发的公共资源在 `project/src/public` 下，而非 `project/public` 下。
    - 公共 components 开发目录在 `project/src/components`。
    - 不同布局类型的页面入口统一从 `project/src/components/layout` 开始。
    - 页面入口统一从 `project/src/components/page` 开始。
  
- context状态管理约定 TODO


- router 约定
    - 利用`react-router-config`优化路由管理和编写
    - 应用通过 `project/src/router/index.jsx` 统一管理。


### 库和版本（基于create-react-app和Ant Design）

```
{
    "@craco/craco": "^6.1.1",                       // webpack config
    "@testing-library/jest-dom": "^5.11.4",         // test library, included in create-react-app by default
    "@testing-library/react": "^11.1.0",
    "@testing-library/user-event": "^12.1.10",
    "ahooks": "^2.10.2",                            // Functional hooks, use for business logics or user interaction
    "antd": "^4.15.3",                              // UI components and style, include uploading library etc.
    "axios": "^0.21.1",                             // Request tools
    "bizcharts": "^4.1.10",                         // Charts library
    "craco-less": "^1.17.1",                        // Less supported
    "moment": "^2.29.1",                            // Date Time format
    "react": "^17.0.2",                             // React core
    "react-dnd": "^14.0.2",                         // Drag and sort core
    "react-dnd-html5-backend": "^14.0.0",           // H5 drag library
    "react-dom": "^17.0.2",                         // React for web
    "react-intl-universal": "^2.4.5",               // Internationalization
    "react-router-dom": "^5.2.0",                   // React router
    "react-scripts": "4.0.3",                       // Build scripts and build env supported
    "web-vitals": "^1.0.1"                          // Web performance analysis, included in create-react-app by default
}
```

### 注意事项 TODO


### 相关文档
- [create-react-app](https://github.com/facebook/create-react-app)
- [react](https://reactjs.org/)
- [antd](https://ant.design/index-cn)
- [react-router-dom](https://www.npmjs.com/package/react-router-dom)
- [react-router-config](https://www.npmjs.com/package/react-router-config)
- [axios](https://www.npmjs.com/package/axios)
- [bizcharts](https://bizcharts.net/product/BizCharts4/category/61/page/98)
- [ahooks](https://ahooks.js.org/zh-CN/)

配置相关

- [@craco/craco](https://www.npmjs.com/package/@craco/craco)
- [webpack](https://www.webpackjs.com/)
