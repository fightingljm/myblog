[React技术揭秘](https://react.iamkasong.com/)

## React15架构


React15架构可以分为两层：

- Reconciler（协调器）---- 负责找出变化的组件
- Renderer（渲染器）---- 负责将变化的组件渲染到页面上

### Reconciler（协调器）

触发更新时（如：setState），**Reconciler**会做如下工作：

- 调用组件的`render`方法，将返回的JSX转化为虚拟DOM
- 将虚拟DOM和上次更新时的虚拟DOM对比
- 通过对比，找出本次更新中变化的虚拟DOM
- 通知`Renderer`将变化的虚拟DOM渲染到页面上

>为什么是转化成虚拟DOM？？？
>
>虚拟DOM，是一个原生的JavaScript对象，相对于DOM对象来说更易于处理和操作。
>
>
>
>为了使代码结构更加清晰，React又引入了JSX语法，它是JavaScript扩展语法，同时也是带属性的树状结构语法，增加了代码的可读性。使用JSX语法必须使用转码器，将JSX转换为JS，代码才可以在浏览器上执行。
>
>

### Renderer（渲染器）

不同平台有不同的 `Renderer`

- 浏览器环境 ------ ReactDom
- React-Native ------ 渲染原生App
- React Test ------ 渲染出纯JS对象用于测试

### 缺点

用户可以看到更新不完全的DOM

## React16架构

React16架构可以分为三层：

- Scheduler（调度器）---- 调度任务的优先级，高优任务优先进入`Reconciler`
- Reconciler（协调器）---- 负责找出变化的组件
- Renderer（渲染器）---- 负责将变化的组件渲染到页面上

### Scheduler（调度器）

既然我们以浏览器是否有剩余时间作为任务中断的标准，那么我们需要一种机制，当浏览器有剩余时间时通知我们。

浏览器已经实现了这个API --- requestCallback，但是由于以下原因，React放弃使用

- 浏览器兼容性
- 触发频率不稳定，受很多因素影响

基于以上原因，React实现了功能更完备的 requestCallback --- Scheduler（独立于React的库），有以下功能

- 在空闲时触发回调
- 提供了多种任务调度优先级供任务设置

### Reconciler（协调器）

在React15中，`Reconciler`是递归处理虚拟DOM的；React16更新工作从递归变成了可以中断的循环过程。每次循环都会调用`shouldYield`，判断当前是否有剩余时间。

```js
/** @noinline */
function workLoopConcurrent() {
  // Perform work until Scheduler asks us to yield
  while (workInProgress !== null && !shouldYield()) {
    workInProgress = performUnitOfWork(workInProgress);
  }
}
```

React16解决中断更新时DOM渲染不完全问题的方法

在React16中，`Reconciler` `Renderer`不再是交替工作，当 `Scheduler`将任务交给`Reconciler`后，`Reconciler`会为变化的虚拟DOM打上代表 增/删/更新 的标记

```js
// 类似这样
export const Placement = /*             */ 0b0000000000010;
export const Update = /*                */ 0b0000000000100;
export const PlacementAndUpdate = /*    */ 0b0000000000110;
export const Deletion = /*              */ 0b0000000001000;
```

全部的标记见[这里](https://github.com/facebook/react/blob/v16.13.1/packages/shared/ReactSideEffectTags.js)

整个 `Scheduler` `Reconciler`的工作都在内存中进行，只有当所有组件都完成 `Reconciler`的工作，才会统一交给`Renderer`

### Renderer（渲染器）

`Renderer`根据`Reconciler`为虚拟DOM打的标记，同步执行对应的DOM操作

 `Scheduler` `Reconciler`的工作 随时可能由于以下原因被中断：

- 有其他更高优任务需要先更新
- 当前帧没有剩余时间

整个 `Scheduler` `Reconciler`的工作都在内存中进行，不会更新页面上的DOM，所以即使反复中断，React15中的问题 (用户看见更新不完全的DOM) 也不会出现。

> 实时上，由于**Scheduler**和**Reconciler**都是平台无关的，所以`React`为他们单独发了一个包[react-Reconciler](https://www.npmjs.com/package/react-reconciler)