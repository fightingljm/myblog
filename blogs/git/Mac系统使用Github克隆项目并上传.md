## Mac系统使用Github克隆项目并上传

### 一：注册Github账号

注册应该不用多啰嗦

### 二：配置SSH

1. Mac系统自动安装了SSH，终端输入`ssh`查看是否已安装，输出以下内容表示已安装

   ![](https://ws3.sinaimg.cn/large/006tNbRwly1fydjzv7l6uj30v206eq3u.jpg)

2. 输入`ssh-keygen -t rsa`生成ssh key，回车，需要输入密码时输入密码即可（安全起见，Mac系统密码输入时不可见，输完直接回车即可），出现以下内容，说明生成了id_rsa和id_rsa.pub两个文件（id_rsa.pub为公钥，id_rsa为私钥，它们都是隐藏文件）

   > Windows系统在C盘Documents and Settings/username/.ssh下面，Mac系统可直接在桌面输入快捷键`Shift + Command + G`来搜索` .ssh`定位到这两个文件所在的文件夹

   ![](https://ws1.sinaimg.cn/large/006tNbRwly1fydkehupxxj30va0h8myo.jpg)

   ![](https://ws2.sinaimg.cn/large/006tNbRwly1fydkgerlyej30u20egjrn.jpg)

3. `cd /.ssh`进入到 .ssh隐藏文件夹，`ls`列出一下当前文件夹的文件，会发现出现两个文件id_rsa.pub 和id_rsa

   ![](/var/folders/wv/pqm4l02s17nfdv1cftzdj7xw0000gn/T/abnerworks.Typora/image-20181220221436309.png)

4. 执行命令`cat id_rsa.pub`获取公钥内容，复制此公钥内容

   ![](https://ws1.sinaimg.cn/large/006tNbRwly1fydkju3nvaj30vi05k3zs.jpg)

5. 粘贴公钥内容到github上，选Settings

   ![](https://ws1.sinaimg.cn/large/006tNbRwly1fydkpu3rldj30d40is0sx.jpg)

6. 选择这里

   ![](https://ws2.sinaimg.cn/large/006tNbRwly1fydlkec08oj314z0u0tbw.jpg)

7. 新建一个ssh key

   ![](https://ws1.sinaimg.cn/large/006tNbRwly1fydllctjqsj317g0pm75n.jpg)

8. title随便起，key输入刚复制的公钥内容，点击Add SSH key添加公钥

   ![](https://ws3.sinaimg.cn/large/006tNbRwly1fydkqtuipmj31720kyaad.jpg)

9. 添加完后，回来测试一下，输入命令`ssh -T git@github.com`来检查一下是否配置成功，以下结果代表成功

   ![](https://ws4.sinaimg.cn/large/006tNbRwly1fydkt3z33yj30vc05ot9f.jpg)

### 三：Fork项目

1. 到github上选择一个自己心仪的项目fork一下

   ![](https://ws4.sinaimg.cn/large/006tNbRwly1fydlj9xxlyj31j4060mxj.jpg)

2. 添加到自己的仓库中

   ![](/var/folders/wv/pqm4l02s17nfdv1cftzdj7xw0000gn/T/abnerworks.Typora/image-20181220224854124.png)

### 四：克隆项目到本地

1. fork完成后，会自动显示已fork完成的这个项目详情，复制一下这个链接

   ![](https://ws1.sinaimg.cn/large/006tNbRwly1fydlhitopuj31ji0pqdim.jpg)

2. 复制后，在电脑新建一个文件夹（比如doc）用以存放从github上克隆下来的项目

   ![](https://ws4.sinaimg.cn/large/006tNbRwly1fydlwvlr0sj30jy05wglj.jpg)

3. 命令行进入到新建的这个文件夹`cd 文件夹路径（找到文件夹直接拖入命令行即可）`

   ![](https://ws1.sinaimg.cn/large/006tNbRwly1fydlxj7iguj30va01gq2x.jpg)

4. 开始克隆这个项目`git clone 步骤1中复制的链接粘贴过来`

   ![](https://ws3.sinaimg.cn/large/006tNbRwly1fydm05t4jej30ui072jsh.jpg)

5. 已克隆到本地

   ![](https://ws3.sinaimg.cn/large/006tNbRwly1fydm11q6ayj30yi06wt8v.jpg)

### 五：编辑并上传项目

1. 编辑项目，此处以 ./fashop-docs/docs/docs/help中的001test.md为例

   ![](https://ws3.sinaimg.cn/large/006tNbRwly1fydm3dgcx3j30x605q0sv.jpg)

   ![](https://ws1.sinaimg.cn/large/006tNbRwly1fydmipvkl1j31p20ckwek.jpg)

2. 编辑完成后，需要上传到github（上传之前，需要确保已加入到源项目组中以便让作者看到你的提交，需要把github账号提供给项目作者），我们先进入到该项目`cd 项目路径`

   ![](https://ws2.sinaimg.cn/large/006tNbRwly1fydm59u38bj30v401odfw.jpg)

3. 运行`git add .`注意空格

   ![](https://ws3.sinaimg.cn/large/006tNbRwly1fydmao10fuj30ik00u745.jpg)

4. 然后输入命令`git commit -m'这里写一些本次所编辑项目的简要描述以便让项目作者看到你修改了什么'`

   ![](https://ws3.sinaimg.cn/large/006tNbRwly1fydm9z9ch4j30sm0cmq4d.jpg)

5. 然后输入命令`git pull`，需要输入密码时输入密码回车即可

   ![](https://ws3.sinaimg.cn/large/006tNbRwly1fydmcvux44j30la02m0st.jpg)

6. 输入命令`git push`

   ![](https://ws2.sinaimg.cn/large/006tNbRwly1fydme980b1j30vg09g75k.jpg)

7. 提交成功，我们返回到github这个项目上，即可查看到自己刚刚提交的内容

   ![](https://ws3.sinaimg.cn/large/006tNbRwly1fydmfubjaoj31kq0k240d.jpg)

8. 再到项目详情中找到刚刚修改的内容确认一下

   ![](https://ws4.sinaimg.cn/large/006tNbRwly1fydmgbvsfzj31l60kyjsf.jpg)

9. 接下来的事情就是等待项目创建者审核您的修改提交，通过后即可同步到源项目仓库了