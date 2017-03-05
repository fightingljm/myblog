import React from 'react';
import { Link } from 'react-router'

class LeftNav extends React.Component {
  constructor() {
    super();
    this.state={

    }
  }
  render(){
    return(
      <div className='leftnav'>
        <h1>{this.props.title}</h1>
        <Link to='/' activeStyle={{color:'#000',fontSize:'22px',backgroundColor:'#d9d9d9'}} onlyActiveOnIndex={true}> <i className="fa fa-home" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp; Home </Link>
        <Link to='/blog' activeStyle={{color:'#5bc0de',fontSize:'22px',backgroundColor:'#d9d9d9'}}> <i className="fa fa-bold" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp; Blog </Link>
        <Link to='/work' activeStyle={{color:'#000',fontSize:'22px',backgroundColor:'#d9d9d9'}}> <i className="fa fa-desktop" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp; Work </Link>
        <Link to='/about' activeStyle={{color:'#000',fontSize:'22px',backgroundColor:'#d9d9d9'}}> <i className="fa fa-font" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp; About </Link>
      </div>
    )
  }
}

export default LeftNav;
