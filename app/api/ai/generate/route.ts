import { generateText } from 'ai'
import { NextResponse } from 'next/server'
import { extractionPrompt, proposalPrompt } from '@/lib/prompts'
import { mistral, type MistralLanguageModelOptions } from '@ai-sdk/mistral'

export async function POST(req: Request) {
  const userInput = await req.json()

  // Generate event info based on user input
  const { text } = await generateText({
    model: mistral('mistral-small-latest'),
    providerOptions: {
      mistral: {
        safePrompt: true, // optional safety prompt injection
        parallelToolCalls: false, // only one tool per response
      } satisfies MistralLanguageModelOptions,
    },
    prompt: extractionPrompt(userInput),
  })

  // Generate proposal JSON as per our format
  const extracted = getJsonText(text)
  const proposal = await generateText({
    model: mistral('mistral-small-latest'),
    prompt: proposalPrompt(extracted),
  })
  const proposalContent = getJsonText(proposal.text)

  return NextResponse.json(proposalContent)
}

function getJsonText(data: string) {
  const startIndex = data.indexOf("```json")
  if (startIndex === -1) return null

  const endIndex = data.lastIndexOf("```")
  if (endIndex === -1) return null

  return JSON.parse(data.substring(startIndex + 7, endIndex))
}