import React from 'react'
import { ThemeProvider as SCThemeProvider } from 'styled-components'
import theme from '../style/theme'

const ThemeContextProvider = ({ children }) => {
  return (
    <>
      <SCThemeProvider theme={theme}>{children}</SCThemeProvider>
    </>
  )
}

export default ThemeContextProvider
