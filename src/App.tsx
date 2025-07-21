// File: src/App.tsx

import React, { useState } from 'react'
import usePlayerStats, { PlayerData } from './hooks/usePlayerStats'
import Loader from './components/Loader'
import PlayerSearch from './components/PlayerSearch'
import PlayerTable from './components/PlayerTable'
import PlayerTrendChart from './components/PlayerTrendChart'

export default function App() {
  const [playerIds, setPlayerIds] = useState<number[]>([])
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null)
  const { data, loading, error } = usePlayerStats(playerIds)

  const handleAdd = (id: number) => {
    if (!playerIds.includes(id)) {
      setPlayerIds(prev => [...prev, id])
    }
  }

  if (loading) return <Loader />
  if (error)   return <div className="text-red-500">Error: {error.message}</div>

  const selectedStats = data.find(p => p.player.id === selectedPlayer)?.stats

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Season Performance Dashboard</h1>
      <PlayerSearch onSelect={handleAdd} />
      {data.length > 0 && (
        <>
          <PlayerTable data={data} onSelectPlayer={setSelectedPlayer} />
          {selectedStats && <PlayerTrendChart stats={selectedStats} />}
        </>
      )}
    </div>
  )
}
