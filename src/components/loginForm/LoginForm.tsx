import React, { FC, ReactElement } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Button, Typography, Image, Divider, Space, message } from 'antd'
import { Web3Provider } from '@ethersproject/providers'
import { injected } from '../../config/Web3React/connectors'

interface Props {

}

const LoginForm: FC<Props> = (props: Props) => {

  const { activate, library, error, account, deactivate } = useWeb3React<Web3Provider>()

  React.useEffect(() => {
    if (error) {
      message.warning('Обработка запроса, если в течение 15 сек нету ответа, то перезагрузите страницу и попробуйте еще раз.');
    }
  }, [error])

  return (
    <>
      <h2>Авторизация <Image
        src='https://docs.metamask.io/metamask-fox.svg'
        preview={false}
        width={16} />
      </h2>
      <Divider />
      <p>Для работы с веб-приложением необходимо подключить и авторизоваться в кошельке {' '}
        <a href='https://metamask.io/' target='_blank' rel="noreferrer">MetaMask</a>
      </p>
      <Space direction={'vertical'}>
        <Button type="primary" htmlType="button" onClick={() => {
          activate(injected)
        }}>
          Войти
        </Button>
      </Space>

    </>

  )
}

export default LoginForm
