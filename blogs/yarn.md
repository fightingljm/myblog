### patch-package

```bash
yarn patch-package package-name
```

```json
"scripts": {
  "postinstall": "patch-package"
}
```

### 源、代理设置

- npm和yarn转换淘宝源和官方源

  ```bash
  npm config set registry http://registry.npm.taobao.org/
  npm config set registry https://registry.npmjs.org/
  
  yarn config set registry http://registry.npm.taobao.org/
  yarn config set registry https://registry.npmjs.org/
  ```

- npm 设置代理

  ```bash
  npm config set proxy http://127.0.0.1:8080
  npm config set https-proxy http://127.0.0.1:8080
  ```

- npm 删除代理

  ```bash
  npm config delete proxy
  npm config delete https-proxy
  ```

- yarn 设置代理

  ```bash
  yarn config set proxy http://127.0.0.1:8080
  yarn config set https-proxy http://127.0.0.1:8080
  ```

- yarn 删除代理

  ```bash
  yarn config delete proxy
  yarn config delete https-proxy
  ```

  

### hosts

报错信息：Error: Error making request to https://raw.githubusercontent.com/truffle-box/bare-box/master/truffle.js. Got error: **connect ECONNREFUSED 151.101.192.133:443**. Please check the format of the requested resource.

关键要看的错误信息是：connect ECONNREFUSED 151.101.192.133:443

什么意思？连接github的某个网页被拒绝了。

什么原因？网络配置有问题，和你连接的网络，或者你的网络的一些设置有关。

如何解决？我找到了两个办法：

1.换一个网络试一试，比如我之前连接的是校园网，后来换成了手机的热点，就可以。

2.修改hosts文件：

- Windows下：
  ![hosts-win](https://github.com/fightingljm/myblog/blob/master/src/image/hosts-win.png?raw=true)

- Mac 下
  打开Finder，按快捷键组合 Shift+Command+G 查找文件，输入 /private/etc/hosts  ,确认前往
  ![hosts-mac](https://github.com/fightingljm/myblog/blob/master/src/image/hosts-mac.png?raw=true)
  进入文件夹后，复制该文件到桌面，修改成功后保存，将原先的host文件替换掉即可

- 添加内容

  ```
  # Github Start
  
  13.250.177.223 gist.github.com
  
  13.250.177.223 github.com
  
  13.229.188.59 www.github.com
  
  151.101.56.133 raw.githubusercontent.com
  
  # Github End
  ```

  

[Mac OS 下三种修改Hosts文件的方法](https://blog.csdn.net/qq_41162289/article/details/80239468)

[参考1](https://blog.csdn.net/qq_41162289/article/details/80239468)

[参考2](https://blog.csdn.net/sinyusin/article/details/88776939)