### git

**git 切换远程分支**

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

<!-- gitBranch -->

- git checkout -b dev origin/dev

>checkout远程的dev分支，在本地起名为dev分支，并切换到本地的dev分支

- git checkout -b release origin/release

>(同理)checkout远程的release分支，在本地起名为release分支，并切换到本地的release分支

- git checkout dev

>切换回dev分支，并开始开发。
