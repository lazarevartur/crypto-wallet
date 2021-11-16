import { useWeb3React } from '@web3-react/core'
import { Button, Descriptions, Space } from 'antd'
import { formatEther } from '@ethersproject/units'
import React, { FC } from 'react'

interface Props {

}

const UserAccount: FC = (props: Props) => {
  const { account, deactivate, library } = useWeb3React()

  const [balance, setBalance] = React.useState<number>(0)

  React.useEffect((): any => {
    if (!!account && !!library) {
      let stale = false

      library
        .getBalance(account)
        .then((balance: any) => {
          if (!stale) {
            setBalance(balance.toString())
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance(0)
          }
        })

      return () => {
        stale = true
        setBalance(0)
      }
    }
  }, [account, library])
  return (
    <Space direction="vertical">
      <Descriptions title="Информация о пользователи" bordered column={1}>
        <Descriptions.Item label="Адрес пользователя">
          {account && `${account.substring(0, 6)}...${account.substring(account.length - 4)}`}
        </Descriptions.Item>
        <Descriptions.Item label="Баланс">{formatEther(balance || 0)}</Descriptions.Item>
      </Descriptions>
      <Button type="primary" htmlType="button" onClick={() => {
        deactivate()
      }}>
        Выйти
      </Button>
    </Space>

  )
}

export default UserAccount
