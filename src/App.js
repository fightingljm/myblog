import React, { Component } from "react"
import './App.css'
import {
    Route,
    Switch,
    withRouter
} from "react-router-dom"
import Welcome from "./pages/Welcome"
import Layout from "./pages/Layout"
import request from './utils/request'

class App extends Component {
    state = {
        data: []
    }
    async componentDidMount() {
        try {
            const { data } = await request.get('header')
            this.setState({
                data
            })
        } catch (err) {
            console.log('@@@-err', err)
        }
    }
    render() {
        const { data } = this.state
        return (
            <Switch>
                <Route exact path="/" >
                    <Welcome pathData={data}/>
                </Route>
                {
                    data.map((item, index) => (
                        <Route key={`/${item.url}`} path={`/${item.url}`}>
                            <Layout pathData={data} />
                        </Route>
                    ))
                }
            </Switch>
        )
    }
}

export default withRouter(App)