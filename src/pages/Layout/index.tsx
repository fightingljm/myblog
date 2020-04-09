import React, { Component } from 'react'
import { Layout, Input } from 'antd'
import Header from '../Header/index'
import Menu from '../Menu/index'
import Breadcrumb from '../Breadcrumb/index'
import ContentCom from '../Content/index'
import './index.css'
import {
    HeaderPropsType
    // BlogPropsType
} from '../PropsType'
import request from '../../utils/request'
import { withRouter, RouteComponentProps } from 'react-router-dom'

const { Content, Footer, Sider } = Layout
const { Search } = Input

interface LayoutProps extends RouteComponentProps {
    pathData: Array<HeaderPropsType>
}

interface LayoutState {
    data: any
    // data: {
    //     <string>: Array<BlogPropsType>
    // }
}

class LayoutCom extends Component<LayoutProps, LayoutState>{
    state = {
        data: {}
    }
    async componentDidMount() {
        try {
            const { data } = await request.get('blogs')
            this.setState({
                data
            })
        } catch (err) {
            console.log('@@@-Menu-err', err)
        }
    }
    render() {
        const { data } = this.state
        const { pathData } = this.props
        return (
            <Layout>
                <Header pathData={pathData}/>
                <Content style={{ padding: '0 50px' }}>
                    <div className="top">
                        <Breadcrumb />
                        <Search
                            placeholder="搜索"
                            onSearch={value => console.log(value)}
                            style={{ width: 200 }}
                        />
                    </div>
                    <Layout className="site-layout-background">
                        <Sider className="site-layout-background" width={300}>
                            <Menu blogs={data}/>
                        </Sider>
                        <ContentCom blogs={data}/>
                    </Layout>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>
        )
    }
}

export default withRouter(LayoutCom)