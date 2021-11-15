import { Card, Col, Row } from 'antd'
import React, { ReactElement } from 'react'

interface Props {

}

function LoginForm(props: Props): ReactElement {
    return (
        <div className="site-card-wrapper">
            <Row gutter={16}>
                <Col span={8}>
                    <Card title="Card title" bordered={false}>
                        Card content
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Card title" bordered={false}>
                        Card content
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Card title" bordered={false}>
                        Card content
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default LoginForm
