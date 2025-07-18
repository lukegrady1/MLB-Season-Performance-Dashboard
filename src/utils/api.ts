export const API_BASE = process.env.REACT_APP_API_BASE_URL || 'https://statsapi.mlb.com';

export async function fetchPlayerStats(playerId: number) {
  const url = `${API_BASE}/api/v1/people/${playerId}/stats?stats=yearByYear&group=batting`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Network response was not ok');
  const json = await res.json();
  return json.stats[0].splits.map((s: any) => ({
    season: s.season,
    ba: parseFloat(s.stat.avg || '0'),
    obp: parseFloat(s.stat.obp || '0'),
    slg: parseFloat(s.stat.slg || '0'),
    ops: parseFloat(s.stat.ops || '0'),
  }));
}