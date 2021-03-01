import React from 'react'

export interface TranslatedTextProps {
  translationId: number
  children: string
}

const TranslatedText = ({ translationId, children }: TranslatedTextProps) => {
  return <>{children}</>
}

export default TranslatedText
