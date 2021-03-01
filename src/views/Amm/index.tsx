import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { ResetCSS } from 'uikit'
import GlobalStyle from '../../style/Global'
import App from '../../pages-amm/App'
import ApplicationUpdater from '../../state/application/updater'
import ListsUpdater from '../../state/lists/updater'
import MulticallUpdater from '../../state/multicall/updater'
import TransactionUpdater from '../../state/transactions/updater'
import Providers from './Providers'

const AmmIndex = () => {
  if ('ethereum' in window) {
    const wd: any = window
    wd.ethereum.autoRefreshOnNetworkChange = false
  }

  window.addEventListener('error', () => {
    localStorage?.removeItem('redux_localstorage_simple_lists')
  })

  return (
    <StrictMode>
      <Providers>
        <>
          <ListsUpdater />
          <ApplicationUpdater />
          <TransactionUpdater />
          <MulticallUpdater />
        </>
        <ResetCSS />
        <GlobalStyle />
        <App />
      </Providers>
    </StrictMode>
  )
}

export default AmmIndex
