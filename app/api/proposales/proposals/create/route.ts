import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const inputData = await req.json()

  // IMP -- Add schema check and map to proposalData
  const data: any = {
    company_id: Number(process.env.PROPOSALES_COMPANY_ID),
    language: "English",
    contact_email: `${process.env.PROPOSALES_CONTACT_EMAIL}`,
    title_md: inputData.title,
    data: inputData.sections[0],
  }
  if (inputData.client && inputData.client.email) {
    data.recipient = {
      first_name: inputData.client.first_name,
      last_name: inputData.client.last_name,
      email: inputData.client.email,
      company: inputData.client.company,
    }
  }

  const res = await fetch(`${process.env.PROPOSALES_BASE_URL}/proposals`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PROPOSALES_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!res.ok)
    throw new Error('Failed to create proposal')

  const response = await res.json()

  return NextResponse.json(response)
}