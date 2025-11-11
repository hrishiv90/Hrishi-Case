import { generateText } from 'ai'
import { NextResponse } from 'next/server'
import { extractionPrompt, proposalPrompt } from '@/lib/prompts'
import { mistral, type MistralLanguageModelOptions } from '@ai-sdk/mistral'
import z from "zod"

const outputSchema = z.object({
  title: z.string(),
  description: z.string(),
  client: z.object({
    first_name: z.string().nullish(),
    last_name: z.string().nullish(),
    email: z.string().nullish(),
    phone: z.string().nullish(),
    company_name: z.string().nullish(),
  }).nullish(),
  sections: z.array(
    z.object({
      title: z.string().nullish(),
      items: z.array(
        z.object({
          name: z.string().nullish(),
          value: z.string().nullish()
        })
      ).nullish(),
      content: z.any().nullish(),
    })
  ).nullish(),
})

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
  const formattedData = outputSchema.safeParse(proposalContent)
  if (formattedData.error) {
    throw new Error(`Error in parsing: ${formattedData.error.message}`, {
      cause: formattedData.error.cause,
    })
  }

  return NextResponse.json(formattedData.data)
}

function getJsonText(data: string) {
  const startIndex = data.indexOf("```json")
  if (startIndex === -1) return null

  const endIndex = data.lastIndexOf("```")
  if (endIndex === -1) return null

  return JSON.parse(data.substring(startIndex + 7, endIndex))
}