// File: src/components/PlayerSearch.tsx

import React from 'react'
import Select from 'react-select'
import players from '../data/players.json'

type Option = {
  label: string
  value: number
}

const options: Option[] = players.map(p => ({
  label: p.name,
  value: p.id,
}))

interface Props {
  onSelect: (id: number) => void
}

export default function PlayerSearch({ onSelect }: Props) {
  return (
    <div className="mb-4 w-80">
      <Select<Option, false>
        options={options}
        className="shadow-sm"
        classNamePrefix="react-select"
        placeholder="Search player by name…"
        isClearable
        onChange={opt => {
          if (opt) onSelect(opt.value)
        }}
        styles={{
          container: (base) => ({ ...base, width: '100%' }),
        }}
      />
    </div>
  )
}
