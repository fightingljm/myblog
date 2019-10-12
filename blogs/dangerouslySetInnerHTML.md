### dangerouslySetInnerHTML

[官网解释](http://reactjs.cn/react/tips/dangerously-set-inner-html.html)

不合时宜的使用 `innerHTML` 可能会导致 *cross-site scripting (XSS)* 攻击。 净化用户的输入来显示的时候，经常会出现错误，不合适的净化也是 *导致网页攻击* 的原因之一。

设计哲学: 让确保安全应该是简单的，开发者在执行“不安全”的操作的时候应该清楚地知道他们自己的意图。

 `dangerouslySetInnerHTML` 这个 prop 的命名是故意这么设计的，以此来警告，它的 prop 值（ 一个对象而不是字符串 ）应该被用来表明净化后的数据。

在彻底的理解安全问题后果并正确地净化数据之后，生成只包含唯一 key `__html` 的对象，并且对象的值是净化后的数据。下面是一个使用 JSX 语法的栗子：

```JSX

function createMarkup() { return {__html: 'First  &middot; Second'}; };
<div dangerouslySetInnerHTML={createMarkup()} />

```

这么做的意义在于，当你不是有意地使用 `<div dangerouslySetInnerHTML={getUsername()} />` 时候，它并不会被渲染，因为 `getUsername()` 返回的格式是 `字符串` 而不是一个 `{__html: ''}` 对象。`{__html:...}` 背后的目的是表明它会被当成 "type/taint" 类型处理。 这种包裹对象，可以通过方法调用返回净化后的数据，随后这种标记过的数据可以被传递给 `dangerouslySetInnerHTML`

基于以上原因，我们不推荐写这种形式的代码：`<div dangerouslySetInnerHTML={{'{{'}}__html: getMarkup()}} />`.

这个功能主要被用来与 DOM 字符串操作类库一起使用，所以提供的 HTML 必须要格式清晰（例如：传递 XML 校验 ）

##### 补充

必要的时候还要进行 HTML标签转义及反转义

这里提供一个非常简单有效的转义方案，利用了 **innerHTML** 和 **innerText**

> 注：火狐不支持innerText，需要使用 `textContent` 属性，而IE早期版本不支持此属性，为了同时兼容IE及火狐，需要进行判断操作.

因为 `innerText（textContent）` 会获取纯文本内容，忽略html节点标签，而 `innerHTML` 会显示标签内容，所以我们先将需转义的内容赋值给 `innerText（textContent）` ，再获取它的 `innerHTML` 属性，这时获取到的就是转义后文本内容。
代码如下：

```js
function HTMLEncode(html) {
	var temp = document.createElement("div");
	(temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
	var output = temp.innerHTML;
	temp = null;
	return output;
}

var tagText = "<p><b>123&456</b></p>";
console.log(HTMLEncode(tagText));//&lt;p&gt;&lt;b&gt;123&amp;456&lt;/b&gt;&lt;/p&gt;
```

通过 `测试` 结果，可以看到html标签及&符都被转义后保存。
同理，反转义的方法为先将转义文本赋值给 `innerHTML` ，然后通过 `innerText（textContent）` 获取转义前的文本内容

```js
function HTMLDecode(text) {
	var temp = document.createElement("div");
	temp.innerHTML = text;
	var output = temp.innerText || temp.textContent;
	temp = null;
	return output;
}
var tagText = "<p><b>123&456</b></p>";
var encodeText = HTMLEncode(tagText);
console.log(encodeText);//&lt;p&gt;&lt;b&gt;123&amp;456&lt;/b&gt;&lt;/p&gt;
console.log(HTMLDecode(encodeText)); //<p><b>123&456</b></p>
```

举个例子 :rabbit:

场景 ：一个从后台那道的数据

```js
{
    "errcode": 0,
    "errmsg": "操作成功",
    "data": {
        "id": 125,
        "title": "德世朗双层保温便当盒DFS-B051A",
        "category_id": 190,
        "category_title": "请选择... >家居餐厨 >餐厨用品",
        "body": "&lt;p&gt;\r\n\t&lt;p&gt;\r\n\t\t&lt;div class=&quot;O&quot;&gt;\r\n\t\t\t&lt;div&gt;\r\n\t\t\t\t&lt;b&gt;双层保温便当盒 &lt;/b&gt;\r\n\t\t\t&lt;/div&gt;\r\n\t\t\t&lt;div&gt;\r\n\t\t\t\t&lt;b&gt;DFS-B051A&lt;br /&gt;\r\n&lt;/b&gt;\r\n\t\t\t&lt;/div&gt;\r\n\t\t&lt;/div&gt;\r\n\t&lt;/p&gt;\r\n\t&lt;p&gt;\r\n\t\t材质：优质不锈钢\r\n\t&lt;/p&gt;\r\n\t&lt;div&gt;\r\n\t\t&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp; 内格&lt;span&gt;PC/&lt;/span&gt;外壳&lt;span&gt;PP &lt;/span&gt;\r\n\t&lt;/div&gt;\r\n\t&lt;div&gt;\r\n\t\t规格：&lt;span&gt;14cm &lt;/span&gt;\r\n\t&lt;/div&gt;\r\n\t&lt;div&gt;\r\n\t\t统一零售价：&lt;b&gt;168&lt;/b&gt;&lt;b&gt;元 &lt;/b&gt;\r\n\t&lt;/div&gt;\r\n\t&lt;div&gt;\r\n\t\t&lt;br /&gt;\r\n\t&lt;/div&gt;\r\n\t&lt;div&gt;\r\n\t&lt;/div&gt;\r\n\t&lt;div&gt;\r\n\t&lt;/div&gt;\r\n&lt;/p&gt;"
    }
}
```

使 obj.data.body 显示在页面 ，解决办法 :seedling:

```js
import React from 'react';
import { Tabs, Icon, Spin } from 'antd';

class GoodsDetailMain extends React.Component {
	callback(e){
		console.log(e);
	}
	render(){
		let showData = this.props.goodsDetailData;
		let createBody = () => {
			return {__html: this.HTMLDecode(this.HTMLDecode(showData.body))};
		};
		console.log('evaluateData',evaluateData);
		if(evaluateData){
			return(
				<Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
					<TabPane tab="商品详情" key="1">
						<div className="ncs-intro">
							<div className="content bd" id="ncGoodsIntro" style={{marginTop: '20px'}}>
							<div dangerouslySetInnerHTML={createBody()} />
							</div>
						</div>
					</TabPane>
					<TabPane tab="商品评价" key="2"/>
				</Tabs>
			)
		}else {
			return <Spin tip="Loading..."/>
		}
	}
	HTMLDecode(text){
		var temp = document.createElement("div");
		temp.innerHTML = text;
		var output = temp.innerText || temp.textContent;
		temp = null;
		return output;
	}
}

export default GoodsDetailMain;
```
