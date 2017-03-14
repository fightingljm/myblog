// import React from 'react';
// import axios from 'axios';
// import { Link } from 'react-router'
//
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import LinearProgress from 'material-ui/LinearProgress';
//
// import SearchBtn from 'material-ui/svg-icons/action/search';
// import TextField from 'material-ui/TextField';
//
//
// class Blog extends React.Component {
//   constructor() {
//     super();
//     this.state={
//       data:[]
//     }
//   }
//   handelInput(e){
//     let x = e.target.value;
//     this.props.handelSearch(x);
//   }
//   componentDidMount(){
//     axios.get('https://raw.githubusercontent.com/fightingljm/myblog/master/blogs/blogs.json')
//       .then(res => this.setState({data:res.data}))
//   }
//   render(){
//     let styles={
//       root:{
//         padding:'50px 10px',
//         boxShadow: 'rgba(0, 0, 0, 0.15) 0px 1px 6px, rgba(0, 0, 0, 0.15) 0px 1px 4px'
//       },
//       title:{
//         color:'#fff',
//         fontSize:'48px',
//         fontWeight:'400',
//         textAlign:'center'
//       },
//       span:{
//         backgroundColor:'#000',
//         position:'relative'
//       },
//       searchBtn:{
//         color:'#fff',
//         position:'absolute',
//         bottom:'-5px',
//         right:'10px'
//       },
//       search:{
//         marginTop:'20px',
//         textAlign:'center',
//       },
//       text:{
//         width:'60%',
//         maxWidth:'400px',
//         fontSize:'20px'
//       },
//       underlineStyle:{
//         borderColor:'#fff'
//       },
//       hintStyle:{
//         color:'rgba(255,255,255,0.8)',
//         fontSize:'20px'
//       },
//       inputStyle:{
//         color:'#fff'
//       }
//     }
//     return(
//       <div style={{width:'100%'}}>
//         <div style={styles.root}>
//           <h1 style={styles.title}>ALL</h1>
//           <div style={styles.search} className="clearfix">
//             <span style={styles.span}><SearchBtn style={styles.searchBtn}/></span>
//             <TextField
//               hintText="搜索"
//               underlineFocusStyle={styles.underlineStyle}
//               hintStyle={styles.hintStyle}
//               inputStyle={styles.inputStyle}
//               style={styles.text}
//               onChange={this.handelInput.bind(this)}/>
//           </div>
//         </div>
//         {
//           this.state.data.length===0 ?
//           <MuiThemeProvider>
//             <LinearProgress mode="indeterminate" />
//           </MuiThemeProvider> :
//           this.state.data.map((item,index) => (
//             <div key={index} className='blog-card'>
//               <div className='blog-index'>{index+1}</div>
//               <div className='blog-desc'>
//                 <h3>{item.title}</h3>
//                 <p>{item.desc}</p>
//                 <Link className='btn' to={`post/${item.url}`}>阅读更多</Link>
//                 <span>{item.date}</span>
//               </div>
//             </div>
//           ))
//         }
//       </div>
//     )
//   }
// }
//
// export default Blog;

import React from 'react';

import Search from './Search';
import BlogsList from './BlogsList';

class Blog extends React.Component {
  constructor(){
    super();
    this.state={
      search:''
    }
  }
  cardSearch(x){
    this.setState({search:x})
  }
  render () {
    let styles={
      root:{
        backgroundColor:'#00BCD4',
      },
    }
    return(
      <div style={{width:'100%'}}>
        <div style={styles.root}>
          <Search handelSearch={this.cardSearch.bind(this)} />
        </div>
        <BlogsList search={this.state.search} />
      </div>
    )
  }
}

export default Blog;
