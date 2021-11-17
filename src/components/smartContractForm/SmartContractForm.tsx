import { Button, Descriptions, Form, Input, Spin, Modal, message } from 'antd'
import { fromWei } from 'web3-utils'
import React, { FC, memo } from 'react'
import Web3ContractService, { IContractResponse, IError } from '../../services/web3Service'
import ContractInfo from './contractInfo'
import { useTranslation } from 'react-i18next'

interface Props {
    account: string | null | undefined,
    formCompleted: (a: boolean) => void
}

interface formComplete {
    tokens: string
}

const SmartContractForm: FC<Props> = ({ account, formCompleted }) => {
    const { t } = useTranslation();
    const [countTokens, setCountTokens] = React.useState<null | string>(null)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [contractInfo, setContractInfo] = React.useState<IContractResponse | null>(null)
    const [contractError, setContractError] = React.useState<IError | null>(null)

    React.useEffect(() => {
        if (contractInfo) {
            Modal.info({
                title: t('SmartContractForm.blockInfo'),
                content: <ContractInfo contract={contractInfo} />,
                onOk() { },
            });
        }
    }, [contractInfo])

    React.useEffect(() => {
        if (contractError) {
            console.error(contractError);
            message.error(contractError.message, 5)
        }
    }, [contractError])

    const getBalance = async () => {
        if (account) {
            const [balance, error] = await Web3ContractService.getBalance(account)
            if (!error) {
                setCountTokens(fromWei(balance))
            }
        }
    }
    const onFinish = async ({ tokens }: formComplete) => {
        if (account) {
            setIsLoading(true)
            const [contractInfo, error] = await Web3ContractService.mint(account, tokens)
            if (contractInfo) {
                setContractInfo(contractInfo)
                formCompleted(true)
                await getBalance()
            } else if (error) {
                console.log(error);
                setContractError(error)
            }
            setIsLoading(false)
        }
    }
    const onFinishFailed = (e: any) => {
        console.log('onFinishFailed', { e });
    }
    return (
        <Descriptions title={t('SmartContractForm.smartContract')} bordered column={1} size={'small'}>
            <Descriptions.Item label={t('SmartContractForm.countTokens')} >
                {countTokens ? `${countTokens} eth` : <Button type="primary" htmlType="button" onClick={getBalance}>
                    {t('SmartContractForm.checkTokens')}
                </Button>}

            </Descriptions.Item>
            <Descriptions.Item label={t('SmartContractForm.mintSumInput')}>
                {isLoading ? <Spin /> : <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        name="tokens"
                        rules={[{ required: true, message: t('SmartContractForm.ErrmintSumInput') }]}
                        style={{ width: 190 }}
                    >
                        <Input size={'large'} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Mint
                        </Button>
                    </Form.Item>
                </Form>
                }
            </Descriptions.Item>
        </Descriptions>
    )
}

export default memo(SmartContractForm)
