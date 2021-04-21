#### memo

问题: 当在一个父组件中调用一个子组件的时候,由于父组件的state发生了改变导致父组件更新,虽然子组件没有发生改变,但是也会进行更新,如下面代码

```javascript
import React, { useState, memo } from 'react'

export default function index(): JSX.Element {

    const [count, setCount] = useState(1);
    return (
        <div>
            <h2>{count}</h2>
            <button onClick={() => setCount(count + 1)}>+1</button>
            <Child />
        </div>
    )
}

export function Child() {
    console.log('子组件更新了');
    return (
        <div>child 组件</div>
    )
}
```

效果: 当点击父组件的button的时候,就会打印一次console.log

解决方案: 使用`memo`对子组件进行包裹

```javascript
import React, { useState, memo } from 'react'

// 使用一层memo来包裹子组件
const MemoChild = memo(Child);

export default function index(): JSX.Element {

    const [count, setCount] = useState(1);
    return (
        <div>
            <h2>{count}</h2>
            <button onClick={() => setCount(count + 1)}>+1</button>
            <MemoChild />
        </div>
    )
}

export function Child() {
    console.log('子组件更新了');
    return (
        <div>child 组件</div>
    )
}
```

#### useMemo

如下代码: 本来expensive只是依赖count变化才会重新渲染的,但是当val发生改变的时候还是重新渲染了

```javascript
const [count, setCount] = useState(1);
const [val, setValue] = useState('');
const expensive = () => {
    console.log('compute');
    let sum = 0;
    for (let i = 0; i < count * 100; i++) {
        sum += i;
    }
    return sum;
}

return <div>
    <h4>{count}-{expensive()}</h4>
    {val}
    <div>
        <button onClick={() => setCount(count + 1)}>+c1</button>
        <input value={val} onChange={event => setValue(event.target.value)}/>
    </div>
</div>;
```

使用useMemo对expensive进行包裹,这时候改变val就不会导致expensive重新渲染了

```javascript
const [count, setCount] = useState(1);
const [val, setValue] = useState('');
const expensive = useMemo(() => {
    console.log('compute');
    let sum = 0;
    for (let i = 0; i < count * 100; i++) {
        sum += i;
    }
    return sum;
}, [count]);

return <div>
    <h4>{count}-{expensive}</h4>
    {val}
    <div>
        <button onClick={() => setCount(count + 1)}>+c1</button>
        <input value={val} onChange={event => setValue(event.target.value)}/>
    </div>
</div>;
```

#### useCallback

如下代码: 当点击父组件的button和修改input的时候都会触发子组件的更新

```javascript
import React, { useState, memo, useCallback } from 'react';
const MemoTestChild = memo(TestChild);
export default function Test(): JSX.Element {
    const [count, setCount] = useState<number>(100);
    const [name, setName] = useState<string>('TestChild组件');
    return (
        <>
            <h2>{count}</h2>
            <button onClick={() => setCount(count + 1)}>++</button>
            <MemoTestChild name={name} setName={(newName: string) => setName(newName)} />
            {/* <MemoTestChild name={name} setName={useCallback((newName: string) => setName(newName),[])} /> */}
        </>
    )
}

//子组件部分
interface TestChildPropsType {
    name: string;
    setName: Function;
}
function TestChild({ name, setName }: TestChildPropsType): JSX.Element {
    console.log('子组件更新');
    return (
        <>
            <h3>子组件:{name}</h3>
            <button onClick={() => setName(name + '改变后的name')}>改变name</button>
        </>
    );
}
```

使用useCallback后

```javascript
import React, { useState, memo, useCallback } from 'react';
const MemoTestChild = memo(TestChild);
export default function Test(): JSX.Element {
    const [count, setCount] = useState<number>(100);
    const [name, setName] = useState<string>('TestChild组件');
    return (
        <>
            <h2>{count}</h2>
            <button onClick={() => setCount(count + 1)}>++</button>
            // 关键代码在这一行使用useCallback进行包裹
            <MemoTestChild name={name} setName={useCallback((newName: string) => setName(newName),[])} />
        </>
    )
}

//子组件部分
interface TestChildPropsType {
    name: string;
    setName: Function;
}
function TestChild({ name, setName }: TestChildPropsType): JSX.Element {
    console.log('子组件更新');
    return (
        <>
            <h3>子组件:{name}</h3>
            <button onClick={() => setName(name + '改变后的name')}>改变name</button>
        </>
    );
}
```

### 总结

在子组件不需要父组件的值和函数的情况下，只需要使用memo函数包裹子组件即可。
而在使用值和函数的情况，需要考虑有没有函数传递给子组件使用useCallback，值有没有所依赖的依赖项而使用useMemo,而不是盲目使用这些hooks等