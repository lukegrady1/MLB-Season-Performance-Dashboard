// src/hooks/usePlayerStats.ts
import { useState, useEffect } from 'react'
import { fetchPlayerStats, fetchPlayerInfo } from '../utils/api'

export interface PlayerStat { season: string; ba: number; obp: number; slg: number; ops: number }
export interface PlayerData { player: { id: number; name: string }; stats: PlayerStat[] }

export default function usePlayerStats(playerIds: number[]) {
  const [data,    setData]    = useState<PlayerData[]>([])
  const [loading,setLoading] = useState(false)
  const [error,  setError]   = useState<Error | null>(null)

  useEffect(() => {
    if (playerIds.length === 0) return
    setLoading(true); setError(null)
    Promise.all(
      playerIds.map(async id => {
        const [stats, name] = await Promise.all([
          fetchPlayerStats(id),
          fetchPlayerInfo(id),
        ])
        return { player: { id, name }, stats }
      })
    )
      .then(results => setData(results))
      .catch(e => setError(e as Error))
      .finally(() => setLoading(false))
  }, [playerIds])

  return { data, loading, error }
}
