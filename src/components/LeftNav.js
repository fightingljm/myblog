// import React from 'react';
// import { Link } from 'react-router'
//
// class LeftNav extends React.Component {
//   constructor() {
//     super();
//     this.state={
//
//     }
//   }
//   render(){
//     return(
//       <div className='leftnav'>
//         <h1>{this.props.title}</h1>
//         <Link to='/' activeStyle={{color:'#000',fontSize:'22px',backgroundColor:'#d9d9d9'}} onlyActiveOnIndex={true}> <i className="fa fa-home" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp; Home </Link>
//         <Link to='/blog' activeStyle={{color:'#5bc0de',fontSize:'22px',backgroundColor:'#d9d9d9'}}> <i className="fa fa-bold" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp; Blog </Link>
//         <Link to='/work' activeStyle={{color:'#000',fontSize:'22px',backgroundColor:'#d9d9d9'}}> <i className="fa fa-desktop" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp; Work </Link>
//         <Link to='/about' activeStyle={{color:'#000',fontSize:'22px',backgroundColor:'#d9d9d9'}}> <i className="fa fa-font" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp; About </Link>
//       </div>
//     )
//   }
// }
//
// export default LeftNav;


import React from 'react'
import { Link } from 'react-router';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';

class LeftNav extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }
  handleToggle(){this.setState({open: !this.state.open})};
  handleClose(){this.setState({open: false})};
  render() {
    let styles={
      smallIcon:{
        width:'32px',
        height:'32px'
      },
      small:{
        position:'absolute',
        top:'10px',
        left:'10px',
        width:'52px',
        height:'52px',
        padding:'10px'
      },
      navTitle:{
        color:'#fff',
        lineHeight:'75px',
        fontSize:'20px',
        backgroundColor:'#00BCD4',
        marginBottom:'10px'
      }
    }
    return (
      <div>
        <IconButton tooltip="menu"
          onClick={this.handleToggle.bind(this)}
          iconStyle={styles.smallIcon}
          style={styles.small}>
          <Menu color='#000'/>
        </IconButton>
        <Drawer
          docked={false}
          width={260}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})} >
          <div className='leftnav'>
            <p style={styles.navTitle} onClick={this.handleClose.bind(this)}>Jinmeng Liu @{this.props.title}</p>
            <MenuItem onTouchTap={this.handleClose.bind(this)}>
              <Link to='/' activeStyle={{color:'#000',fontSize:'22px'}} onlyActiveOnIndex={true}> <i className="fa fa-home" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp; Home </Link>
            </MenuItem>
            <MenuItem onTouchTap={this.handleClose.bind(this)}>
              <Link to='/blog' activeStyle={{color:'#5bc0de',fontSize:'22px'}}> <i className="fa fa-bold" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp; Blog </Link>
            </MenuItem>
            <MenuItem onTouchTap={this.handleClose.bind(this)}>
              <Link to='/work' activeStyle={{color:'#000',fontSize:'22px'}}> <i className="fa fa-desktop" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp; Work </Link>
            </MenuItem>
            <MenuItem onTouchTap={this.handleClose.bind(this)}>
              <Link to='/about' activeStyle={{color:'#000',fontSize:'22px'}}> <i className="fa fa-font" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp; About </Link>
            </MenuItem>
          </div>
        </Drawer>
      </div>
    );
  }
}
export default LeftNav;
