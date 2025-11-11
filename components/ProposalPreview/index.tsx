"use client"

import { useEffect } from "react"

export type ProposalData = {
  title: String
  introduction: String
  client?: {
    first_name?: string
    last_name?: string
    email?: string
    company?: string
  }
  sections: [{
    content: String
    title: String
    items: [{
      name: String
      value: String
    }]
  }]
}

type ProposalPreviewProps = {
  data: ProposalData
  setProposal: (data: ProposalData) => void
}

export function ProposalPreview({ data, setProposal }: ProposalPreviewProps) {
  useEffect(() => {
    setProposal(data)
  }, [])

  return (
    <div className="p-4 border rounded-md bg-gray-50">
      <h2 className="text-xl font-semibold mb-2">{data.title}</h2>
      <p className="text-gray-700 mb-3">{data.introduction}</p>
      {data.sections?.map((s, i) => (
        <div key={i} className="mb-3">
          <h3 className="font-medium">{s.title}</h3>
          {s.content ? <p className="text-sm text-gray-600">{s.content}</p> : null}
          {s.items && Array.isArray(s.items) ? (
            <ul className="list-disc list-inside text-sm text-gray-600">
              {s.items.map((item, j) => (
                <li key={j}>
                  {item.name} — ${item.value}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ))}
    </div>
  )
}
