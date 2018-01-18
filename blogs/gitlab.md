### GitLab 上怎样把新 commits 使用在自己的 fork 上

2018年1月18日

步骤：

- 1、`配置上游项目地址。`也就是将你 fork 的项目的地址给配置到自己的项目上。
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

- 2、`获取上游项目更新。`使用 fetch 命令更新，fetch 后会被存储在一个本地分支 upstream/master 上。

```bash
➜ git fetch upstream
```

- 3、`合并到本地分支。`切换到 master 分支，合并 upstream/master 分支。

```bash
➜ git merge upstream/master
```

- 4、`提交推送。`根据自己情况提交推送自己项目的代码。

```bash
➜ git push origin master
```

由于项目已经配置了上游项目的地址，所以如果 fork 的项目再次更新，重复步骤 2、3、4即可。
