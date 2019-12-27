### React Router 4 的使用方法

- [官网](https://reacttraining.com/react-router/)
- [Github](https://github.com/fightingljm/reactRouter4)

**简单开始一个栗子**

先利用 create-react-app 来创建一下新项目：

```bash
  $ create-react-app reactRouter4
```

然后安装需要的包

```bash
  $ cd reactRouter4
  $ npm i --save react-router-dom
```

>
- 如果我们只是想在浏览器中使用 react-router ，那就需要安装`react-router-dom` ,(dom 就是我们通常听说的“浏览器中的 DOM 节点”中所说的那个 dom)
- 如果我们想在 react native 条件下使用 react router ，那就需要安装 `react-router-native`

**exact 修饰符**

v4 条件下，同一个 url ，可能会匹配多于一个的 Route ，[exact 修饰符](https://reacttraining.com/react-router/web/api/Route/exact-bool) 针对的就是这个问题。

```jsx
const App = () => (
  <Router>
    <div>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
    </div>
  </Router>
)
```

[官方也在犹豫要不要把 exact 设置成默认](https://github.com/ReactTraining/react-router/issues/4958)。当然目前官方有这样的默认行为也是有它的用意的，比如这样的方式可以让制作 sidebar 等效果的时候更便利。

**Redirect 重定向**

V4 这里，一切都更像组件了。根据官方文档上的说明：

>
<Redirect /> 的作用和服务器端返回 HTTP 3XX 代码的重定向效果类似

```jsx
import { Route, Redirect } from 'react-router'

<Route exact path="/" render={() => (
  loggedIn ? (
    <Redirect to="/dashboard"/>
  ) : (
    <PublicHomePage/>
  )
)}/>
```

- 跳转到登录前的页面

```jsx
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

const factAuth = {
  isAuthenticated:false,
  authenticate(){
    this.isAuthenticated=true
  }
}

const Home = () => <h3>首页</h3>
const ShopCart = () => <h3>购物车</h3>
const OrderList = () => <h3>订单列表</h3>

class Login extends React.Component {
  state = {
    redirectToReferrer:false
  }
  login = () => {
    factAuth.authenticate()
    this.setState({
      redirectToReferrer:true
    })
  }
  render(){
    const { redirectToReferrer } = this.state
    const { from } = this.props.location.state
    // console.log(this.props.location);
    if(redirectToReferrer){
      return(
        <Redirect to={from}/>
      )
    }
    return(
      <div>
        <button onClick={this.login}>登录</button>
      </div>
    )
  }
}

const AuthButton = withRouter(() => (
  factAuth.isAuthenticated ? (
    <p>你好!</p>
  ) : (
    <p>尚未登录</p>
  )
))

const PrivateRoute = ({component:Component,...rest}) => (
  <Route {...rest} render={(props)=>(
    factAuth.isAuthenticated ? (
      <Component/>
    ) : (
      <Redirect to={{
        pathname:'/login',
        state:{
          from:props.location
        }
      }} />
    )
  )}/>
)

class App extends React.Component {
  render(){
    return(
      <Router>
        <div>
          <AuthButton />
          <ul>
            <li><Link to='/home'>Home</Link></li>
            <li><Link to='/cart'>ShopCart</Link></li>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/order'>OrderList</Link></li>
          </ul>
          <Route path='/home' component={Home}/>
          <Route path='/login' component={Login}/>
          <PrivateRoute path='/cart' component={ShopCart}/>
          <PrivateRoute path='/order' component={OrderList}/>
        </div>
      </Router>
    )
  }
}

export default App;
```

**url 参数**

把 URL 中动态的部分作为参数，传递到组件中备用。

```jsx
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const Video = ({match}) => (
  <h1>{match.params.id}</h1>
)

const App = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/v/1-git">1-git</Link></li>
        <li><Link to="/v/2-react">2-react</Link></li>
      </ul>
      <Route path='/v/:id' component={Video} />
    </div>
  </Router>
)

export default App;
```

**match.url 来实现嵌套 Link**

```jsx
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const Home = () => (
  <h1>Home</h1>
)
const Item = ({match}) => (
  <h1>{match.params.item}</h1>
)
const About = ({match}) => (
  <Router>
    <div>
      <ul>
        <li><Link to={`${match.url}/me`}>aboutMe</Link></li>
        <li><Link to={`${match.url}/work`}>aboutWork</Link></li>
      </ul>
      <Route path={`${match.url}/:item`} component={Item} />
    </div>
  </Router>
)

const App = () => (
  <Router>
    <div>
      <ul>
        <li><Link to='/'>home</Link></li>
        <li><Link to='/change'>about</Link></li>
      </ul>
      <Route exact path='/' component={Home} />
      <Route path='/change' component={About} />
    </div>
  </Router>
)

export default App;
```

**Not Match(404)**

```jsx
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

const Home = () => (
  <h1>Home</h1>
)

const About = () => (
  <h1>About</h1>
)

const NotFound = () => (
  <h1>404</h1>
)

const App = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/about' component={About}/>
      <Route component={NotFound}/>
    </Switch>
  </Router>
)

export default App
```

**Switch 组件的作用**

React Router 区别于其他语言框架下的 router 的一大特点就是一个 url 可以出发多个 Route ，同时显示多个 component 。这个让 React Router 实现 sidebar 等一些功能的时候变得非常方便。但是有些时候，也会造成一些麻烦。这时候，我们就要使用上 Switch 组件

它的作用就是，如果有多个 Route 都可以配对上 url ，那么只去触发第一个 Route

拿栗子来说话

```jsx
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom'

const Home = () => (
  <h1>Home</h1>
)

const About = () => (
  <h1>About</h1>
)

const User = ({match}) => (
  <h1>Hello,{match.params.user}</h1>
)

const App = () => (
  <Router>
    <div>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/liujinmeng'>User</Link></li>
      </ul>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/about' component={About}/>
        <Route path='/:user' component={User}/>
      </Switch>
    </div>
  </Router>
)

export default App
```
