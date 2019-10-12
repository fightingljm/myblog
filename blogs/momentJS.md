### Moment.js -- JavaScript 日期处理类库

- [官网](http://momentjs.cn/docs/)

就像 官网 所说，Moment.js -- JavaScript 日期处理类库，好用X3

**当前时间**

> moment().format("YYYY-MM-DD HH:mm:ss")

**当前时间的前10天时间**

> moment().subtract(10, "days").format("YYYY-MM-DD")

**当前时间的前1年时间**

> moment().subtract(1, "years").format("YYYY-MM-DD")

**当前时间的前3个月时间**

> moment().subtract(3, "months").format("YYYY-MM-DD")

**当前时间的前一个星期时间**

> moment().subtract(1, "weeks").format("YYYY-MM-DD")


**当前日期格式化**

```js
//四月 6日 2015, 3:55:57 下午
moment().format('MMMM Do YYYY, h:mm:ss a')

//星期一
moment().format('dddd')

// 4月 6日 15
moment().format("MMM Do YY")

// 2015 escaped 2015
moment().format('YYYY [escaped] YYYY')

// 2015-04-06T15:55:57+08:00
moment().format()

// 2015-04-06
moment().format('YYYY-MM-DD')

// 2015-04-06 03:55:57 下午
moment().format('YYYY-MM-DD h:mm:ss a')

```

**指定日期格式化**

```js
// 3年前
moment("20111031", "YYYYMMDD").fromNow()

// 3年前
moment("20120620", "YYYYMMDD").fromNow()

// 16小时前
moment().startOf('day').fromNow()

// 8小时内
moment().endOf('day').fromNow()

// 1小时前
moment().startOf('hour').fromNow()

```

**当前日期向前或者向后推的日期格式化**

```js
// 2015年3月27日
moment().subtract(10, 'days').calendar()

// 上周二下午3点55
moment().subtract(6, 'days').calendar()

// 上周五下午3点55
moment().subtract(3, 'days').calendar()

// 昨天下午3点55
moment().subtract(1, 'days').calendar()

// 今天下午3点55
moment().calendar()

// 明天下午3点55
moment().add(1, 'days').calendar()

// 本周四下午3点55
moment().add(3, 'days').calendar()

// 2015年4月16日
moment().add(10, 'days').calendar()

```

**也可以使用下面方式日期格式化**

```js
// 2015-04-06
moment().format('L')

// 2015-04-06
moment().format('l')

// 2015年4月6日
moment().format('LL')

// 2015年4月6日
moment().format('ll')

// 2015年4月6日下午3点55
moment().format('LLL')

// 2015年4月6日下午3点55
moment().format('lll')

// 2015年4月6日星期一下午3点55
moment().format('LLLL')

// 2015年4月6日星期一下午3点55
moment().format('llll')

```

实际应用中，比如可以很方便的得到上周的开始日期和结束日期等，能够灵活运用moment.js各种日期处理都不在话下，



**可选自定义参数**

Moment.js提供了丰富的说明文档，使用它还可以创建日历项目等复杂的日期时间应用。我们日常开发中最常用的是格式化时间，下面我把常用的格式制作成表格说明供有需要的朋友查看：

|格式代码|说明|返回值例子|
|---|----|:---:|
|M|	数字表示的月份，没有前导零	|1到12|
|MM|	数字表示的月份，有前导零	|01到12|
|MMM|	三个字母缩写表示的月份	|Jan到Dec|
|MMMM|	月份，完整的文本格式	|January到December|
|Q|	季度	|1到4|
|D|	月份中的第几天，没有前导零	|1到31|
|DD|	月份中的第几天，有前导零	|01到31|
|d|	星期中的第几天，数字表示	|0到6，0表示周日，6表示周六|
|ddd|	三个字母表示星期中的第几天	|Sun到Sat|
|dddd|	星期几，完整的星期文本|从Sunday到Saturday|
|w|	年份中的第几周	|如42：表示第42周|
|YYYY|	四位数字完整表示的年份	|如：2014 或 2000|
|YY|	两位数字表示的年份	|如：14 或 98|
|A|	大写的AM PM	|AM PM|
|a|	小写的am pm	|am pm|
|HH|	小时，24小时制，有前导零	|00到23|
|H|	小时，24小时制，无前导零	|0到23|
|hh|	小时，12小时制，有前导零	|00到12|
|h|	小时，12小时制，无前导零	|0到12|
|m|	没有前导零的分钟数	|0到59|
|mm|	有前导零的分钟数	|00到59|
|s|	没有前导零的秒数	|1到59|
|ss|	有前导零的描述	|01到59|
|X|	Unix时间戳	|1411572969|
