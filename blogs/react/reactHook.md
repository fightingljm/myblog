### React Hook API

<!-- TOC -->

- [React Hook API](#react-hook-api)
    - [useEffect](#useeffect)
        - [最基本的使用](#%E6%9C%80%E5%9F%BA%E6%9C%AC%E7%9A%84%E4%BD%BF%E7%94%A8)
        - [响应更新](#%E5%93%8D%E5%BA%94%E6%9B%B4%E6%96%B0)
        - [处理Loading和Error](#%E5%A4%84%E7%90%86loading%E5%92%8Cerror)
        - [处理表单](#%E5%A4%84%E7%90%86%E8%A1%A8%E5%8D%95)
        - [自定义hooks](#%E8%87%AA%E5%AE%9A%E4%B9%89hooks)
    - [useReducer](#usereducer)
        - [使用useReducer整合逻辑](#%E4%BD%BF%E7%94%A8usereducer%E6%95%B4%E5%90%88%E9%80%BB%E8%BE%91)
        - [取消数据请求](#%E5%8F%96%E6%B6%88%E6%95%B0%E6%8D%AE%E8%AF%B7%E6%B1%82)
    - [useMemo](#usememo)
    - [useCallback](#usecallback)
    - [另外](#%E5%8F%A6%E5%A4%96)

<!-- /TOC -->

[官网](https://zh-hans.reactjs.org/docs/hooks-reference.html)

官网有很多基础的和额外的 Hook ，这里记录几个自己不太好理解的几个

#### useEffect

##### 最基本的使用

useEffect 用于处理组件中的effect，通常用户请求数据，事件处理，订阅等相关操作。这里以数据请求为例

```js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [data, setData] = useState({ hits: [] })

    /*
    初步使用 useEffect 来隔离作用
    在useEffect中，不仅会请求后端数据，还会通过setState更新本地状态，这样会触发view的更新，会出现无限循环的情况。
    useEffect在组件mount时执行，但也会在组件更新时执行，每次请求数据之后设置本地状态，组件会更新，useEffect会再次执行。
    而此时我们只想在组件mount时请求数据，解决方法详见下一步；
    */
    useEffect(async () => {
        const result = await axios('http://localhost/api/v1/search?query=redux')

        setData(result.data)
    })

    /*
    传递一个空数组作为useEffect的第二个参数，这样就避免在组件更新执行useEffect，只会在组件mount时执行。
    但是，我们不能直接在useEffect中使用async函数，解决方法详见下一步；
    */
   useEffect(async () => {
        const result = await axios('http://localhost/api/v1/search?query=redux')

        setData(result.data)
    }, [])

    /*
    控制台看到的警告
        Warning: useEffect function must return a cleanup function or nothing. Promises and useEffect(async () => …) are not supported, but you can call an async function inside an effect
        useEffect函数必须返回清除函数，否则不返回任何内容。 不支持Promises和useEffect（async（）=>…），但是您可以在效果内部调用异步函数
    因为每个async函数都会返回一个隐式的promise，
    但是useEffect不应该返回任何内容，因此我们可以不直接调用async函数
    */
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios('http://localhost/api/v1/search?query=redux')
            setData(result.data)
        }
        fetchData()
    }, [])

    return (
        <ul>
            {
                data.hits.map(item=>(
                    <li key={item.objectID}>
                        <a href={item.url}>
                            {
                                item.title
                            }
                        </a>
                    </li>
                ))
            }
        </ul>
    )
}

export default App
```

##### 响应更新

上面的例子我们实现在在组件mount时请求数据，但很多情况下我们需要响应用户的输入，然后再请求。这个时候我们会引入一个input输入框，监听query的变化

```js

import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

function App() {
    const [data, setData] = useState({ hits: [] })
    const [query, setQuery] = useState('redux')
    const [search, setSearch] = useState('redux')

    /*
    有个这个query值，还需要将它传递给后台，这个操作会在useEffect中进行;
    并且将query作为useEffect依赖的变量；
    */
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `http://localhost/api/v1/search?query=${query}`
            )
            setData(result.data)
        }
        fetchData()
    }, [query])
    /*
    但是问题来了：
    query的任何一次变动都会请求后端，这样会带来比较大的访问压力，这个时候我们引入一个按钮，点击这个按钮再发起请求，
    并且将search作为useEffect依赖的变量；
    */
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `http://localhost/api/v1/search?query=${query}`
            )
            setData(result.data)
        }
        fetchData()
    }, [search])

    return (
        <Fragment>
            <input
                type="text"
                value={query}
                onChange={event => setQuery(event.target.value)}
            />
            <button type="button" onClick={() => setSearch(query)}>
                Search
            </button>
            <ul>
                {
                    data.hits.map(item=>(
                        <li key={item.objectID}>
                            <a href={item.url}>
                                {
                                    item.title
                                }
                            </a>
                        </li>
                    ))
                }
            </ul>
        </Fragment>
    )
}

export default App
```

整理上面的逻辑代码

```js

import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

function App() {
    const [data, setData] = useState({ hits: [] })
    const [query, setQuery] = useState('redux')
    const [url, setUrl] = useState('http://localhost/api/v1/search?query=redux')

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(url)
            setData(result.data)
        }
        fetchData()
    }, [url])

    return (
        <Fragment>
            <input
                type="text"
                value={query}
                onChange={event => setQuery(event.target.value)}
            />
            <button
                type="button"
                onClick={() => setUrl(`http://localhost/api/v1/search?query=${query}`)}
            >
                Search
            </button>
            <ul>
                {
                    data.hits.map(item=>(
                        <li key={item.objectID}>
                            <a href={item.url}>
                                {
                                    item.title
                                }
                            </a>
                        </li>
                    ))
                }
            </ul>
        </Fragment>
    )
}

export default App
```

##### 处理Loading和Error

良好的用户体验，需要在请求后端数据，数据还没返回的时候展现loading状态

```js


import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

function App() {
    const [data, setData] = useState({ hits: [] })
    const [query, setQuery] = useState('redux')
    const [url, setUrl] = useState('http://localhost/api/v1/search?query=redux')
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    /*
    这里并不需要将loading作为useEffect的依赖数据。
    只有某个变量更新后，需要重新执行useEffect的情况，才需要将该变量添加到useEffect的依赖数组中。
    */
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const result = await axios(url)
            setData(result.data)
            setIsLoading(false)
        }
        fetchData()
    }, [url])

    /*
    处理错误
    */
    useEffect(() => {
        const fetchData = async () => {
            setIsError(false)
            setIsLoading(true)
            try {
                const result = await axios(url)
                setData(result.data)
            } catch (error) {
                setIsError(true)
            }
            setIsLoading(false)
        }
        fetchData()
    }, [url])

    return (
        <Fragment>
            <input
                type="text"
                value={query}
                onChange={event => setQuery(event.target.value)}
            />
            <button
                type="button"
                onClick={() => setUrl(`http://localhost/api/v1/search?query=${query}`)}
            >
                Search
            </button>
            {
                isError && <div>Something went wrong ...</div>
            }
            {
                isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <ul>
                        {
                            data.hits.map(item=>(
                                <li key={item.objectID}>
                                    <a href={item.url}>
                                        {
                                            item.title
                                        }
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                )
            }
        </Fragment>
    )
}

export default App
```

##### 处理表单

逻辑相同，需要添加阻止默认事件，来阻止页面刷新

```js
function App() {
  ...

  const doFetch = () => {
    setUrl(`http://localhost/api/v1/search?query=${query}`);
  };

  return (
    <Fragment>
      <form onSubmit={event => {
        doFetch();

        // 阻止默认事件
        event.preventDefault();
      }}>
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {isError && <div>Something went wrong ...</div>}

      ...
    </Fragment>
  );
}
```

##### 自定义hooks

上面添加了一系列的hooks和逻辑之后，已经变得非常庞大。而hooks的一个非常的优势，就是能够方便的提取自定义的hooks。
这个时候，我们就能把上面的一大推的逻辑抽取到一个单独的hooks中，方便复用和解耦

```js

function useFetchApi = () => {
    const [data, setData] = useState({ hits: [] })
    const [url, setUrl] = useState('http://localhost/api/v1/search?query=redux')
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);

            try {
                const result = await axios(url);

                setData(result.data);
            } catch (error) {
                setIsError(true);
            }

            setIsLoading(false);
        }

        fetchData()
    }, [url])

    const doFetch = () => {
        setUrl(`http://localhost/api/v1/search?query=${query}`)
    }

    return { data, isLoading, isError, doFetch }
}

// 使用
const { data, isLoading, isError, doFetch } = useFetchApi()

```

#### useReducer

##### 使用useReducer整合逻辑

上面我们使用了各种state hooks来管理状态，包括loading、error、data等状态，
但是现在这三个关联的状态是分散的，他们通过分离的useState来创建，
为了关联这些状态，需要用到useReducer
useReducer 是一个轻量的redux，他返回一个状态对象和一个可以改变状态对象的dispatch函数，和redux类似，
dispatch函数接受action作为参数，action包含type和payload属性

```js

import React, { useReducer, useState } from 'react'

/*
reducer 函数的实现，它需要三种不同的状态转换 FETCH_INIT FETCH_SUCCESS FETCH_FAILURE
每个状态转换都需要返回一个新的状态的对象
*/
const dataFetchReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        case 'FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            }
        case 'FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
        default:
            throw new Error()
    }
}

const useDataApi = (initiaUrl, initiaData) => {
    const [url, setUrl] = useState(initiaUrl)

    /*
    useReducer将reducer函数和初始状态对象作为参数，这里的isLoading/isError和data状态的初始值于useState创建时一致，
    但它们已经整合到一个由useReducer创建对象，而不是多个useState创建的状态
    */
    const [state, dispatch] = useReducer(dataFetchReducer, {
        isLoading: false,
        isError: false,
        data: initiaData,
    })

    /*
    在获取数据时，可以调用dispatch函数，将信息发送给reducer
    */
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_INIT' })

            try {
                const result = await axios(url);

                dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
            } catch (error) {
                dispatch({ type: 'FETCH_FAILURE' })
            }

            setIsLoading(false);
        }

        fetchData()
    }, [url])

    const doFetch = (url) => {
        setUrl(url)
    }

    /*
    state = { data, isLoading, isError }
    state是一个状态对象，所以需要解构后返回
    */
    return { ...state, doFetch }
}

```

##### 取消数据请求

如果在组件中发送一个请求，在请求还没有返回的时候卸载了组件，这个时候还会尝试设置这个状态，会报错，我们需要在hooks中处理这种情况

```js

...

const useDataApi = (initiaUrl, initiaData) => {
    ...

    useEffect(() => {
        let didCancel = false
        const fetchData = async () => {
            dispatch({ type: 'FETCH_INIT' })

            try {
                const result = await axios(url);

                if (!didCancel) {
                    dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
                }
            } catch (error) {
                if (!didCancel) {
                    dispatch({ type: 'FETCH_FAILURE' })
                }
            }

            setIsLoading(false);
        }

        fetchData()

        return () => {
            didCancel = true
        }
    }, [url])

    ...
```

上面例子中新增的didCancel变量，如果这个比变量为true，不会再发送dispatch，也不会再执行设置状态这个动作。
在useEffect的返回函数中将didCancel设置为true，在卸载组件时会自动调用这段逻辑

#### useMemo

查了很多资料后才明白官网说的这句话

> 把 创建函数 和 依赖项数组 (就是决定函数是否执行的参数或者值) 作为参数传入 `useMemo` ，它仅会在某个依赖项改变时才重新计算。这种优化有助于避免在每次渲染的时候都进行高开销的计算.

举一个简单明了的例子

```jsx

import React, { useState, useMemo } from 'react'

export default function WithMemo() {
    const [count, setCount] = useState(1)
    const [val, setValue] = useState('')
    /**
    使用 useMemo 来执行昂贵的计算，然后将计算值返回，并将count作为依赖值传递进去
    这样，只会在count改变的时候才会触发expensive执行；在修改val的时候，返回上一次缓存的值。
    */
    const expensive = useMemo(() => {
        console.log('compute')
        let sum = 0
        for (let i = 0; i < count * 100; i++) {
            sum += i
        }
        return sum
    }, [count])
    return <div>
        <h4>
            {
                count- val - expensive()
            }
        </h4>
        {
            val
        }
        <div>
            <button
                onClick={() => setCount(count + 1)}
            >
                count + 1
            </button>
            <input
                value={val}
                onChange={event => setValue(event.target.value)}
            />
        </div>
    </div>
}
```

上面的例子如果不使用 useMemo ，无论是修改count还是val，由于组件的重新渲染，都会触发 expensive 的执行；
但是这里的昂贵计算只依赖于count值，在val修改的时候，是没有必要再次计算的

#### useCallback

useCallback(fn, deps) 相当于 useMemo(()=>fu, deps)

```js

import React, { useState, useCallback } from 'react'

const set = new Set()

export default function Callback() {
    const [count, setCount] = useState(1)
    const [val, setValue] = useState('')

    const callback = useCallback(() => {
        console.log(count)
    }, [count])
    set.add(callback)

    return <div>
        <h4>
            {
                count
            }
        </h4>
        <h4>
            {
                set.size
            }
        </h4>
        <div>
            <button
                onClick={() => setCount(count + 1)}
            >
                count + 1
            </button>
            <input
                value={val}
                onChange={event => setValue(event.target.value)}
            />
        </div>
    </div>
}

```

上面例子中，每次修改count，set.size就会+1，这说明useCallback依赖变量count，count变更时会返回新的函数；而val变更时，set.size不会变，说明返回的是缓存的旧版本函数

使用场景：有一个父组件，其中包含自组件，自组件接收一个函数作为props；
通常而言，如果父组件更新了，子组件也会执行更新；
但是大多数场景下，更新是没有必要的，我们可以借助useCallback来返回函数，然后把这个函数作为props传递给子组件；
这样子组件就能避免不必要的更新。

```js

import React, { useState, useCallback } from 'react'

function Parent() {
    const [count, setCount] = useState(1)
    const [val, setValue] = useState('')

    const callback = useCallback(() => {
        return count
    }, [count])

    return <div>
        <h4>
            {
                count
            }
        </h4>
        <Child callback={callback} />>
        <div>
            <button
                onClick={() => setCount(count + 1)}
            >
                count + 1
            </button>
            <input
                value={val}
                onChange={event => setValue(event.target.value)}
            />
        </div>
    </div>
}

function Child ({ callback }) {
    const [count, setCount] = useState(() => callback())
    useEffect(() => {
        setCount(callback())
    }, [callback])
    return <div>
        {
            count
        }
    </div>
}

```

不仅是上面的例子，所有依赖本地状态或props来创建函数，需要使用到缓存函数的地方，都可以使用useCallback

#### 另外

useEffect、useMemo、useCallback都是自带闭包的。
也就是说，每一次组件的渲染，其都会捕获当前组件函数上下文中的状态(state, props)，
所以每次第三种hooks的执行，反映的也都是当前的状态，你无法使用它们来捕获上一次的状态。
对于这种情况我们应该使用ref来访问

[React Hoooks 进阶](https://github.com/SunShinewyf/issue-blog/issues/50)