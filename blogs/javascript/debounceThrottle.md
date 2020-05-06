### 对防抖和节流的理解

在开发中，我们常常会去监听滚动事件或者用户输入框验证事件，如果事件处理没有频率限制，就会加重浏览器的负担，影响用户的体验感。
因此，我们可以采取防抖（debounce）和节流（throttle）来处理，减少调用事件的频率，达到较好的用户体验。

因此，我们可以采取**防抖**（debounce）和**节流**（throttle）来处理，减少调用事件的频率，达到较好的用户体验。

**防抖（debounce）：**在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时，重新出发定时器。

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    .box {
      width: 200px;
      height: 200px;
      overflow: auto;
    }
  </style>
</head>
<body>
  <div class="box" id="container">
    <p>防抖演示</p>
    <p>防抖演示</p>
    <p>防抖演示</p>
    <p>防抖演示</p>
    <p>防抖演示</p>
    <p>防抖演示</p>
    <p>防抖演示</p>
    <p>防抖演示</p>
    <p>防抖演示</p>
  </div>
</body>
```



```js
function debounce(fn, wait) {
  var timeout = null;// 使用闭包，缓存变量
  return function() {

        if(timeout !== null) {
          console.log('清除定时器啦')
          clearTimeout(timeout);  //清除这个定时器
        }
        timeout = setTimeout(fn, wait);
    }
}
// 处理函数
function handle() {
  console.log(Math.random());
}
var container = document.getElementById('container')
container.addEventListener('scroll', debounce(handle, 1000));
```

![debounce-img](https://github.com/fightingljm/myblog/blob/master/src/image/debounce.gif?raw=true)

我们可以发现，当连续触发scroll事件，handle函数只会在1秒时间内执行一次，在如果继续滚动执行，就会清除定时器，重新计时。**相当于就是多次执行，只执行一次。**

**节流（throttle）：**规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。

```js
var throttle = function(func, delay) {
    var timer = null; // 使用闭包，缓存变量
    var prev = Date.now(); // 最开始进入滚动的时间
    return function() {
      var context = this;   // this指向window
      var args = arguments;
      var now = Date.now();
      var remain = delay - (now - prev); // 剩余时间
      clearTimeout(timer);
      // 如果剩余时间小于0，就立刻执行
      if (remain <= 0) {
        func.apply(context, args);
        prev = Date.now();
      } else {
        timer = setTimeout(func, remain);
      }
    }
  }
  function handle() {
      console.log(Math.random());
  }
  var container = document.getElementById('container')
  container.addEventListener('scroll', throttle(handle, 1000));
```

![throttle-img](https://github.com/fightingljm/myblog/blob/master/src/image/throttle.gif?raw=true)

在节流函数内部使用开始时间prev、当前时间now和剩余时间remain，当剩余时间小于等于0意味着执行处理函数，这样保证第一次就能立即执行函数并且每隔delay时间执行一次；

如果还没到时间，就会在remaining之后触发，保证最后一次触发事件也能执行函数，如果在remaining时间内又触发了滚动事件，那么会取消当前的计数器并计算出新的remaing时间。

通过**时间戳**和**定时器**的方法，我们实现了第一次立即执行，最后一次也执行，规定时间间隔执行的效果。

函数防抖和函数节流都是防止某一时间频繁触发，但是这两兄弟之间的原理却不一样

### 防抖和节流的区别

- **防抖**是将多次执行变为只执行一次

- **节流**是将多次执行变为每隔一段时间执行

### 防抖和节流的应用场景

防抖(debounce)

- search搜索联想，用户在不断输入值时，用防抖来节约请求资源。

- window触发resize的时候，不断的调整浏览器窗口大小会不断的触发这个事件，用防抖来让其只触发一次

节流(throttle)

- 鼠标不断点击触发，mousedown(单位时间内只触发一次)

- 监听滚动事件，比如是否滑到底部自动加载更多，用throttle来判断