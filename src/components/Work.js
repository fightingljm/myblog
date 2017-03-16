import React from 'react';
import axios from 'axios';

// import img1 from '../image/css-framework.svg'
// import img2 from '../image/get-started.jpg'
// import img3 from '../image/components.svg'
// import img4 from '../image/get-started.svg'

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
        {/* <div className='work-card'>
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
        </div> */}
        {this.state.data.length==0 ?
          <div style={styles.circle}>
            <MuiThemeProvider>
              <CircularProgress  size={60} thickness={7}/>
            </MuiThemeProvider>
          </div> :
          this.state.data.map( (item,i) => (
            // <div key={i} className='blog-card'>
            //   <div className='blog-index'>{i+1}</div>
            //   <div className='blog-desc'>
            //     <h3>{item.title}</h3>
            //     <p>{item.desc}</p>
            //     <Link to={`post/${item.url}`}>阅读更多</Link>
            //     <span>{item.date}</span>
            //   </div>
            // </div>
            <div className='work-card'>
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
