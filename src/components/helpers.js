import axios from 'axios';

// json数据的获取，?v=${Math.random()} 防止浏览器缓存
function getJsonData() {
	return axios.get(`https://raw.githubusercontent.com/fightingljm/myblog/master/blogs/blogs.json?v=${Math.random()}`)
		.then((res) => ({
			posts: res.data,
		}))
}

export {
	getJsonData
}
