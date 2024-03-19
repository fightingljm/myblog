# 

- 生命周期

- State & Props

- 有状态组件、无状态组件
  有状态组件是一个类，有state，有生命周期，能使用this
  无状态组件是一个函数，不能使用this

- 组件间传值
  - 父传子 --- props
  - 子传父 --- callback
  - 兄弟间 --- 父组件中转

- 小程序、web端开发区别（javascript/小程序和h5的区别）
  小程序的逻辑层和渲染层是分开的，逻辑层运行在 JSCore 中，并没有一个完整浏览器对象，因而缺少相关的DOM API和BOM API

- react-native 0.5 - 0.6版本的区别

- React-native 和原生通信 

- 如何处理高并发（javascript/如何处理高并发）

- 埋点监控平台（javascript/前端监控埋点）

- FaltList 遇到的问题，实现原理

  >本组件实质是基于[`<VirtualizedList>`](https://reactnative.cn/docs/virtualizedlist)组件的封装，继承了其所有 props（也包括所有[`<ScrollView>`](https://reactnative.cn/docs/scrollview))的 props），但在本文档中没有列出。此外还有下面这些需要注意的事项：
  >
  >- 当某行滑出渲染区域之外后，其内部状态将不会保留。请确保你在行组件以外的地方保留了数据。
  >- 本组件继承自`PureComponent`而非通常的`Component`，这意味着如果其`props`在`浅比较`中是相等的，则不会重新渲染。所以请先检查你的`renderItem`函数所依赖的`props`数据（包括`data`属性以及可能用到的父组件的 state），如果是一个引用类型（Object 或者数组都是引用类型），则需要先修改其引用地址（比如先复制到一个新的 Object 或者数组中），然后再修改其值，否则界面很可能不会刷新。（译注：这一段不了解的朋友建议先学习下[js 中的基本类型和引用类型](https://segmentfault.com/a/1190000002789651)。）
  >- 为了优化内存占用同时保持滑动的流畅，列表内容会在屏幕外异步绘制。这意味着如果用户滑动的速度超过渲染的速度，则会先看到空白的内容。这是为了优化不得不作出的妥协，你可以根据自己的需求调整相应的参数，而我们也在设法持续改进。
  >- 默认情况下每行都需要提供一个不重复的 key 属性。你也可以提供一个`keyExtractor`函数来生成 key。

- 算法题

- HTTP/HTTPS

- React原理

- React-Native的实现原理

- ajax原理

- 跨域

- W3c

  > 万维网联盟（World Wide Web Consortium, W3C）是Web领域的国际标准化组织，开发[开放Web标准](http://www.chinaw3c.org/standards.html)，确保Web的长期发展。
  >
  > 开放Web标准：W3C的各类技术标准在努力为各类应用的开发打造一个**开放的Web平台（Open Web Platform）**。尽管这个开放Web平台的边界在不断延伸，产业界认为HTML5将是这个平台的核心，平台的能力将依赖于W3C及其合作伙伴正在创建的一系列Web技术，包括CSS, SVG, WOFF, 语义Web，及XML和各类应用编程接口（APIs）。
  >
  > [常见问题与帮助信息](https://www.chinaw3c.org/help.htmls)

- 为什么选择前端

  > 个人认为，前端开发是趣味性和代码结果显示最明显的岗位，我能从中体会到成就感，而且，现在的前端不只是局限于切页面那么简单，还能开发小程序、App、nodejs写后台数据等，所以我更加坚定前端开发。

- 前端是自学的吗，什么方式

- 未来三年规划

- 为了你的规划平时都做了哪些事规划：

  我作为一个前端来说，

  我近期的职业规划是和现在的公司做好工作交接，认真负责的投入到新的工作中，把我的技术得以提升，多学些东西；

  对于中长期的规划来说，我打算研究一下swift object-c ，研究明白之后为公司更好地服务； // node

  另外我也相信咱们公司有合理的晋升机制和制度；所以将来公司给我这个机会，我也是当仁不让。