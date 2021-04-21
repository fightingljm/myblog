## 闭包

### 慢慢理解

函数与对其状态即词法环境的引用共同构成闭包。也就是说，闭包可以让你从内部函数访问外部函数作用域。在 JavaScript，函数在每次创建时生成闭包。

```js
function init() {
    var name = "ljm"; // name 是一个被 init 创建的局部变量
    function displayName() { // displayName 是一个内部函数，一个闭包
        alert(name); // 访问了父函数声明的变量
    }
    displayName();
}
init();

```

以上面函数不同的是，内部函数 displayName在执行前，被外部函数返回了

```js
function makeFunc() {
    var name = "ljm";
    function displayName() {
        alert(name);
    }
    return displayName
}
var myFunc = makeFunc();
myFunc()

```

由于在一些编程语言中，函数中的局部变量仅在函数的执行期间可用。一旦 `makeFunc()` 执行完毕，我们会认为 `name` 变量将不能被访问。

**BUT !!!**，JavaScript 中的函数会形成闭包。闭包是由函数以及该函数的词法环境组合而成。<u>**而这个环境包含了这个闭包创建时所能访问的所有局部变量。**</u>

SO~ `myFunc` 是执行 `makeFunc` 时创建的 `displayName` 函数实例的引用，`displayName` 实例仍可以访问其词法作用域中的变量 `name`

```js
function makeAdder(x) {
    return function(y) {
        return x + y;
    }
}

var add5 = makeAdder(5)
var add10 = makeAdder(10)

console.log(add5(2)) // 7
console.log(add10(2)) // 12

```

从本质上讲，`makeAdder` 是一个`函数工厂` --- 他创建了将指定的值和它的参数相加求和的函数。
上面的示例，我们使用函数工厂创建了两个新函数 --- 一个将其参数和 5 求和，另一个和 10 求和。

`add5` 和 `add10` 都是闭包。他们共享相同的函数定义，但是保存了不同的词法环境。

### 实用的闭包

```css
body {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 12px;
}

h1 {
  font-size: 1.5em;
}

h2 {
  font-size: 1.2em;
}
```

```js
<a href="#" id="size-12">12</a>
<a href="#" id="size-14">14</a>
<a href="#" id="size-16">16</a>

function makeSize(size) {
    return function() {
        document.body.style.fontSize = size + 'px'
    }
}

var size12 = makeSize(12)
var size14 = makeSize(14)
var size16 = makeSize(16)

document.getElementById("size-12").onClick = size12;
document.getElementById("size-14").onClick = size14;
document.getElementById("size-16").onClick = size16;

```

`size12` `size14` `size16` 三个函数分别爸 `body` 文本调整为 12 14 16像素。并将它们添加到按钮的点击事件上。 

### 用闭包模拟私有方法

在java等编程语言中，支持将方法声明为私有的，即它们只能被同一个类中的其它方法所调用。而javascript没有这种支持

**BUT !!!**，我们可以使用闭包来模拟私有方法。私有方法不仅仅有利于限制对代码的访问，还提供了管理全局命名空间的强大能力，避免非核心的代码弄乱了代码的公共接口部分。

下面的示例展现了如何使用闭包来定义公共函数，并令其可以访问私有函数和变量（也称为 [模块模式](https://www.google.com/search?q=javascript+module+pattern)）

```js
var Counter = (function() {
    var c = 0;
    function changeBy(val) {
        privateCounter += val;
    }
    return {
        increment: function() {
            changeBy(1);
        },
        decrement: function() {
            changeBy(-1);
        },
        value: function() {
            return privateCounter;
        }
    }
})()

console.log(Counter.value()); // 0
Counter.increment();
Counter.increment();
console.log(Counter.value()); // 2
Counter.decrement();
console.log(Counter.value()); // 1

```

在之前的示例中，每个闭包都有他自己的词法环境，而上面👆的例子，我们只创建了一个词法环境 ，为三个函数所共享：`Counter.increment` `Counter.decrement` `Counter.value`
该共享环境创建于一个立即执行的匿名函数体内

```js
var makeCounter = function() {
    var c = 0;
    function changeBy(val) {
        privateCounter += val;
    }
    return {
        increment: function() {
            changeBy(1);
        },
        decrement: function() {
            changeBy(-1);
        },
        value: function() {
            return privateCounter;
        }
    }
}
var Counter1 = makeCounter()
var Counter2 = makeCounter()
console.log(Counter1.value()); // 0
Counter1.increment();
Counter1.increment();
console.log(Counter1.value()); // 2
Counter1.decrement();
console.log(Counter1.value()); // 1
console.log(Counter2.value()); // 0

```

通过上面的改造，可以创建多个计数器，`Counter1` `Counter2` 是各自独立的，每个闭包都是引用自己词法作用域内的变量

### 在循环中创建闭包

```html

<p id="help">Helpful notes will appear here</p>
<p>E-mail: <input type="text" id="email" name="email"></p>
<p>Name: <input type="text" id="name" name="name"></p>
<p>Age: <input type="text" id="age" name="age"></p>
```

```js

function showHelp(help) {
    document.getElementById('help').innerHTML = help;
}

function setupHelp() {
    var helpText = [
        {'id': 'email', 'help': 'Your e-mail address'},
        {'id': 'name', 'help': 'Your full name'},
        {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

    for (var i = 0; i < helpText.length; i++) {
        var item = helpText[i];
        document.getElementById(item.id).onfocus = function() {
            showHelp(item.help);
        }
    }
}

setupHelp(); 
```

上面代码的结果是，无论焦点在哪个 input 上，显示的都是关于年龄的信息。

原因：赋值给 `onfocus` 的是闭包，这三个闭包再循环中被创建，他们共享了一个词法作用域，这个作用域中只有一个 `item` ；
    这是因为变量 `help` 使用 `var` 声明，由于变量提升，所以具有函数作用域。
    当 `onfocus` 的回调执行的时候， `item.help` 的值被决定，由于循环在事件触发之前早已执行完毕，变量对象 `item` 已经指向 `helpText` 的最后一项

**解决方案一：使用更多的闭包，特别是使用前面所描述的函数工厂**

```js

function showHelp(help) {
    document.getElementById('help').innerHTML = help;
}

// makeHelpCallback 为每一个回调创建一个新的词法环境。在这些环境中，help 指向 helpText 数组中对应的字符串。
function makeHelpCallback(help) {
    return function() {
        showHelp(help);
    }
}

function setupHelp() {
    var helpText = [
        {'id': 'email', 'help': 'Your e-mail address'},
        {'id': 'name', 'help': 'Your full name'},
        {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

    for (var i = 0; i < helpText.length; i++) {
        var item = helpText[i];
        document.getElementById(item.id).onfocus = makeHelpCallback(item.help)
    }
}

setupHelp(); 
```

**解决方案二：使用匿名闭包**

```js

function showHelp(help) {
    document.getElementById('help').innerHTML = help;
}

function setupHelp() {
    var helpText = [
        {'id': 'email', 'help': 'Your e-mail address'},
        {'id': 'name', 'help': 'Your full name'},
        {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

    for (var i = 0; i < helpText.length; i++) {
        (function() {
            var item = helpText[i];
            document.getElementById(item.id).onfocus = function() {
                showHelp(item.help);
            }
        })() // 马上把当前循环项的item与事件回调相关联起来
    }
}

setupHelp(); 
```

**解决方案三：避免使用过多的闭包，可以用let关键词**

```js

function showHelp(help) {
    document.getElementById('help').innerHTML = help;
}

function setupHelp() {
    var helpText = [
        {'id': 'email', 'help': 'Your e-mail address'},
        {'id': 'name', 'help': 'Your full name'},
        {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

    for (var i = 0; i < helpText.length; i++) {
        let item = helpText[i]; // 使用 let ，每个闭包都绑定了块级作用域的变量，这意味着不再需要额外的闭包
        document.getElementById(item.id).onfocus = function() {
            showHelp(item.help);
        }
    }
}

setupHelp(); 
```

### 性能考量

如果不是某些特定任务需要使用闭包，在其他函数中创建函数是不明智的，因为闭包在处理速度和内存消耗方面对脚本性能具有负面影响。

例如，在创建新的对象或者类时，方法通常应该关联于对象的原型，而不是定义到对象的构造器中。原因是这将导致每次构造器被调用时，方法都会被重新赋值一次（也就是，每个对象的创建。）

示例

```js

function myObject(name, message) {
    this.name = name.toString();
    this.message = message.toString();
    this.getName = function() {
        return this.name;
    }
    this.getMessage = function() {
        return this.message;
    }
}
```

上面的代码，我们并没有利用到闭包的好处，因此可以避免使用闭包。

```js

function myObject(name, message) {
    this.name = name.toString();
    this.message = message.toString();
}
myObject.prototype = {
    getName: function() {
        return this.name;
    },
    getMessage: function() {
        return this.message;
    }
}
```

但是我们不建议重新定义原型

```js

function myObject(name, message) {
    this.name = name.toString();
    this.message = message.toString();
}
myObject.prototype.getName = function() {
    return this.name;
}
myObject.prototype.getMessage = function() {
    return this.message;
}
```

这样，继承的原型可以为所有对象共享，不必在每一次创建对象时定义方法。
参考 [对象模型的细节](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Details_of_the_Object_Model)

[来自](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)
