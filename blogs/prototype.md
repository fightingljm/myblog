# JS 中 prototype、[[prototype]]和__proto__的区别和用法

## 显示原型 & 隐式原型

- `__proto__` 是每个对象都具有的原型
- `prototype` 是 `Function` 独有的原型

### Tips

- 对象的隐式原型的值为其对应构造函数的显示原型的值
 - `fn.__proto__ === Function.prototype`
- 函数的`prototype`属性是定义时自动添加的。默认为`{}`
- 对象的`__proto__`属性是创建对象时自动添加的，默认值为其构造函数的`prototype`
- `Object.prototype.__proto__ === null`

### 那和 `[[prototype]]` 有什么关系？！

其实`[[prototype]]`和`__proto__`意义相同，均表示对象的内部属性，其值指向对象原型。前者在一些书籍、规范中表示一个对象的原型属性，后者则是在浏览器实现中指向对象原型

## 作用

实现继承。最经典的就是共享属性方法的原型链继承。其中必不可少的属性是 `__proto__` `prototype`

```js

function Son(){}
function Father(){}

Son.prototype = new Father();

// 上面实现了继承，可以通过下面方法验证

Son.prototype.__proto__ === Father.prototype // true

```

>> 此为原型链继承，其中的方法与属性为此链上的所有实例所共享

## 原型链

原型链无非是一堆继承关系

- 我们只需要将儿子原型的 `__proto__` 属性指向父亲的 `prototype` 属性，构造函数的 `prototype` 属性的 `constructor` 属性指向其本身即可。
- 不过需要注意的一点是，已经被实例化的对象 `__proto__` 属性指向其构造函数大的 `prototype`
- 另外一个特殊的对象 `Object` 作为所有对象的父类他的原型的 `__proto__` 属性指向 `null`

![原型链图解](https://github.com/fightingljm/myblog/blob/master/src/image/prototype.png)

## 从原理讨论原型链的用处

### typeof

用 `typeof` 判断 `Array` `Function` 类型时，都返回 `Object`

所有改用 `Object.prototype.toString.call(obj)` 方法来识别对象类型，他会返回一个 `"[Object Type]"` 的东西来告诉你所指对象的类型

此处就用到了原型链必不可少的 `prototype` ,通过改变 `this` 指针指向我们所要验证类型的对象。

### instanceof

这个方法用来判断某实例是否从属于某个类型，同时也可以判断一个实例是否是其父类型或者祖先类型的实例，下面用代码来描述下

```js

function Son() {}
function Father() {}

var son = new Son()

son instanceof Son // true
son instanceof Father // true

```
只要你是这一家子人，那么无论你走哪，这祖宗祠堂都认你。他们就是通过原型链判断你是不是这家儿孙，下面写一串伪代码来验证

```js

function new_instance_of(leftValue, rightValue) {
    let rightProto = rightValue.prototype
    leftValue = leftValue.__proto__
    while(true) {
        if(leftValue === null) {
            return false;
        }
        if(leftValue === rightValue) {
            return true;
        }
        leftValue = leftValue.__proto__
    }
}

// 通过原型链认祖归宗
new_instance_of(son, Son)
new_instance_of(son, Father)

```
