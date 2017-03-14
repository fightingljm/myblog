import React from 'react';

import img1 from '../image/css-framework.svg'
import img2 from '../image/get-started.jpg'
import img3 from '../image/components.svg'
import img4 from '../image/get-started.svg'

class Work extends React.Component {
  constructor() {
    super();
    this.state={

    }
  }
  render(){
    return(
      <div style={{width:'100%'}}>
        <div className='work-card'>
          <div className='work-img' style={{backgroundImage: `url(${img1})`}}></div>
          <div className='work-title'>
            第一篇文章&nbsp;&nbsp;&nbsp;
            <span>2017.03.03</span>
          </div>
        </div>
        <div className='work-card wc-p'>
          <div className='work-img' style={{backgroundImage: `url(${img2})`}}></div>
          <div className='work-title'>
            第二篇文章&nbsp;&nbsp;&nbsp;
            <span>2017.03.03</span>
          </div>
        </div>
        <div className='work-card'>
          <div className='work-img' style={{backgroundImage: `url(${img3})`}}></div>
          <div className='work-title'>
            第三篇文章&nbsp;&nbsp;&nbsp;
            <span>2017.03.03</span>
          </div>
        </div>
        <div className='work-card'>
          <div className='work-img' style={{backgroundImage: `url(${img4})`}}></div>
          <div className='work-title'>
            第四篇文章&nbsp;&nbsp;&nbsp;
            <span>2017.03.03</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Work;
