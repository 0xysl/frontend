import React from 'react'
import { Text, TextProps } from 'uikit'

import { TranslatableText as AchievementTitleType } from 'state/types'

interface AchievementTitleProps extends TextProps {
  title: AchievementTitleType
}

const AchievementTitle: React.FC<AchievementTitleProps> = ({ title, ...props }) => {
  if (typeof title === 'string') {
    return (
      <Text bold {...props}>
        {title}
      </Text>
    )
  }

  const { id, fallback, data = {} } = title

  return (
    <Text bold {...props}>
      {data}
    </Text>
  )
}

export default AchievementTitle
