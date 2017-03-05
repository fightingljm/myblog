import React from 'react';

class Post extends React.Component {
  constructor() {
    super();
    this.state={

    }
  }
  render(){
    return(
      <div>
        {this.props.params.title}
      </div>
    )
  }
}

export default Post;
