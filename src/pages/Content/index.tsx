import React, { Component } from 'react'
import { Layout } from 'antd'
import request from '../../utils/request'
import marked from 'marked'
import hljs from 'highlight.js'
import './index.css'
import { withRouter, RouteComponentProps } from 'react-router-dom'
// import {
//     HeaderPropsType
//     BlogPropsType
// } from '../PropsType'

const { Content } = Layout

marked.setOptions({
    highlight: function (code) {
        return require('highlight.js').highlightAuto(code).value
    }
})

interface ContentProps extends RouteComponentProps {
    blogs: any
}

interface ContentState {
    data: any
}

class ContentCom extends Component<ContentProps, ContentState> {
    state = {
        data: ''
    }
    async UNSAFE_componentWillReceiveProps(nextProps: ContentProps) {
        try {
            const { location } = nextProps
            const locationList = location.pathname.split("/").filter((item) => item)
            if (locationList && locationList.length===2) {
                const { data } = await request.get(`${locationList[0]}/${locationList[1]}`, {
                    markdown: true
                })
                this.setState({
                    data
                })
            }
        } catch (err) {
            console.log('@@@-Content-err', err)
        }
    }
    render() {
        const { data } = this.state
        return (
            <Content style={{ minHeight: 280 }}>
                <div dangerouslySetInnerHTML={{ __html: marked(data) }} className='post-content'></div>
            </Content>
        )
    }
}

export default withRouter(ContentCom)
