import React, { Component } from 'react'
import { Menu, Layout } from 'antd'
import { withRouter, RouteComponentProps, Link } from 'react-router-dom'
import { pathDataType, BlogPropsType, blogDataType, BlogKeys } from '../PropsType'

const { SubMenu } = Menu
const { Sider } = Layout

interface SiderProps extends RouteComponentProps {
    pathData: pathDataType,
    blogData: blogDataType,
}

class SiderCom extends Component<SiderProps, any> {
    render() {
        const { blogData, pathData, location } = this.props
        const locationList = location.pathname.split("/").filter((item) => item)
        console.log('@@@-locationList', locationList);
        
        return (
            <Sider className="site-layout-background" width={300}>
                <Menu
                    mode="inline"
                    style={{ height: '100%' }}
                    defaultOpenKeys={[locationList[0]]}
                    defaultSelectedKeys={[locationList[1]]}
                >
                    {
                        pathData.map((pItem, index) => {
                            const data: Array<BlogPropsType> = blogData[pItem.url]
                            if (!(data && data.length)) {
                                return null
                            }
                            return (
                                <SubMenu
                                    key={pItem.url}
                                    title={pItem.title}
                                >
                                    {
                                        data.map((item, index) => (
                                            <Menu.Item key={item.url}>
                                                <Link to={`/${pItem.url}/${item.url}`}>
                                                    {
                                                        item.title
                                                    }
                                                </Link>
                                            </Menu.Item>
                                        ))
                                    }
                                </SubMenu>
                            )
                        })
                    }
                </Menu>
            </Sider>
        )
    }
}

export default withRouter(SiderCom)
