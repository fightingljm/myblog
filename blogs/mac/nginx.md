# nginx

### 打开 nginx 文件

```bash
cd /usr/local/etc/nginx
# 或者
j nginx
```

### 启动 nginx

```bash
# 启动
sudo nginx
# 重启
sudo nginx -s reload
```

### 配置 nginx

```nginx

# 定义了一个名为"testicall"的上游服务器
upstream testicall {
    #server www.sobot.com;
    server testicall.sobot.com;
    # server 81.70.156.77;
}

server{
    listen 318;
    # server_name testicall.sobot.com;

    location /outbound-admin/{
        # proxy_http_version 1.1;
        proxy_pass http://testicall;
    }
    location /outbound{
        proxy_pass http://testicall;
    }
    location /reports-v5 {
        proxy_pass http://testicall;
    }
    location /task-v5 {
        proxy_pass http://testicall;
    }
    location /icall/v5 {
        proxy_pass http://testicall;
    }
    location /icall-dialogflow/v5 {
        proxy_pass http://testicall;
    }
    location /icall {
        # 转发到上游服务器"testicall"来处理
        proxy_pass http://testicall;
    }
    location /dashboard{
        root  /***/NewRobotCall; # 需要替换本地项目地址
        rewrite  /dashboard(/[a-zA-Z0-9\-]+)+$ /dashboard/index.html;
    }
    location /dist{
        root  /***/NewRobotCall; # 需要替换本地项目地址
        rewrite  /dist(/[a-zA-Z0-9\-]+)+$ /dist/index.html;
    }
}

```

配置修改完成后，浏览器访问可能出现 403 Forbidden 没有权限访问。

### 针对403需要做的调整：

1. 更换启动方式

先关闭当前用户启动的 nginx

```bash
brew services stop nginx
```

换一种启动方式

```bash
sudo nginx
```


2. 更改文件夹权限

```bash
chmod -R 755 /文件夹路径
```

3. 设置nginx的user
如果以上还没解决403，需要设置 nginx 的 user，直接使用root用户。设置如下：

在nginx.config的第一行加上这个

```nginx
user root wheel;
```

测试nginx的配置，看设置是否生效

```bash
sudo nginx -t
```

如果没有问题，就再次重启

```bash
sudo nginx -s reload
```

到此，访问具体的文件就没问题了

### 文件夹访问权限

解决了单个文件访问的问题后，访问文件夹还是会出现403的问题，这是nginx的配置问题。
nginx.config 中 http.server 中的 autoindex 默认是off，关闭了文件夹的自动展示功能，目的是防止信息泄露。
将 autoindex 设置为 on 即可

```nginx
server {
        listen       80;
        server_name  localhost;
        # 开启自动索引，可静态访问文件夹
        autoindex on;
```

重启nginx即可生效。
```bash
sudo nginx -s reload
```

此时访问文件夹，就可以像 ftp 服务器一样预览文件了。
如果发现有中文乱码问题，可设置编码字符集进行解决。



[403问题参考文章](https://www.cnblogs.com/chenglc/p/16607579.html)
