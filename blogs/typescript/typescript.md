# Typescript 内置类型与自定义类型

## 背景

大家用过 `Typescript` 都清楚，很多时候我们需要提前声明一个类型，再将类型赋予变量。

例如在业务中，我们需要渲染一个表格，往往需要定义：

```
interface Row {
  user: string
  email: string
  id: number
  vip: boolean
  // ...
}

const tableDatas: Row[] = []
// ...
```

有时候我们也需要表格对应的搜索表单，需要其中一两个搜索项，如果刚接触 typescript 的同学可能会立刻这样写：

```
interface SearchModel {
  user?: string
  id?: number 
}  
const model: SearchModel = {
  user: '',
  id: undefined 
}
```

这样写会出现一个问题，如果后面id 类型要改成 `string`，我们需要改 2 处地方，不小心的话可能就会忘了改另外一处。所以，有些人会这样写：

```
interface SearchModel {
  user?: Row['user']
  id?: Row['id']
} 
```

这固然是一个解决方法，但事实上，我们前面已经定义了 `Row` 类型，这其实是可以更优雅地复用的:

```
const model: Partial<Row> = {
  user: '',
  id: undefined 
}
// 或者需要明确指定 key 的，可以
const model2: Partial<Pick<Row, 'user'|'id'>>
```

这样一来，很多情况下，我们可以尽量少地写重复的类型，复用已有类型，让代码更加优雅容易维护。

上面使用到的 `Partial` 和 `Pick` 都是 typescript 内置的类型别名。下面给大家介绍一下 typescript 常用的内置类型，以及自行拓展的类型。

## typescript 内置类型

### Partial<T>

将类型 T 的所有属性标记为可选属性

```
type Partial<T> = {
    [P in keyof T]?: T[P];
};
```

使用场景：

```
// 账号属性
interface AccountInfo {
    name: string 
    email: string 
    age: number 
    vip: 0|1 // 1 是vip ，0 是非vip
}

// 当我们需要渲染一个账号表格时，我们需要定义
const accountList: AccountInfo[] = []

// 但当我们需要查询过滤账号信息，需要通过表单，
// 但明显我们可能并不一定需要用到所有属性进行搜索，此时可以定义
const model: Partial<AccountInfo> = {
  name: '',
  vip: undefind
}
```

### Required<T>

与 Partial 相反，Required 将类型 T 的所有属性标记为必选属性

```
type Required<T> = {
    [P in keyof T]-?: T[P];
};
```

### Readonly<T>

将所有属性标记为 readonly, 即不能修改

```
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
```

### Pick<T, K>

从 T 中过滤出属性 K

```
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```

使用场景:

```
interface AccountInfo {
  name: string 
  email: string 
  age: number 
  vip?: 0|1 // 1 是vip ，0 是非vip
}

type CoreInfo = Pick<AccountInfo, 'name' | 'email'>
/* 
{ 
  name: string
  email: stirng
}
*/
```

### Record<K, T>

标记对象的 key value类型

```
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```

使用场景:

```
// 定义 学号(key)-账号信息(value) 的对象
const accountMap: Record<number, AccountInfo> = {
  10001: {
    name: 'xx',
    email: 'xxxxx',
    // ...
  }    
}
const user: Record<'name'|'email', string> = {
    name: '', 
    email: ''
}
// 复杂点的类型推断
function mapObject<K extends string | number, T, U>(obj: Record<K, T>, f: (x: T) => U): Record<K, U>

const names = { foo: "hello", bar: "world", baz: "bye" };
// 此处推断 K, T 值为 string , U 为 number
const lengths = mapObject(names, s => s.length);  // { foo: number, bar: number, baz: number }
```

### Exclude<T, U>，Omit<T, K>

移除 T 中的 U 属性

```
type Exclude<T, U> = T extends U ? never : T;
```

使用场景：

```
// 'a' | 'd'
type A = Exclude<'a'|'b'|'c'|'d' ,'b'|'c'|'e' >  
```

乍一看好像这个没啥卵用，但是，我们通过一番操作，之后就可以得到 `Pick` 的反操作：

```
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

type NonCoreInfo = Omit<AccountInfo, 'name' | 'email'>
/*
{
  age: number 
  vip: 0|1,
}
*/
```

### Extract<T, U>

`Exclude` 的反操作，取 T，U两者的交集属性

```
type Extract<T, U> = T extends U ? T : never;
```

使用 demo：

```
// 'b'|'c'
type A = Extract<'a'|'b'|'c'|'d' ,'b'|'c'|'e' >  
```

这个看起来没啥用，~~实际上还真没啥卵用~~，应该是我才疏学浅，还没发掘到其用途。

### NonNullable<T>

排除类型 T 的 `null` | `undefined` 属性

```
type NonNullable<T> = T extends null | undefined ? never : T;
```

使用 demo

```
type A = string | number | undefined 
type B = NonNullable<A> // string | number

function f2<T extends string | undefined>(x: T, y: NonNullable<T>) {
    let s1: string = x;  // Error, x 可能为 undefined
    let s2: string = y;  // Ok
}
```

### Parameters<T>

获取一个函数的所有参数类型

```
// 此处使用 infer P 将参数定为待推断类型
// T 符合函数特征时，返回参数类型，否则返回 never
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
```

使用demo:

```
interface IFunc {
  (person: IPerson, count: number): boolean
}

type P = Parameters<IFunc> // [IPerson, number]

const person01: P[0] = {
  // ...
}
```

另一种使用场景是，快速获取未知函数的参数类型

```
import {somefun} from 'somelib'
// 从其他库导入的一个函数，获取其参数类型
type SomeFuncParams = Parameters<typeof somefun>

// 内置函数
// [any, number?, number?]
type FillParams = Parameters<typeof Array.prototype.fill>
```

### ConstructorParameters<T>

类似于 `Parameters`, ConstructorParameters 获取一个类的构造函数参数

```
type ConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never;
```

使用 demo:

```
// string | number | Date 
type DateConstrParams = ConstructorParameters<typeof Date>
```

### ReturnType<T>

获取函数类型 T 的返回类型

```
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
```

使用方式和 `Parameters` 类似，不再赘述

### InstanceType<T>

获取一个类的返回类型

```
type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any;
```

使用方式和 `ConstructorParameters` 类似，不再赘述

------

## 自定义常用类型

### Weaken

使用 `typescript` 有时候需要重写一个库提供的 interface 的某个属性，但是重写 `interface` 有可能会导致冲突：

```
interface Test {
  name: string
  say(word: string): string
}

interface Test2  extends Test{
  name: Test['name'] | number
}
// error: Type 'string | number' is not assignable to type 'string'.
```

那么可以通过一些 type 来曲线救国实现我们的需求：

```
// 原理是，将 类型 T 的所有 K 属性置为 any，
// 然后自定义 K 属性的类型，
// 由于任何类型都可以赋予 any，所以不会产生冲突
type Weaken<T, K extends keyof T> = {
  [P in keyof T]: P extends K ? any : T[P];
};


interface Test2  extends Weaken<Test, 'name'>{
  name: Test['name'] | number
}
// ok
```

### 数组 转换 成 union

有时候需要

```
const ALL_SUITS = ['hearts', 'diamonds', 'spades', 'clubs'] as const; // TS 3.4
type SuitTuple = typeof ALL_SUITS; // readonly ['hearts', 'diamonds', 'spades', 'clubs']
type Suit = SuitTuple[number];  // union type : 'hearts' | 'diamonds' | 'spades' | 'clubs'
```

### 根据 enum 生成 union

- enum 的 key 值 union

  ```
  enum Weekday {
    Mon = 1
    Tue = 2
    Wed = 3
  }
  type WeekdayName = keyof typeof Weekday // 'Mon' | 'Tue' | 'Wed'
  ```

- enum 无法实现value-union , 但可以 object 的 value 值 union

  ```
  const lit = <V extends keyof any>(v: V) => v;
  const Weekday = {
    MONDAY: lit(1),
    TUESDAY: lit(2),
    WEDNESDAY: lit(3)
  }
  type Weekday = (typeof Weekday)[keyof typeof Weekday] // 1|2|3
  ```

### PartialRecord

前面我们讲到了 Record 类型，我们会常用到

```
interface Model {
    name: string
    email: string
    id: number
    age: number
}

// 定义表单的校验规则
const validateRules: Record<keyof Model, Validator> = {
    name: {required: true, trigger: `blur`},
    id: {required: true, trigger: `blur`},
    email: {required: true, message: `...`},
    // error: Property age is missing in type...
}
```

这里出现了一个问题，`validateRules` 的 key 值必须和 `Model` 全部匹配，缺一不可，但实际上我们的表单可能只有其中的一两项，这时候我们就需要：

```
type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>

const validateRules: PartialRecord<keyof Model, Validator> = {
   name: {required: true, trigger: `blur`} 
}
```

这个例子组合使用了 `typescript` 内置的 类型别名 `Partial` 和 `Partial`。

### Unpacked

解压抽离关键类型

```
type Unpacked<T> =
    T extends (infer U)[] ? U :
    T extends (...args: any[]) => infer U ? U :
    T extends Promise<infer U> ? U :
    T;

type T0 = Unpacked<string>;  // string
type T1 = Unpacked<string[]>;  // string
type T2 = Unpacked<() => string>;  // string
type T3 = Unpacked<Promise<string>>;  // string
type T4 = Unpacked<Promise<string>[]>;  // Promise<string>
type T5 = Unpacked<Unpacked<Promise<string>[]>>;  // string
```

## 总结

事实上，基于已有的类型别名，还有新推出的 `infer` 待推断类型，可以探索出各种各样的复杂组合玩法，这里不再多说，大家可以慢慢探索。