### 微信小程序踩过的坑



- 问题：当参数的值为url的时候，在options中的值没有参数“？”之后字符串被截取。 

- eg.

```js
let url = "https://m.kuaidi100.com/index_all.html?type=emsguoji&postid=BE960265852US"
wx.navigateTo({
    url: `/pages/webView/index?url=${url}`
})
```

- 解决办法：

  可以使用 `encodeURIComponent()` 函数可把字符串作为 URI 组件进行编码。

  ```js
  const url = encodeURIComponent(result.url)
  wx.navigateTo({
      url: `/pages/webView/index?url=${url}`
  })
  ```

  在获取的时候 `decodeURIComponent(options.url)`