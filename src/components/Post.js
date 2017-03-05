import React from 'react';
import axios from 'axios';
import marked from 'marked'

class Post extends React.Component {
  constructor() {
    super();
    this.state={
      data:''
    }
  }
  componentDidMount(){
    axios.get(`https://raw.githubusercontent.com/fightingljm/myblog/master/blogs/${this.props.params.title}`)
      .then(res => this.setState({data:res.data}))
  }
  render(){
    return(
      <div>
        {/* {this.props.params.title} */}
        {
          this.state.data.length==0 ? '正在加载中' :
          <div dangerouslySetInnerHTML={{__html:marked(this.state.data)}}></div>
        }
      </div>
    )
  }
}

export default Post;
