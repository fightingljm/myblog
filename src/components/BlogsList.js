import React from 'react'
import map from 'lodash/fp/map';
import {getJsonData} from './helpers.js';
import axios from 'axios';
import CircularProgress from 'material-ui/CircularProgress';

import BlogCard from './BlogCard.js';
// import blogs from '../blogs/blogs.js';

class BlogsList extends React.Component {
  constructor(){
    super();
    this.state={
      posts: '',
      wait:true
    }
  }
  componentDidMount(){
    getJsonData()
      .then((data) => {
        // console.log(data)
        this.setState({
          posts:data.posts,
          wait:false
        })
      });
    // axios.get('https://raw.githubusercontent.com/fightingljm/myblog/master/blogs/blogs.json')
    //   .then(res => this.setState({posts:res.posts, wait:false}))
  }
  render () {
    // console.log(this.props.search)
    var blogCards = [];
    if (this.props.search=='') {
      map((b) => {blogCards.push(<BlogCard title={b.title} date={b.date} index={b.index} key={Math.random()} url={b.url}/>);},this.state.posts);
    }else {
      for (var i = 0; i < this.state.posts.length; i++) {
        let thisPost = this.state.posts[i];
        if (thisPost.title.indexOf(this.props.search)!= -1) {
          blogCards.push(<BlogCard title={thisPost.title} date={thisPost.date} index={thisPost.index} key={Math.random()} url={thisPost.url} />)
        }
      }
    }

    let styles={
      root:{
        maxWidth:'700px',
        padding:'30px 10px',
        margin:'0 auto',
      },
      circle:{
        textAlign:'center',
        margin:'30px auto'
      },
    }
    return(
      <div style={styles.root}>
        {this.state.wait ? <div style={styles.circle}><CircularProgress size={1.5} /></div> : ''}
        {blogCards}
      </div>
    )
  }
}

export default BlogsList;
