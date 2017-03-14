import React from 'react';
import axios from 'axios';
import marked from 'marked';
import hljs from 'highlight.js';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';

marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
})

class Post extends React.Component {
  constructor() {
    super();
    this.state={
      data:''
    }
  }
  componentDidMount(){
    axios.get(`https://raw.githubusercontent.com/fightingljm/myblog/master/blogs/${this.props.params.title}.md`)
      .then(res => this.setState({data:res.data}))
  }
  render(){
    return(
      <div style={{width:'100%'}}>
        {/* {this.props.params.title} */}
        {
          this.state.data.length==0 ?
          <MuiThemeProvider>
            <CircularProgress size={60} thickness={7} />
          </MuiThemeProvider> :
          <div dangerouslySetInnerHTML={{__html:marked(this.state.data)}} className='post-content'></div>
        }
      </div>
    )
  }
}

export default Post;
