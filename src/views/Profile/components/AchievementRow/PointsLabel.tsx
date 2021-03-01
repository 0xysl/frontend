import React from 'react'
import { Flex, FlexProps, PrizeIcon, Text } from 'uikit'

interface PointsLabelProps extends FlexProps {
  points: number
}

const PointsLabel: React.FC<PointsLabelProps> = ({ points, ...props }) => {
  const localePoints = points.toLocaleString()

  return (
    <Flex alignItems="center" {...props}>
      <PrizeIcon mr="4px" color="textSubtle" />
      <Text color="textSubtle">{`${localePoints} points`}</Text>
    </Flex>
  )
}

export default PointsLabel
