### 使用 Create-React-App 创建 antd-mobile开发环境

**Create-React-App**

- Facebook 官方推出;
- 无需配置;
- 集成了对 React, JSX, ES6 和 Flow 的支持;
- 集成了开发服务器;
- 配置好了浏览器热加载的功能;
- 在 JavaScript 中可以直接 import CSS 和图片;
- 自动处理 CSS 的兼容问题，无需添加 -webkit 前缀;
- 集成好了编译命令，编译后直接发布成产品，并且还包含了 sourcemaps

`官网安利` [Create-React-App文档](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md)

Baby Go!

```bash
  $ npm install -g create-react-app       /* 安装create-react-app，建议使用cnpm */
  $ create-react-app myapp                 /* 使用命令创建应用，myapp为项目名称 */
  $ cd myapp                                        /* 进入目录，然后启动 */
  $ npm start
```

就这样，一个React开发环境就创建完毕，打开 http://localhost:3000/ 查看。。。

**环境配置介绍**

*项目结构：*

生成项目后，将会发现所有的webpack相关的配置文件都隐身了，此时查看myapp文件夹目录，会发现找不到任何webpack配置文件。

不用担心，一个命令让妖怪现原型

```bash
  $ npm run eject
```

再查看 myapp 文件夹，可以看到完整的项目结构：

```js
myapp/
    node_modules/
    package.json     /--------主要配置文件--------/
    .gitignore
    config/
        paths.js
        polyfills
        env.js
        webpack.config.dev.js     /--------主要配置文件--------/
        webpack.config.prod.js     /--------主要配置文件--------/
    public/
        index.html   / 入口html文件 /
    scripts/
        build.js     /--------主要配置文件--------/
        start.js     /--------主要配置文件--------/
        test.js
    src/
        App.js
        index.js    / 主入口文件 /
```

*项目配置介绍*

- package.json  scripts

```json
  "scripts": {
    "start": "node scripts/start.js",
    "build": "node scripts/build.js",
    "test": "node scripts/test.js --env=jsdom"
  },
```

一看便知，运行时是直接执行 scripts 文件目录下的 js文件。

其中 `start.js` 为开发环境, `build.js` 为打包脚本

开发环境，代理请求

查看 **start.js** , Facebook基本为每项配置都写了详尽的注释，比男朋友还贴心有木有

start.js脚本启动了dev-server, 这里需要了解的是

```js
  function addMiddleware(devServer){
    ... ...
    // 这个函数调用http-proxy-middleware模块，将代理请求，代理地址在package.json中添加
  }
```

在 `package.json` 中添加字段 `proxy` ，开发环境下 dev-server 将会自动转发请求：

```json
"proxy": "http://aaa.bbb.com"
```

- SASS、LESS等CSS预处理器配置

Facebook官方在create-react-app升级到某一版本，突然丢掉了默认对sass、less等预处理器的支持，

[这里便是官方合理的解释](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-css-preprocessor-sass-less-etc)

没关系，自己动手，丰衣足食

在 config 目录下，**webpack.config.dev.js** 和 **webpack.config.prod.js** 文件，没有抽出 loader、postcss之类一般共用的配置，于是，在两个文件夹都要一起配置，也可以抽出共用部分，以便维护。

这里以  **webpack.config.dev.js** 举例， **webpack.config.prod.js** 一样配置即可：

**SASS-loader：**

- 命令行，在当前目录执行：

```bash
 $ npm install sass-loader node-sass --save-dev
```

- 找到webpack.config.dev.js文件中 loaders 中的第一项exclude（值为数组），排除scss文件，否则将被'url-loader'捕获。

```js
  exclude: [
    /\.html$/,
    /\.(js|jsx)(\?.*)?$/,
    /\.css$/,
    /\.json$/,
    /\.svg$/,
    /\.scss$/     ....新增项!
  ]
```

- loaders新增一项：

```js
  {
    test: /\.scss$/,
    loader: 'style!css!postcss!sass?outputStyle=expanded'
  },
```

至此，SASS文件就可以正常打包了（此处针对SCSS文件，如用到SASS，可将SCSS的正则修改下），LESS文件类似，不再赘述。

- antd-mobile的引入及配置

在命令行执行：

```bash
  $ npm install antd-mobile --save  /-------现版本1.0.6-------/
```

`移动端高清方案`

因0.8以后的版本引入移动端高清方案，因此需要在webpack等增加相应配置

**必须配置！** ,按 [官方说明](https://github.com/ant-design/ant-design-mobile/wiki/antd-mobile-0.8-%E4%BB%A5%E4%B8%8A%E7%89%88%E6%9C%AC%E3%80%8C%E9%AB%98%E6%B8%85%E3%80%8D%E6%96%B9%E6%A1%88%E8%AE%BE%E7%BD%AE) 配置即可。

`按需引入`

为减少打包后体积以及方便书写，可用 babel-plugin-import 插件，配置后引入模块可如下：

```js
import {Picker} from 'antd-mobile';
```

自动引入CSS和JS，无需再引入整个antd-mobile的整个CSS文件

使用如下：

命令行执行：

```bash
 $ npm install babel-plugin-import --save-dev
```

安装完毕后，在根目录新建文件，命名: `.babelrc.js`

```js
{
  "presets": [
    "es2015",
    "react"
  ],
  "plugins": [
    [
      "import",
        {
          "libraryName": "antd-mobile",
          "style": "css"
        }
     ]
   ]
}
```

在文件内输入以上内容，为babel的配置。

然后！！！最重要的一步，把package.json中的babel配置给删掉，尤其是：react-app！！！

webpack.config.dev.js和webpack.config.prod.js中，都需要为resolve的extensions新增一项'.web.js'

antd-mobile的web版的文件后缀为.web.js ...

- 杂项

**React-Router** 版本

现在最新版本React-Router为4.x.x，与原用的2.x.x的API变化稍大（官方直接跳过了3...）

如需使用2.x.x版本

```bash
 $ npm remove react-router --save
```

然后在 package.json 中 dependencies 新增字段：

```json
"react-router": "^2.0.0 < 3.0.0",
```

命令行执行：

```bash
 $ npm install
```

到这里，就算搭建完开发环境了，可以正常进行开发了。
