import React, { Component } from 'react'
import { Menu, Layout, Avatar, Tag } from 'antd'
import { withRouter, RouteComponentProps, Link } from 'react-router-dom'
import { pathDataType, BlogPropsType, blogDataType } from '../PropsType'
import './index.css'

const { Sider } = Layout

interface SiderProps extends RouteComponentProps {
    pathData: pathDataType,
    blogData: blogDataType,
}

class SiderCom extends Component<SiderProps, any> {
    render() {
        const { blogData, pathData, location } = this.props
        const locationList = location.pathname.split("/").filter((item) => item)
        return (
            <Sider className="sider" width={300}>
                <div className="menuTop">
                    <Avatar style={{ backgroundColor: "#60b330", verticalAlign: 'middle' }} size="large">
                        ljm
                    </Avatar>
                    <a href="https://github.com/fightingljm">fightingljm</a>
                    <div style={{ padding: "10px", display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <Tag color="magenta">magenta</Tag>
                        <Tag color="red">red</Tag>
                        <Tag color="volcano">volcano</Tag>
                        <Tag color="orange">orange</Tag>
                        <Tag style={{ marginTop: '10px' }} color="green">green</Tag>
                        <Tag style={{ marginTop: '10px' }} color="blue">blue</Tag>
                        <Tag style={{ marginTop: '10px' }} color="geekblue">geekblue</Tag>
                        <Tag style={{ marginTop: '10px' }} color="purple">purple</Tag>
                    </div>
                </div>
                <Menu
                    mode="inline"
                    className="menu"
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
                                <Menu.Item key={pItem.url} className="menuItem">
                                    <Link to={`/${pItem.url}`}>
                                        {
                                            pItem.title
                                        }
                                    </Link>
                                </Menu.Item>
                            )
                        })
                    }
                </Menu>
            </Sider>
        )
    }
}

export default withRouter(SiderCom)
