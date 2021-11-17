import { Card, Layout, Row } from 'antd';
import React, { FC, memo } from 'react';
import styles from './mainLayout.module.css';

interface Props { }

const MainLayout: FC<Props> = (props) => {

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

export default memo(MainLayout)
