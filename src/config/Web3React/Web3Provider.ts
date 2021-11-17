import { Web3Provider } from '@ethersproject/providers'
import Web3 from 'web3'

export const getLibrary =  (provider: any): Web3Provider => {
    const library = new Web3Provider(provider)
    library.pollingInterval = 12000
    return library
  }
  
  export const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");