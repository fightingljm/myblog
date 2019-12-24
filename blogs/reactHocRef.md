众所周知，父组件需要知道子组件的信息，可以通过ref解决；

但当子组件是一个高阶组件的时候，比如使用 `@connect` `@withNavigation` `@withNavigation` 包裹过的组件

### Example

```jsx

@withNavigation
export default class ChildComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (<Text>this is ChildComponent</Text>)
  }
}

@withNavigation
export default class ParentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {}; 
  }
  render () {
    return <ChildComponent ref={(v) => { this.childCp = v; }}/>
  }
 }

```

上面的 ChildComponent 被 withNavigation 包裹过一遍后，这时候你在 ParentComponent 中通过 ref 获取到的是并不会是 ChildComponent ，而是 withNavigation 组件。这就比较尴尬了。

回归到 js 语言层面来看，ref获取到的，就是组件中的 this，那就好办了，我给 ChildComponent 传一个 prop 专门来 get 这个 this 不就好了，比如使用getInstance：

```jsx

@withNavigation
export default class ChildComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    const { getInstance } = props;
    if (typeof getInstance === 'function') {
      getInstance(this); // 在这里把this暴露给`ParentComponent`
    }
  }
  render() {
    return (<div>this is ChildComponent</div>)
  }
}

@withNavigation
export default class ParentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {}; 
  }
  render () {
    return (
     <ChildComponent 
       ref={(withNavigation) => { this.childCpWrapper = withNavigation; }}  // 这里获取的是 `withNavigation` 组件，一般没啥用，这里写出来只是为了对比
       getInstance={(childCp) => { this.childCp = childCp; }} // 这里通过 `getInstance` 传一个回调函数接收`ChildComponent`实例即可
    />
    );
  }
 }

```

perfect ! 问题解决了，这样我不管你怎么用啥高阶组件、用多少个高阶组件包裹我们 ChildComponent，我们都可以通过一个getInstance，穿越千山万水直接获取 ChildComponent 实例。

BUT!!! 上面的方案中，我们得在每一个 ChildComponent 的构造函数中写那段暴露 this 的代码，麻烦、费劲。这时候我们可以写一个 HOC 专门来做这件事情，比如 withRef:

```jsx
// 只做一件事，把`WrappedComponent`回传个`getInstance`（如果有的话）
export default (WrappedComponent) => {
  return class withRef extends Component {
    static displayName = `withRef(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
    render() {
      // 这里重新定义一个props的原因是:
      // 你直接去修改this.props.ref在react开发模式下会报错，不允许你去修改
      const props = {
        ...this.props,
      };
      // 在这里把getInstance赋值给ref，
      // 传给`WrappedComponent`，这样 getInstance 就能获取到`WrappedComponent`实例
      props.ref = (el)=>{
          this.props.getInstance && this.props.getInstance(el);this.props.ref && this.props.ref(el);
      }
      return (
        <WrappedComponent {...props} />
      );
    }
  };
};

```

然后我们可以这样使用withRef

```jsx

@withNavigation
@withRef  // 这样使用是不是方便多了，注意：这句必须写在最接近`ChildComponent`的地方
export default class ChildComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (<div>this is ChildComponent</div>)
  }
}

@withNavigation
export default class ParentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {}; 
  }
  render () {
    return (
     <ChildComponent 
       // 这里获取的是`withNavigation`组件，一般没啥用，这里写出来只是为了对比
       ref={(withNavigation) => { this.childCpWrapper = withNavigation; }}  
      // 这里通过`getInstance`传一个回调函数接收`ChildComponent`实例即可
       getInstance={(childCp) => { this.childCp = childCp; }} 
    />
    );
  }
 }

 ```

通过这个小问题，对高阶组件的理解是不是也更深了些，问题才是最好的教材啊。

最后说一点吧，

通信方式有很多(暴露给全局，EventEmmiter, Props, ref...)，

但是我建议：遇到通信问题还是优先考虑 redux action 驱动，数据优先，能通过数据驱动解决的尽量用数据驱动，毕竟这才是我们用react的重要原因呐
