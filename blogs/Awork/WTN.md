

jenkins

http://jenkins.ops.sobotws.cn:54321/jenkins

yangjs

d@SDOyoC^X#PfKoK





jumpserver 

http://jumpserver.ops.sobotws.cn:20080/ 

yangjs
b@SDOyoC^X#P89101



>维他奶测试环境
>
>私有云超管服务/ops-artifactory
>
>cd wtn
>
>./update test 包





```hash
cd /data/static/consolenew/

rm -fr wxm

mkdir wxm

cd wxm

wget 包

tar xf wxm.tar.gz 
```



企业微信后台配置的测试环境地址是 ： http://test.sobotws.cn/wechatbar/#/?path=workbench&corpId=wwe14ef2ae6ea5fe43

需求： 跑本地环境



webpack 配置  ----------------  请求的域名替换成配置的域名 e g. localhost --> 82.157.18.46:10080

proxy: {

​    '/boss': {

​      target: 'http://82.157.18.46:10080',

​    },

​    '/gateway': {

​      target: 'http://82.157.18.46:10080',

​    },

  },

Host 配置  ----------------  test.sobotws.cn域名 代理到本地

127.0.0.1     test.sobotws.cn

nginx 配置  ----------------  监听test.sobotws.cn 80 端口 代理到本地 的 8000 端口

server {

​        listen 80*;*

​        server_name test.sobotws.cn*;*

​        index index.html*;*

​        location / {

​            proxy_pass http://127.0.0.1:8000/*;*

​        }

​        location /sockjs-node/ {

​            proxy_pass http://127.0.0.1:8000/sockjs-node/*;*

​            proxy_http_version 1.1*;*

​            proxy_set_header Upgrade $http_upgrade*;*

​            proxy_set_header Connection "upgrade"*;*  

​        }

​    }

