### 百日博客9 -- css3实现超出文本指定行数与省略号效果

2017.08.10 天津 晴 高温补贴

什么爱情的仪式感都是扯，不如提高自己的skill

直接上代码

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
