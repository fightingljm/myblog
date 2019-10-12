[toc]

### 微信小程序踩坑记录

#### 参数“？”之后字符串被截取。 

**例子**

```js
let url = "https://m.kuaidi100.com/index_all.html?type=emsguoji&postid=BE960265852US"
wx.navigateTo({
    url: `/pages/webView/index?url=${url}`
})
```

**解决办法**

  可以使用 `encodeURIComponent()` 函数可把字符串作为 URI 组件进行编码。

  ```js
  const url = encodeURIComponent(result.url)
  wx.navigateTo({
      url: `/pages/webView/index?url=${url}`
  })
  ```

  在获取的时候 `decodeURIComponent(options.url)`

#### 动态修改页面标题

**全局配置 app.json**

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

**页面功能固定**

例如：search.json

```json
{
  "navigationBarTitleText": "搜索"
}
```

**页面内容与业务关联**

例如：shop.js加载时动态设置页面标题

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
