import React, { useContext } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { usePriceCakeBusd, useProfile } from 'state/hooks'
import { Menu as UikitMenu } from '../../uikit/index'
import config from './config'

const Menu = (props) => {
  const { account, connect, reset } = useWallet()
  const cakePriceUsd = usePriceCakeBusd()
  const { profile } = useProfile()

  return (
    <UikitMenu
      account={account}
      login={connect}
      logout={reset}
      currentLang={'EN'}
      cakePriceUsd={cakePriceUsd.toNumber()}
      links={config}
      profile={{
        username: profile?.username,
        image: profile?.nft ? `/images/nfts/${profile.nft?.images.sm}` : undefined,
        profileLink: '/profile',
        noProfileLink: '/profile',
        showPip: !profile?.username,
      }}
      {...props}
    />
  )
}

export default Menu
