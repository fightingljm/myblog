### 微信小程序开发(一) --- 动态修改页面标题

2017年8月24日 晴

- 全局配置 app.json

`app.json 用以设置跳转页面链接、窗体格式、TabBar以及网络超时等`

```json
{
  "pages":[
    "pages/index/index",
    "pages/index/search",
    "pages/shop/shop",
    "pages/order/order"
  ],
  "window":{
    "backgroundTextStyle":"light",
    "navigationBarBackgroundColor": "#fff",
    "navigationBarTitleText": "择优",
    "navigationBarTextStyle":"#000"
  }
}
```

- 页面功能固定

eg. search.json

```json
{
  "navigationBarTitleText": "搜索"
}
```

- 页面内容与业务关联

eg. shop.js加载时动态设置页面标题

```js
var app = getApp();
Page({
  data: {},
  onLoad: function (options) {
    var that = this;
    that.setData({
      seller_name: options.seller_name//options为页面路由过程中传递的参数
    })
    wx.setNavigationBarTitle({
      title: that.data.seller_name//页面标题为路由参数
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})
```
