import { AbstractConnectorArguments, ConnectorUpdate } from '@web3-react/types'
import { AbstractConnector } from '@web3-react/abstract-connector'
import warning from 'tiny-warning'

import { SendReturnResult, SendReturn, Send, SendOld } from './types'

function parseSendReturn(sendReturn: SendReturnResult | SendReturn): any {
  // eslint-disable-next-line no-prototype-builtins
  return sendReturn.hasOwnProperty('result') ? sendReturn.result : sendReturn
}

export class NoBscProviderError extends Error {
  public constructor() {
    super()
    this.name = this.constructor.name
    this.message = 'No BSC provider was found on window.BinanceChain.'
  }
}

export class UserRejectedRequestError extends Error {
  public constructor() {
    super()
    this.name = this.constructor.name
    this.message = 'The user rejected the request.'
  }
}

export class BscConnector extends AbstractConnector {
  constructor(kwargs: AbstractConnectorArguments) {
    super(kwargs)

    this.handleNetworkChanged = this.handleNetworkChanged.bind(this)
    this.handleChainChanged = this.handleChainChanged.bind(this)
    this.handleAccountsChanged = this.handleAccountsChanged.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  private handleChainChanged(chainId: string | number): void {
    const wd: any = window
    this.emitUpdate({ chainId, provider: wd.BinanceChain })
  }

  private handleAccountsChanged(accounts: string[]): void {
    if (accounts.length === 0) {
      this.emitDeactivate()
    } else {
      this.emitUpdate({ account: accounts[0] })
    }
  }

  private handleClose(): void {
    this.emitDeactivate()
  }

  private handleNetworkChanged(networkId: string | number): void {
    const wd: any = window
    this.emitUpdate({ chainId: networkId, provider: wd.BinanceChain })
  }

  public async activate(): Promise<ConnectorUpdate> {
    const wd: any = window

    if (!wd.BinanceChain) {
      throw new NoBscProviderError()
    }

    if (wd.BinanceChain.on) {
      wd.BinanceChain.on('chainChanged', this.handleChainChanged)
      wd.BinanceChain.on('accountsChanged', this.handleAccountsChanged)
      wd.BinanceChain.on('close', this.handleClose)
      wd.BinanceChain.on('networkChanged', this.handleNetworkChanged)
    }

    if ((wd.BinanceChain as any).isMetaMask) {
      ;(wd.BinanceChain as any).autoRefreshOnNetworkChange = false
    }

    // try to activate + get account via eth_requestAccounts
    let account
    try {
      account = await (wd.BinanceChain.send as Send)('eth_requestAccounts').then(
        (sendReturn) => parseSendReturn(sendReturn)[0],
      )
    } catch (error) {
      if ((error as any).code === 4001) {
        throw new UserRejectedRequestError()
      }
      warning(false, 'eth_requestAccounts was unsuccessful, falling back to enable')
    }

    // if unsuccessful, try enable
    if (!account) {
      // if enable is successful but doesn't return accounts, fall back to getAccount (not happy i have to do this...)
      account = await wd.BinanceChain.enable().then((sendReturn) => sendReturn && parseSendReturn(sendReturn)[0])
    }

    return { provider: wd.BinanceChain, ...(account ? { account } : {}) }
  }

  public async getProvider(): Promise<any> {
    const wd: any = window
    return wd.BinanceChain
  }

  public async getChainId(): Promise<number | string> {
    const wd: any = window
    if (!wd.BinanceChain) {
      throw new NoBscProviderError()
    }

    let chainId
    try {
      chainId = await (wd.BinanceChain.send as Send)('eth_chainId').then(parseSendReturn)
    } catch {
      warning(false, 'eth_chainId was unsuccessful, falling back to net_version')
    }

    if (!chainId) {
      try {
        chainId = await (wd.BinanceChain.send as Send)('net_version').then(parseSendReturn)
      } catch {
        warning(false, 'net_version was unsuccessful, falling back to net version v2')
      }
    }

    if (!chainId) {
      try {
        chainId = parseSendReturn((wd.BinanceChain.send as SendOld)({ method: 'net_version' }))
      } catch {
        warning(false, 'net_version v2 was unsuccessful, falling back to manual matches and static properties')
      }
    }

    if (!chainId) {
      if ((wd.BinanceChain as any).isDapper) {
        chainId = parseSendReturn((wd.BinanceChain as any).cachedResults.net_version)
      } else {
        chainId =
          (wd.BinanceChain as any).chainId ||
          (wd.BinanceChain as any).netVersion ||
          (wd.BinanceChain as any).networkVersion ||
          (wd.BinanceChain as any)._chainId
      }
    }

    return chainId
  }

  public async getAccount(): Promise<null | string> {
    const wd: any = window
    if (!wd.BinanceChain) {
      throw new NoBscProviderError()
    }

    let account
    try {
      account = await (wd.BinanceChain.send as Send)('eth_accounts').then(
        (sendReturn) => parseSendReturn(sendReturn)[0],
      )
    } catch {
      warning(false, 'eth_accounts was unsuccessful, falling back to enable')
    }

    if (!account) {
      try {
        account = await wd.BinanceChain.enable().then((sendReturn) => parseSendReturn(sendReturn)[0])
      } catch {
        warning(false, 'enable was unsuccessful, falling back to eth_accounts v2')
      }
    }

    if (!account) {
      account = parseSendReturn((wd.BinanceChain.send as SendOld)({ method: 'eth_accounts' }))[0]
    }

    return account
  }

  public deactivate() {
    const wd: any = window
    if (wd.BinanceChain && wd.BinanceChain.removeListener) {
      wd.BinanceChain.removeListener('chainChanged', this.handleChainChanged)
      wd.BinanceChain.removeListener('accountsChanged', this.handleAccountsChanged)
      wd.BinanceChain.removeListener('close', this.handleClose)
      wd.BinanceChain.removeListener('networkChanged', this.handleNetworkChanged)
    }
  }

  public async isAuthorized(): Promise<boolean> {
    const wd: any = window
    if (!wd.BinanceChain) {
      return false
    }

    try {
      return await (wd.BinanceChain.send as Send)('eth_accounts').then((sendReturn) => {
        if (parseSendReturn(sendReturn).length > 0) {
          return true
        }
        return false
      })
    } catch {
      return false
    }
  }
}
