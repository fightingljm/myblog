### git

**新建分支**

```bash
# 新建一个本地分支
$ git checkout -b v2
# 把新建的本地分支push到远程服务器，我这次的提交，远程分支与本地分支同名
$ git push origin v2:v2
```



**删除分支**

```bash
# 删除本地分支
$ git branch -D 要删除的分支名称
# 删除远程分支
$ git push origin --delete 要删除的分支名称
```

![branch-D](https://github.com/fightingljm/myblog/blob/master/src/image/branch-D.jpg?raw=true)



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

![gitBranch](https://github.com/fightingljm/myblog/blob/master/src/image/gitBranch.png?raw=true)

- git checkout -b dev origin/dev

>checkout远程的dev分支，在本地起名为dev分支，并切换到本地的dev分支

- git checkout -b release origin/release

>(同理)checkout远程的release分支，在本地起名为release分支，并切换到本地的release分支

- git checkout dev

>切换回dev分支，并开始开发。



**git 丢弃本地修改**

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