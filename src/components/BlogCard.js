import React from 'react';

class BlogCard extends React.Component {
  handlePush(){
    let address = `post/${this.props.url}`;
    this.context.router.push(address);
  }
  render () {
    let styles={
      root:{
        width:'100%',
        height:'5em',
        margin:'2em',
        display:'flex'
      },
      left:{
        flexShrink:'0',
        width:'14%',
        color:'#fff',
        backgroundColor:'#00BCD4',
        lineHeight:'3.5em',
        textAlign:'center',
        fontSize:'24px',
        fontWeight:'600',
        fontFamily:'arial',
        fontStyle: 'italic'
      },
      right:{
        width:'80%',
        paddingLeft:'20px',
        color:'#777'
      },
      p1:{
        fontSize:'15px',
        color:'#888',
      },
      p2:{
        fontSize:'13px',
        color:'#ccc',
        float:'right'
      }
    }
    return(
        <div style={styles.root} className="blog-card" onClick={this.handlePush.bind(this)}>
          <div style={styles.left}>{this.props.index}</div>
          <div style={styles.right}>
            <h3>{this.props.title}</h3>
            <p style={styles.p1}>{this.props.desc}</p>
            <p style={styles.p2}>{this.props.date}</p>
          </div>
        </div>
    )
  }
}

BlogCard.defaultProps = {
  index: 1,
  title:'这里是标题',
  date:'2016.7.24',
  url:''
};

BlogCard.propTypes = {
  index: React.PropTypes.number.isRequired,
  title: React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
};
BlogCard.contextTypes = {
  router: React.PropTypes.object.isRequired
}
export default BlogCard;
