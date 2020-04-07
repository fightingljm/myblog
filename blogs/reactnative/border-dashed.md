问题描述：borderStyle: “dashed"    Android 上虚线不生效



解决办法：和 borderRadius 一起使用

```css
borderStyle: "dashed",
borderRadius: 0
```

实践表明 borderRadius 的值不能为零，才能生效