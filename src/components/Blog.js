import React from 'react';
import axios from 'axios'

class Blog extends React.Component {
  componentDidMount(){
    axios.get('https://raw.githubusercontent.com/newming/demodata/master/duopingshidai.json')
      .then(res => console.log(res))
  }
  render(){
    return(
      <div>
        Blog
      </div>
    )
  }
}

export default Blog;
