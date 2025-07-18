// src/components/PlayerSelector.tsx
import React, { useState } from 'react'

interface Props { onAdd: (id: number) => void }

export default function PlayerSelector({ onAdd }: Props) {
  const [input, setInput] = useState('')
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const id = parseInt(input, 10)
    if (!isNaN(id)) onAdd(id)
    setInput('')
  }
  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="number"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter Player ID"
        className="border px-2 py-1 mr-2"
      />
      <button type="submit" className="px-4 py-1 bg-blue-500 text-white">
        Add Player
      </button>
    </form>
  )
}
