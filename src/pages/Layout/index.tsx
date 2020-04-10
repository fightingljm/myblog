import React, { Component } from 'react'
import { Layout, Input } from 'antd'
import Header from '../Header/index'
import Sider from '../Sider/index'
import Breadcrumb from '../Breadcrumb/index'
import ContentCom from '../Content/index'
import './index.css'
import {
    pathDataType,
    blogDataType
} from '../PropsType'
import { withRouter, RouteComponentProps } from 'react-router-dom'

const { Content, Footer } = Layout
const { Search } = Input

interface LayoutProps extends RouteComponentProps {
    pathData: pathDataType,
    blogData: blogDataType
}

class LayoutCom extends Component<LayoutProps, any>{
    render() {
        const { pathData, blogData } = this.props
        return (
            <Layout>
                <Header pathData={pathData}/>
                <Layout>
                    <Sider blogData={blogData} pathData={pathData}/>
                    <Layout>
                        <Content style={{ padding: '0 50px' }}>
                            <div className="top">
                                <Breadcrumb />
                                <Search
                                    placeholder="搜索"
                                    onSearch={value => console.log(value)}
                                    style={{ width: 200 }}
                                />
                            </div>
                            <ContentCom blogData={blogData}/>
                        </Content>
                    </Layout>
                </Layout>
                <Footer style={{ textAlign: 'center' }}>
                    liujinmeng Blog ©2017 Created by ljm
                </Footer>
            </Layout>
        )
    }
}

export default withRouter(LayoutCom)