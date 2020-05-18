import React, { Component } from 'react'
import { Layout } from 'antd'
import Sider from '../Sider/index'
import Content from '../Content/index'
import './index.css'
import {
    pathDataType,
    blogDataType
} from '../PropsType'
import { withRouter, RouteComponentProps } from 'react-router-dom'

const { Footer } = Layout

interface LayoutProps extends RouteComponentProps {
    pathData: pathDataType,
    blogData: blogDataType
}

class LayoutCom extends Component<LayoutProps, any>{
    render() {
        const { pathData, blogData } = this.props
        return (
            <Layout>
                <Sider blogData={blogData} pathData={pathData} />
                <Layout>
                    <Content blogData={blogData} />
                    <Footer style={{ textAlign: 'center' }}>
                        liujinmeng Blog ©2017 Created by ljm
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}

export default withRouter(LayoutCom)