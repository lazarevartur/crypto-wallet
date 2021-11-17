import { useWeb3React } from '@web3-react/core'
import { Button, Descriptions, Space, Spin } from 'antd'
import { formatEther } from '@ethersproject/units'
import React, { FC } from 'react'
import { Web3Provider } from '@ethersproject/providers'
import SmartContractForm from '../smartContractForm/SmartContractForm'
import { useTranslation } from 'react-i18next'


interface Props {

}

const UserAccount: FC = (props: Props) => {
  const { account, deactivate, library, } = useWeb3React<Web3Provider>()
  const { t } = useTranslation();

  const [balance, setBalance] = React.useState<string>("0")
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [connectSmartContract, setConnectSmartContract] = React.useState<boolean>(false)
  const [refreshBalance, setRefreshBalans] = React.useState<boolean>(false)

  const getBalance = async () => {
    if (!!account && !!library) {
      try {
        setIsLoading(true)
        const balance: any = await library.getBalance(account)
        const formattedBalance = formatEther(balance.toString()).substring(0, 6)
        setBalance(formattedBalance)
      } catch (error) {
        setBalance('0')
      }
      setIsLoading(false)
    }
  }

  const handlerRefreshBalance = (bool: boolean) => {
    setRefreshBalans(bool)
  }

  React.useEffect(() => {
    if (refreshBalance) {
      getBalance()
      setRefreshBalans(false)
    }
  }, [refreshBalance])


  React.useEffect(() => {

    getBalance()
    return () => {
      setBalance('0')
      setIsLoading(false)
    }

  }, [account, library])

  return (
    <Space direction="vertical">
      <Descriptions title={t('UserAccount.userInfo')} bordered column={1}>
        <Descriptions.Item label={t('UserAccount.address')}>
          {account && `${account.substring(0, 6)}...${account.substring(account.length - 4)}`}
        </Descriptions.Item>
        <Descriptions.Item label={t('UserAccount.balance')}>{balance && !isLoading ? `${balance} eth` : <Spin />}</Descriptions.Item>
      </Descriptions>
      {
        connectSmartContract ? <SmartContractForm account={account} formCompleted={handlerRefreshBalance} />
          : <Button type="primary" htmlType="button" onClick={() => {
            setConnectSmartContract(true)
          }}>
            {t('UserAccount.connectContract')}
          </Button>}
      <Button type="primary" htmlType="button" onClick={() => {
        deactivate()
      }}>
        {t('UserAccount.logout')}
      </Button>
    </Space>

  )
}

export default UserAccount
