import React from 'react';

class BlogCard extends React.Component {
  handlePush(){
    let address = `/blog/${this.props.url}`;
    this.context.router.push(address);
  }
  render () {
    let styles={
      root:{
        width:'100%',
        height:'90px',
        marginBottom:'15px'
      },
      left:{
        float:'left',
        color:'#fff',
        backgroundColor:'#00BCD4',
        lineHeight:'90px',
        textAlign:'center',
        width:'12%',
        fontSize:'24px',
        fontWeight:'700'
      },
      right:{
        float:'left',
        paddingLeft:'20px',
        color:'#777'
      },
      h3:{
        lineHeight:'56px'
      },
      p:{
        opacity:'0.8'
      }
    }
    return(
        <div style={styles.root} className="card" onClick={this.handlePush.bind(this)}>
          <div style={styles.left}>{this.props.index}</div>
          <div style={styles.right}>
            <h3 style={styles.h3}>{this.props.title}</h3>
            <p style={styles.p}>{this.props.date}</p>
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
