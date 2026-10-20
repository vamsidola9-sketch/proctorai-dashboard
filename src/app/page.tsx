'use client'

import { useState } from 'react'
import { Activity, AlertTriangle, ArrowUpRight, Check, ChevronRight, CircleDot, ClipboardCheck, Code2, FileCheck2, Gauge, GitBranch, Play, ShieldCheck, Sparkles, Terminal, Timer, X } from 'lucide-react'

const initialReports = [
  { title: 'Architecture integrity', status: 'PASS', score: '98%', tone: 'green', detail: 'Service boundaries and dependency flow are consistent with the declared system contract.', tags: ['contracts', 'dependencies'], icon: ShieldCheck },
  { title: 'Milestone velocity', status: 'WATCH', score: '82%', tone: 'violet', detail: 'Core execution is on track. Two milestones show elevated delivery variance this cycle.', tags: ['delivery', 'timeline'], icon: Activity },
  { title: 'Risk surface', status: '3 FLAGS', score: 'LOW', tone: 'amber', detail: 'No critical blockers detected. Review the highlighted handoff and observability gaps.', tags: ['handoffs', 'observability'], icon: AlertTriangle },
]

const metrics = [
  { label: 'PROJECT HEALTH', value: '94', suffix: '/100', delta: '+6.2%', icon: Gauge, color: 'text-emerald-400' },
  { label: 'CONTRACT BALANCE', value: '12.4', suffix: ' hrs', delta: 'ACTIVE', icon: GitBranch, color: 'text-violet-300' },
  { label: 'AUDIT COMPLETION', value: '87', suffix: '%', delta: 'ON TRACK', icon: ClipboardCheck, color: 'text-sky-300' },
]

export default function Page() {
  const [logs, setLogs] = useState('')
  const [reports, setReports] = useState(initialReports)
  const [isAuditing, setIsAuditing] = useState(false)

  function runAudit() {
    if (!logs.trim()) return
    setIsAuditing(true)
    window.setTimeout(() => {
      setReports(initialReports.map((report, index) => index === 1 ? { ...report, score: '89%', detail: 'The latest operations log indicates improved throughput with one remaining timeline variance to monitor.' } : report))
      setIsAuditing(false)
    }, 650)
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-violet-500/30">
      <header className="flex h-16 items-center justify-between border-b border-zinc-800/90 px-5 md:px-8">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-violet-500 text-white shadow-lg shadow-violet-500/20"><Code2 className="size-4" /></div>
          <span className="font-mono text-sm font-semibold tracking-tight">ProctorAI <span className="text-zinc-600">//</span> <span className="text-zinc-400">Solo Workspace</span></span>
        </div>
        <div className="flex items-center gap-3 text-xs font-medium text-zinc-500"><span className="hidden sm:inline">v1.4.0</span><span className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-emerald-400"><span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px] shadow-emerald-400" /> System Online</span></div>
      </header>

      <div className="mx-auto grid max-w-[1600px] grid-cols-1 lg:grid-cols-[250px_1fr]">
        <aside className="border-b border-zinc-800/90 p-5 lg:min-h-[calc(100vh-4rem)] lg:border-b-0 lg:border-r lg:p-6">
          <div className="mb-10"><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">Workspace status</p><div className="mt-3 flex items-center gap-2 text-sm text-zinc-300"><CircleDot className="size-3 text-emerald-400" /> Audit engine ready</div></div>
          <div className="flex flex-col gap-4">{metrics.map(({ label, value, suffix, delta, icon: Icon, color }) => <div key={label} className="border-b border-zinc-800 pb-5"><div className="mb-3 flex items-center justify-between"><span className="font-mono text-[10px] tracking-[0.14em] text-zinc-500">{label}</span><Icon className={`size-3.5 ${color}`} /></div><div className="flex items-baseline gap-1"><span className="text-3xl font-semibold tracking-tight text-zinc-100">{value}</span><span className="font-mono text-xs text-zinc-500">{suffix}</span></div><span className={`mt-2 inline-flex items-center gap-1 text-[10px] font-semibold tracking-wider ${color}`}>{delta}<ArrowUpRight className="size-3" /></span></div>)}</div>
          <div className="mt-10 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4"><div className="mb-3 flex items-center gap-2 text-xs font-medium text-zinc-300"><Timer className="size-3.5 text-violet-300" /> Next checkpoint</div><p className="font-mono text-xs text-zinc-500">Today, 16:30 UTC</p><div className="mt-3 h-1 overflow-hidden rounded-full bg-zinc-800"><div className="h-full w-[72%] rounded-full bg-violet-500" /></div></div>
        </aside>

        <section className="min-w-0 p-5 md:p-8 lg:p-10">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-violet-300">/ audit workspace</p><h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">System intelligence, <span className="text-zinc-500">verified.</span></h1><p className="mt-3 max-w-xl text-sm leading-6 text-zinc-500">Paste your latest operations and milestone logs. ProctorAI will inspect delivery health, contract drift, and execution risk.</p></div><div className="flex items-center gap-2 font-mono text-[10px] text-zinc-600"><Terminal className="size-3" /> SESSION / 04-18-AX</div></div>

          <div className="grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(360px,.9fr)]">
            <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 shadow-2xl shadow-black/20"><div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.025)_1px,transparent_1px)] bg-[size:24px_24px]" /><div className="relative"><div className="mb-4 flex items-center justify-between"><label htmlFor="system-logs" className="flex items-center gap-2 text-sm font-medium text-zinc-200"><FileCheck2 className="size-4 text-violet-300" /> Paste System Operations / Milestone Logs Here</label><span className="font-mono text-[10px] text-zinc-600">INPUT_STREAM</span></div><textarea id="system-logs" value={logs} onChange={(event) => setLogs(event.target.value)} placeholder="// e.g. Milestone 04 completed...\n// Contract balance updated...\n// Deployment notes..." className="min-h-52 w-full resize-none rounded-xl border border-zinc-800 bg-zinc-950/80 p-4 font-mono text-xs leading-6 text-zinc-300 outline-none placeholder:text-zinc-700 focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/10" /><div className="mt-4 flex items-center justify-between"><span className="font-mono text-[10px] text-zinc-600">{logs.length.toString().padStart(3, '0')} CHARS CAPTURED</span><button onClick={runAudit} disabled={!logs.trim() || isAuditing} className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-violet-900/30 transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50">{isAuditing ? <Activity className="size-3.5 animate-pulse" /> : <Sparkles className="size-3.5" />}{isAuditing ? 'Analyzing stream...' : 'Run AI System Audit'} <ChevronRight className="size-3.5" /></button></div></div></div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5"><div className="mb-5 flex items-center justify-between"><h2 className="text-sm font-medium text-zinc-200">Audit protocol</h2><span className="rounded-md border border-zinc-800 px-2 py-1 font-mono text-[9px] text-zinc-500">AUTO</span></div><div className="flex flex-col gap-4">{['Parse operational context', 'Cross-check system contracts', 'Detect delivery anomalies', 'Generate executive brief'].map((step, index) => <div key={step} className="flex items-center gap-3"><div className={`flex size-6 items-center justify-center rounded-full border text-[10px] ${index < 2 ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' : 'border-zinc-700 bg-zinc-950 text-zinc-600'}`}>{index < 2 ? <Check className="size-3" /> : `0${index + 1}`}</div><span className={`text-xs ${index < 2 ? 'text-zinc-300' : 'text-zinc-500'}`}>{step}</span>{index < 2 && <span className="ml-auto font-mono text-[9px] text-emerald-500/70">DONE</span>}</div>)}</div><div className="mt-6 border-t border-zinc-800 pt-4"><div className="flex items-center justify-between font-mono text-[10px] text-zinc-600"><span>MODEL / PROCTOR-4</span><span>LATENCY / 1.2s</span></div></div></div>
          </div>

          <div className="mt-10"><div className="mb-4 flex items-center justify-between"><div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">Generated output</p><h2 className="mt-1 text-lg font-medium text-zinc-100">Latest audit report</h2></div><div className="flex items-center gap-2 rounded-md border border-zinc-800 px-2.5 py-1.5 font-mono text-[10px] text-zinc-500"><Play className="size-3 fill-current text-emerald-400" /> LIVE VIEW</div></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{reports.map(({ title, status, score, tone, detail, tags, icon: Icon }) => <article key={title} className="group rounded-xl border border-zinc-800 bg-zinc-900/35 p-5 transition hover:border-zinc-700 hover:bg-zinc-900/70"><div className="mb-7 flex items-start justify-between"><div className={`flex size-9 items-center justify-center rounded-lg border ${tone === 'green' ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400' : tone === 'amber' ? 'border-amber-500/20 bg-amber-500/10 text-amber-400' : 'border-violet-500/20 bg-violet-500/10 text-violet-300'}`}><Icon className="size-4" /></div><span className={`font-mono text-[10px] font-semibold tracking-widest ${tone === 'green' ? 'text-emerald-400' : tone === 'amber' ? 'text-amber-400' : 'text-violet-300'}`}>{status}</span></div><div className="mb-2 flex items-baseline gap-2"><h3 className="text-sm font-medium text-zinc-200">{title}</h3><span className="ml-auto font-mono text-lg font-semibold text-zinc-100">{score}</span></div><p className="min-h-[60px] text-xs leading-5 text-zinc-500">{detail}</p><div className="mt-5 flex gap-2">{tags.map((tag) => <span key={tag} className="rounded border border-zinc-800 bg-zinc-950 px-2 py-1 font-mono text-[9px] text-zinc-600">#{tag}</span>)}</div></article>)}</div></div>
        </section>
      </div>
    </main>
  )
}

