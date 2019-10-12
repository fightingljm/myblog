### 百度地图 API 踩坑记录

[`[百度地图开放平台]`](http://lbsyun.baidu.com/)

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

**浏览器定位获取经纬度**

首先要保证你有一个容器

>
- 因为我这里是一个react组件，所以这里是jsx语法
- 因为我这里不需要显示地图，只需要拿到定位信息，所以容器高宽为零

```html
<div style={{width:'0', height: '0'}} id='container'></div>
```

```js
componentDidMount(){
  let _this = this
  let map = new BMap.Map("container");              // 创建地图实例
	let point = new BMap.Point(116.331398,39.897445);// 创建点坐标
	map.centerAndZoom(point,12);                   // 初始化地图，设置中心点坐标和地图级别

	let geolocation = new BMap.Geolocation();
	geolocation.getCurrentPosition(function(r){
		if(this.getStatus() == BMAP_STATUS_SUCCESS){
			var mk = new BMap.Marker(r.point);
			map.addOverlay(mk);
			map.panTo(r.point);
			// alert('您的位置：'+r.point.lng+','+r.point.lat);
      _this.setState({lng:r.point.lng,lat:r.point.lat})
		}
		else {
			alert('failed'+this.getStatus());
		}
	},{enableHighAccuracy: true})
}
```

**逆地址解析**

把存到 state 里的经纬度拿过来解析，并存到 store 里管理，这里只记录地址解析，和部分存储步骤

```js
// console.log('this.props',this.props);
let saveLocationInfoFunc = this.props.saveLocationInfo
// console.log('cityName',this.state.lng,this.state.lat);
let points = new BMap.Point(this.state.lng,this.state.lat);
let gcs = new BMap.Geocoder();
gcs.getLocation(points, function(rs){
   let addComp = rs.addressComponents;
   saveLocationInfoFunc(`${addComp.district} ${addComp.street} ${addComp.streetNumber}`)
  //  console.log(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
});
```

大功告成
