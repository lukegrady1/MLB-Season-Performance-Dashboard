// File: scripts/generatePlayers.js

const fs = require('fs').promises
const path = require('path')

// All 30 MLB team IDs
const TEAM_IDS = [
  108, // Los Angeles Angels
  109, // Arizona Diamondbacks
  110, // Baltimore Orioles
  111, // Boston Red Sox
  112, // Chicago Cubs
  113, // Cincinnati Reds
  114, // Cleveland Guardians
  115, // Colorado Rockies
  116, // Detroit Tigers
  117, // Houston Astros
  118, // Kansas City Royals
  119, // Los Angeles Dodgers
  120, // Washington Nationals
  121, // New York Mets
  133, // Oakland Athletics
  134, // Pittsburgh Pirates
  135, // San Diego Padres
  136, // Seattle Mariners
  137, // San Francisco Giants
  138, // St. Louis Cardinals
  139, // Tampa Bay Rays
  140, // Texas Rangers
  141, // Toronto Blue Jays
  142, // Minnesota Twins
  143, // Philadelphia Phillies
  144, // Atlanta Braves
  145, // Chicago White Sox
  146, // Miami Marlins
  147, // New York Yankees
  158  // Milwaukee Brewers
]

async function main() {
  // Ensure output directory exists
  const outputDir = path.resolve(__dirname, '../src/data')
  await fs.mkdir(outputDir, { recursive: true })

  const allPlayers = []

  for (const teamId of TEAM_IDS) {
    const res = await fetch(`https://statsapi.mlb.com/api/v1/teams/${teamId}/roster`)
    if (!res.ok) {
      console.error(`Failed to fetch roster for team ${teamId}: ${res.statusText}`)
      continue
    }
    const json = await res.json()
    const roster = json.roster || []
    roster.forEach(player => {
      allPlayers.push({
        id: player.person.id,
        name: player.person.fullName
      })
    })
  }

  // Deduplicate and sort
  const unique = Array.from(new Map(allPlayers.map(p => [p.id, p])).values())
  const sorted = unique.sort((a, b) => a.name.localeCompare(b.name))

  // Write out JSON with correct encoding
  const outputFile = path.resolve(outputDir, 'players.json')
  await fs.writeFile(outputFile, JSON.stringify(sorted, null, 2), 'utf8')

  console.log(`Wrote ${sorted.length} unique players to ${outputFile}`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
