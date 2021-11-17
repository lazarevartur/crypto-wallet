import { Descriptions } from 'antd';
import React, { FC, memo } from 'react'
import { IContractResponse } from '../../services/web3Service';


interface Props {
    contract: IContractResponse
}


const ContractInfo: FC<Props> = ({ contract }) => {
    const contractEntries = Object.entries(contract)

    return (
        <Descriptions column={1}>
            {contractEntries.map(([key, value]) => {
                if (typeof value === 'object') return null
                const isBoolean = typeof value === 'boolean'
                return <Descriptions.Item label={key} key={key}>{isBoolean ? isBoolean ? 'true' : 'false' : value}</Descriptions.Item>
            })}
        </Descriptions>
    )
}

export default memo(ContractInfo)



