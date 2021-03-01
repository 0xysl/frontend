import React from 'react'
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import { ModalProvider } from 'uikit'
import ThemeContextProvider from 'contexts/ThemeContext'
import getLibrary from 'utils/getLibrary'
import { NetworkContextName } from '../../constants/index'

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

const Providers: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <ThemeContextProvider>
          <ModalProvider>{children}</ModalProvider>
        </ThemeContextProvider>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  )
}

export default Providers
