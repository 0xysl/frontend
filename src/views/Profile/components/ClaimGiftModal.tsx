import React, { useCallback, useEffect, useState } from 'react'
import { Modal, Text, InjectedModalProps, Button, AutoRenewIcon } from 'uikit'
import { AbiItem } from 'web3-utils'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import claimRefundAbi from 'config/abi/claimRefund.json'
import { getClaimRefundAddress } from 'utils/addressHelpers'
import { getContract } from 'utils/web3'
import { useToast } from 'state/hooks'
import useContract from 'hooks/useContract'

interface ClaimGiftProps extends InjectedModalProps {
  onSuccess: () => void
}

const claimRefundAddress = getClaimRefundAddress()

export const useCanClaim = () => {
  const [canClaim, setCanClaim] = useState(false)
  const [refresh, setRefresh] = useState(1)
  const { account } = useWallet()

  const checkClaimStatus = useCallback(() => {
    setRefresh((prevRefresh) => prevRefresh + 1)
  }, [setRefresh])

  useEffect(() => {
    const fetchClaimStatus = async () => {
      const claimRefundContract = getContract(claimRefundAbi, claimRefundAddress)
      const walletCanClaim = await claimRefundContract.methods.canClaim(account).call()
      setCanClaim(walletCanClaim)
    }

    if (account) {
      fetchClaimStatus()
    }
  }, [account, refresh, setCanClaim])

  return { canClaim, checkClaimStatus }
}

const useClaimRefundContract = () => {
  const abi = (claimRefundAbi as unknown) as AbiItem
  return useContract(abi, claimRefundAddress)
}

const ClaimGift: React.FC<ClaimGiftProps> = ({ onSuccess, onDismiss }) => {
  const [isConfirming, setIsConfirming] = useState(false)
  const { account } = useWallet()

  const { canClaim } = useCanClaim()
  const claimRefundContract = useClaimRefundContract()
  const { toastSuccess, toastError } = useToast()

  const handleClick = () => {
    claimRefundContract.methods
      .getCakeBack()
      .send({ from: account })
      .on('sending', () => {
        setIsConfirming(true)
      })
      .on('receipt', () => {
        toastSuccess('Success!')
        onSuccess()
        onDismiss()
      })
      .on('error', (error) => {
        setIsConfirming(false)
        toastError('Error', error?.message)
      })
  }

  return (
    <Modal title={'Claim your Gift!'} onDismiss={onDismiss}>
      <div style={{ maxWidth: '640px' }}>
        <Text as="p">{'Thank you for being a day-one user of Pancake Profiles!'}</Text>
        <Text as="p" mb="8px">
          {
            "If you haven't already noticed, we made a mistake and the starter bunny you chose got mixed up and changed into another bunny. Oops!"
          }
        </Text>
        <Text as="p">{"To make it up to you, we'll refund you the full 4 CAKE it cost to make your bunny."}</Text>
        <Text as="p" mb="8px">
          {"We're also preparing an all-new collectible for you to claim (for free!) in the near future."}
        </Text>
        <Text as="p" mb="24px">
          {
            'Once you claim the refund, you can make another account with another wallet, mint a new bunny, and send it to your main account via the NFT page.'
          }
        </Text>
        <Button
          endIcon={isConfirming ? <AutoRenewIcon spin color="currentColor" /> : null}
          isLoading={isConfirming}
          onClick={handleClick}
          disabled={!canClaim}
        >
          {'Claim Your CAKE'}
        </Button>
      </div>
    </Modal>
  )
}

export default ClaimGift
