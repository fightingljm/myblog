import React, { Component } from 'react'
import { Breadcrumb } from 'antd'
import { withRouter, Link, RouteComponentProps } from 'react-router-dom'

interface BreadcrumbProps extends RouteComponentProps {
    
}

class BreadcrumbCom extends Component<BreadcrumbProps, any> {
    render() {
        const { location } = this.props
        const breadList = location.pathname.split("/").filter((item) => item)
        return (
            <Breadcrumb>
                {
                    breadList.map((item, index) => (
                        <Breadcrumb.Item key={index}>
                            <Link to={breadList.slice(0, index+1).join("/")}>
                                {
                                    item
                                }
                            </Link>
                        </Breadcrumb.Item>
                    ))
                }
            </Breadcrumb>
        )
    }
}

export default withRouter(BreadcrumbCom)
