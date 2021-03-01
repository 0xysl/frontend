import React from 'react'
import { Card, CardBody, Heading } from 'uikit'
import HistoryChart from './HistoryChart'
import Legend from './Legend'

const PastDrawsHistoryCard: React.FC = () => {
  return (
    <Card>
      <CardBody>
        <Heading size="md">{'History'}</Heading>
        <Legend />
        <HistoryChart />
      </CardBody>
    </Card>
  )
}

export default PastDrawsHistoryCard
