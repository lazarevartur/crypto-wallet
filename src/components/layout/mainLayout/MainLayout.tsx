import React, { FC, ReactNode } from 'react'
import { Card, Layout, Row } from 'antd'
import styles from './mainLayout.module.css'

const MainLayout: FC = (props) => {
  return (
    <Layout>
      <Layout.Content>
        <Row justify='center' align={"middle"} className={styles.d_center} >
          <div className={styles.site_card_border_less_wrapper}>
            <Card bordered={false} style={{ width: 440 }}>
              {props.children}
            </Card>
          </div>
        </Row>
      </Layout.Content>
    </Layout>
  )
}

export default MainLayout
