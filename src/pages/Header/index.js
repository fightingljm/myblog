import React, { Component } from 'react'
import { Layout, Menu } from 'antd'
import request from '../../utils/request'
import { Link, withRouter } from 'react-router-dom'

const { Header } = Layout

class HeaderCom extends Component {
    render() {
        const { pathData, match } = this.props
        const defaultSelectedKey = pathData.findIndex((item) => item.url === match.path.substring(1))
        return (
            <Header className="header">
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[String(defaultSelectedKey)]}
                >
                    {
                        pathData.map((item, index) => (
                            <Menu.Item key={index}>
                                <Link to={`/${item.url}`}>
                                    {
                                        item.title
                                    }
                                </Link>
                            </Menu.Item>
                        ))
                    }
                </Menu>
            </Header>
        )
    }
}

export default withRouter(HeaderCom)
