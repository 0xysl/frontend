import React, { useState } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { AutoRenewIcon, Button, Flex, InjectedModalProps, Text } from 'uikit'

import { useCake } from 'hooks/useContract'
import { useProfile, useToast } from 'state/hooks'
import { getPancakeProfileAddress } from 'utils/addressHelpers'
import { getFullDisplayBalance } from 'utils/formatBalance'
import useGetProfileCosts from '../../hooks/useGetProfileCosts'
import { UseEditProfileResponse } from './reducer'

interface ApproveCakePageProps extends InjectedModalProps {
  goToChange: UseEditProfileResponse['goToChange']
}

const ApproveCakePage: React.FC<ApproveCakePageProps> = ({ goToChange, onDismiss }) => {
  const [isApproving, setIsApproving] = useState(false)
  const { profile } = useProfile()

  const { account } = useWallet()
  const { numberCakeToUpdate, numberCakeToReactivate } = useGetProfileCosts()
  const cakeContract = useCake()
  const { toastError } = useToast()
  const cost = profile.isActive ? numberCakeToUpdate : numberCakeToReactivate

  const handleApprove = () => {
    cakeContract.methods
      .approve(getPancakeProfileAddress(), cost.times(2).toJSON())
      .send({ from: account })
      .on('sending', () => {
        setIsApproving(true)
      })
      .on('receipt', () => {
        goToChange()
      })
      .on('error', (error) => {
        toastError('Error', error?.message)
        setIsApproving(false)
      })
  }

  if (!profile) {
    return null
  }

  return (
    <Flex flexDirection="column">
      <Flex alignItems="center" justifyContent="space-between" mb="24px">
        <Text>{profile.isActive ? 'Cost to update:' : 'Cost to reactivate:'}</Text>
        <Text>{`${getFullDisplayBalance(cost)} CAKE`}</Text>
      </Flex>
      <Button
        disabled={isApproving}
        isLoading={isApproving}
        endIcon={isApproving ? <AutoRenewIcon spin color="currentColor" /> : null}
        fullWidth
        mb="8px"
        onClick={handleApprove}
      >
        {'Approve'}
      </Button>
      <Button variant="text" fullWidth onClick={onDismiss} disabled={isApproving}>
        {'Close Window'}
      </Button>
    </Flex>
  )
}

export default ApproveCakePage
