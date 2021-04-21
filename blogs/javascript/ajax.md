## XMLHttpRequest

2014年1月30日，W3C的[Web应用工作组（Web Applications Working Group）](http://www.w3.org/2008/webapps/)发布了[XMLHttpRequest Level 1](http://www.w3.org/TR/2014/WD-XMLHttpRequest-20140130/) 的标准工作草案。XMLHttpRequest规范定义了一个API，允许脚本化（如JavaScript）的Web客户端在不刷新页面的情况下，实现客户端和Web服务器之间传递数据。[XMLHttpRequest最新规范](https://xhr.spec.whatwg.org/)

Ajax的核心是Javascript对象XMLHttpRequest。该对象在Internet Explorer 5中首次引入，它是一种支持异步请求的技术。简而言之，XMLHttpRequest是你可以使用Javascript想服务器提出请求并处理响应，并不阻塞用户。通过XMLHttpRequest对象，Web开发人员可以在页面加载以后进行页面局部更新。

XMLHttpRequest对象的常用方法和属性

- open('HTTP请求方式', 'url')建立对服务器的调用
- send()发送具体的请求
- abort()停止当前请求
- 属性readyState请求的状态（0:未初始化；1:正在加载；2:已加载；3:交互中；4:完成）
- 属性responseText 服务器的响应，表示为一个串
- 属性responseXML 服务器的响应，表示为XML
- status服务器的HTTP状态码（200 ok；400 not found）

## Ajax

Ajax全称是“Asynchronous Javascript and XML” ------ 异步Javascript和XML

AJAX是一种用于创建快速动态网页的技术。它不是新的编程语言，而是一种使用现有标准的新方法。Ajax最大的优点是在不重新加载整个页面的情况下，可以与服务器交换数据并异步更新部分网页内容。它不需要任何浏览器插件，但需要用户允许Javascript在浏览器上执行。

AJAX应用

- 运用`HTML`+`CSS`来表达资讯
- 运用`Javascript`操作`DOM`（Document Object Model）来执行动态效果
- 运用`XML`和XSLT操作资料
- 运用`XMLHttpRequest`或新的Fetch API与网页服务器进行异步资料交

Ajax优势

- 通过异步模式提升了用户体验
- 优化了浏览器和服务器之间的传输，减少不必要的数据往返，减少了宽带占用
- Ajax引擎在客户端运行，承担了一部分本来由服务器承担的工作，从而减少了大用户量下的服务器负载

Ajax最大特点

- 可以实现动态局部刷新

  就是能在不更新整个页面的前提下维护数据。这使得Web应用程序更为迅捷地回应用户动作，并避免了在网络上发送那些没有改变过的信息。

原生ajax请求步骤

```js
// 创建XMLHttpRequest对象
var ajax = new XMLHttpRequest();
// 调用open方法设置基本请求信息，规定请求类型、URL、以及是否异步处理请求（连接服务器，打开和服务器的连接）
ajax.open('get', url, true);
// 发送信息至服务器时内容编码类型
ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// 发送请求
ajax.send(null);
// 接收服务器响应数据
ajax.onreadystatechange = function() {
  if(ajax.readyState == 4 && ajax.status == 200) {
		console.log(ajax.responseText);
  }
}
```

ajax几种请求方式以及优缺点

```
常用的post、get、delete、put
代码上的区别：
1、get通过url传递参数
2、post设置请求头   规定请求数据类型
使用上的区别：
1、post比get安全（因为post参数在请求体中。get参数在url上面）
2、get传输速度比post快 （根据传参决定：post通过请求体传参，后台通过数据流接收，速度稍微慢一些。而get通过url传参可以直接获取）
3、post传输文件大理论没有限制 get传输文件大小大概7-8k ie4k左右
4、get获取数据 post上传数据（上传的数据比较多，而且上传数据都是重要数据。所以不论在安全性还是数据量级，post是最好的选择）
```

ajax的优缺点

```
优点
1、最大的一点是页面无刷新，用户的体验非常好
2、使用异步方式与服务器通信，具有更加迅速的响应能力。
3、可以把以前一些服务器负担的工作转嫁到客户端，利用客户端闲置的能力来处理，减轻服务器和宽带的负担，节约空间和宽带租用成本。并且减轻服务器的负担，ajax的原则是“按需取数据”，可以最大程度的减少冗余请求，和响应对服务器造成的负担
4、基于标准化的并被广泛支持的技术，不需要下载插件或者小程序
缺点
1、ajax不支持浏览器back按钮
2、安全问题 Ajax暴露了与服务器交互细节
3、对搜索引擎的支持比较弱
4、破坏了程序的异常机制
5、不容易调试
```

## axios



## Fetch

Fetch是一种HTTP数据请求方式，是XMLHttpRequest的一种替代方案。fetch不是ajax的进一步封装，而是原生js。Fetch函数就是原生js，没有使用XMLHttpRequest对象

优点

- 

- 符合关注分离，没有将输入、输出和用事件来跟踪的状态混杂在一个对象里