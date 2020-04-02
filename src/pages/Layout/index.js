import React from 'react'
import { Layout, Input } from 'antd'
import Header from '../Header'
import Menu from '../Menu'
import Breadcrumb from '../Breadcrumb'
import ContentCom from '../Content'
import './index.css'

const { Content, Footer, Sider } = Layout
const { Search } = Input

const LayoutCom = (props) => {
    return (
        <Layout>
            <Header {...props}/>
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
                        <Menu />
                    </Sider>
                    <ContentCom />
                </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2018 Created by Ant UED
            </Footer>
        </Layout>
    )
}

export default LayoutCom