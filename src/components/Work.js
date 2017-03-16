import React from 'react';
import axios from 'axios';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';

class Work extends React.Component {
  constructor() {
    super();
    this.state={
      data:[]
    }
  }
  componentDidMount(){
    axios.get('https://raw.githubusercontent.com/fightingljm/myblog/master/works/works.json')
      .then( res => this.setState({data: res.data}) )
  }
  render(){
    let styles={
      circle:{
        textAlign:'center',
        margin:'10em auto'
      }
    }
    return(
      <div style={{width:'100%'}} className='work-warp'>
        {this.state.data.length==0 ?
          <div style={styles.circle}>
            <MuiThemeProvider>
              <CircularProgress  size={60} thickness={7}/>
            </MuiThemeProvider>
          </div> :
          this.state.data.map( (item,i) => (
            <div className='work-card' key={Math.random()}>
              <div className='work-img' style={{backgroundImage: `url(${item.img})`}}></div>
              <div className='work-title'>
                {item.title}&nbsp;&nbsp;&nbsp;
                <span>{item.date}</span>
              </div>
            </div>
          ) )
        }
      </div>
    )
  }
}

export default Work;
