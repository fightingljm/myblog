### 百日博客2 -- dangerouslySetInnerHTML

2017.04.20 天津 海上大风蓝色预警

这几天总结了一句话, 不是懵逼到崩溃就是兴奋到死, 是的, 今天又是懵逼的一天, 还好有大神带 ... ...

言归正传 ,聊聊 **dangerouslySetInnerHTML** 这个家伙

还是象征性的安利一下官网 ,毕竟我看不懂 ,看代码就好了 ... ... → → → [请戳这里](http://reactjs.cn/react/tips/dangerously-set-inner-html.html)


不合时宜的使用 `innerHTML` 可能会导致 *cross-site scripting (XSS)* 攻击。 净化用户的输入来显示的时候，经常会出现错误，不合适的净化也是 *导致网页攻击* 的原因之一。

设计哲学:让确保安全应该是简单的，开发者在执行“不安全”的操作的时候应该清楚地知道他们自己的意图。

 `dangerouslySetInnerHTML` 这个 prop 的命名是故意这么设计的，以此来警告，它的 prop 值（ 一个对象而不是字符串 ）应该被用来表明净化后的数据。

在彻底的理解安全问题后果并正确地净化数据之后，生成只包含唯一 key `__html` 的对象，并且对象的值是净化后的数据。下面是一个使用 JSX 语法的栗子：

```JSX
function createMarkup() { return {__html: 'First  &middot; Second'}; };
<div dangerouslySetInnerHTML={createMarkup()} />
```

这么做的意义在于，当你不是有意地使用 `<div dangerouslySetInnerHTML={getUsername()} />` 时候，它并不会被渲染，因为 `getUsername()` 返回的格式是 `字符串` 而不是一个 `{__html: ''}` 对象。`{__html:...}` 背后的目的是表明它会被当成 "type/taint" 类型处理。 这种包裹对象，可以通过方法调用返回净化后的数据，随后这种标记过的数据可以被传递给 `dangerouslySetInnerHTML`

基于以上原因，我们不推荐写这种形式的代码：`<div dangerouslySetInnerHTML={{'{{'}}__html: getMarkup()}} />`.

这个功能主要被用来与 DOM 字符串操作类库一起使用，所以提供的 HTML 必须要格式清晰（例如：传递 XML 校验 ）


大概就简单至此吧 `~\(≧▽≦)/~啦啦啦`

现在的我竟然有点昏昏欲睡,表示已经打开了满满的网页,准备半夜醒来或者明天早起来一波

![manypagesstudy](https://github.com/fightingljm/myblog/blob/master/src/image/manypagesstudy.png?raw=true)

- PC 端牛逼的 reducer 结构
- ES7 新特性: **static** 静态方法 ;ES7装饰器 **Decorator** ;ES7 中使用 **async/await** 解决回调函数嵌套问题
- 附加 : React Native
