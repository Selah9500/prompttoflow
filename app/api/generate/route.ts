import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const SYSTEM_PROMPT = `You are an expert n8n workflow architect with 5+ years of experience building production automations for SMBs. You have deep knowledge of every n8n node, best practices for error handling, and how to write clean JSON that imports without errors.

RULES YOU MUST FOLLOW:
1. Return ONLY valid JSON — no markdown, no backticks, no explanation, no prose
2. Use ONLY nodes that exist in n8n's standard node library
3. Always include a trigger node as the FIRST node
4. Use descriptive node names — never "Set1", "HTTP Request2", "IF1"
5. Always include error handling with a Stop and Error node or IF node for edge cases
6. Add sticky note nodes to explain complex logic
7. Use the latest node versions (typeVersion should match current n8n versions)
8. Prefer native n8n nodes over HTTP Request nodes when a native integration exists
9. Every node must have a valid position array [x, y] with 250px spacing between nodes
10. All connections must reference nodes that actually exist in the nodes array

PREFERRED NODES (use these over generic alternatives):
- Email: n8n-nodes-base.gmail or n8n-nodes-base.emailSend
- Sheets: n8n-nodes-base.googleSheets
- Slack: n8n-nodes-base.slack
- HubSpot: n8n-nodes-base.hubspot
- Airtable: n8n-nodes-base.airtable
- Notion: n8n-nodes-base.notion
- Webhook trigger: n8n-nodes-base.webhook
- Schedule trigger: n8n-nodes-base.scheduleTrigger
- Set/Edit fields: n8n-nodes-base.set
- IF logic: n8n-nodes-base.if
- Error handling: n8n-nodes-base.stopAndError
- HTTP Request: n8n-nodes-base.httpRequest (only when no native node exists)

OUTPUT SCHEMA — return exactly this structure:
{
  "name": "Descriptive Workflow Name",
  "nodes": [
    {
      "parameters": {},
      "id": "unique-id-string",
      "name": "Descriptive Node Name",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2,
      "position": [250, 300]
    }
  ],
  "connections": {
    "Node Name": {
      "main": [
        [{ "node": "Next Node Name", "type": "main", "index": 0 }]
      ]
    }
  },
  "settings": {
    "executionOrder": "v1"
  },
  "meta": {
    "description": "One sentence describing what this workflow does"
  }
}`

function validateWorkflow(json: any): { valid: boolean; error?: string } {
  if (!json.nodes || !Array.isArray(json.nodes)) {
    return { valid: false, error: 'Missing nodes array' }
  }
  if (!json.connections || typeof json.connections !== 'object') {
    return { valid: false, error: 'Missing connections object' }
  }
  if (json.nodes.length === 0) {
    return { valid: false, error: 'Workflow has no nodes' }
  }

  const nodeNames = json.nodes.map((n: any) => n.name)

  for (const [sourceName, conns] of Object.entries(json.connections)) {
    if (!nodeNames.includes(sourceName)) {
      return { valid: false, error: `Connection references non-existent node: ${sourceName}` }
    }
    const mainConns = (conns as any).main || []
    for (const connGroup of mainConns) {
      for (const conn of connGroup) {
        if (!nodeNames.includes(conn.node)) {
          return { valid: false, error: `Connection target does not exist: ${conn.node}` }
        }
      }
    }
  }

  return { valid: true }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, email } = body

    if (!prompt) {
      return NextResponse.json({ error: 'Missing prompt' }, { status: 400 })
    }

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    let workflow = null
    let attempts = 0
    const maxAttempts = 2

    while (attempts < maxAttempts && !workflow) {
      attempts++

      const message = await client.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        temperature: 0,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      })

      const rawText = message.content[0].type === 'text' ? message.content[0].text : ''

      let parsed
      try {
        const cleaned = rawText
          .replace(/```json\n?/g, '')
          .replace(/```\n?/g, '')
          .trim()
        parsed = JSON.parse(cleaned)
      } catch {
        if (attempts < maxAttempts) continue
        return NextResponse.json(
          { error: 'Failed to generate valid JSON. Please try again.' },
          { status: 500 }
        )
      }

      const validation = validateWorkflow(parsed)
      if (!validation.valid) {
        if (attempts < maxAttempts) continue
        return NextResponse.json(
          { error: `Invalid workflow structure: ${validation.error}` },
          { status: 500 }
        )
      }

      workflow = parsed
    }

    return NextResponse.json({ workflow, email })
  } catch (error) {
    console.error('Generate error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
