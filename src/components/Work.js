import React from 'react';
import axios from 'axios';
import { Link } from 'react-router'

class Work extends React.Component {
  constructor() {
    super();
    this.state={
      data:[]
    }
  }
  componentDidMount(){
    axios.get('https://raw.githubusercontent.com/fightingljm/myblog/master/blogs/blogs.json')
      .then(res => this.setState({data:res.data}))
  }
  render(){
    return(
      <div style={{width:'100%'}}>
        {
          this.state.data.length===0 ? '请稍后' :
          this.state.data.map(item => (
            <div key={Math.random()} className='work-card'>
              {/* <div className='work-img' style={{backgroundImage: 'url(../image/get-started.svg)'}}></div> */}
              <div className='work-img'></div>
              <div className='work-title'>
                {item.title}&nbsp;&nbsp;&nbsp;
                <span>{item.date}</span>
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}

export default Work;
