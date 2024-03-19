注：在`React Native 0.70.6`的环境配置中，`Nodejs`需要安装16，`Ruby`需要安装2.7.5，版本号需要对应好！

## 安装Nodejs的方法

`Nodejs`是前端必备的环境，但是其版本更新很快，博主推荐使用`nvm`进行`Nodejs`的版本管理。在macOS上安装`nvm`非常简单，只需要输入如下指令即可：

```bash
brew install nvm
```

安装成功后，需要在文件`~/.zshrc`中加入如下语句：

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"  # This loads nvm
[ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion
```

添加完成后，执行如下指令即可使用`nvm`：

```bash
source ~/.zshrc
```

在完成`nvm`的安装后，可以使用如下指令安装并使用`Nodejs`：

```bash
nvm install 16
nvm use 16
```

执行成功后，使用如下指令即可查看系统目前默认的`Nodejs`版本：

```bash
node -v
```

## 安装Xcode后的配置细节

安装`Xcode`相对简单，只需要从App Store下载即可，下载完成后需要通过系统的`setting`进入如下操作界面，在`locations`项目下，点击红色框出的区域，选择`Xcode Command Line Tools`的位置，不进行这一步的话，后面会无法创建React Native。选择后，红框下方的文字会从几行长文字变成一个`/Applications/Xcode.app`。



[![配置Xcode Command Line Tools](https://kidhero.club/image/macOS_React_Native/picture1.png)](https://kidhero.club/image/macOS_React_Native/picture1.png)配置Xcode Command Line Tools



安装完成后，React Native就可以调用苹果的`Simulator`进行App的调试了。

## 安装Ruby的方法

macOS自带的`Ruby`版本无法满足React Native的需求，所以需要安装`rbenv`来进行系统中`Ruby`的版本管理。macOS安装`rbenv`的安装非常简单，只需要输入如下指令即可：

```bash
brew install rbenv
```

安装成功后，需要在文件`~/.zshrc`中加入如下语句，否则`rbenv`无法成功修改系统的`Ruby`版本：

```bash
export PATH="$HOME/.rbenv/bin:$PATH"
eval "$(rbenv init -)"
```

添加完成后，可以使用如下指令安装并使用`Ruby`：

```bash
rbenv install 2.7.5
rbenv global 2.7.5
```

执行成功后，使用如下指令即可查看系统目前默认的`Ruby`版本：

```bash
ruby --version
```

rvm切换Ruby版本

```bash
rvm --default use 2.7.6
```



参考

[Ruby 源代码镜像服务](https://ruby-china.org/wiki/ruby-mirror)

[RVM切换ruby版本](https://developer.aliyun.com/article/577269)

[清华大学开源软件镜像站](https://mirrors.tuna.tsinghua.edu.cn/)

[在M1 MacOS上搭建React Native开发环境](https://blog.kidhero.club/p/%E5%9C%A8m1-macos%E4%B8%8A%E6%90%AD%E5%BB%BAreact-native%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83/#%E5%AE%89%E8%A3%85xcode%E5%90%8E%E7%9A%84%E9%85%8D%E7%BD%AE%E7%BB%86%E8%8A%82)
