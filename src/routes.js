import React from 'react';
import { Router,Route,browserHistory,IndexRoute } from 'react-router';

import App from './App.js'
import Home from './components/Home.js'
import Blog from './components/Blog.js'
import Work from './components/Work.js'
import About from './components/About.js'
import Post from './components/Post.js'

export default function () {
  return(
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Home}/>
        <Route path='blog' component={Blog}/>
        <Route path='work' component={Work}/>
        <Route path='about' component={About}/>
        <Route path='post/:title' component={Post}/>
      </Route>
    </Router>
  )
}
