import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get("id")

  if (id) {
    const res = await fetch(`${process.env.PROPOSALES_BASE_URL}/proposals/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.PROPOSALES_API_KEY}`,
        'Content-Type': 'application/json',
      },
      cache: "no-cache"
    })
    const data = await res.json()
    return NextResponse.json(data)
  } else {
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
}
