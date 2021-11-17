import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { Button, Divider, Image, message, Space } from 'antd'
import React, { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { injected } from '../../config/Web3React/connectors'

interface Props {

}

const LoginForm: FC<Props> = (props: Props) => {

  const { activate, library, error, account, deactivate } = useWeb3React<Web3Provider>()
  const { t } = useTranslation();

  React.useEffect(() => {
    if (error) {
      message.warning(t('LoginForm.warning'));
    }
  }, [error])

  return (
    <>
      <h2>{t('LoginForm.title')} <Image
        src='https://docs.metamask.io/metamask-fox.svg'
        preview={false}
        width={16} />
      </h2>
      <Divider />
      <p>{t('LoginForm.description')} {' '}
        <a href='https://metamask.io/' target='_blank' rel="noreferrer">MetaMask</a>
      </p>
      <Space direction={'vertical'}>
        <Button type="primary" htmlType="button" onClick={() => {
          activate(injected)
        }}>
          {t('LoginForm.login')}
        </Button>
      </Space>

    </>

  )
}

export default memo(LoginForm)
