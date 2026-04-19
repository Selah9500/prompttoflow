'use client'

import { useEffect, useState } from 'react'

const CREDENTIAL_GUIDES: Record<string, {
  name: string
  icon: string
  color: string
  steps: string[]
  link: string
  time: string
}> = {
  gmail: {
    name: 'Gmail / Google',
    icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="5" width="16" height="12" rx="2"/><path d="M2 6l8 5 8-5"/></svg>`,
    color: '#EA4335',
    time: '5 min',
    link: 'https://docs.n8n.io/integrations/builtin/credentials/google/',
    steps: [
      'Go to console.cloud.google.com',
      'Create a new project or select existing',
      'Enable Gmail API under "APIs & Services"',
      'Go to Credentials → Create OAuth 2.0 Client ID',
      'Copy Client ID and Client Secret',
      'In n8n: Settings → Credentials → Add → Google OAuth2',
      'Paste Client ID and Secret → Connect'
    ]
  },
  gmailTrigger: {
    name: 'Gmail / Google',
    icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="5" width="16" height="12" rx="2"/><path d="M2 6l8 5 8-5"/></svg>`,
    color: '#EA4335',
    time: '5 min',
    link: 'https://docs.n8n.io/integrations/builtin/credentials/google/',
    steps: [
      'Go to console.cloud.google.com',
      'Create a new project or select existing',
      'Enable Gmail API under "APIs & Services"',
      'Go to Credentials → Create OAuth 2.0 Client ID',
      'Copy Client ID and Client Secret',
      'In n8n: Settings → Credentials → Add → Google OAuth2',
      'Paste Client ID and Secret → Connect'
    ]
  },
  googleSheets: {
    name: 'Google Sheets',
    icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="16" height="16" rx="2"/><path d="M2 7h16M2 12h16M7 2v16"/></svg>`,
    color: '#34A853',
    time: '5 min',
    link: 'https://docs.n8n.io/integrations/builtin/credentials/google/',
    steps: [
      'Go to console.cloud.google.com',
      'Enable Google Sheets API under "APIs & Services"',
      'Go to Credentials → Create Service Account',
      'Download the JSON key file',
      'In n8n: Settings → Credentials → Add → Google Sheets OAuth2',
      'Upload the service account JSON or use OAuth2',
      'Share your Google Sheet with the service account email'
    ]
  },
  hubspot: {
    name: 'HubSpot',
    icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="8" r="3"/><path d="M4 18c0-3.3 2.7-6 6-6s6 2.7 6 6"/></svg>`,
    color: '#FF7A59',
    time: '3 min',
    link: 'https://docs.n8n.io/integrations/builtin/credentials/hubspot/',
    steps: [
      'Log in to your HubSpot account',
      'Go to Settings → Integrations → Private Apps',
      'Click "Create private app"',
      'Give it a name and select required scopes',
      'Click "Create app" → copy the access token',
      'In n8n: Settings → Credentials → Add → HubSpot API',
      'Paste your access token → Save'
    ]
  },
  slack: {
    name: 'Slack',
    icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 7a2 2 0 012-2h8a2 2 0 012 2v5a2 2 0 01-2 2h-3l-4 2v-2H6a2 2 0 01-2-2V7z"/></svg>`,
    color: '#4A154B',
    time: '5 min',
    link: 'https://docs.n8n.io/integrations/builtin/credentials/slack/',
    steps: [
      'Go to api.slack.com/apps',
      'Click "Create New App" → From Scratch',
      'Name your app and select your workspace',
      'Go to OAuth & Permissions',
      'Add Bot Token Scopes: channels:write, chat:write, files:write',
      'Click "Install to Workspace" → Allow',
      'Copy the "Bot User OAuth Token" (starts with xoxb-)',
      'In n8n: Settings → Credentials → Add → Slack API',
      'Paste your bot token → Save'
    ]
  },
  airtable: {
    name: 'Airtable',
    icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="16" height="16" rx="2"/><path d="M2 8h16M8 2v16"/></svg>`,
    color: '#18BFFF',
    time: '2 min',
    link: 'https://docs.n8n.io/integrations/builtin/credentials/airtable/',
    steps: [
      'Go to airtable.com/account',
      'Scroll to "API" section',
      'Click "Generate API key"',
      'Copy your personal access token',
      'In n8n: Settings → Credentials → Add → Airtable Token API',
      'Paste your API key → Save'
    ]
  },
  notion: {
    name: 'Notion',
    icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="4" y="2" width="12" height="16" rx="2"/><path d="M7 7h6M7 10h6M7 13h4"/></svg>`,
    color: '#000000',
    time: '3 min',
    link: 'https://docs.n8n.io/integrations/builtin/credentials/notion/',
    steps: [
      'Go to notion.so/my-integrations',
      'Click "+ New integration"',
      'Name your integration and select workspace',
      'Copy the "Internal Integration Token"',
      'Share your Notion pages with the integration',
      'In n8n: Settings → Credentials → Add → Notion API',
      'Paste your integration token → Save'
    ]
  },
  typeform: {
    name: 'Typeform',
    icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="13" rx="2"/><path d="M3 8h14M7 4V2M13 4V2"/></svg>`,
    color: '#262627',
    time: '2 min',
    link: 'https://docs.n8n.io/integrations/builtin/credentials/typeform/',
    steps: [
      'Log in to typeform.com',
      'Go to your profile → Developer apps',
      'Click "Create a new app"',
      'Copy your Personal Access Token',
      'In n8n: Settings → Credentials → Add → Typeform API',
      'Paste your token → Save'
    ]
  },
  stripe: {
    name: 'Stripe',
    icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="5" width="16" height="11" rx="2"/><path d="M2 9h16"/></svg>`,
    color: '#635BFF',
    time: '2 min',
    link: 'https://docs.n8n.io/integrations/builtin/credentials/stripe/',
    steps: [
      'Log in to dashboard.stripe.com',
      'Go to Developers → API Keys',
      'Copy your "Secret key" (starts with sk_)',
      'In n8n: Settings → Credentials → Add → Stripe API',
      'Paste your secret key → Save',
      'Use test keys (sk_test_) for testing first'
    ]
  },
  shopify: {
    name: 'Shopify',
    icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 4h8l2 12H4L6 4z"/><path d="M8 4V3a2 2 0 014 0v1"/></svg>`,
    color: '#96BF48',
    time: '5 min',
    link: 'https://docs.n8n.io/integrations/builtin/credentials/shopify/',
    steps: [
      'Log in to your Shopify admin',
      'Go to Settings → Apps → Develop apps',
      'Click "Create an app" and name it',
      'Configure Admin API scopes you need',
      'Click "Install app" → copy the Admin API access token',
      'In n8n: Settings → Credentials → Add → Shopify API',
      'Enter your store name and access token → Save'
    ]
  },
  webhook: {
    name: 'Webhook (no credentials needed)',
    icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M11 3L6 11h5l-2 6 7-9h-5l2-5z"/></svg>`,
    color: '#00D4FF',
    time: '1 min',
    link: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/',
    steps: [
      'No credentials needed for Webhook nodes',
      'After importing, activate your workflow',
      'Copy the webhook URL from the node',
      'Paste it into your external service/app',
      'Test by sending a POST request to the URL'
    ]
  },
  scheduleTrigger: {
    name: 'Schedule Trigger (no credentials needed)',
    icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7"/><path d="M10 6v4l3 3"/></svg>`,
    color: '#C8F135',
    time: '1 min',
    link: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/',
    steps: [
      'No credentials needed for Schedule Trigger',
      'After importing, set your desired schedule',
      'Activate the workflow to start running on schedule'
    ]
  }
}

const TOOL_LABELS: Record<string, string> = {
  gmail: 'Gmail',
  gmailTrigger: 'Gmail Trigger',
  googleSheets: 'Google Sheets',
  hubspot: 'HubSpot',
  slack: 'Slack',
  airtable: 'Airtable',
  notion: 'Notion',
  typeform: 'Typeform',
  stripe: 'Stripe',
  shopify: 'Shopify',
  webhook: 'Webhook',
  scheduleTrigger: 'Schedule Trigger',
  set: 'Set (no credentials)',
  if: 'IF (no credentials)',
  code: 'Code (no credentials)',
  stopAndError: 'Error Handler (no credentials)',
  html: 'HTML (no credentials)',
  respondToWebhook: 'Respond to Webhook (no credentials)',
}

export default function SetupGuidePage() {
  const [toolsUsed, setToolsUsed] = useState<string[]>([])
  const [openTool, setOpenTool] = useState<string | null>(null)
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean[]>>({})

  useEffect(() => {
    const stored = sessionStorage.getItem('ptf_tools_used')
    if (stored) {
      const tools = JSON.parse(stored)
      setToolsUsed(tools)
      if (tools.length > 0) setOpenTool(tools[0])
    }
  }, [])

  const toggleStep = (tool: string, idx: number) => {
    setCompletedSteps(prev => ({
      ...prev,
      [tool]: {
        ...(prev[tool] || {}),
        [idx]: !prev[tool]?.[idx]
      }
    }))
  }

  const credentialTools = toolsUsed.filter(t => CREDENTIAL_GUIDES[t])
  const noCredTools = toolsUsed.filter(t => !CREDENTIAL_GUIDES[t] || ['set','if','code','stopAndError','html','respondToWebhook','webhook','scheduleTrigger'].includes(t))

  return (
    <div style={{ fontFamily: "'Cabinet Grotesk', sans-serif", background: '#080C14', color: '#F0F4FF', minHeight: '100vh' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800;900&family=JetBrains+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap'); *{box-sizing:border-box;margin:0;padding:0}`}</style>

      {/* NAV */}
      <nav style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 40px', borderBottom:'1px solid #1F2D45', background:'rgba(8,12,20,0.95)', position:'sticky', top:0, zIndex:100 }}>
        <div style={{ fontWeight:900, fontSize:18, letterSpacing:-0.5 }}>Prompt<span style={{color:'#00D4FF'}}>To</span>Flow</div>
        <a href="/generate" style={{ padding:'8px 18px', background:'transparent', border:'1px solid #1F2D45', borderRadius:8, fontSize:13, fontWeight:700, color:'#8B9ABF', textDecoration:'none' }}>← Generate another</a>
      </nav>

      <div style={{ maxWidth:760, margin:'0 auto', padding:'48px 24px 80px' }}>

        {/* HEADER */}
        <div style={{ marginBottom:40 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'5px 14px', background:'rgba(200,241,53,0.08)', border:'1px solid rgba(200,241,53,0.2)', borderRadius:99, fontFamily:'monospace', fontSize:11, color:'#A8D020', marginBottom:20 }}>
            <div style={{width:6,height:6,borderRadius:'50%',background:'#C8F135'}}/>
            Workflow downloaded successfully
          </div>
          <h1 style={{ fontSize:'clamp(28px,4vw,40px)', fontWeight:900, letterSpacing:-1.5, lineHeight:1.1, marginBottom:12 }}>
            Now set up your<br/><span style={{color:'#00D4FF'}}>credentials in n8n</span>
          </h1>
          <p style={{ fontFamily:'Georgia, serif', fontStyle:'italic', fontSize:15, color:'#8B9ABF', lineHeight:1.7 }}>
            Your workflow is ready to import. Follow the steps below to connect each service — it takes about 2-5 minutes per integration.
          </p>
        </div>

        {/* IMPORT STEPS */}
        <div style={{ background:'#111827', border:'1px solid #1F2D45', borderRadius:12, padding:24, marginBottom:32 }}>
          <div style={{ fontFamily:'monospace', fontSize:11, color:'#00D4FF', letterSpacing:2, textTransform:'uppercase', marginBottom:16 }}>Step 1 — Import your workflow</div>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {[
              "Open your n8n instance (or sign up at n8n.io)",
              'Click the "+" button → "Import workflow"',
              'Select your downloaded prompttoflow-workflow.json file',
              'Click "Import" — your workflow will appear on the canvas',
              'Now configure the credentials below before activating'
            ].map((step, i) => (
              <div key={i} style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
                <div style={{ width:22, height:22, borderRadius:'50%', background:'rgba(0,212,255,0.1)', border:'1px solid rgba(0,212,255,0.3)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'monospace', fontSize:10, color:'#00D4FF', flexShrink:0, marginTop:1 }}>{i+1}</div>
                <div style={{ fontSize:13, color:'#8B9ABF', lineHeight:1.6 }}>{step}</div>
              </div>
            ))}
          </div>
          <a href="https://n8n.partnerlinks.io/u155r8fjoz2n" target="_blank" rel="noopener noreferrer" style={{ display:'inline-flex', alignItems:'center', gap:8, marginTop:16, padding:'9px 18px', background:'transparent', border:'1px solid rgba(0,212,255,0.3)', borderRadius:8, fontSize:13, fontWeight:700, color:'#00D4FF', textDecoration:'none' }}>
            Don't have n8n yet? Get it free →
          </a>
        </div>

        {/* CREDENTIAL TOOLS */}
        {credentialTools.length > 0 && (
          <div style={{ marginBottom:32 }}>
            <div style={{ fontFamily:'monospace', fontSize:11, color:'#00D4FF', letterSpacing:2, textTransform:'uppercase', marginBottom:16 }}>Step 2 — Configure credentials</div>

            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {credentialTools.map(tool => {
                const guide = CREDENTIAL_GUIDES[tool]
                if (!guide) return null
                const isOpen = openTool === tool
                const steps = completedSteps[tool] || {}
                const doneCount = Object.values(steps).filter(Boolean).length

                return (
                  <div key={tool} style={{ background:'#111827', border:`1px solid ${isOpen ? 'rgba(0,212,255,0.3)' : '#1F2D45'}`, borderRadius:12, overflow:'hidden', transition:'border-color 0.2s' }}>
                    <button onClick={() => setOpenTool(isOpen ? null : tool)} style={{ width:'100%', padding:'16px 20px', background:'transparent', border:'none', display:'flex', alignItems:'center', gap:14, cursor:'pointer', textAlign:'left' }}>
                      <div style={{ width:36, height:36, borderRadius:8, background:`${guide.color}18`, border:`1px solid ${guide.color}40`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }} dangerouslySetInnerHTML={{__html: guide.icon.replace('stroke="currentColor"', `stroke="${guide.color}"`)}} />
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:14, fontWeight:700, color:'#F0F4FF', marginBottom:2 }}>{guide.name}</div>
                        <div style={{ fontSize:11, fontFamily:'monospace', color:'#4A5A7A' }}>{guide.time} setup · {guide.steps.length} steps</div>
                      </div>
                      {doneCount > 0 && (
                        <div style={{ fontFamily:'monospace', fontSize:11, color:'#A8D020', background:'rgba(200,241,53,0.08)', border:'1px solid rgba(200,241,53,0.2)', padding:'2px 8px', borderRadius:4 }}>
                          {doneCount}/{guide.steps.length}
                        </div>
                      )}
                      <div style={{ color:'#4A5A7A', fontSize:18, flexShrink:0 }}>{isOpen ? '−' : '+'}</div>
                    </button>

                    {isOpen && (
                      <div style={{ padding:'0 20px 20px', borderTop:'1px solid #1F2D45' }}>
                        <div style={{ display:'flex', flexDirection:'column', gap:8, marginTop:16 }}>
                          {guide.steps.map((step, i) => (
                            <div key={i} onClick={() => toggleStep(tool, i)} style={{ display:'flex', alignItems:'flex-start', gap:12, cursor:'pointer', padding:'8px 12px', borderRadius:8, background: steps[i] ? 'rgba(200,241,53,0.05)' : 'rgba(0,0,0,0.2)', border:`1px solid ${steps[i] ? 'rgba(200,241,53,0.2)' : '#1F2D45'}`, transition:'all 0.15s' }}>
                              <div style={{ width:18, height:18, borderRadius:4, border:`1.5px solid ${steps[i] ? '#A8D020' : '#2a3f6f'}`, background: steps[i] ? '#A8D020' : 'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1, fontSize:10, color:'#080C14', fontWeight:900, transition:'all 0.15s' }}>
                                {steps[i] ? '✓' : ''}
                              </div>
                              <div style={{ fontSize:13, color: steps[i] ? '#A8D020' : '#8B9ABF', lineHeight:1.5, textDecoration: steps[i] ? 'line-through' : 'none', transition:'all 0.15s' }}>{step}</div>
                            </div>
                          ))}
                        </div>
                        <a href={guide.link} target="_blank" rel="noopener noreferrer" style={{ display:'inline-flex', alignItems:'center', gap:6, marginTop:14, fontSize:12, color:'#00D4FF', textDecoration:'none', fontFamily:'monospace' }}>
                          Official n8n docs for {guide.name} →
                        </a>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* NO-CREDENTIAL NODES */}
        {noCredTools.length > 0 && (
          <div style={{ background:'rgba(200,241,53,0.04)', border:'1px solid rgba(200,241,53,0.15)', borderRadius:12, padding:20, marginBottom:32 }}>
            <div style={{ fontFamily:'monospace', fontSize:11, color:'#A8D020', letterSpacing:1, textTransform:'uppercase', marginBottom:12 }}>No credentials needed</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
              {noCredTools.map(tool => (
                <div key={tool} style={{ padding:'5px 12px', background:'rgba(200,241,53,0.06)', border:'1px solid rgba(200,241,53,0.15)', borderRadius:6, fontSize:12, fontFamily:'monospace', color:'#A8D020' }}>
                  {TOOL_LABELS[tool] || tool}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ACTIVATE */}
        <div style={{ background:'#111827', border:'1px solid rgba(0,212,255,0.2)', borderRadius:12, padding:24, marginBottom:32 }}>
          <div style={{ fontFamily:'monospace', fontSize:11, color:'#00D4FF', letterSpacing:2, textTransform:'uppercase', marginBottom:16 }}>Step 3 — Activate your workflow</div>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {[
              'Make sure all credentials above are configured',
              'Click the toggle switch in the top right of your workflow canvas',
              'Status should change from "Inactive" to "Active"',
              'Test by triggering the workflow manually first',
              'Monitor executions under "Executions" tab'
            ].map((step, i) => (
              <div key={i} style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
                <div style={{ width:22, height:22, borderRadius:'50%', background:'rgba(0,212,255,0.1)', border:'1px solid rgba(0,212,255,0.3)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'monospace', fontSize:10, color:'#00D4FF', flexShrink:0, marginTop:1 }}>{i+1}</div>
                <div style={{ fontSize:13, color:'#8B9ABF', lineHeight:1.6 }}>{step}</div>
              </div>
            ))}
          </div>
        </div>

        {/* NEED HELP CTA */}
        <div style={{ background:'rgba(255,107,53,0.06)', border:'1px solid rgba(255,107,53,0.2)', borderRadius:12, padding:24, display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
          <div>
            <div style={{ fontSize:16, fontWeight:800, color:'#FF6B35', marginBottom:6 }}>Rather have me set this up for you?</div>
            <div style={{ fontFamily:'Georgia, serif', fontStyle:'italic', fontSize:13, color:'#8B9ABF' }}>I'll import, configure, test, and deploy your workflow — from $99. Includes a Loom walkthrough.</div>
          </div>
          <a href="https://cal.com/prompttoflow" target="_blank" rel="noopener noreferrer" style={{ padding:'12px 24px', background:'#FF6B35', border:'none', borderRadius:8, fontSize:14, fontWeight:800, color:'white', textDecoration:'none', whiteSpace:'nowrap' }}>
            Book Setup Call →
          </a>
        </div>

      </div>
    </div>
  )
}
