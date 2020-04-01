import React from 'react'
import axios from 'axios';

import { getJsonData } from './helpers.js';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import CircularProgress from 'material-ui/CircularProgress';

import BlogCard from './BlogCard.js';

const pinyin = require("js-pinyin")

class BlogsList extends React.Component {
	constructor() {
		super();
		this.state = {
			posts: [],
			wait: true
		}
	}
	componentDidMount() {
		getJsonData()
			.then((data) => {
				console.log(data)
				this.setState({
					posts: data.posts,
					wait: false
				})
			})
	}
	render() {
		console.log(this.props.search)
		var blogCards = [];
		if (this.props.search == '') {
			this.state.posts.map((item, index) => {
				blogCards.push(
					<BlogCard
						title={item.title}
						desc={item.desc}
						index={index + 1}
						key={Math.random()}
						url={item.url}
					/>
				)
			});
		} else {
			const inputString = this.props.search.toLowerCase()
			for (var i = 0; i < this.state.posts.length; i++) {
				let thisPost = this.state.posts[i];
				const title = thisPost.title
				const title_string = pinyin.getFullChars(title).toLowerCase()
				const desc = thisPost.desc
				const desc_string = pinyin.getFullChars(desc).toLowerCase()
				if (
					title.indexOf(inputString) !== -1
					|| title_string.indexOf(inputString) !== -1
					|| desc.indexOf(inputString) !== -1
					|| desc_string.indexOf(inputString) !== -1
				) {
					blogCards.push(
						<BlogCard
							title={thisPost.title}
							desc={thisPost.desc}
							index={i + 1}
							key={Math.random()}
							url={thisPost.url}
						/>
					)
				}
			}
		}

		// let styles = {
		// 	circle: {
		// 		textAlign: 'center',
		// 		margin: '10em auto'
		// 	}
		// }
		return (
			<div className='blogList-root'>
				{/* {
					this.state.wait
					? <div style={styles.circle}>
						<MuiThemeProvider>
							<CircularProgress size={60} thickness={7} />
						</MuiThemeProvider>
					</div> : ''
				} */}
				{
					blogCards
				}
			</div>
		)
	}
}

export default BlogsList;
