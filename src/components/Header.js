import React from 'react';

class Header extends React.Component {
  constructor() {
    super();
    this.state={

    }
  }
  render(){
    return(
      <header>
        <button className="btn"> <i className="fa fa-arrow-left" aria-hidden="true"></i> Back </button>
        <h2>My Blog</h2>
        <button className="btn"> <i className="fa fa-home" aria-hidden="true"></i> Home </button>
      </header>
    )
  }
}

export default Header;
