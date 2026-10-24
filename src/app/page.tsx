'use client';

import React, { useState } from 'react';

const initialReports = [
  { title: 'Architecture integrity', status: 'PASS', score: '98%', tone: 'green', detail: 'Service boundaries and dependency flow are consistent with the declared system contract.' },
  { title: 'Milestone velocity', status: 'WATCH', score: '82%', tone: 'violet', detail: 'Core execution is on track. Two milestones show elevated delivery variance this cycle.' },
  { title: 'Risk surface', status: '3 FLAGS', score: 'LOW', tone: 'amber', detail: 'No critical blockers detected. Review the highlighted handoff and observability gaps.' },
];

const metrics = [
  { label: 'PROJECT HEALTH', value: '94', suffix: '/100', delta: '+6.2%', color: 'text-emerald-400' },
  { label: 'CONTRACT BALANCE', value: '12.4', suffix: ' hrs', delta: 'ACTIVE', color: 'text-violet-300' },
  { label: 'AUDIT COMPLETION', value: '87', suffix: '%', delta: 'ON TRACK', color: 'text-sky-300' },
];

export default function Home() {
  const [logs, setLogs] = useState('');
  const [reports, setReports] = useState(initialReports);
  const [isAuditing, setIsAuditing] = useState(false);

  const runAudit = async () => {
    if (!logs.trim()) return;
    setIsAuditing(true);
    
    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logs })
      });

      if (!response.ok) throw new Error('API server error');
      const data = await response.json();
      setReports(data.reports);
    } catch (err) {
      alert("Failed to reach backend compute modules. Falling back to default baseline status.");
    } finally {
      setIsAuditing(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-violet-500/30 font-sans antialiased flex flex-col">
      <header className="flex h-16 items-center justify-between border-b border-zinc-800/90 px-5 md:px-8 bg-zinc-950">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-semibold tracking-tight text-white">
            ProctorAI <span className="text-zinc-600">//</span> <span className="text-zinc-400">Solo Workspace</span>
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-zinc-500">
          <span>v1.4.0</span>
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-emerald-400 font-mono">
            ● System Online
          </span>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1600px] grid-cols-1 lg:grid-cols-[250px_1fr] w-full flex-1">
        <aside className="border-b border-zinc-800/90 p-5 lg:min-h-[calc(100vh-4rem)] lg:border-b-0 lg:border-r lg:p-6">
          <div className="mb-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">Workspace status</p>
            <div className="mt-3 text-sm text-zinc-300 font-mono">// Engine Ready</div>
          </div>
          <div className="flex flex-col gap-4">
            {metrics.map(({ label, value, suffix, delta, color }) => (
              <div key={label} className="border-b border-zinc-800 pb-5">
                <div className="mb-3">
                  <span className="font-mono text-[10px] tracking-[0.14em] text-zinc-500">{label}</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-semibold tracking-tight text-zinc-100">{value}</span>
                  <span className="font-mono text-xs text-zinc-500">{suffix}</span>
                </div>
                <span className={`mt-2 inline-flex text-[10px] font-semibold ${color}`}>{delta}</span>
              </div>
            ))}
          </div>
        </aside>

        <section className="min-w-0 p-5 md:p-8 lg:p-10 flex flex-col space-y-6">
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-violet-300">/ audit workspace</p>
            <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">System intelligence, verified.</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-500">Paste your latest operations logs. ProctorAI will inspect delivery health, contract drift, and execution risk parameters.</p>
          </div>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.8fr)] items-start">
            <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 shadow-2xl">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-200">Paste System Operations / Milestone Logs Here</span>
                <span className="font-mono text-[10px] text-zinc-600">INPUT_STREAM</span>
              </div>
              <textarea 
                value={logs} 
                onChange={(e) => setLogs(e.target.value)} 
                placeholder="// e.g. Milestone 04 completed...\n// Contract balance updated..." 
                className="min-h-52 w-full resize-none rounded-xl border border-zinc-800 bg-zinc-950/80 p-4 font-mono text-xs leading-6 text-zinc-300 outline-none focus:border-violet-500/60 transition" 
              />
              <div className="mt-4 flex items-center justify-between">
                <span className="font-mono text-[10px] text-zinc-600">{logs.length.toString().padStart(3, '0')} CHARS CAPTURED</span>
                <button 
                  onClick={runAudit} 
                  disabled={!logs.trim() || isAuditing} 
                  className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-2.5 text-xs font-semibold rounded-lg disabled:opacity-50"
                >
                  {isAuditing ? 'Analyzing...' : 'Run AI System Audit 🪄'}
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 flex flex-col space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <h2 className="text-sm font-medium text-zinc-200">Computed Protocol Metrics</h2>
                <span className="font-mono text-[9px] text-zinc-500">AUTO</span>
              </div>
              <div className="flex flex-col gap-4">
                {reports.map((report, idx) => (
                  <div key={idx} className="border border-zinc-800 bg-zinc-950/40 p-4 rounded-xl flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-bold font-mono text-xs">{report.title}</span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border border-zinc-900 ${report.tone === 'green' ? 'text-emerald-400 bg-emerald-950/20' : report.tone === 'violet' ? 'text-violet-400 bg-violet-950/20' : 'text-amber-400 bg-amber-950/20'}`}>
                        {report.status} ({report.score || 'N/A'})
                      </span>
                    </div>
                    <p className="text-zinc-400 text-xs leading-relaxed border-t border-zinc-800/50 pt-2">{report.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
