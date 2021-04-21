项目中经常会使用到第三方的 git 库, 将三方库整合到项目中最简单的办法就是复制粘贴, 但是如果这个库升级了一个很酷炫的功能, 你要怎么整合进来呢?(其实就是 git 版的包管理器)

这就是本次要介绍的 git-submodule 操作, 直接把第三方的版本库合并到自己的库中.

## 添加第三方库

我这里是自己开了两个库做测试, 主库叫 `body`, 另一个库叫 `leg`

首先在本地的`body`库中添加`leg`



```csharp
git clone https://git.oschina.net/gaofeifps/body.git
cd body
git submodule add https://git.oschina.net/gaofeifps/leg.git
```

这时查看下状态会多两个文件



```csharp
➜  body git:(master) ✗ git status
On branch master
Your branch is ahead of 'origin/master' by 1 commit.
  (use "git push" to publish your local commits)
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

           new file:   .gitmodules
           new file:   leg
```

这就多了一个 `leg`的库, 和一个`.gitmodules`的文件, 现在提交一下



```bash
git commit -am "add leg"
```

## 在其他地方使用合并后的版本库

本地提交了版本之后可以提交到远程试一下



```undefined
git push
```

这时去远程库中看的话库中的内容是这样的
 [图片上传失败...(image-78d365-1555555272709)]

这里有个奇怪的 `leg @ 6dec2fa`, 明明是没有的啊?
 点一下原来是一个快捷方式, 直接给连接到了 `leg`库的地址, 版本库中不会存第三方引入库的实体文件, 而是通过 `.gitmodules`的方式存储三方的联系方式, 当下载到本地运行的时候才会再拉取文件

而且这个时候在其他的地方安装`body`这个库的时候直接运行 `git clone` 是生成不了完整的文件的, 缺少了 `leg`库的文件
 因为这个时候的 `body/leg`目录是空的需要多走一步, 这时为什么呢? 我们下面会讲到原因



```php
git clone https://git.oschina.net/gaofeifps/body.git
git submodule init && git submodule update

#下面这一句的效果和上面三条命令的效果是一样的,多加了个参数  `--recursive`
git clone https://git.oschina.net/gaofeifps/body.git --recursive
```

这时才是一个完整的库

## 将三方库同步到主线

之前的一些步骤其实还不完整, 因为 `body/leg` 这个目录中的文件并没有和主线在一条线上, 这也是为什么在远程库的 leg 目录是空的, 因为在 master 分支里面它确实是空的, 文件是在另一个分支上, 我们先去看一下



```bash
cd path/to/body/leg
➜  leg git:(6dec2fa) git branch
* (HEAD detached at 6dec2fa)
  master
```

别的文件的分支都是 `master` 到这个文件的时候就是 `6dec2fa`分支了, 其实这个值也是 `leg`库当前的 commitId
 而且如果不把第三方的库纳入自己的主线的话会非常的危险, 因为你对项目中的三方库发生的任何改动都不会对主线产生任何影响, 被主线遗忘了, 因此我们还需要接下来的操作



```bash
cd path/to/body/leg
git checkout master
```

## 更新第三方库

这里有个问题就是如果`body/leg`发生了更新就首先在这个文件中提交一个`commit`, 然后在`body`这个目录下再 `commit`一次
 第一次 commit 是为了更新 `leg`的版本控制, 第二次更新是更新`body`的版本控制, 同时更新 `leg`库在`body`的指针

如果更新的比较多, 可以运行

## 批量更新第三方库

假设你的项目当中引入了 100 个第三方的库, 你需要同步的时候难道还要每一个都要执行:



```ruby
cd module-dir/
git checkout master
git pull
```

是不是想起了小学被老师罚抄一百遍的恐惧当中了?
 少年, 多看看文档准没错的, 这些东西 git 早就帮你想好了
 具体操作可以看一下`git help submodule`有相关的介绍的
 不想看文档的就直接告诉你



```csharp
git submodule foreach <command>
比如:
git submodule foreach git checkout master
```

这条命令就会按照 `.gitmodules`会根据`path`寻找所有的三方模块, 并在每一个模块中都执行 `foreach` 后的命令,
 比如你想批量更新模块到最新的时候就:



```csharp
git submodule foreach git submodule update
```

## 画个重点 (敲黑板!)

如果像让你引入的第三方库`leg`符合你自己的定制, 你在里面发生了一些修改, 但是这些修改并不能提交到远程去, 因为你的提交会让第三方库的作者产生困扰: 我写的好好的一个轮子你给定制成这样, 还怎么去给其他的人用?

而且这个问题很严重, 如果你本地的`leg`和`body`都更新了, 但是 第三方的`leg`不能提交到远程, 而`body`提交上去了, 那么与你同使用一个版本库的小伙伴就会因为当前项目`leg`的指针地址找不到而产生报错

所以如果有定制的需要就得去`fork`这个项目到你自己的 github 上, 然后自己想怎么折腾都随意了, 但是怎么去既有定制, 还能保持和轮子作者的版本同步呢?

## 怎么保持与作者同步?

首先是自己有一个 fork 的三方项目, 然后在自己本地添加一个三方的源



```csharp
cd path/to/body/leg
➜  leg git:(master) git remote -v
origin     https://git.oschina.net/gaofeifps/leg.git (fetch)
origin     https://git.oschina.net/gaofeifps/leg.git (push)

#添加第三方包的源地址
➜  leg git:(master) git remote add dist_source https://git.oschina.net/xxxx/leg.git
➜  leg git:(master) git remote -v
dist_source        https://git.oschina.net/xxxx/leg.git (fetch) #这个是三方的源地址
dist_source        https://git.oschina.net/xxxx/leg.git (push)
origin     https://git.oschina.net/gaofeifps/leg.git (fetch)    #这个是你 fork 的项目地址
origin     https://git.oschina.net/gaofeifps/leg.git (push)
```

这样的话可以拉取源文件到本地并合并本地代码



```undefined
git pull dist_source master
```

修复一下版本冲突的文件, 确认没有问题之后提交到自己 fork 的库中



```undefined
git push origin master
```

这样其他人就能正常使用了

写了这么多忽然发现: 还是复制粘贴比较省事啊!

那么

## 怎么删除 submodule?

在当前 git 版本`1.7.8`之前, 删除指定的 submodule 的命令是



```xml
git rm <submodule-name>
```

在新版的 git 下, 则是运行以下命令



```swift
git submodule deinit <submodule-name>
```

查看本地有哪些三方模块可以查看 `.gitmodules`



```csharp
➜  body git:(master) cat .gitmodules
[submodule "leg"]
           path = leg
           url = https://git.oschina.net/gaofeifps/leg.git
```