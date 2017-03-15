import React from 'react'
import axios from 'axios';

import {getJsonData} from './helpers.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';

import BlogCard from './BlogCard.js';

class BlogsList extends React.Component {
  constructor(){
    super();
    this.state={
      posts: [],
      wait:true
    }
  }
  componentDidMount(){
    getJsonData()
      .then((data) => {
        console.log(data)
        this.setState({
          posts:data.posts,
          wait:false
        })
      })
  }
  render () {
    console.log(this.props.search)
    var blogCards = [];
    if (this.props.search=='') {
      this.state.posts.map((item,index) => {
        blogCards.push(<BlogCard title={item.title} date={item.date} desc={item.desc} index={index+1} key={Math.random()} url={item.url}/>)
        });
    }else {
      for (var i = 0; i < this.state.posts.length; i++) {
        let thisPost = this.state.posts[i];
        if (thisPost.title.indexOf(this.props.search)!= -1) {
          blogCards.push(<BlogCard title={thisPost.title} date={thisPost.date} desc={thisPost.desc} index={i+1} key={Math.random()} url={thisPost.url} />)
        }
      }
    }

    let styles={
      root:{
        maxWidth:'60%',
        padding:'3em 0',
        margin:'0 auto',
      },
      circle:{
        textAlign:'center',
        margin:'10em auto'
      }
    }
    return(
      <div style={styles.root}>
        {this.state.wait ?
          <div style={styles.circle}>
            <MuiThemeProvider>
              <CircularProgress  size={60} thickness={7}/>
            </MuiThemeProvider>
          </div> :
          ''
        }
        {blogCards}
      </div>
    )
  }
}

export default BlogsList;
