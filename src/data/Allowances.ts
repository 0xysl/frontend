import { Token, TokenAmount } from '@pancakeswap-libs/sdk'
import { useTokenContract } from 'hooks/useContractAMM'
import { useMemo } from 'react'

import { useSingleCallResult } from '../state/multicall/hooks'

export function useTokenAllowance(token?: Token, owner?: string, spender?: string): TokenAmount | undefined {
  const contract = useTokenContract(token?.address, false)

  const inputs = useMemo(() => [owner, spender], [owner, spender])
  const allowance = useSingleCallResult(contract, 'allowance', inputs).result

  return useMemo(() => (token && allowance ? new TokenAmount(token, allowance.toString()) : undefined), [
    token,
    allowance,
  ])
}

export default useTokenAllowance
