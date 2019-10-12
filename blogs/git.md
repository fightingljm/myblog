<!-- TOC -->

- [git 基本命令](#git-基本命令)
    - [新建分支](#新建分支)
    - [删除分支](#删除分支)
    - [切换远程分支](#切换远程分支)
    - [丢弃本地修改](#丢弃本地修改)
- [GitLab 上怎样把新 commits 使用在自己的 fork 上](#gitlab-上怎样把新-commits-使用在自己的-fork-上)
    - [配置上游项目地址。](#配置上游项目地址)
    - [获取上游项目更新。](#获取上游项目更新)
    - [合并到本地分支。](#合并到本地分支)
    - [提交推送。](#提交推送)
- [git commit 规范](#git-commit-规范)
    - [格式](#格式)
    - [Header](#header)
        - [type](#type)
        - [subject](#subject)
    - [Body](#body)
    - [Footer](#footer)
        - [关联 Issue](#关联-issue)
        - [关闭 Issue](#关闭-issue)
    - [例子](#例子)
- [git commit 时 图标使用](#git-commit-时-图标使用)
    - [emoji 指南](#emoji-指南)

<!-- /TOC -->

### git 基本命令

#### 新建分支

```bash
# 新建一个本地分支
$ git checkout -b v2
# 把新建的本地分支push到远程服务器，我这次的提交，远程分支与本地分支同名
$ git push origin v2:v2
```


#### 删除分支

```bash
# 删除本地分支
$ git branch -D 要删除的分支名称
# 删除远程分支
$ git push origin --delete 要删除的分支名称
```

![branch-D](https://github.com/fightingljm/myblog/blob/master/src/image/branch-D.jpg?raw=true)


#### 切换远程分支

git clone 只能 clone远程库的 master 分支，无法 clone 所有分支，解决办法如下：

- git clone https://github.com/fightingljm/myapp.git

>这样在 Desktop 目录下得到一个 myapp 子目录

- cd myapp
- git branch -a

>列出所有分支名称如下：

```
* 0.1.0
  master
  remotes/origin/0.1.0
  remotes/origin/HEAD -> origin/master
  remotes/origin/master
```

![gitBranch](https://github.com/fightingljm/myblog/blob/master/src/image/gitBranch.png?raw=true)

- git checkout -b dev origin/dev

>checkout远程的dev分支，在本地起名为dev分支，并切换到本地的dev分支

- git checkout -b release origin/release

>(同理)checkout远程的release分支，在本地起名为release分支，并切换到本地的release分支

- git checkout dev

>切换回dev分支，并开始开发。


#### 丢弃本地修改

分为三种情况：

- 还未将变更从工作区加入到暂存区，即未执行`git add` 命令前，可以使用`git checkout`命令来撤销修改

  ```bash
  git checkout -- a.scss b.scss
  git checkout -- *.css
  git checkout -- *
  ```

- 已将变更加入到暂存区，即已经执行了`git add`命令，可以使用`git reset`命令来撤销修改

  ```bash
  git reset HEAD a.scss b.scss
  git reset HEAD *.scss
  git reset HEAD  *
  ```

  > 执行以上命令后，**本地的修改并不会消失，而只是从暂存区回到了工作区**，即第一种情况下所示的状态。继续用第一种情况下的操作，就可以放弃本地的修改

- 已经将代码提交到本地仓库，即已经执行`git commit`命令，此时工作区已经clean,若想撤销之前的修改，需要执行版本回退操作：

  ```bash
  #回退到上一个版本
  git reset --hard HEAD^  
  #回退到上上次版本
  git reset --hard HEAD^^
  git reset --hard HEAD^^^
  
  #回退到指定commitid的版本
  git reset --hard  commit_id
  ```

  > 可以使用 `git log` 或 `git reflog` 命令来查看git的提交历史，获取commit_id.


### GitLab 上怎样把新 commits 使用在自己的 fork 上

步骤：

#### 配置上游项目地址。
也就是将你 fork 的项目的地址给配置到自己的项目上。
比如我 fork 了一个项目，原项目是 wolf/fork-demo.git，我的项目就是 wolf_liu/test-demo.git。
使用以下命令来配置。

```bash
➜ git remote add upstream git@gitlab.zoo.cn:wolf/fork-demo.git
```

然后可以查看一下配置状况，很好，上游项目的地址已经被加进来了。

```bash
➜ git remote -v
origin  git@gitlab.zoo.cn:wolf_liu/test-demo.git (fetch)
origin  git@gitlab.zoo.cn:wolf_liu/test-demo.git (push)
upstream    git@gitlab.zoo.cn:wolf/fork-demo.git (fetch)
upstream    git@gitlab.zoo.cn:wolf/fork-demo.git (push)
```

#### 获取上游项目更新。
使用 fetch 命令更新，fetch 后会被存储在一个本地分支 upstream/master 上。

```bash
➜ git fetch upstream
```

#### 合并到本地分支。
切换到 master 分支，合并 upstream/master 分支。

```bash
➜ git merge upstream/master
```

#### 提交推送。
根据自己情况提交推送自己项目的代码。

```bash
➜ git push origin master
```

由于项目已经配置了上游项目的地址，所以如果 fork 的项目再次更新，重复步骤 2、3、4即可。


### git commit 规范

#### 格式

提交信息包括三个部分：Header，Body 和 Footer。

```
<Header>

<Body>

<Footer>
```

其中，Header 是必需的，Body 和 Footer 可以省略。

####Header

Header部分只有一行，包括俩个字段：type（必需）和subject（必需）。

```
<type>: <subject>
```

##### type

type用于说明 commit 的类别，可以使用如下类别：

- feat：新功能（feature）
- fix：修补bug
- doc：文档（documentation）
- style： 格式（不影响代码运行的变动）
- refactor：重构（即不是新增功能，也不是修改bug的代码变动）
- test：增加测试
- chore：构建过程或辅助工具的变动

##### subject

subject是 commit 目的的简短描述。

- 以动词开头，使用第一人称现在时，比如change，而不是changed或changes
- 第一个字母小写
- 结尾不加句号（。）

#### Body

Body 部分是对本次 commit 的详细描述，可以分成多行。下面是一个范例。

```
More detailed explanatory text, if necessary.  Wrap it to 
about 72 characters or so. 

Further paragraphs come after blank lines.

- Bullet points are okay, too
- Use a hanging indent
```

>注意：应该说明代码变动的动机，以及与以前行为的对比。

#### Footer

Footer 部分只用于两种情况：

- 关联 Issue
- 关闭 Issue

##### 关联 Issue

本次提交如果和摸个issue有关系则需要写上这个，格式如下：

```
Issue #1, #2, #3
```
##### 关闭 Issue

如果当前提交信息解决了某个issue，那么可以在 Footer 部分关闭这个 issue，关闭的格式如下：

```
Close #1, #2, #3
```

#### 例子

说了半天不给个例子都是瞎扯淡，下面是一个完整的例子：

```
feat: 添加了分享功能

给每篇博文添加了分享功能

- 添加分享到微博功能
- 添加分享到微信功能
- 添加分享到朋友圈功能

Issue #1, #2
Close #1
```


### git commit 时 图标使用

#### emoji 指南

| emoji | emoji 代码 | commit 说明 |
| ----- | ---------- | ----------- |
| :art: (调色板) |	:art:	| 改进代码结构/代码格式 |
| :zap: (闪电):racehorse: (赛马) |	:zap:“:racehorse:	| 提升性能 |
| :fire: (火焰) |	:fire:	| 移除代码或文件 |
| :bug: (bug) |	:bug:	| 修复 bug |
| :ambulance: (急救车) |	:ambulance:	| 重要补丁 |
| :sparkles: (火花) |	:sparkles:	| 引入新功能 |
| :memo: (备忘录) |	:memo:	| 撰写文档 |
| :rocket: (火箭) |	:rocket:	| 部署功能 |
| :lipstick: (口红) |	:lipstick:	| 更新 UI 和样式文件 |
| :tada: (庆祝) |	:tada:	| 初次提交 |
| :white_check_mark: (白色复选框) |	:white_check_mark:	| 增加测试 |
| :lock: (锁) |	:lock:	| 修复安全问题 |
| :apple: (苹果) |	:apple:	| 修复 macOS 下的问题 |
| :penguin: (企鹅) |	:penguin:	| 修复 Linux 下的问题 |
| :checkered_flag: (旗帜) |	:checkered_flag:	| 修复 Windows 下的问题 |
| :bookmark: (书签) |	:bookmark:	| 发行/版本标签 |
| :rotating_light: (警车灯) |	:rotating_light:	| 移除 linter 警告 |
| :construction: (施工) |	:construction:	| 工作进行中 |
| :green_heart: (绿心) |	:green_heart:	| 修复 CI 构建问题 |
| :arrow_down: (下降箭头) |	:arrow_down:	| 降级依赖 |
| :arrow_up: (上升箭头) |	:arrow_up:	| 升级依赖 |
| :construction_worker: (工人) |	:construction_worker:	| 添加 CI 构建系统 |
| :chart_with_upwards_trend: (上升趋势图) |	:chart_with_upwards_trend:	| 添加分析或跟踪代码 |
| :hammer: (锤子) |	:hammer:	| 重大重构 |
| :heavy_minus_sign: (减号) |	:heavy_minus_sign:	| 减少一个依赖 |
| :whale: (鲸鱼) |	:whale:	| Docker 相关工作 |
| :heavy_plus_sign: (加号) |	:heavy_plus_sign:	| 增加一个依赖 |
| :wrench: (扳手) |	:wrench:	| 修改配置文件 |
| :globe_with_meridians: (地球) |	:globe_with_meridians:	| 国际化与本地化 |
| :pencil2: (铅笔) |	:pencil2:	| 修复 typo |