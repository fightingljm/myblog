import React from 'react';

class Home extends React.Component {
  constructor() {
    super();
    this.state={

    }
  }
  render(){
    return(
      <div className='home'>
        <div className='home-cover'>
          <div>
            <h1>I'M Jinmeng Liu</h1>
            <p>FrontEnd Web Developer</p>
            <a href='https://github.com/fightingljm' className='btn'><i className="fa fa-github" aria-hidden="true"></i> My GitHub</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;
