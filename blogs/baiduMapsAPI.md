### 百日博客7 -- 百度地图 API 定位

2017.05.18 天津 晴 :sun_with_face:

眼看工作要步入正轨，又不明所以的陷入懵逼状态 :no_good: 还好煊赫大神帮忙捋了一下 :pray:

偷偷保存一下 a little 成果

![todos](https://github.com/fightingljm/myblog/blob/master/src/image/todos.png?raw=true)

开窍的我想到了自己之前用react写的一个 todos 正好拿来记录自己每天的工作安排，还不回丢失，机智如我 :angel:

![aSmallPartOFTheResults](https://github.com/fightingljm/myblog/blob/master/src/image/aSmallPartOFTheResults.png?raw=true)


进入正题 ==> 戳 [`[这里]`](http://lbsyun.baidu.com/) 进入百度地图开放平台

直接拿已有的百度账号登录就可以，

- `申请秘钥`

![aSmallPartOFTheResults](https://github.com/fightingljm/myblog/blob/master/src/image/applicationSecretKey.png?raw=true)

- `get到申请到的秘钥`

填写好信息后。点击确认按钮则生成生成一个密钥。界面会调转到列表管理页面。访问应用(AK)这一列的值就是你的密钥。如下图：

![aSmallPartOFTheResults](https://github.com/fightingljm/myblog/blob/master/src/image/secretKey.png?raw=true)

接下来就是使用了

- `网页调用`

ps：其实 [百度地图的 API](http://lbsyun.baidu.com/index.php?title=jspopular/guide/helloworld) 已经写的很清楚了

```html
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=您的密钥"></script>
```

> 注意：
*v2.0版本的引用方式*
src="http://api.map.baidu.com/api?v=2.0&ak=您的密钥"
*v1.4版本及以前版本的引用方式*
src="http://api.map.baidu.com/api?v=1.4&key=您的密钥&callback=initialize"



这里介绍的是浏览器定位获取经纬度，并进行逆地址解析，定位到具体街道，作为一个菜鸟的我想想就很酷，没想到一看他的那些 demo ，还有更酷的
