
export const extractionPrompt = (rfpText: string) => `
Extract key details from this RFP text:
- Event type
- Client name or organization
- Client email
- Event date(s)
- Location or venue
- Guest count
- Budget (if any)
- Requirements (e.g. catering, rooms, AV)

RFP:
${rfpText}

Return only JSON data.
`;

export const proposalPrompt = (data: any) => `
Based on the extracted event data below, create a draft proposal as structured JSON.

Event data:
${JSON.stringify(data, null, 2)}

Output format:
{
  "title": "",
  "description": "",
  "client": {
    first_name: "abc",
    last_name: "xyz",
    email: "abc,xyz@gmail.com",
    phone: 768768,
    company_name: "test company",
  },
  "sections": [
    {"title": "Pricing", "items": [
      {"name": "Venue rental", "value": 1000},
      {"name": "Catering", "value": 2000}
    ]},
    {"title": "Overview", "content": "description"},
    {"title": "Offer", "content": "offer details"},
  ],
}
`;
