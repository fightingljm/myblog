import React, { Component } from 'react'
import { Layout, Skeleton, Button, Tabs, Card, Col, Row } from 'antd'
import request from '../../utils/request'
import marked from 'marked'
import hljs from 'highlight.js'
import './index.css'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import {
    blogDataType
} from '../PropsType'
import { AppstoreAddOutlined } from '@ant-design/icons'

const { Content } = Layout
const { TabPane } = Tabs

marked.setOptions({
    highlight: function (code) {
        return require('highlight.js').highlightAuto(code).value
    }
})

interface ContentProps extends RouteComponentProps {
    blogData: blogDataType
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
            <Content className='content'>
                <div className="contentTop">
                    <p className="title">Tasks</p>
                    <Button
                        type="primary"
                        icon={<AppstoreAddOutlined />}
                        style={{
                            borderRadius: "3px"
                        }}
                    >
                        New group
                    </Button>
                </div>
                {/* <div>
                    <Card title="Card title" bordered={false} style={{ width: 300 }}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </div> */}
                <div className="site-card-wrapper">
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card title="Card title" bordered={false}>
                                Card content
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Card title" bordered={false}>
                                Card content
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Card title" bordered={false}>
                                Card content
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Card title" bordered={false}>
                                Card content
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Card title" bordered={false}>
                                Card content
                            </Card>
                        </Col>
                    </Row>
                </div>
                {/* {
                    !data ? (
                        <Skeleton active />
                    ) : (
                        <div
                            dangerouslySetInnerHTML={{ __html: marked(data) }}
                            className='post-content'
                        />
                    )
                } */}
            </Content>
        )
    }
}

export default withRouter(ContentCom)
