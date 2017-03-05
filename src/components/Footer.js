import React from 'react';
import { Link } from 'react-router'

class Footer extends React.Component {
  constructor() {
    super();
    this.state={

    }
  }
  render(){
    return(
      <footer>
        <Link to='/' activeStyle={{color:'#000',fontSize:'20px'}} onlyActiveOnIndex={true}> <i className="fa fa-home" aria-hidden="true"></i><br/> Home </Link>
        <Link to='/blog' activeStyle={{color:'rgb(0, 188, 212)',fontSize:'20px'}}> <i className="fa fa-bold" aria-hidden="true"></i><br/> Blog </Link>
        <Link to='/work' activeStyle={{color:'#000',fontSize:'20px'}}> <i className="fa fa-desktop" aria-hidden="true"></i><br/> Work </Link>
        <Link to='/about' activeStyle={{color:'#000',fontSize:'20px'}}> <i className="fa fa-font" aria-hidden="true"></i><br/> About </Link>
      </footer>
    )
  }
}

export default Footer;
