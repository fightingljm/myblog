import React, { Component } from "react"
import './App.css'
import {
    Route,
    Switch,
    withRouter
} from "react-router-dom"
import Welcome from "./pages/Welcome"
import Layout from "./pages/Layout/index"
import request from './utils/request'
import NoFoundPage from './pages/404'

class App extends Component {
    state = {
        pathData: [],
        blogData: []
    }
    async componentDidMount() {
        try {
            const { data: pathData } = await request.get('header')
            const { data: blogData } = await request.get('blogs')
            this.setState({
                pathData,
                blogData
            })
        } catch (err) {
            console.log('@@@-App-err', err)
        }
    }
    render() {
        const { pathData, blogData } = this.state
        return (
            <Switch>
                <Route exact path="/" >
                    <Welcome pathData={pathData} blogData={blogData}/>
                </Route>
                {
                    pathData.map((item, index) => (
                        <Route key={`/${item.url}`} path={`/${item.url}`}>
                            <Layout pathData={pathData} blogData={blogData}/>
                        </Route>
                    ))
                }
                <Route component={NoFoundPage} />
            </Switch>
        )
    }
}

export default withRouter(App)
