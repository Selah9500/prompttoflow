'use client'

import { useState, useEffect } from 'react'

const N8N_AFFILIATE = 'https://n8n.partnerlinks.io/u155r8fjoz2n'
const CAL_LINK = 'https://cal.com/prompttoflow' // Replace with your actual Cal.com link

const HOW_IT_WORKS = [
  { step: '01', icon: '📝', title: 'Describe your process', desc: 'Fill in our 5-step intake form. Tell us what you do manually, what triggers it, which tools you use, and what outcome you want.' },
  { step: '02', icon: '⚡', title: 'AI builds your workflow', desc: 'Our PICF-powered AI analyzes your context and generates a production-ready n8n JSON workflow tailored to your exact stack.' },
  { step: '03', icon: '📥', title: 'Download and automate', desc: 'Import the JSON directly into your n8n instance. Your automation runs instantly — no coding, no guesswork, no wasted hours.' },
]

const USE_CASES = [
  { icon: '📧', title: 'Lead → CRM', desc: 'New form submission → enrich data → add to HubSpot → send welcome email → create follow-up task' },
  { icon: '📊', title: 'Invoice automation', desc: 'PDF email → extract data → log to Airtable → send payment reminder sequence' },
  { icon: '📱', title: 'Social scheduler', desc: 'Notion post → format per platform → queue to Buffer → log performance metrics' },
  { icon: '🎯', title: 'Lead enrichment', desc: 'New signup → enrich with Clearbit → score lead → route to right sales rep → Slack alert' },
  { icon: '🛒', title: 'Shopify orders', desc: 'New order → update inventory → send confirmation → create shipping label → notify team' },
  { icon: '📅', title: 'Meeting follow-up', desc: 'Calendar event ends → pull transcript → summarize with AI → send recap → create action items' },
]

const FAQS = [
  { q: 'What is PromptToFlow?', a: 'PromptToFlow is an AI-powered tool that converts your business process descriptions into ready-to-import n8n workflow JSON files. Describe what you want to automate, and we generate the workflow for you.' },
  { q: 'Do I need to know how to code?', a: 'No coding required. You describe your automation in plain English, we generate the technical workflow. If you need help importing it, our setup service handles everything for you.' },
  { q: 'What is n8n?', a: 'n8n is a free, open-source workflow automation tool. Think Zapier but self-hosted, more powerful, and free to run on your own server. It connects 400+ apps and services.' },
  { q: 'How many workflows can I generate?', a: 'Every new account gets 5 free credits. Each workflow generation uses 1 credit, and revisions use 0.5 credits. You can earn more credits by referring friends.' },
  { q: 'What if the workflow doesn\'t work perfectly?', a: 'You can revise any generated workflow using 0.5 credits. If you need hands-on help, our setup service ($99–$299) covers full configuration, testing, and deployment.' },
  { q: 'Do I need n8n to use this?', a: 'Yes — our workflows are designed to run on n8n. You can use n8n Cloud or self-host it for free. We\'ll show you how to get started.' },
]

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const target = 247
    const duration = 2000
    const step = target / (duration / 16)
    let current = 0
    const timer = setInterval(() => {
      current += step
      if (current >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(current))
    }, 16)
    return () => clearInterval(timer)
  }, [])

  return (
    <div style={{ fontFamily: "'Cabinet Grotesk', sans-serif", background: '#080C14', color: '#F0F4FF', minHeight: '100vh' }}>

      {/* FONTS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800;900&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      {/* NAV */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 40px', borderBottom: '1px solid #1F2D45', background: 'rgba(8,12,20,0.95)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ fontWeight: 900, fontSize: 20, letterSpacing: -0.5 }}>Prompt<span style={{ color: '#00D4FF' }}>To</span>Flow</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <a href="#how-it-works" style={{ fontSize: 14, color: '#8B9ABF', textDecoration: 'none' }}>How it works</a>
          <a href="#use-cases" style={{ fontSize: 14, color: '#8B9ABF', textDecoration: 'none' }}>Use cases</a>
          <a href="#pricing" style={{ fontSize: 14, color: '#8B9ABF', textDecoration: 'none' }}>Pricing</a>
          <a href="#faq" style={{ fontSize: 14, color: '#8B9ABF', textDecoration: 'none' }}>FAQ</a>
          <a href="/generate" style={{ padding: '9px 20px', background: '#00D4FF', borderRadius: 8, fontSize: 14, fontWeight: 800, color: '#080C14', textDecoration: 'none' }}>Generate Free →</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: '100px 40px 80px', maxWidth: 1100, margin: '0 auto', textAlign: 'center', animation: 'fadeUp 0.6s ease' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: 99, marginBottom: 28 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#00D4FF', animation: 'pulse 2s infinite' }} />
          <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#00D4FF' }}>{count}+ workflows generated this month</span>
        </div>

        <h1 style={{ fontSize: 'clamp(40px, 7vw, 80px)', fontWeight: 900, letterSpacing: -3, lineHeight: 1.05, marginBottom: 24 }}>
          Turn any process into<br />
          <span style={{ color: '#00D4FF' }}>an n8n workflow.</span>
        </h1>

        <p style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 20, color: '#8B9ABF', maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.7 }}>
          Describe your automation in plain English. Our AI generates a production-ready n8n JSON workflow — free to download, yours to keep.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          <a href="/generate" style={{ padding: '14px 32px', background: '#00D4FF', borderRadius: 10, fontSize: 16, fontWeight: 900, color: '#080C14', textDecoration: 'none', letterSpacing: -0.3 }}>
            Generate My Workflow →
          </a>
          <a href={N8N_AFFILIATE} target="_blank" rel="noopener noreferrer" style={{ padding: '14px 24px', background: 'transparent', border: '1px solid #1F2D45', borderRadius: 10, fontSize: 14, fontWeight: 700, color: '#8B9ABF', textDecoration: 'none' }}>
            Get n8n Free ↗
          </a>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, marginTop: 48, paddingTop: 40, borderTop: '1px solid #1F2D45', flexWrap: 'wrap' }}>
          {[['Free to generate', '✓'], ['No credit card needed', '✓'], ['Import directly to n8n', '✓'], ['Yours to keep forever', '✓']].map(([label, icon]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#8B9ABF' }}>
              <span style={{ color: '#C8F135', fontWeight: 900 }}>{icon}</span> {label}
            </div>
          ))}
        </div>
      </section>

      {/* WORKFLOW PREVIEW */}
      <section style={{ padding: '0 40px 80px', maxWidth: 900, margin: '0 auto' }}>
        <div style={{ background: '#0D1320', border: '1px solid #1F2D45', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ background: '#111827', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid #1F2D45' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBD2E' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28CA42' }} />
            <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#4A5A7A', marginLeft: 8 }}>prompttoflow-workflow.json</span>
          </div>
          <div style={{ padding: 28 }}>
            <pre style={{ fontFamily: 'monospace', fontSize: 12, color: '#00D4FF', lineHeight: 1.8, overflowX: 'auto' }}>{`{
  `}<span style={{ color: '#7EC8E3' }}>"name"</span>{`: `}<span style={{ color: '#C8F135' }}>"Lead Capture → HubSpot → Slack"</span>{`,
  `}<span style={{ color: '#7EC8E3' }}>"nodes"</span>{`: [
    { `}<span style={{ color: '#7EC8E3' }}>"name"</span>{`: `}<span style={{ color: '#C8F135' }}>"Webhook Trigger"</span>{`, `}<span style={{ color: '#7EC8E3' }}>"type"</span>{`: `}<span style={{ color: '#C8F135' }}>"n8n-nodes-base.webhook"</span>{` },
    { `}<span style={{ color: '#7EC8E3' }}>"name"</span>{`: `}<span style={{ color: '#C8F135' }}>"Add to HubSpot"</span>{`,   `}<span style={{ color: '#7EC8E3' }}>"type"</span>{`: `}<span style={{ color: '#C8F135' }}>"n8n-nodes-base.hubspot"</span>{` },
    { `}<span style={{ color: '#7EC8E3' }}>"name"</span>{`: `}<span style={{ color: '#C8F135' }}>"Slack Notification"</span>{`, `}<span style={{ color: '#7EC8E3' }}>"type"</span>{`: `}<span style={{ color: '#C8F135' }}>"n8n-nodes-base.slack"</span>{` }
  ],
  `}<span style={{ color: '#7EC8E3' }}>"meta"</span>{`: { `}<span style={{ color: '#7EC8E3' }}>"description"</span>{`: `}<span style={{ color: '#C8F135' }}>"Auto-generated by PromptToFlow"</span>{` }
}`}</pre>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: '80px 40px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#00D4FF', marginBottom: 12 }}>How it works</div>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 900, letterSpacing: -1.5 }}>Three steps to automation</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {HOW_IT_WORKS.map((item) => (
            <div key={item.step} style={{ background: '#111827', border: '1px solid #1F2D45', borderRadius: 14, padding: 32 }}>
              <div style={{ fontFamily: 'monospace', fontSize: 11, color: '#00D4FF', marginBottom: 16, letterSpacing: 1 }}>Step {item.step}</div>
              <div style={{ fontSize: 32, marginBottom: 14, animation: 'float 3s ease-in-out infinite' }}>{item.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 800, letterSpacing: -0.5, marginBottom: 10 }}>{item.title}</h3>
              <p style={{ fontSize: 14, color: '#8B9ABF', lineHeight: 1.7 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* N8N AFFILIATE BANNER */}
        <div style={{ marginTop: 32, padding: '24px 32px', background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.15)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Don't have n8n yet?</div>
            <div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 13, color: '#8B9ABF' }}>Sign up free and import your workflow in 2 minutes. Self-hosted, open-source, yours forever.</div>
          </div>
          <a href={N8N_AFFILIATE} target="_blank" rel="noopener noreferrer" style={{ padding: '10px 20px', background: 'transparent', border: '1px solid #00D4FF', borderRadius: 8, fontSize: 13, fontWeight: 800, color: '#00D4FF', textDecoration: 'none', whiteSpace: 'nowrap' }}>Get n8n Free →</a>
        </div>
      </section>

      {/* USE CASES */}
      <section id="use-cases" style={{ padding: '80px 40px', background: '#0D1320' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#00D4FF', marginBottom: 12 }}>Use cases</div>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 900, letterSpacing: -1.5 }}>What people automate</h2>
            <p style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 16, color: '#8B9ABF', marginTop: 12 }}>Real workflows generated by real users — just like you.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
            {USE_CASES.map((item) => (
              <div key={item.title} style={{ background: '#111827', border: '1px solid #1F2D45', borderRadius: 12, padding: 24, display: 'flex', gap: 16 }}>
                <div style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 6 }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: '#8B9ABF', lineHeight: 1.7 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: '80px 40px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#00D4FF', marginBottom: 12 }}>Pricing</div>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 900, letterSpacing: -1.5 }}>Simple, transparent pricing</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>

          {/* FREE */}
          <div style={{ background: '#111827', border: '1px solid #1F2D45', borderRadius: 14, padding: 32 }}>
            <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#8B9ABF', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Free</div>
            <div style={{ fontSize: 40, fontWeight: 900, letterSpacing: -1, marginBottom: 4 }}>$0</div>
            <div style={{ fontSize: 13, color: '#8B9ABF', marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid #1F2D45' }}>Forever free, no credit card</div>
            {['5 workflow generations', 'Download JSON instantly', 'Revisions (0.5 credits each)', 'Earn credits by referring friends'].map(f => (
              <div key={f} style={{ display: 'flex', gap: 10, marginBottom: 10, fontSize: 13, color: '#8B9ABF' }}>
                <span style={{ color: '#C8F135', fontWeight: 900 }}>✓</span> {f}
              </div>
            ))}
            <a href="/generate" style={{ display: 'block', marginTop: 24, padding: '12px', background: 'transparent', border: '1px solid #1F2D45', borderRadius: 8, textAlign: 'center', fontSize: 14, fontWeight: 800, color: '#F0F4FF', textDecoration: 'none' }}>Get Started Free</a>
          </div>

          {/* SETUP SERVICE */}
          <div style={{ background: '#080C14', border: '2px solid rgba(0,212,255,0.4)', borderRadius: 14, padding: 32, position: 'relative' }}>
            <div style={{ position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)', background: '#00D4FF', color: '#080C14', fontSize: 10, fontWeight: 800, padding: '3px 12px', borderRadius: '0 0 8px 8px', letterSpacing: 1, whiteSpace: 'nowrap' }}>MOST POPULAR</div>
            <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#00D4FF', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Setup Service</div>
            <div style={{ fontSize: 40, fontWeight: 900, letterSpacing: -1, marginBottom: 4 }}>$99<span style={{ fontSize: 18, fontWeight: 400, color: '#8B9ABF' }}>+</span></div>
            <div style={{ fontSize: 13, color: '#8B9ABF', marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid #1F2D45' }}>One-time, I set it up for you</div>
            {['Import workflow to your n8n', 'Configure all credentials', 'Test and verify it works', 'Loom video walkthrough', '3–7 day delivery'].map(f => (
              <div key={f} style={{ display: 'flex', gap: 10, marginBottom: 10, fontSize: 13, color: '#8B9ABF' }}>
                <span style={{ color: '#C8F135', fontWeight: 900 }}>✓</span> {f}
              </div>
            ))}
            <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'block', marginTop: 24, padding: '12px', background: '#00D4FF', border: 'none', borderRadius: 8, textAlign: 'center', fontSize: 14, fontWeight: 800, color: '#080C14', textDecoration: 'none' }}>Book Setup Call →</a>
          </div>

          {/* TEMPLATES */}
          <div style={{ background: '#111827', border: '1px solid #1F2D45', borderRadius: 14, padding: 32 }}>
            <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#8B9ABF', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Templates</div>
            <div style={{ fontSize: 40, fontWeight: 900, letterSpacing: -1, marginBottom: 4 }}>$19<span style={{ fontSize: 18, fontWeight: 400, color: '#8B9ABF' }}>–$79</span></div>
            <div style={{ fontSize: 13, color: '#8B9ABF', marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid #1F2D45' }}>One-time purchase</div>
            {['Pre-built, tested workflows', 'Full documentation included', 'Import in one click', 'For specific use cases', 'New templates added monthly'].map(f => (
              <div key={f} style={{ display: 'flex', gap: 10, marginBottom: 10, fontSize: 13, color: '#8B9ABF' }}>
                <span style={{ color: '#C8F135', fontWeight: 900 }}>✓</span> {f}
              </div>
            ))}
            <a href="/templates" style={{ display: 'block', marginTop: 24, padding: '12px', background: 'transparent', border: '1px solid #1F2D45', borderRadius: 8, textAlign: 'center', fontSize: 14, fontWeight: 800, color: '#F0F4FF', textDecoration: 'none' }}>Browse Templates</a>
          </div>

        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: '80px 40px', background: '#0D1320' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#00D4FF', marginBottom: 12 }}>FAQ</div>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 900, letterSpacing: -1.5 }}>Common questions</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ background: '#111827', border: `1px solid ${openFaq === i ? 'rgba(0,212,255,0.3)' : '#1F2D45'}`, borderRadius: 10, overflow: 'hidden', transition: 'border-color 0.2s' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '18px 24px', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', textAlign: 'left' }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: '#F0F4FF', fontFamily: 'inherit' }}>{faq.q}</span>
                  <span style={{ color: '#00D4FF', fontSize: 20, flexShrink: 0, marginLeft: 16 }}>{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 24px 20px', fontSize: 14, color: '#8B9ABF', lineHeight: 1.7 }}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{ padding: '80px 40px', maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, letterSpacing: -2, lineHeight: 1.1, marginBottom: 20 }}>
          Stop doing it manually.<br />
          <span style={{ color: '#00D4FF' }}>Start automating today.</span>
        </h2>
        <p style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 18, color: '#8B9ABF', marginBottom: 36 }}>
          Free to generate. Yours to keep. No credit card needed.
        </p>
        <a href="/generate" style={{ display: 'inline-block', padding: '16px 40px', background: '#00D4FF', borderRadius: 10, fontSize: 18, fontWeight: 900, color: '#080C14', textDecoration: 'none', letterSpacing: -0.3 }}>
          Generate My Free Workflow →
        </a>
        <div style={{ marginTop: 20, fontSize: 13, color: '#4A5A7A', fontFamily: 'monospace' }}>
          5 free credits on signup · No credit card · Cancel anytime
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '40px', borderTop: '1px solid #1F2D45', background: '#0D1320' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 32 }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: 18, letterSpacing: -0.5, marginBottom: 10 }}>Prompt<span style={{ color: '#00D4FF' }}>To</span>Flow</div>
            <div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 13, color: '#8B9ABF', lineHeight: 1.7, maxWidth: 240 }}>Turn any business process into a ready-to-import n8n workflow — free to generate, yours to keep.</div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#4A5A7A', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14 }}>Product</div>
            {[['Generate Workflow', '/generate'], ['Templates', '/templates'], ['Pricing', '#pricing'], ['How It Works', '#how-it-works']].map(([label, href]) => (
              <a key={label} href={href} style={{ display: 'block', fontSize: 13, color: '#8B9ABF', textDecoration: 'none', marginBottom: 8 }}>{label}</a>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#4A5A7A', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14 }}>Resources</div>
            {[['Get n8n Free', N8N_AFFILIATE], ['Setup Service', CAL_LINK], ['Blog', '/blog'], ['FAQ', '#faq']].map(([label, href]) => (
              <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{ display: 'block', fontSize: 13, color: label === 'Get n8n Free' ? '#00D4FF' : '#8B9ABF', textDecoration: 'none', marginBottom: 8 }}>{label}</a>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#4A5A7A', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14 }}>Legal</div>
            {[['Privacy Policy', '/privacy'], ['Terms of Service', '/terms']].map(([label, href]) => (
              <a key={label} href={href} style={{ display: 'block', fontSize: 13, color: '#8B9ABF', textDecoration: 'none', marginBottom: 8 }}>{label}</a>
            ))}
          </div>
        </div>
        <div style={{ paddingTop: 24, borderTop: '1px solid #1F2D45', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontFamily: 'monospace', fontSize: 11, color: '#4A5A7A' }}>© 2026 PromptToFlow. All rights reserved.</div>
          <div style={{ fontFamily: 'monospace', fontSize: 11, color: '#4A5A7A' }}>Built for automation lovers 🤖</div>
        </div>
      </footer>

    </div>
  )
}
