Java C++ 是基于类的语言，JavaScript 是动态的，本身不提供一个 class 实现
在 ES6 中引入的 class 关键字只是一个语法糖，JavaScript 任然是基于原型的

当谈到继承时，JavaScript只有一种结构：对象。每个实例对象都有一个私有属性 `__proto__` 指向它的构造函数的原型对象 `prototype` 
该原型对象也有一个自己的原型对象 `__proto__` ，层层向上，直到一个对象的原型对象为 null
根据定义 null 没有原型，并作为原型链中的最后一个环节

几乎所有 JavaScript 中的对象都是位于原型链顶端的 Object 的实例

# 基于原型链的继承

## 继承属性

当试图访问一个对象的属性时，它不仅仅在该对象上搜寻还会搜寻该对象的原型，以及该对象的原型的原型，一次层层向上搜索，直到找到一个名字匹配的属性或到达原型链的末端。

这里演示当尝试访问属性时会发生什么：

```js
// 从一个自身拥有属性 a 和 b 的函数里创建一个对象 o
function f() {
    this.a = 1;
    this.b = 2;
}
let o = new f();

// 在 f 函数的原型上定义属性
// f.prototype = {b:3, c:4}; 这样写会直接打破原型链
f.prototype.b = 3;
f.prototype.c = 4;

// a 是 o 的自身属性
console.log(o.a) // 1
// b 是 o 的自身属性；原型上也有一个 b ，但是不会被访问到 ，这种情况被称为 属性遮蔽 property shadowing
console.log(o.b) // 2
// c 不是 o 的自身属性；原型上有 c
console.log(o.c) // 4
// d 不是 o 的自身属性；原型上也没有 d
console.log(o.d) // undefined

```

## 继承方法

当继承的函数被调用时， this 指向的是当前继承的对象，而不是继承的函数所在的原型对象

```js

var o = {
    a: 2,
    m: function() {
        return this.a + 1;
    }
}

console.log(o.m()); // 3

let p = Object.create(o)

p.a = 4;

console.log(p.m()); // 5

```

# 在 JavaScript 中使用原型

终极示例

```js

function doSomething() {}
doSomething.prototype.foo = "bar";
var doSomeInstancing = new doSomething();
doSomeInstancing.prop = "some value"

// doSomeInstancing 中的 `__proto` 是 doSomething.prototype
console.log(doSomeInstancing)

console.log(doSomeInstancing.prop) // some value
console.log(doSomeInstancing.foo) // bar
console.log(doSomething.prop) // undefined
console.log(doSomething.foo) // undefined
console.log(doSomething.prototype.prop) // undefined
console.log(doSomething.prototype.foo) // bar

```

# 使用不同的方法来创建对象和生成原型链

## 使用语法结构创建的对象

```js

var o = {a: 1}
// o这个对象继承了 Object.prototype 上面的所有属性
// o自身没有名为 hasOwnProperty 的属性
// hasOwnProperty 是 Object.prototype 的属性
// 因此 o 继承了 Object.prototype 的 hasOwnProperty
// Object.prototype 的原型为 null
// 原型链： o ---> Object.prototype ---> null

var a = ["1", "2", "?"]
// 数组都继承于 Array.prototype
// Array.prototype 中包含 indexOf,forEach 等方法
// 原型链： a ---> Array.prototype ---> Object.prototype ---> null

function f() {
    return 2
}
// 函数都继承于 Function.prototype
// Function.prototype 中包含 call,bind 等方法
// 原型链： f ---> Function.prototype ---> Object.prototype ---> null

```

## 使用构造器创建的对象

在 JavaScript 中，构造器就是一个普通的函数。当使用 new操作符 来作用这个函数时，他就可以被称为构造函数。

```js

// 图(graph)是一个包含顶点(vertices)及连结这些顶点的边(edges)之离散 😂
function Graph() {
    this.vertices = [];
    this.edges = [];
}

Graph.prototype = {
    addVertex: function(v) {
        this.vertices.push(v)
    }
}

var g = new Graph()
// g 是生成的对象，他的自身属性有 vertices edges
// 在 g 被实例化时，g.[[Prototype]] 指向了 Graph.prototype

```
