# JavaScript 数字精度丢失问题总结

## JS数字精度丢失的一些典型问题

### 两个简单的浮点数相加

不管是 Java Python 还是 JavaSccript 

```js
0.1 + 0.2 !== 0.3 // true
```

![lostAccuracy-1](https://github.com/fightingljm/myblog/blob/master/src/image/lostAccuracy-1.png?raw=true)

### 大整数运算

```js
9999999999999999 === 10000000000000001 // true
9007199254740992 === 9007199254740993 // true
```

😄😂

### toFixed 不会四舍五入

```js
1.335.toFixed(2) // 1.33
```

线上曾经发生过 Chrome 中价格和其它浏览器不一致，正是因为 toFixed 兼容性问题导致的

![toFixedBug](https://github.com/fightingljm/myblog/blob/master/src/image/toFixedBug.png?raw=true)

## 数字丢失精度的原因

计算机的二进制实现和位数限制有些数无法有限表示。就像一些无理数不能有限表示，比如圆周率 3.141592653... ，1.33333333... 等
JS 遵循 IEEE 754 规范，采用双精度存储（double precision），占用 64 bit

- 1位用来表示符号位
- 11位用来表示指数
- 52位用来表示尾数



## 解决方案

对于整数，很少有业务需要用到超大整数，只要运算结果不超过 `Math.pow(2,53)` 就不会丢失精度

对于小数，前端出现的几率很多，尤其在一些电商网站涉及到金额等数据。解决方式：把小数放到整数位（乘倍数），再缩小回原来的倍数。

```js

0.1 + 0.2 === 0.3 // false

(0.1*10 + 0.2*10) / 10 === 0.3 // true

```

[参考](https://www.cnblogs.com/snandy/p/4943138.html)
