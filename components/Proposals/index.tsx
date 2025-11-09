"use client"

import { useEffect, useState } from "react"

export function Proposals() {
  const [proposals, setProposals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProposals() {
      const res = await fetch("/api/proposales/proposals/get", {
        cache: "no-cache"
      })
      const data = await res.json()
      setProposals(data.data)
      setLoading(false)
    }
    fetchProposals()
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {proposals.map((p) => (
        <div key={p.id} className="p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold">{p.title}</h3>
          <p className="text-sm text-gray-600">{p.description}</p>
          <p className="text-sm text-gray-600">{p.status}</p>
        </div>
      ))}
    </div>
  )
}