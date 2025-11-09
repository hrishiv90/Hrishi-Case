import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const res = await fetch(`${process.env.PROPOSALES_BASE_URL}/proposal-search?limit=10`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.PROPOSALES_API_KEY}`,
      'Content-Type': 'application/json',
    },
    cache: "no-cache"
  })
  const data = await res.json()
  return NextResponse.json(data)
}
