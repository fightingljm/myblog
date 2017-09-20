### SVG 能不能用 img 标签

2017年9月20日

- `SVG 文件可通过以下标签嵌入 HTML 文档：<embed>、<object> 或者 <iframe>。`
- `SVG的代码可以直接嵌入到HTML页面中，或您可以直接链接到SVG文件。`

**使用 <embed> 标签**

语法：`<embed src="test.svg" type="image/svg+xml" />`

>优势：所有主要浏览器都支持，并允许使用脚本
缺点：不推荐在HTML4和XHTML中使用（但在HTML5允许）


**使用 <object> 标签**

语法：`<object data="test.svg" type="image/svg+xml"></object>`

>优势：所有主要浏览器都支持，并支持HTML4，XHTML和HTML5标准
缺点：不允许使用脚本。


**使用 <iframe> 标签**

语法：`<iframe src="test.svg"></iframe>`

>优势：所有主要浏览器都支持，并允许使用脚本
缺点：不推荐在HTML4和XHTML中使用（但在HTML5允许）


**直接在HTML嵌入SVG代码**

在Firefox、Internet Explorer9、谷歌Chrome和Safari中，你可以直接在HTML嵌入SVG代码。

语法：`<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
   <circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="red" />
</svg>`


**SVG标签 引入外部代码**

语法：`<svg style={{height:'4rem',width:'4rem',marginTop:'1rem'}}>
    <use xlinkHref={require('../images/test.svg')}/>
</svg>`


**链接到SVG文件**

您还可以用<a>标签链接到一个SVG文件：链接到SVG文件

语法：`<a href="test.svg">View SVG file</a>`
