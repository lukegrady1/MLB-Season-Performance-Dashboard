import React, { useState } from 'react';
import usePlayerStats, { PlayerData } from './hooks/usePlayerStats';
import Loader from './components/Loader';
import PlayerTable from './components/PlayerTable';
import PlayerTrendChart from './components/PlayerTrendChart';

// Example MLB player IDs; replace with your own list or controls
const PLAYER_IDS = [660271, 545361];

export default function App() {
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
  const { data, loading, error } = usePlayerStats(PLAYER_IDS);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  const selectedStats = data.find((p) => p.player.id === selectedPlayer)?.stats;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Season Performance Dashboard</h1>
      <PlayerTable data={data} onSelectPlayer={setSelectedPlayer} />
      {selectedStats && (
        <PlayerTrendChart stats={selectedStats} />
      )}
    </div>
  );
}