[toc]

### 数组对象的一些方法

#### 数组对象排序

```js
var arr = [{name: "zlw", age: 24}, {name: "wlz", age: 25}];
var compare = function (obj1, obj2) {
    var val1 = obj1.name;
    var val2 = obj2.name;
    if (val1 < val2) {
        return -1;
    } else if (val1 > val2) {
        return 1;
    } else {
        return 0;
    }            
}
console.log(arr.sort(compare));
```

#### JavaScript获取两个数组交集的方法

```js
/* finds the intersection of
 * two arrays in a simple fashion.
 *
 * PARAMS
 * a - first array, must already be sorted
 * b - second array, must already be sorted
 *
 * NOTES
 *
 * Should have O(n) operations, where n is
 *  n = MIN(a.length(), b.length())
 */
function arrayIntersection(a, b){
 var ai=0, bi=0;
 var result = new Array();
 while( ai < a.length && bi < b.length )
 {
   if (a[ai] < b[bi] ){ ai++; }
   else if (a[ai] > b[bi] ){ bi++; }
   else /* they're equal */
   {
    result.push(a[ai]);
    ai++;
    bi++;
   }
 }
 return result;
}
console.log(arrayIntersection([1,2,3],[2,3,4,5,6]));//[2,3]
```

输出结果为 `[Object { name="wlz", age=25}, Object { name="zlw", age=24}]` ，可以看到数组已经按照 `name` 属性进行了排序。我们可以对上面的比较函数再改造一下：

```js
var compare = function (prop) {
    return function (obj1, obj2) {
        var val1 = obj1[prop];
        var val2 = obj2[prop];if (val1 < val2) {
            return -1;
        } else if (val1 > val2) {
            return 1;
        } else {
            return 0;
        }            
    }
}
```

如果想按照 `age` 进行排序， `arr.sort(compare("age"))` 即可。

但是对 age 属性进行排序时需要注意了，如果age属性的值是数字，那么排序结果会是我们想要的。但很多时候我们从服务器传回来的数据中，属性值通常是字符串。现在我把上面的数组改为：

`var arr = [{name: "zlw", age: "24"}, {name: "wlz", age: "5"}];`

可以看到，我把 `age` 属性由数字改为了字符串，第二个数组项的 `age` 值改为了 `"5"` 。再次调用 `arr.sort(compare("age"))` 后，结果为：

`[Object { name="zlw", age="24"}, Object { name="wlz", age="5"}]`

我们的期望是5排在25前面，但是结果不是。这是因为当两个数字字符串比较大小时，会比较它们的ASCII值大小，比较规则是：从第一个字符开始，顺次向后直到出现不同的字符为止，然后以第一个不同的字符的ASCII值确定大小。所以"24"与"5"比较大小时，先比较”2“与"5"的ASCII值，显然”2“的ASCII值比"5"小，即确定排序顺序。

现在，我们需要对比较函数再做一些修改：

```js
var compare = function (prop) {
    return function (obj1, obj2) {
        var val1 = obj1[prop];
        var val2 = obj2[prop];
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
            val1 = Number(val1);
            val2 = Number(val2);
        }
        if (val1 < val2) {
            return -1;
        } else if (val1 > val2) {
            return 1;
        } else {
            return 0;
        }            
    }
}
```

在比较函数中，先把比较属性值转化为数字 `Number(val1)` 再通过 `!isNaN(Number(val1))` 判断转化后的值是不是数字(有可能是NaN)，转化后的值如果是数字，则比较转换后的值，这样就可以得到我们想要的结果了， 调用 `arr.sort(compare("age"))` 得到：

`[Object { name="wlz", age="5"}, Object { name="zlw", age="24"}]`

可以看到，确实是按正确的方式排序了。

#### javascript对象数组如何快速找出存储的某个对象

```js
[
    {
        id: 1,
        name: 'a'
    },
    {
        id: 2,
        name: 'b'
    },
].find(function (x) {
    return x.id === 10
})
```


#### JS中深拷贝数组、对象、对象数组方法

我们在JS程序中需要进行频繁的变量赋值运算，对于字符串、布尔值等可直接使用赋值运算符 “=” 即可，但是对于数组、对象、对象数组的拷贝，我们需要理解更多的内容。

首先，我们需要了解JS的浅拷贝与深拷贝的区别。

我们先给出一个数组：

```js
var arr = ["a","b"];
```

现在怎么创建一份arr数组的拷贝呢？直接执行赋值运算吗？我们来看看输出结果

```js
var arrCopy = arr;
arrCopy[1] = "c";
arr   // => ["a","c"]
```

可以发现对拷贝数组 arrCopy 进行操作时原数组也相应地被改变了，这就是JS的浅拷贝模式。所以我们可以指出对数组、对象、对象数组进行简单赋值运算只是创建了一份原内容的引用，指向的仍然是同一块内存区域，修改时会对应修改原内容，而有时候我们并不需要这种模式，这就需要对内容进行深拷贝。

##### 数组的深拷贝

---

对于数组的深拷贝常规的有三种方法：

- 方法一：遍历复制

```js
var arr = ["a", "b"], arrCopy = [];
for (var item in arr) arrCopy[item] = arr[item];
arrCopy[1] = "c";
arr   // => ["a", "b"]
arrCopy   // => ["a", "c"]
```

考虑伪多维数组可以写成函数形式：

```js
function arrDeepCopy(source){
    var sourceCopy = [];
    for (var item in source) sourceCopy[item] = typeof source[item] === 'object' ? arrDeepCopy(source[item]) : source[item];
    return sourceCopy;
}
```

这种方法简单粗暴，但是利用JS本身的函数我们可以更加便捷地实现这个操作。



- 方法二：slice()

可以参考 W3School 对 [slice()](http://www.w3school.com.cn/jsref/jsref_slice_array.asp) 方法的描述：slice() 方法可从已有的数组中返回选定的元素。

调用格式为：

> arrayObject.slice(start,end)

方法返回一个新的数组，包含从 start 到 end （不包括该元素）的 arrayObject 中的元素。该方法并不会修改数组，而是返回一个子数组。

在这里我们的思路是直接从数组开头截到尾：

```js
arrCopy = arr.slice(0);
arrCopy[1] = "c";
arr   // => ["a", "b"]
arrCopy   // => ["a", "c"]
```

可以看出成功创建了一份原数组的拷贝。



- 方法三：concat()

可以参考 W3School 对 [concat()](http://www.w3school.com.cn/jsref/jsref_concat_array.asp) 方法的描述：concat() 方法用于连接两个或多个数组。

调用格式为：

>arrayObject.concat(arrayX,arrayX,......,arrayX)

该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本。

使用这种方法的思路是我们用原数组去拼接一个空内容，放回的便是这个数组的拷贝：

```js
arrCopy = arr.concat();
arrCopy[1] = "c";
arr   // => ["a", "b"]
arrCopy   // => ["a", "c"]
```

##### 对象的深拷贝

---

对于数组的深拷贝我们有了概念，那么一般对象呢？

我们给出一个对象：

```js
var obj = { "a": 1, "b": 2 };
```

同样做测试：

```js
var objCopy = obj;
objCopy.b = 3;
obj   // => { "a": 1, "b": 3 }
objCopy   // => { "a": 1, "b": 3 }
```

同样，简单的赋值运算只是创建了一份浅拷贝。

而对于对象的深拷贝，没有内置方法可以使用，我们可以自己命名一个函数进行这一操作：

```js
var objDeepCopy = function(source){
    var sourceCopy = {};
    for (var item in source) sourceCopy[item] = source[item];
    return sourceCopy;
}
```

但是对于复杂结构的对象我们发现这个函数并不适用，例如：

```js
var obj = { "a": { "a1": ["a11", "a12"], "a2": 1 }, "b": 2 };
```

所以需要进行一点修改：

```js
var objDeepCopy = function(source){
    var sourceCopy = {};
    for (var item in source) sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item];
    return sourceCopy;
}
var objCopy = objDeepCopy(obj);
objCopy.a.a1[1] = "a13";
obj   // => { "a": { "a1": ["a11", "a12"], "a2": 1 }, "b": 2 }
objCopy   // => { "a": { "a1": ["a11", "a13"], "a2": 1 }, "b": 2 }
```

##### 对象数组的深拷贝

---

如果再考虑更奇葩更复杂的情况，例如我们定义：

```js
var obj = [{ "a": { "a1": ["a11", "a12"], "a2": 1 }, "b": 2 }, ["c", { "d": 4, "e": 5 }]];
```

这是一个由对象、数组杂合成的奇葩数组，虽然我们平时写程序基本不可能这么折腾自己，但是可以作为一种特殊情况来考虑，这样我们就可以结合之前说的方法去拓展拷贝函数：

```js
var objDeepCopy = function (source) {
    var sourceCopy = source instanceof Array ? [] : {};
    for (var item in source) {
        sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item];
    }
    return sourceCopy;
}
var objCopy = objDeepCopy(obj);
objCopy[0].a.a1[1] = "a13";
objCopy[1][1].e = "6";
obj   // => [{ "a": { "a1": ["a11", "a12"], "a2": 1 }, "b": 2 }, ["c", { "d": 4, "e": 5 }]]
objCopy   // => [{ "a": { "a1": ["a11", "a13"], "a2": 1 }, "b": 2 }, ["c", { "d": 4, "e": 6 }]]
```

这样它就可以作为一个通用函数替我们进行深拷贝操作了。
