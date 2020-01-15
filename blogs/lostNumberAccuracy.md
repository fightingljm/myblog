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

