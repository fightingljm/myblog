import React, { Component } from 'react'
import { Menu } from 'antd'
import {
    LaptopOutlined,
    NotificationOutlined,
    UserOutlined
} from '@ant-design/icons'
import request from '../../utils/request'

const { SubMenu } = Menu

export default class MenuCom extends Component {
    state = {
        data: []
    }
    async componentDidMount() {
        try {
            const { data } = await request.get('blogs')
            this.setState({
                data
            })
        } catch (err) {
            console.log('@@@-err', err)
        }
    }
    render() {
        const { data } = this.state
        return (
            <Menu
                mode="inline"
                style={{ height: '100%' }}
            >
                {
                    data.map((item, index) => item.has_sub ? (
                        <SubMenu
                            key={index}
                            title={
                                <span>
                                    <LaptopOutlined />
                                    subnav 2
                                </span>
                            }
                        >
                            {
                                item.subList.map((sItem, sIndex) => (
                                    <Menu.Item key={sIndex}>
                                        {
                                            sItem.title
                                        }
                                    </Menu.Item>
                                ))
                            }
                        </SubMenu>
                    ) : (
                        <Menu.Item key={index}>
                            {
                                item.title
                            }
                        </Menu.Item>
                    ))
                }
            </Menu>
        )
    }
}
