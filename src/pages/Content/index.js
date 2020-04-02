import React, { Component } from 'react'
import { Layout } from 'antd'
import request from '../../utils/request'
import marked from 'marked'
import hljs from 'highlight.js'
import './index.css'

const { Content } = Layout

marked.setOptions({
    highlight: function (code) {
        return require('highlight.js').highlightAuto(code).value
    }
})

export default class ContentCom extends Component {
    state = {
        data: ''
    }
    async componentDidMount() {
        try {
            const { data } = await request.get('prototype', {
                markdown: true
            })
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
            <Content style={{ minHeight: 280 }}>
                <div dangerouslySetInnerHTML={{ __html: marked(data) }} className='post-content'></div>
            </Content>
        )
    }
}