'use client'

import { useState, useEffect } from 'react'

const LOADING_STEPS = [
  'Analyzing your context',
  'Selecting n8n nodes',
  'Wiring connections',
  'Adding error handling',
  'Finalizing JSON'
]

export default function ReviewPage() {
  const [formData, setFormData] = useState<any>(null)
  const [prompt, setPrompt] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [status, setStatus] = useState<'review' | 'loading' | 'success'>('review')
  const [loadingStep, setLoadingStep] = useState(0)
  const [generatedJSON, setGeneratedJSON] = useState('')
  const [credits, setCredits] = useState(4)

  useEffect(() => {
    const stored = sessionStorage.getItem('ptf_form_data')
    if (stored) {
      const data = JSON.parse(stored)
      setFormData(data)
      setCredits(data.credits || 4)
      setPrompt(buildPrompt(data))
    } else {
      window.location.href = '/generate'
    }
  }, [])

  const buildPrompt = (data: any) => `You are building an n8n workflow for a real business use case.

BUSINESS CONTEXT:
- Problem being solved: ${data.problem}
- Business category: ${data.category || 'General'}
- Trigger event: ${data.trigger || 'Manual trigger'}
- Tools/apps in use: ${data.tools?.join(', ') || 'Not specified'}
- Desired outcome: ${data.outcome || 'Not specified'}
- Additional outcomes: ${data.outcomes?.join(', ') || 'None'}
- Special rules: ${data.constraints || 'None specified'}

REQUIREMENTS:
- Build a production-ready workflow that solves this exact problem
- Use the specific tools listed above as the integration nodes
- The trigger must match the trigger event described
- Include conditional logic and error handling for edge cases
- Add sticky notes explaining the workflow logic
- Add a Setup Checklist sticky note listing all credentials needed
- Make node names descriptive and specific to this use case
- Use correct n8n node types, typeVersions, and parameter structures
- The workflow should be immediately usable after configuring credentials`

  const generate = async () => {
    const email = formData?.email
    if (!email) return

    setStatus('loading')
    setLoadingStep(0)

    const interval = setInterval(() => {
      setLoadingStep(prev => {
        if (prev >= 4) { clearInterval(interval); return prev }
        return prev + 1
      })
    }, 700)

    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 55000)

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, email }),
        signal: controller.signal
      })

      clearTimeout(timeout)
      const data = await res.json()
      clearInterval(interval)

      if (!data.workflow) {
        throw new Error(data.error || 'No workflow returned')
      }

      setGeneratedJSON(JSON.stringify(data.workflow, null, 2))
      if (data.toolsUsed) sessionStorage.setItem('ptf_tools_used', JSON.stringify(data.toolsUsed))
      setCredits(c => Math.max(0, c - 1))
      setTimeout(() => setStatus('success'), 200)

    } catch (err) {
      clearInterval(interval)
      console.error('Generation error:', err)
      setStatus('review')
      alert('Something went wrong. Please try again.')
    }
  }

  const download = () => {
    const blob = new Blob([generatedJSON], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'prompttoflow-workflow.json'
    a.click()
    URL.revokeObjectURL(url)
    setTimeout(() => { window.location.href = '/setup-guide' }, 1000)
  }

  if (!formData) return null

  const s = { fontFamily: "'Cabinet Grotesk', sans-serif" }

  return (
    <div style={{ ...s, background: '#080C14', color: '#F0F4FF', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800;900&family=JetBrains+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        textarea:focus { outline: none; border-color: #00D4FF !important; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes spin { to{transform:rotate(360deg)} }
      `}</style>

      {/* NAV */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 40px', borderBottom: '1px solid #1F2D45', background: 'rgba(8,12,20,0.95)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ fontWeight: 900, fontSize: 18, letterSpacing: -0.5 }}>Prompt<span style={{ color: '#00D4FF' }}>To</span>Flow</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(200,241,53,0.08)', border: '1px solid rgba(200,241,53,0.2)', padding: '5px 14px', borderRadius: 6, fontFamily: 'monospace', fontSize: 12, color: '#A8D020' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#C8F135', animation: 'pulse 2s infinite' }} />
            {credits} credits remaining
          </div>
          <a href="/generate" style={{ fontSize: 13, color: '#8B9ABF', textDecoration: 'none' }}>← Edit inputs</a>
        </div>
      </nav>

      {/* REVIEW STATE */}
      {status === 'review' && (
        <div style={{ flex: 1, padding: '40px', maxWidth: 1200, margin: '0 auto', width: '100%' }}>

          {/* HEADER */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: 'monospace', fontSize: 11, color: '#00D4FF', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>Review before generating</div>
            <h1 style={{ fontSize: 'clamp(24px,3vw,36px)', fontWeight: 900, letterSpacing: -1, marginBottom: 8 }}>
              Does this look right?
            </h1>
            <p style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 15, color: '#8B9ABF' }}>
              Review your inputs and the AI prompt below. Edit the prompt if needed, then generate your workflow.
            </p>
          </div>

          {/* SIDE BY SIDE */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>

            {/* LEFT — USER INPUTS */}
            <div style={{ background: '#111827', border: '1px solid #1F2D45', borderRadius: 14, overflow: 'hidden' }}>
              <div style={{ padding: '14px 20px', background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid #1F2D45', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4A5A7A' }} />
                <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#8B9ABF', letterSpacing: 1, textTransform: 'uppercase' }}>Your inputs</span>
              </div>
              <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>

                {/* Problem */}
                <div>
                  <div style={{ fontFamily: 'monospace', fontSize: 10, color: '#4A5A7A', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>Problem</div>
                  <div style={{ fontSize: 13, color: '#F0F4FF', lineHeight: 1.7, background: 'rgba(0,0,0,0.2)', padding: '12px 14px', borderRadius: 8, border: '1px solid #1F2D45' }}>
                    {formData.problem || <span style={{ color: '#4A5A7A' }}>Not provided</span>}
                  </div>
                </div>

                {/* Category + Trigger */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <div style={{ fontFamily: 'monospace', fontSize: 10, color: '#4A5A7A', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>Category</div>
                    <div style={{ fontSize: 13, padding: '8px 12px', background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: 6, color: '#00D4FF', fontWeight: 700 }}>
                      {formData.category || 'General'}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'monospace', fontSize: 10, color: '#4A5A7A', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>Trigger</div>
                    <div style={{ fontSize: 13, padding: '8px 12px', background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: 6, color: '#00D4FF', fontWeight: 700 }}>
                      {formData.trigger || 'Manual'}
                    </div>
                  </div>
                </div>

                {/* Tools */}
                <div>
                  <div style={{ fontFamily: 'monospace', fontSize: 10, color: '#4A5A7A', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Tools selected</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {formData.tools?.length > 0 ? formData.tools.map((t: string) => (
                      <span key={t} style={{ padding: '4px 10px', background: 'rgba(0,0,0,0.3)', border: '1px solid #1F2D45', borderRadius: 5, fontSize: 12, fontFamily: 'monospace', color: '#8B9ABF' }}>{t}</span>
                    )) : <span style={{ fontSize: 12, color: '#4A5A7A' }}>None selected</span>}
                  </div>
                </div>

                {/* Outcome */}
                <div>
                  <div style={{ fontFamily: 'monospace', fontSize: 10, color: '#4A5A7A', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>Desired outcome</div>
                  <div style={{ fontSize: 13, color: '#F0F4FF', lineHeight: 1.7, background: 'rgba(0,0,0,0.2)', padding: '12px 14px', borderRadius: 8, border: '1px solid #1F2D45' }}>
                    {formData.outcome || <span style={{ color: '#4A5A7A' }}>Not provided</span>}
                  </div>
                </div>

                {/* Quick outcomes */}
                {formData.outcomes?.length > 0 && (
                  <div>
                    <div style={{ fontFamily: 'monospace', fontSize: 10, color: '#4A5A7A', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Quick outcomes</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {formData.outcomes.map((o: string) => (
                        <span key={o} style={{ padding: '4px 10px', background: 'rgba(200,241,53,0.06)', border: '1px solid rgba(200,241,53,0.15)', borderRadius: 5, fontSize: 12, color: '#A8D020' }}>{o}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Constraints */}
                {formData.constraints && (
                  <div>
                    <div style={{ fontFamily: 'monospace', fontSize: 10, color: '#4A5A7A', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>Constraints</div>
                    <div style={{ fontSize: 13, color: '#8B9ABF', lineHeight: 1.7, background: 'rgba(0,0,0,0.2)', padding: '12px 14px', borderRadius: 8, border: '1px solid #1F2D45' }}>
                      {formData.constraints}
                    </div>
                  </div>
                )}

                {/* Email */}
                <div style={{ paddingTop: 12, borderTop: '1px solid #1F2D45' }}>
                  <div style={{ fontFamily: 'monospace', fontSize: 10, color: '#4A5A7A', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>Email</div>
                  <div style={{ fontSize: 13, color: '#8B9ABF', fontFamily: 'monospace' }}>{formData.email}</div>
                </div>

              </div>
            </div>

            {/* RIGHT — AI PROMPT */}
            <div style={{ background: '#111827', border: `1px solid ${isEditing ? 'rgba(0,212,255,0.4)' : '#1F2D45'}`, borderRadius: 14, overflow: 'hidden', transition: 'border-color 0.2s', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '14px 20px', background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid #1F2D45', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: isEditing ? '#00D4FF' : '#4A5A7A', transition: 'background 0.2s' }} />
                  <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#8B9ABF', letterSpacing: 1, textTransform: 'uppercase' }}>AI prompt</span>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  style={{ padding: '4px 12px', background: isEditing ? 'rgba(0,212,255,0.1)' : 'rgba(0,0,0,0.3)', border: `1px solid ${isEditing ? 'rgba(0,212,255,0.3)' : '#1F2D45'}`, borderRadius: 6, fontSize: 11, fontFamily: 'monospace', color: isEditing ? '#00D4FF' : '#8B9ABF', cursor: 'pointer', transition: 'all 0.2s' }}
                >
                  {isEditing ? '✓ Done editing' : '✏️ Edit prompt'}
                </button>
              </div>

              <div style={{ flex: 1, padding: 20, position: 'relative' }}>
                {isEditing ? (
                  <textarea
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    style={{ width: '100%', height: '100%', minHeight: 400, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: 8, padding: '14px', fontSize: 12, fontFamily: 'monospace', color: '#F0F4FF', lineHeight: 1.8, resize: 'vertical' }}
                  />
                ) : (
                  <pre style={{ fontFamily: 'monospace', fontSize: 12, color: '#8B9ABF', lineHeight: 1.8, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                    {prompt.split('\n').map((line, i) => {
                      if (line.startsWith('BUSINESS CONTEXT:') || line.startsWith('REQUIREMENTS:')) {
                        return <span key={i}><span style={{ color: '#00D4FF', fontWeight: 700 }}>{line}</span>{'\n'}</span>
                      }
                      if (line.startsWith('-')) {
                        const parts = line.split(':')
                        if (parts.length > 1) {
                          return <span key={i}><span style={{ color: '#4A5A7A' }}>- </span><span style={{ color: '#A8D020' }}>{parts[0].slice(2)}:</span><span style={{ color: '#F0F4FF' }}>{parts.slice(1).join(':')}</span>{'\n'}</span>
                        }
                      }
                      return <span key={i}>{line}{'\n'}</span>
                    })}
                  </pre>
                )}
              </div>

              <div style={{ padding: '12px 20px', borderTop: '1px solid #1F2D45', background: 'rgba(0,0,0,0.15)' }}>
                <div style={{ fontFamily: 'monospace', fontSize: 10, color: '#4A5A7A' }}>
                  {prompt.length} chars · {prompt.split(' ').length} words · ~{Math.ceil(prompt.length / 4)} tokens
                </div>
              </div>
            </div>

          </div>

          {/* GENERATE BUTTON */}
          <div style={{ background: '#111827', border: '1px solid #1F2D45', borderRadius: 12, padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 4 }}>Ready to generate?</div>
              <div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 13, color: '#8B9ABF' }}>
                This will use 1 credit. You have {credits} remaining.
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <a href="/generate" style={{ padding: '11px 20px', background: 'transparent', border: '1px solid #1F2D45', borderRadius: 8, fontSize: 13, fontWeight: 700, color: '#8B9ABF', textDecoration: 'none' }}>
                ← Go back
              </a>
              <button
                onClick={generate}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 28px', background: '#00D4FF', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 900, color: '#080C14', cursor: 'pointer', letterSpacing: -0.3 }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M5 3l8 5-8 5V3z" fill="#080C14"/></svg>
                Generate Workflow
              </button>
            </div>
          </div>

        </div>
      )}

      {/* LOADING STATE */}
      {status === 'loading' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 40px', textAlign: 'center' }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', border: '3px solid #1F2D45', borderTopColor: '#00D4FF', animation: 'spin 0.8s linear infinite', marginBottom: 24 }} />
          <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: -0.5, marginBottom: 8 }}>Building your workflow...</div>
          <div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 15, color: '#8B9ABF', marginBottom: 32 }}>AI is crafting your production-ready n8n JSON</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', maxWidth: 340 }}>
            {LOADING_STEPS.map((step, i) => (
              <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', borderRadius: 8, border: `1px solid ${i < loadingStep ? 'rgba(200,241,53,0.2)' : i === loadingStep ? 'rgba(0,212,255,0.3)' : '#1F2D45'}`, background: i < loadingStep ? 'rgba(200,241,53,0.05)' : i === loadingStep ? 'rgba(0,212,255,0.06)' : 'rgba(0,0,0,0.2)', transition: 'all 0.3s', fontFamily: 'monospace', fontSize: 12, color: i < loadingStep ? '#A8D020' : i === loadingStep ? '#00D4FF' : '#4A5A7A' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: i < loadingStep ? '#A8D020' : i === loadingStep ? '#00D4FF' : '#2a3f6f', animation: i === loadingStep ? 'pulse 1s infinite' : 'none', flexShrink: 0 }} />
                {i < loadingStep ? '✓ ' : i === loadingStep ? '→ ' : '· '}{step}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUCCESS STATE */}
      {status === 'success' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 40px', textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(200,241,53,0.1)', border: '1px solid rgba(200,241,53,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, marginBottom: 20 }}>⚡</div>
          <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: -0.5, marginBottom: 8 }}>Your workflow is ready!</div>
          <div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 15, color: '#8B9ABF', marginBottom: 32, maxWidth: 440 }}>
            Download and import directly into n8n to start automating.
          </div>

          <div style={{ width: '100%', maxWidth: 680 }}>
            <div style={{ background: '#0D1320', border: '1px solid #1F2D45', borderRadius: 12, padding: 20, textAlign: 'left', overflow: 'auto', marginBottom: 20, maxHeight: 300 }}>
              <pre style={{ fontFamily: 'monospace', fontSize: 11, color: '#00D4FF', lineHeight: 1.8, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {generatedJSON.length > 800 ? generatedJSON.substring(0, 800) + '\n\n  ...(download for full workflow)' : generatedJSON}
              </pre>
            </div>

            <button onClick={download} style={{ width: '100%', padding: 14, background: '#C8F135', border: 'none', borderRadius: 8, fontFamily: 'inherit', fontSize: 15, fontWeight: 900, color: '#080C14', cursor: 'pointer', marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v8M5 7l3 3 3-3" stroke="#080C14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 13h10" stroke="#080C14" strokeWidth="2" strokeLinecap="round"/></svg>
              Download workflow.json
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div style={{ padding: '14px 18px', background: '#111827', border: '1px solid #1F2D45', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, borderLeft: '3px solid #00D4FF' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>Don't have n8n yet?</div>
                  <div style={{ fontSize: 11, color: '#8B9ABF' }}>Sign up free in 2 minutes</div>
                </div>
                <button onClick={() => window.open('https://n8n.partnerlinks.io/u155r8fjoz2n', '_blank')} style={{ padding: '7px 14px', background: 'transparent', border: '1px solid #00D4FF', borderRadius: 6, fontSize: 11, fontWeight: 800, color: '#00D4FF', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'inherit' }}>Get n8n →</button>
              </div>
              <div style={{ padding: '14px 18px', background: '#111827', border: '1px solid rgba(255,107,53,0.2)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, borderLeft: '3px solid #FF6B35' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#FF6B35', marginBottom: 2 }}>Need help setting up?</div>
                  <div style={{ fontSize: 11, color: '#8B9ABF' }}>I'll do it for you — from $99</div>
                </div>
                <button onClick={() => window.open('https://cal.com/prompttoflow', '_blank')} style={{ padding: '7px 14px', background: '#FF6B35', border: 'none', borderRadius: 6, fontSize: 11, fontWeight: 800, color: 'white', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'inherit' }}>Book Call →</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer style={{ padding: '16px 40px', borderTop: '1px solid #1F2D45', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#0D1320' }}>
        <div style={{ fontWeight: 900, fontSize: 14, letterSpacing: -0.3 }}>Prompt<span style={{ color: '#00D4FF' }}>To</span>Flow</div>
        <div style={{ fontFamily: 'monospace', fontSize: 11, color: '#4A5A7A' }}>Review · Refine · Generate</div>
      </footer>

    </div>
  )
}
