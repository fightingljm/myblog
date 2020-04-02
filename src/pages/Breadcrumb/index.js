import React, { Component } from 'react'
import { Breadcrumb } from 'antd'
import { withRouter, Link } from 'react-router-dom'

class BreadcrumbCom extends Component {
    render() {
        const { location } = this.props
        const breadList = location.pathname.split("/")
        return (
            <Breadcrumb>
                {
                    breadList.map((item, index) => item ? (
                        <Breadcrumb.Item>
                            <Link to={breadList.slice(0, index+1).join("/")}>
                                {
                                    item
                                }
                            </Link>
                        </Breadcrumb.Item>
                    ) : null)
                }
            </Breadcrumb>
        )
    }
}

export default withRouter(BreadcrumbCom)
