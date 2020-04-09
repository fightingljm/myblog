import React, { Component } from 'react'
import { Menu } from 'antd'
import { withRouter, RouteComponentProps, Link } from 'react-router-dom'
import { BlogPropsType } from '../PropsType'

// const { SubMenu } = Menu

interface MenuProps extends RouteComponentProps {
    blogs: any
}

class MenuCom extends Component<MenuProps, any> {
    render() {
        const { blogs, location } = this.props
        const locationList = location.pathname.split("/").filter((item) => item)
        const parentName: string = locationList[0]
        const data: Array<BlogPropsType> = blogs[parentName]
        if (!(data && data.length)) {
            return null
        }
        const defaultSelectedKey = data.findIndex((item) => item.url === locationList[1])
        return (
            <Menu
                mode="inline"
                style={{ height: '100%' }}
                defaultSelectedKeys={[String(defaultSelectedKey)]}
            >
                {
                    data.map((item, index) => (
                        <Menu.Item key={index}>
                            <Link to={`/${parentName}/${item.url}`}>
                                {
                                    item.title
                                }
                            </Link>
                        </Menu.Item>
                    ))
                }
            </Menu>
        )
    }
}

export default withRouter(MenuCom)
