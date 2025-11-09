'use client'

import { useState } from 'react'
import { ProposalPreview } from '@/components/ProposalPreview'

export default function Rfp2ppslPage() {
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<any>(null)

  async function handleSubmit() {
    setIsLoading(true)
    const result = await fetch('/api/ai/generate', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    })
    const resJson = await result.json()
    setData(JSON.stringify(resJson))
    setIsLoading(false)
  }

  const [proposal, setProposal] = useState<any>(null)

  const handleCreate = async () => {
    const res = await fetch('/api/proposales/proposals/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(proposal),
    })
    const data = await res.json()
    if (data.proposal.uuid)
      alert(`Proposal created in Proposales: ${data.proposal.uuid}`)
    else
      alert(`Error creating in Proposales: ${data}`)
  }

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">RFP to Proposal Assistant</h1>
      <p className="text-gray-600">Paste an RFP or describe the event, and AI will draft a proposal.</p>

      <form onSubmit={(e) => {
        if (!isLoading) {
          e.preventDefault()
          handleSubmit()
        }
      }} className="space-y-3">
        <textarea
          className="w-full h-40 p-3 border rounded-md"
          placeholder="Paste RFP details here..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-500"
        >
          {isLoading ? 'Generating...' : 'Generate Proposal'}
        </button>
      </form>

      {data && (
        <div className="mt-6">
          <div className="mb-3">
            <ProposalPreview data={JSON.parse(data)} setProposal={setProposal} />
          </div>
        </div>
      )}

      {proposal && (
        <button
          onClick={handleCreate}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 mt-4"
        >
          Create in Proposales
        </button>
      )}
    </main>
  )
}
