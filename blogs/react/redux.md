## Flux

Flux其实是一种思想，就像MVC，MVVM之类的，他给出了一些基本概念，所有的框架都可以根据他的思想来做一些实现。

Flux把一个应用分成了4个部分： *View* Action *Dispatcher* Store



![img](https://pic2.zhimg.com/80/v2-fb6a545f55dac505d0ded33fa2284bc5_1440w.jpg)



比如我们搞一个应用，显而易见，这个应用里面会有一堆的 View，这个 View 可以是Vue的，也可以是 React的，啥框架都行，啥技术都行。

View 肯定是要展示数据的，所谓的数据，就是 Store，Store 很容易明白，就是存数据的地方。当然我们可以把 Store 都放到一起，也可以分开来放，所以就有一堆的 Store。但是这些 View 都有一个特点，就是 Store 变了得跟着变。

View 怎么跟着变呢？一般 Store 一旦发生改变，都会往外面发送一个事件，比如 change，通知所有的订阅者。View 通过订阅也好，监听也好，不同的框架有不同的技术，反正 Store 变了，View 就会变。

View 不是光用来看的，一般都会有用户操作，用户点个按钮，改个表单啥的，就需要修改 Store。Flux 要求，View 要想修改 Store，必须经过一套流程，有点像我们刚才 Store 模式里面说的那样。视图先要告诉 Dispatcher，让 Dispatcher dispatch 一个 action，Dispatcher 就像是个中转站，收到 View 发出的 action，然后转发给 Store。比如新建一个用户，View 会发出一个叫 addUser 的 action 通过 Dispatcher 来转发，Dispatcher 会把 addUser 这个 action 发给所有的 store，store 就会触发 addUser 这个 action，来更新数据。数据一更新，那么 View 也就跟着更新了。

这个过程有几个需要注意的点： *Dispatcher 的作用是接收**所有**的 Action，然后发给**所有**的 Store。这里的 Action 可能是 View 触发的，也有可能是其他地方触发的，比如测试用例。转发的话也不是转发给某个 Store，而是所有 Store。* Store 的改变只能通过 Action，不能通过其他方式。也就是说 Store 不应该有公开的 Setter，所有 Setter 都应该是私有的，只能有公开的 Getter。具体 Action 的处理逻辑一般放在 Store 里。

听听描述看看图，可以发现，Flux的最大特点就是数据都是**单向流动**的。

## Redux

Flux 有一些缺点（特点），比如一个应用可以拥有多个 Store，多个Store之间可能有依赖关系；Store 封装了数据还有处理数据的逻辑。

所以大家在使用的时候，一般会用 Redux，他和 Flux 思想比较类似，也有差别。



![img](https://pic4.zhimg.com/80/v2-9e7e7d6b492706746ba19845bd559963_1440w.jpg)



## Store

Redux 里面只有一个 Store，整个应用的数据都在这个大 Store 里面。Store 的 State 不能直接修改，每次只能返回一个新的 State。Redux 整了一个 createStore 函数来生成 Store。

```js
import { createStore } from 'redux';
const store = createStore(fn);
```

Store 允许使用 store.subscribe 方法设置监听函数，一旦 State 发生变化，就自动执行这个函数。这样不管 View 是用什么实现的，只要把 View 的更新函数 subscribe 一下，就可以实现 State 变化之后，View 自动渲染了。比如在 React 里，把组件的render方法或setState方法订阅进去就行。

## Action

和 Flux 一样，Redux 里面也有 Action，Action 就是 View 发出的通知，告诉 Store State 要改变。Action 必须有一个 type 属性，代表 Action 的名称，其他可以设置一堆属性，作为参数供 State 变更时参考。

```js
const action = {
  type: 'ADD_TODO',
  payload: 'Learn Redux'
};
```

Redux 可以用 Action Creator 批量来生成一些 Action。

## Reducer

Redux 没有 Dispatcher 的概念，Store 里面已经集成了 dispatch 方法。store.dispatch()是 View 发出 Action 的唯一方法。

```js
import { createStore } from 'redux';
const store = createStore(fn);

store.dispatch({
  type: 'ADD_TODO',
  payload: 'Learn Redux'
});
```

Redux 用一个叫做 Reducer 的**纯函数**来处理事件。Store 收到 Action 以后，必须给出一个**新的 State**（就是刚才说的Store 的 State 不能直接修改，每次只能返回一个新的 State**）**，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。

什么是纯函数呢，就是说没有任何的副作用，比如这样一个函数：

```js
function getAge(user) {
  user.age = user.age + 1;
  return user.age;
}
```

这个函数就有副作用，每一次相同的输入，都可能导致不同的输出，而且还会影响输入 user 的值，再比如：

```js
let b = 10;
function compare(a) {
  return a >= b;
}
```

这个函数也有副作用，就是依赖外部的环境，b 在别处被改变了，返回值对于相同的 a 就有可能不一样。

而 Reducer 是一个纯函数，对于相同的输入，永远都只会有相同的输出，不会影响外部的变量，也不会被外部变量影响，不得改写参数。它的作用大概就是这样，根据应用的状态和当前的 action 推导出新的 state：

```js
(previousState, action) => newState
```

类比 Flux，Flux 有些像：

```js
(state, action) => state
```

为什么叫做 Reducer 呢？reduce 是一个函数式编程的概念，经常和 map 放在一起说，简单来说，map 就是映射，reduce 就是归纳。映射就是把一个列表按照一定规则映射成另一个列表，而 reduce 是把一个列表通过一定规则进行合并，也可以理解为对初始值进行一系列的操作，返回一个新的值。

比如 Array 就有一个方法叫 reduce，Array.prototype.reduce(reducer, ?initialValue)，把 Array 整吧整吧弄成一个 newValue。

```js
const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10

// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));
// expected output: 15
```

看起来和 Redux 的 Reducer 是不是好像好像，Redux 的 Reducer 就是 reduce 一个列表（action的列表）和一个 initialValue（初始的 State）到一个新的 value（新的 State）。

把上面的概念连起来，举个例子：

下面的代码声明了 reducer：

```js
const defaultState = 0;
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD':
      return state + action.payload;
    default: 
      return state;
  }
};
```

createStore接受 Reducer 作为参数，生成一个新的 Store。以后每当store.dispatch发送过来一个新的 Action，就会自动调用 Reducer，得到新的 State。

```js
import { createStore } from 'redux';
const store = createStore(reducer);
```

createStore 内部干了什么事儿呢？通过一个简单的 createStore 的实现，可以了解大概的原理（可以略过不看）：

```js
const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  };

  dispatch({});

  return { getState, dispatch, subscribe };
};
```

Redux 有很多的 Reducer，对于大型应用来说，State 必然十分庞大，导致 Reducer 函数也十分庞大，所以需要做拆分。Redux 里每一个 Reducer 负责维护 State 树里面的一部分数据，多个 Reducer 可以通过 combineReducers 方法合成一个根 Reducer，这个根 Reducer 负责维护整个 State。

```js
import { combineReducers } from 'redux';

// 注意这种简写形式，State 的属性名必须与子 Reducer 同名
const chatReducer = combineReducers({
  Reducer1,
  Reducer2,
  Reducer3
})
```

combineReducers 干了什么事儿呢？通过简单的 combineReducers 的实现，可以了解大概的原理（可以略过不看）：

```js
const combineReducers = reducers => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce(
      (nextState, key) => {
        nextState[key] = reducers[key](state[key], action);
        return nextState;
      },
      {} 
    );
  };
};
```

## 流程



![img](https://pic4.zhimg.com/80/v2-9e7e7d6b492706746ba19845bd559963_1440w.jpg)



再回顾一下刚才的流程图，尝试走一遍 Redux 流程：

1、用户通过 View 发出 Action：

```js
store.dispatch(action);
```

2、然后 Store 自动调用 Reducer，并且传入两个参数：当前 State 和收到的 Action。 Reducer 会返回新的 State 。

```text
let nextState = xxxReducer(previousState, action);
```

3、State 一旦有变化，Store 就会调用监听函数。

```js
store.subscribe(listener);
```

4、listener可以通过 store.getState() 得到当前状态。如果使用的是 React，这时可以触发重新渲染 View。

```js
function listerner() {
  let newState = store.getState();
  component.setState(newState);   
}
```

## 对比 Flux

和 Flux 比较一下：Flux 中 Store 是各自为战的，每个 Store 只对对应的 View 负责，每次更新都只通知对应的View：



![img](https://pic3.zhimg.com/80/v2-4f3428e4dbb2e0c5b1988275b82da14e_1440w.jpg)



Redux 中各子 Reducer 都是由根 Reducer 统一管理的，每个子 Reducer 的变化都要经过根 Reducer 的整合：



![img](https://pic2.zhimg.com/80/v2-3eea040acf4cd03884ba3e903b936425_1440w.jpg)



简单来说，Redux有三大原则： *单一数据源：Flux 的数据源可以是多个。* State 是只读的：Flux 的 State 可以随便改。 * 使用纯函数来执行修改：Flux 执行修改的不一定是纯函数。

Redux 和 Flux 一样都是**单向数据流**。

## 中间件

刚才说到的都是比较理想的同步状态。在实际项目中，一般都会有同步和异步操作，所以 Flux、Redux 之类的思想，最终都要落地到同步异步的处理中来。

在 Redux 中，同步的表现就是：Action 发出以后，Reducer 立即算出 State。那么异步的表现就是：Action 发出以后，过一段时间再执行 Reducer。

那怎么才能 Reducer 在异步操作结束后自动执行呢？Redux 引入了中间件 Middleware 的概念。

其实我们重新回顾一下刚才的流程，可以发现每一个步骤都很纯粹，都不太适合加入异步的操作，比如 Reducer，纯函数，肯定不能承担异步操作，那样会被外部IO干扰。Action呢，就是一个纯对象，放不了操作。那想来想去，只能在 View 里发送 Action 的时候，加上一些异步操作了。比如下面的代码，给原来的 dispatch 方法包裹了一层，加上了一些日志打印的功能：

```js
let next = store.dispatch;
store.dispatch = function dispatchAndLog(action) {
  console.log('dispatching', action);
  next(action);
  console.log('next state', store.getState());
}
```

既然能加日志打印，当然也能加入异步操作。所以中间件简单来说，就是对 store.dispatch 方法进行一些改造的函数。不展开说了，所以如果想详细了解中间件，可以[点这里](https://link.zhihu.com/?target=https%3A//cn.redux.js.org/docs/advanced/Middleware.html)。

Redux 提供了一个 applyMiddleware 方法来应用中间件：

```js
const store = createStore(
  reducer,
  applyMiddleware(thunk, promise, logger)
);
```

这个方法主要就是把所有的中间件组成一个数组，依次执行。也就是说，任何被发送到 store 的 action 现在都会经过thunk，promise，logger 这几个中间件了。

## 处理异步

对于异步操作来说，有两个非常关键的时刻：发起请求的时刻，和接收到响应的时刻（可能成功，也可能失败或者超时），这两个时刻都可能会更改应用的 state。一般是这样一个过程：

1. 请求开始时，dispatch 一个请求开始 Action，触发 State 更新为“正在请求”状态，View 重新渲染，比如展现个Loading啥的。
2. 请求结束后，如果成功，dispatch 一个请求成功 Action，隐藏掉 Loading，把新的数据更新到 State；如果失败，dispatch 一个请求失败 Action，隐藏掉 Loading，给个失败提示。

显然，用 Redux 处理异步，可以自己写中间件来处理，当然大多数人会选择一些现成的支持异步处理的中间件。比如 [redux-thunk](https://link.zhihu.com/?target=https%3A//github.com/gaearon/redux-thunk) 或 [redux-promise](https://link.zhihu.com/?target=https%3A//github.com/acdlite/redux-promise) 。

## Redux-thunk

thunk 比较简单，没有做太多的封装，把大部分自主权交给了用户：

```js
const createFetchDataAction = function(id) {
    return function(dispatch, getState) {
        // 开始请求，dispatch 一个 FETCH_DATA_START action
        dispatch({
            type: FETCH_DATA_START, 
            payload: id
        })
        api.fetchData(id) 
            .then(response => {
                // 请求成功，dispatch 一个 FETCH_DATA_SUCCESS action
                dispatch({
                    type: FETCH_DATA_SUCCESS,
                    payload: response
                })
            })
            .catch(error => {
                // 请求失败，dispatch 一个 FETCH_DATA_FAILED action   
                dispatch({
                    type: FETCH_DATA_FAILED,
                    payload: error
                })
            }) 
    }
}

//reducer
const reducer = function(oldState, action) {
    switch(action.type) {
    case FETCH_DATA_START : 
        // 处理 loading 等
    case FETCH_DATA_SUCCESS : 
        // 更新 store 等
    case FETCH_DATA_FAILED : 
        // 提示异常
    }
}
```

缺点就是用户要写的代码有点多，可以看到上面的代码比较啰嗦，一个请求就要搞这么一套东西。

## Redux-promise

redus-promise 和 redux-thunk 的思想类似，只不过做了一些简化，成功失败手动 dispatch 被封装成自动了：

```js
const FETCH_DATA = 'FETCH_DATA'
//action creator
const getData = function(id) {
    return {
        type: FETCH_DATA,
        payload: api.fetchData(id) // 直接将 promise 作为 payload
    }
}
//reducer
const reducer = function(oldState, action) {
    switch(action.type) {
    case FETCH_DATA: 
        if (action.status === 'success') {
             // 更新 store 等处理
        } else {
                // 提示异常
        }
    }
}
```

刚才的什么 then、catch 之类的被中间件自行处理了，代码简单不少，不过要处理 Loading 啥的，还需要写额外的代码。

其实任何时候都是这样：**封装少，自由度高，但是代码就会变复杂；封装多，代码变简单了，但是自由度就会变差。**redux-thunk 和 redux-promise 刚好就是代表这两个面。

redux-thunk 和 redux-promise 的具体使用就不介绍了，这里只聊一下大概的思路。大部分简单的异步业务场景，redux-thunk 或者 redux-promise 都可以满足了。

------

上面说的 Flux 和 Redux，和具体的前端框架没有什么关系，只是思想和约定层面。











周五的时候对自己正在开发的 react 电商项目发出一个疑惑,在这个项目中使用 redux 时, store action reducer 这三个小玩意儿我先写哪一个呢 :question:

记一个大脑的自白 :neckbeard:

:bulb: :bulb: :bulb:

项目初始的时候应该是去写 store , but :warning: ,如果 reducer 写个空的 object 进去一定会报错,会被提示 reducer 不能为空 ,所以在完成 store 后要去构建 reducer , but :warning: ,写 reducer 的时候会发现需要 type ,好吧 ,那就去写 type , but :warning: ,写 type 时候不知道如何去命名这个 type ,好吧 ,那就去构思写什么样的 action ,然后去根据这个 action 的动作去命名 type ,所以 还需要写 action  

:bulb: :bulb: :bulb:

那么好了 ,结果出来了 :key: ,究竟应该先写哪一个呢

:pushpin: 答案是:同时写出来,少了哪个都不行

这个举一个 mall-getAddressList 的小李子 :fried_shrimp:

![directory-structure](https://github.com/fightingljm/myblog/blob/master/src/image/directory-structure.png?raw=true)

以上是一个 项目 action store reducer actiontype 的目录结构

`store.js`

```js
import {createStore,applyMiddleware} from 'redux';
import rootReducer from './reducers/index.js';
import thunk from 'redux-thunk';
import logger from 'redux-logger'

const store = createStore(rootReducer,applyMiddleware(thunk,logger))

export default store;
```

`constants/mall/ActionTypes.js`

```js
// 获取商品分类
export const GET_GOODS_SORT = 'GET_GOODS_SORT';

// 获取收货地址
export const GET_ADDRESS = 'GET_ADDRESS';

// 获得默认收货地址
export const GET_DEFAULTADDRESS = 'GET_DEFAULTADDRESS';
```

`constants/ActionTypes.js`

```js
// import * as index from './index/ActionTypes';
// import * as user from './user/ActionTypes';
import * as mall from './mall/ActionTypes';

export default {
    // index,
    // user,
    mall
}
```

`actions/mall/addList.js`

```js
import types from "../../constants/ActionTypes";
import FetchDataModule from "../../utiles/FetchDataModule";

export const getaddList = () => {
  return dispatch => {
    FetchDataModule.get('ADDRESSLIST')
      .then(res =>
        {
          dispatch({ type: types.mall.GET_ADDRESS, addList: res.list });
          // console.log('action',res)
        }
      )
  };
};
```

`reducers/mall/addList.js`

```js
'use strict';

import types from '../../constants/ActionTypes';

const initialState = {
  addList : [],
}

const address = (state=initialState , action)=>{
  switch (action.type) {
    case types.mall.GET_ADDRESS:
      return Object.assign({}, state, {
        addList: action.addList,
      })
    default:
      return state;
  }
}

export default address
```

`reducers/index.js`

```js
import {combineReducers} from 'redux';

// import index from './index/index'
// import userLogin from './user/userLogin'
// import userRegister from './user/userRegister'
import addList from './mall/addList'

const rootReducer = combineReducers({
    // index,
    // userLogin,
    // userRegister,
    addList,
})

export default rootReducer;
```

**使用**

入口文件

```js
import React from 'react';
import {render} from 'react-dom';
import Routers from './routes.js';

import {Provider} from 'react-redux';
import store from './store.js'

render(
    <Provider store={store}>
        <Routers />
    </Provider>,
    document.getElementById('root')
);
```

Address.js

```js
import React from 'react';
import {connect} from 'react-redux'
import {getaddList} from '../../actions/mall/addList'

class Address extends React.Component {
  componentDidMount(){
    this.props.getaddList()
  }
  render(){
    console.log(this.props);
    return(
      <div>
        Address
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
    addList:state.addList.addList
})

export default connect(mapStateToProps,{getaddList})(Address);
```

这样一个 react 项目的 简单 redux 就完成了 :dancer:

当应用越来越大之后，action 的数量也会大大增加，为每个 action 对象显式地写上 type 和 data 或者其它属性会造成大量的代码冗余，这一块是可以用 redux-actions 优化的。

除了上面的优势，它还有其它比较好用的功能，比如它提供的 createActions 方法可以接受不同类型的参数，以产生不同效果的 actionCreator ,比如官方文档的这个小李子

```js
import { createActions } from 'redux-actions';

const { actionOne, actionTwo, actionThree } = createActions({
  // 函数类型
  ACTION_ONE: (key, value) => ({ [key]: value }),

  // 数组类型
  ACTION_TWO: [
    (first) => first,               // payload
    (first, second) => ({ second }) // meta
  ],

  // 最简单的字符串类型
}, 'ACTION_THREE');

actionOne('key', 1));
//=>
//{
//  type: 'ACTION_ONE',
//  payload: { key: 1 }
//}

actionTwo('Die! Die! Die!', 'It\'s highnoon~');
//=>
//{
//  type: 'ACTION_TWO',
//  payload: ['Die! Die! Die!'],
//  meta: { second: 'It\'s highnoon~' }
//}

actionThree(76);
//=>
//{
//  type: 'ACTION_THREE',
//  payload: 76,
//}
```

更多请戳 :point_right: [redux-actions](https://github.com/acdlite/redux-actions)

轮子永远是造不完的，也是看不完的，这么多轮子的取舍其实终究还是要看开发者的能力以及实际项目的需求，有时你或许根本不需要这些东西，有时甚至连 Redux 本身也是多余的，毕竟，第三方库其实也是另一种意义上的『复杂度』嘛。

- [深度开源 OPEN 经验 -- Redux的全家桶与最佳实践](http://www.open-open.com/lib/view/open1473667303357.html)
