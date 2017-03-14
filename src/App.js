import React, { PropTypes } from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Header from './components/Header.js'
import Footer from './components/Footer.js'
import LeftNav from './components/LeftNav.js'

class App extends React.Component {
  constructor() {
    super();
    this.state={
      showLeftNav:false,
      title:'Home'
    }
  }
  componentWillReceiveProps(){
    this.setTitle();
  }
  componentWillMount(){
    // console.log(window.innerWidth);
    this.setLeftNav()
    window.onresize = this.setLeftNav.bind(this)
    this.setTitle();
  }
  setLeftNav(){
    this.setState({
      showLeftNav:window.innerWidth>750 ? true :false
    })
  }
  setTitle(){
    this.setState({
      title:this.props.router.isActive('/',true) ? 'Home' :
            this.props.router.isActive('/blog') ? 'My Blog' :
            this.props.router.isActive('/work') ? 'My Work' :
            this.props.router.isActive('/about') ? 'About Me' : 'Article'
    })
  }
  getChildContext() {
    return {muiTheme: getMuiTheme()};
  }
  render () {
    // console.log(this.state.title);
    return(
      <div className='root'>
        {this.state.showLeftNav ? <LeftNav title={this.state.title}/> : <Header title={this.state.title}/>}
        <div className='mywrap'>
          {this.props.children}
        </div>
        {this.state.showLeftNav ? null : <Footer/>}
      </div>
    )
  }
}

App.childContextTypes = {
  muiTheme: PropTypes.object.isRequired,
}

export default App;
//lorem 垃圾代码
