import { useState, useEffect } from 'react';
import { fetchPlayerStats } from '../utils/api';

export interface PlayerStat {
  season: string;
  ba: number;
  obp: number;
  slg: number;
  ops: number;
}

export interface PlayerData {
  player: { id: number; name: string };
  stats: PlayerStat[];
}

export default function usePlayerStats(playerIds: number[]) {
  const [data, setData] = useState<PlayerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const results = await Promise.all(
          playerIds.map(async (id) => {
            const stats = await fetchPlayerStats(id);
            return {
              player: { id, name: `Player ${id}` }, // replace with name fetch if desired
              stats,
            };
          })
        );
        setData(results);
      } catch (e: any) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [playerIds]);

  return { data, loading, error };
}