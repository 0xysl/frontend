import React from 'react'
import { SvgProps } from '../../../components/Svg/types'
import logo from '../../../../assets/images/logo.svg'
import styled from 'styled-components'

interface LogoProps extends SvgProps {
  isDark: boolean
}

const MenuLogo = styled.div`
  width: 4rem;
  height: 2rem;
  display: flex;
  align-items: center;
`

const Logo: React.FC<LogoProps> = ({ isDark }) => {
  return (
    <MenuLogo>
      <img src={logo} alt="" />
    </MenuLogo>
  )
}

export default Logo
