// File: src/components/PlayerTrendChart.tsx

import React from 'react'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts'
import { PlayerStat } from '../hooks/usePlayerStats'

interface Props {
  stats: PlayerStat[]
}

export default function PlayerTrendChart({ stats }: Props) {
  return (
    <div className="overflow-x-auto">
      <LineChart
        width={800}
        height={300}
        data={stats}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="season" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="ba" name="BA" stroke="#8884d8" isAnimationActive={false} />
        <Line type="monotone" dataKey="obp" name="OBP" stroke="#82ca9d" isAnimationActive={false} />
        <Line type="monotone" dataKey="slg" name="SLG" stroke="#ffc658" isAnimationActive={false} />
        <Line type="monotone" dataKey="ops" name="OPS" stroke="#ff7300" isAnimationActive={false} />
      </LineChart>
    </div>
  )
}
