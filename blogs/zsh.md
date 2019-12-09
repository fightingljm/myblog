### 安装

```bash
# 克隆仓库里面的代码
$ git clone git://github.com/robbyrussell/oh-my-zsh.git ~/.oh-my-zsh
# 创建一个新的zsh配置文件
$ cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc
# 改变默认的shell
$ chsh -s /bin/zsh
```

### 踩坑一：zsh: command not found: react-native

```bash
步骤
# 进入zsh配置文件
$ vim ~/.zshrc
 
# 在末尾添加
$ source ~/.bash_profile

# 保存退出
# 配置生效
$ source ~/.zshrc  

# 这样关闭终端后重新开启也能正常使用了!!
```

### 踩坑二：终端切换

Mac系统默认使用bash作为终端，可以使用命令修改默认使用zsh：

```bash
$ chsh -s /bin/zsh
```

如果想修改回默认dash，同样使用chsh命令即可：

```bash
$ chsh -s /bin/bash
```

### 踩坑三：brew install xxx卡在Updating Homebrew

解决方法，关闭自动更新

```bash
export HOMEBREW_NO_AUTO_UPDATE=true
```

### 踩坑四：Oh My Zsh 安装 zsh-syntax-highlighting 

```bash
$ git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

### 踩坑五：Oh My Zsh 安装 zsh-autosuggestions

```bash
$ git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

### 踩坑六：安装完插件后的操作

```bash
$ brew install autojump
$ vim~/.zshrc

61 plugins = (
62  zsh-syntax-highlighting 
63  zsh-autosuggestions 
64 )

$ source~/.zshrc
```

