### 获取组件位置和大小的方法



#### onLayout 事件属性

```jsx

onLayout = (e) => {
  let { x, y, width, height } = e.nativeEvent.layout
}

<View onLayout={this.onLayout}></View>

```

当组件重新渲染时，该方法能重新获取元素的宽高和位置，但是有时组件并没有重新render，那么就获取不到正确的值。例如，页面滚动，但是state没有发生变化，组件也就没有重新渲染。

#### 元素自带的 measure 方法

```jsx

componentDidMount(){
  setTimeOut(()=>{
    this.testView.measure((x, y, width, height, pageX, pageY)=>{
        // ...Todo
    })
  })
}

<View ref={e => this.testView = e}></View>

```

> ⚠️注意：需要在componentDidMount方法里面添加一个定时器，定时器里面再进行测量，否则拿到的数据都为0；实际使用过程中，这个方法在自定义的组件上会失效，只能应用在react-native自带的View等组件上

#### 使用 UIManager 的 measure 方法

```jsx

import { UIManager, findNodeHandle } from 'react-native'

<MyComponent ref={e => this.myComponent = e} />
  
UIManager.measure(findNodeHandle(this.myComponent),(x, y, width, height, pageX, pageY)=>{
  // ...Todo
})

```

