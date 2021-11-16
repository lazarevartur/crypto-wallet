import React, { FC, ReactElement } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Button, Card, Layout, Row, Image, Divider } from 'antd'
import { Web3Provider } from '@ethersproject/providers'
import { injected } from '../../config/Web3React/connectors'
import MainLayout from '../layout/mainLayout'

interface Props {

}

const LoginForm: FC<Props> = (props: Props) => {

  const { activate, library } = useWeb3React<Web3Provider>()

  const title = <>Авторизация <Image
    src='https://docs.metamask.io/metamask-fox.svg'
    preview={false}
    width={16}
  /></>
  return (
    <>
      <h2>{title}</h2>
      <Divider />
      <p>Для работы с веб-приложением необходимо подключить и авторизоваться в кошельке {' '}
        <a href='https://metamask.io/' target='_blank' rel="noreferrer">MetaMask</a>
      </p>
      <Button type="primary" htmlType="button" onClick={() => {
        activate(injected)
      }}>
        Войти
      </Button>
    </>

  )
}

export default LoginForm
