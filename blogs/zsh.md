- **克隆仓库里面的代码**
  git clone git://github.com/robbyrussell/oh-my-zsh.git ~/.oh-my-zsh
- **创建一个新的zsh配置文件**
  cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc
- **改变默认的shell**
  chsh -s /bin/zsh



```
zsh: command not found: react-native

步骤
1.进入zsh配置文件
 vim ~/.zshrc
 
2.在末尾添加
source ~/.bash_profile

3.保存退出
4.配置生效
source ~/.zshrc  

这样关闭终端后重新开启也能正常使用了!!
```

