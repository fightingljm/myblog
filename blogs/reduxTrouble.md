### 百日博客4 -- Redux Trouble

2017.04.23 周日 天津 阵雨~然而我没出门

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
