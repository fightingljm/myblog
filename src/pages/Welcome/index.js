import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { GithubOutlined } from '@ant-design/icons'
import './index.css'
// import PropTypes from "prop-types"

const Home = ({ pathData }) => {
    return (
        <div className='home'>
            <div className='home-cover'>
                <h1>I'M Jinmeng Liu</h1>
                <p>FrontEnd Web Developer</p>
                {
                    pathData && pathData.length ? (
                        <Link to={`/${pathData[0].url}`}>
                            <Button
                                type="primary"
                                icon={<GithubOutlined />}
                            >
                                My GitHub
                            </Button>
                        </Link>
                    ) : null
                }
            </div>
        </div>
    )
}

// Home.Prototypes = {
//     pathData: PropTypes.array.isRequired
// }

export default Home
