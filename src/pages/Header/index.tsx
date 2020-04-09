import React, { Component } from 'react'
import { Layout, Menu } from 'antd'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import { HeaderPropsType } from '../PropsType'

const { Header } = Layout

interface HeaderProps extends RouteComponentProps {
    pathData: Array < HeaderPropsType >,
}

class HeaderCom extends Component<HeaderProps, any> {
    render() {
        const { pathData, location } = this.props
        const locationList = location.pathname.split("/").filter((item) => item)
        const defaultSelectedKey = pathData.findIndex((item) => item.url === locationList[0])
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
