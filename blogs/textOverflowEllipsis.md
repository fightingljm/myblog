[toc]

### CSS 超出部分省略号

单行文本的溢出显示省略号 应该都知道用 `text-overflow:ellipsis` 属性来，当然还需要加宽度 width 属来兼容部分浏览。

#### 单行

**实现方法：**

```
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
```

**效果如图：**

![ellipsisDome1](https://github.com/fightingljm/myblog/blob/master/src/image/ellipsisDome1.png?raw=true)

但是这个属性只支持单行文本的溢出显示省略号，如果我们要实现多行文本溢出显示省略号呢。

接下来重点说一说多行文本溢出显示省略号，如下。

#### 多行

**实现方法：**

```
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
```

**效果如图：**

![ellipsisDome2](https://github.com/fightingljm/myblog/blob/master/src/image/ellipsisDome2.png?raw=true)

**适用范围：**

因使用了WebKit的CSS扩展属性，该方法适用于WebKit浏览器及移动端；

>注意： -webkit-line-clamp用来限制在一个块元素显示的文本的行数。 为了实现该效果，它需要组合其他的WebKit属性。常见结合属性：
display: -webkit-box; 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。
-webkit-box-orient 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。

#### 模糊

**实现方法：**

```
p{
  position: relative;
  line-height: 20px;
  max-height: 40px;
  overflow: hidden;
}
p::after{
  content: "...";
  position: absolute;
  bottom: 0;
  right: 0;
  padding-left: 40px;
  background: -webkit-linear-gradient(left, transparent, #fff 55%);
  background: -o-linear-gradient(right, transparent, #fff 55%);
  background: -moz-linear-gradient(right, transparent, #fff 55%);
  background: linear-gradient(to right, transparent, #fff 55%);
}
```

**效果如图：**

![ellipsisDome3](https://github.com/fightingljm/myblog/blob/master/src/image/ellipsisDome3.png?raw=true)

**适用范围：**

该方法适用范围广，但文字未超出行的情况下也会出现省略号,可结合js优化该方法。

>注意： 将height设置为line-height的整数倍，防止超出的文字露出。
给p::after添加渐变背景可避免文字只显示一半。
由于ie6-7不显示content内容，所以要添加标签兼容ie6-7（如：<span>…<span/>）；兼容ie8需要将::after替换成:after。

### CSS3 超出文本 指定行数与省略号效果

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <style>
    .text1 {
    /*单行*/
      width:200px;
      overflow:hidden;
      text-overflow:ellipsis;
      -o-text-overflow:ellipsis;
      -webkit-text-overflow:ellipsis;
      -moz-text-overflow:ellipsis;
      white-space:nowrap;
    }
    .text2 {
    /*多行*/
      width:200px;
      word-break:break-all;
      display:-webkit-box;
      -webkit-line-clamp:2;
      -webkit-box-orient:vertical;
      overflow:hidden;
    }
    </style>
  <body>
    <div class="text1">
      程序员(英文Programmer)是从事程序开发、维护的专业人员。一般将程序员分为程序设计人员和程序编码人员，但两者的界限并不非常清楚，特别是在中国。软件从业人员分为初级程序员、中级程序员、高级程序员（现为软件设计师）、系统分析员，系统架构师，测试工程师六大类
    </div>

    <div class="text2">
      程序员(英文Programmer)是从事程序开发、维护的专业人员。一般将程序员分为程序设计人员和程序编码人员，但两者的界限并不非常清楚，特别是在中国。软件从业人员分为初级程序员、中级程序员、高级程序员（现为软件设计师）、系统分析员，系统架构师，测试工程师六大类
    </div>
  </body>
</html>
```
