
import { Button, Result } from 'antd'
import React from 'react'
import { withRouter, RouteComponentProps, Link } from 'react-router-dom'

interface NoFoundPageProps extends RouteComponentProps{}

const NoFoundPage: React.FC<NoFoundPageProps> = () => (
    <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
            <Button
                type="primary"
            >
                <Link to="/">
                    Back Home
                </Link>
            </Button>
        }
    />
)

export default withRouter(NoFoundPage)