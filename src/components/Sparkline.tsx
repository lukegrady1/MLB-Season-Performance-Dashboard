// File: src/components/Sparkline.tsx

import React from 'react'
import { LineChart, Line } from 'recharts'
import { PlayerStat } from '../hooks/usePlayerStats'

interface SparklineProps {
  data: PlayerStat[]
  dataKey: keyof PlayerStat
}

export default function Sparkline({ data, dataKey }: SparklineProps) {
  return (
    <LineChart
      width={100}
      height={30}
      data={data}
      margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
    >
      <Line
        type="monotone"
        dataKey={dataKey as string}
        stroke="#8884d8"
        dot={false}
        strokeWidth={2}
        isAnimationActive={false}
      />
    </LineChart>
  )
}
