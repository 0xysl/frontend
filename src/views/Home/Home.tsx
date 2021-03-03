import Page from 'components/layout/Page'
import StatBanner from 'components/StatBanner/StatBanner'
import React from 'react'
import styled from 'styled-components'
import CakeStats from 'views/Home/components/CakeStats'
import FarmStakingCard from 'views/Home/components/FarmStakingCard'
import LotteryCard from 'views/Home/components/LotteryCard'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'
import { BaseLayout, Heading, Text } from '../../uikit/index'
import ethereum from 'assets/images/stats/ethereum.svg'
import person from 'assets/images/stats/person.svg'
import wallet from 'assets/images/stats/wallet.svg'
import project from 'assets/images/stats/project.svg'

const Hero = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 16px;
  padding-top: 116px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    height: 165px;
    padding-top: 0;
  }
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

const CTACards = styled(BaseLayout)`
  align-items: start;

  & > div {
    grid-column: span 6;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 4;
    }
  }
`

const Stats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`

const Home: React.FC = () => {
  return (
    <Page>
      {/* <Hero>
        <Heading as="h1" size="xl" color="secondary">
          Kytazo finance
        </Heading>
        <Text color="contrast">Invest in the next generation of BSC projects</Text>
      </Hero> */}

      <div>
        <Stats>
          <StatBanner
            title={'90 ETH'}
            subtitle={'Raised in total'}
            color1={'#13547a'}
            color2={'#80d0c7'}
            icon={ethereum}
          />
          <StatBanner title={'12'} subtitle={'Total campaings'} color1={'#6f86d6'} color2={'#48c6ef'} icon={project} />
          <StatBanner
            title={'3204'}
            subtitle={'People Participated'}
            color1={'#243949'}
            color2={'#517fa4'}
            icon={person}
          />
          <StatBanner
            title={'109'}
            subtitle={'Projects inspected'}
            color1={'#764ba2'}
            color2={'#667eea'}
            icon={wallet}
          />
        </Stats>
      </div>

      <div>
        <Cards>
          <FarmStakingCard />
          <LotteryCard />
        </Cards>
        <Cards>
          <CakeStats />
          <TotalValueLockedCard />
        </Cards>
      </div>
    </Page>
  )
}

export default Home
