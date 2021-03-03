import styled, { ThemeContext } from 'styled-components'

interface StatBannerProps {
  color1: string
  color2: string
}

const StyledStatBanner = styled.div<StatBannerProps>`
  background: ${({ color1, color2 }) => `linear-gradient(45deg, ${color1},${color2})`};
  color: white;
  padding: 1em 1em 1em 0.5em;

  font-family: 'Montserrat', sans-serif;
  border-radius: 12px;
  display: flex;
  justify-items: space-between;
  min-width: 12vw;

  & img {
    width: 2em;
    margin-left: auto;
    opacity: 0.65;
  }

  & h3 {
    font-size: 1.7rem;
    font-weight: 500;
  }
`

const StyledText = styled.div``

const StatBanner = ({ title, subtitle, color1, color2, icon }) => {
  return (
    <StyledStatBanner color1={color1} color2={color2}>
      <StyledText>
        <h3>{title}</h3>
        <span>{subtitle}</span>
      </StyledText>
      <img src={icon} alt="" />
    </StyledStatBanner>
  )
}

export default StatBanner
