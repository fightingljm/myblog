import React, { Component } from 'react'
import { Layout, Menu } from 'antd'
import request from '../../utils/request'

const { Header } = Layout

export default class HeaderCom extends Component {
    state = {
        data: []
    }
    async componentDidMount() {
        try {
            const { data } = await request.get('header')
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
            <Header className="header">
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['0']}
                >
                    {
                        data.map((item, index) => (
                            <Menu.Item key={index}>
                                {
                                    item.title
                                }
                            </Menu.Item>
                        ))
                    }
                </Menu>
            </Header>
        )
    }
}
