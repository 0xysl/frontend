import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Text, LinkExternal, Link } from 'uikit'

export interface IfoCardDetailsProps {
  launchDate: string
  launchTime: string
  saleAmount: string
  raiseAmount: string
  cakeToBurn: string
  projectSiteUrl: string
  raisingAmount: BigNumber
  totalAmount: BigNumber
}

const StyledIfoCardDetails = styled.div`
  margin-bottom: 24px;
`

const Item = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary};
  display: flex;
`

const Display = styled(Text)`
  flex: 1;
`

const IfoCardDetails: React.FC<IfoCardDetailsProps> = ({
  launchDate,
  launchTime,
  saleAmount,
  raiseAmount,
  cakeToBurn,
  projectSiteUrl,
  raisingAmount,
  totalAmount,
}) => {
  return (
    <>
      <StyledIfoCardDetails>
        <Item>
          <Display>{'Launch Time'}</Display>
          <Text>
            {launchDate},
            <Link
              href="https://www.timeanddate.com/worldclock/singapore/singapore"
              target="blank"
              rel="noopener noreferrer"
              ml="4px"
              style={{ display: 'inline' }}
            >
              {launchTime}
            </Link>
          </Text>
        </Item>
        <Item>
          <Display>{'For Sale'}</Display>
          <Text>{saleAmount}</Text>
        </Item>
        <Item>
          <Display>{'To raise (USD)'}</Display>
          <Text>{raiseAmount}</Text>
        </Item>
        <Item>
          <Display>{'CAKE to burn (USD)'}</Display>
          <Text>{cakeToBurn}</Text>
        </Item>
        <Item>
          <Display>{'Total raised (% of target)'}</Display>
          <Text>{`${totalAmount.div(raisingAmount).times(100).toFixed(2)}%`}</Text>
        </Item>
      </StyledIfoCardDetails>
      <LinkExternal href={projectSiteUrl} style={{ margin: 'auto' }}>
        {'View project site'}
      </LinkExternal>
    </>
  )
}

export default IfoCardDetails
