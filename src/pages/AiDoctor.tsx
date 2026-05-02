import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiUploadCloud, FiCheckCircle, FiAlertTriangle, FiExternalLink,
  FiX, FiZap, FiShield, FiBook, FiActivity, FiArrowRight, FiCamera,
} from 'react-icons/fi'
import { Link } from 'react-router-dom'

type Remedy = { name: string; type: 'organic' | 'chemical'; link: string }
type Resource = { id: string; title: string; kind: 'lesson' | 'blog'; minutes: number }
type Diagnosis = {
  plantName: string
  diseaseName: string
  confidence: number
  severity: 'low' | 'medium' | 'high'
  summary: string
  steps: string[]
  notifications: string[]
  remedies: Remedy[]
  resources: Resource[]
  envTips: string[]
}

const MOCK: Diagnosis = {
  plantName: 'Tomato (Solanum lycopersicum)',
  diseaseName: 'Early Blight (Alternaria solani)',
  confidence: 0.94,
  severity: 'medium',
  summary:
    'FLORE AI detected early blight common in warm, humid Indian climates. It affects lower leaves first and spreads quickly during monsoon conditions.',
  steps: [
    'Isolate this plant from nearby tomatoes and potatoes to prevent spread.',
    'Prune the most affected lower leaves — disinfect tools with 70% alcohol between cuts.',
    'Avoid overhead watering; water only at the base in the morning.',
    'Apply a neem oil + potassium bicarbonate spray on affected foliage every 5–7 days.',
    'Mulch the soil with dry leaves or cocopeat to reduce soil splash during rain.',
  ],
  notifications: [
    'Avoid watering leaves in the evening for the next 5 days.',
    'Monitor nearby plants for circular brown spots with yellow halos.',
    'If 40 % of foliage is affected, consider aggressive treatment or plant replacement.',
  ],
  remedies: [
    { name: 'Cold-pressed Neem Oil (Azadirachtin 3000 ppm)', type: 'organic', link: 'https://www.amazon.in/s?k=neem+oil+3000+ppm' },
    { name: 'Copper Oxychloride Fungicide — low-dose garden pack', type: 'chemical', link: 'https://www.amazon.in/s?k=copper+oxychloride+fungicide' },
    { name: 'Trichoderma Biofungicide — soil drench', type: 'organic', link: 'https://www.amazon.in/s?k=trichoderma+biofungicide' },
  ],
  resources: [
    { id: 'l1', title: 'Treating Fungal Leaf Spots in Tropical Climates', kind: 'lesson', minutes: 8 },
    { id: 'b1', title: 'Organic DIY Sprays Using Neem, Turmeric & Buttermilk', kind: 'blog', minutes: 6 },
    { id: 'l2', title: 'Monsoon Plant Protection — Full Guide', kind: 'lesson', minutes: 12 },
  ],
  envTips: ['High humidity detected — ventilate pots', 'Avoid watering between 2–5 PM', 'Monsoon season: check for root rot weekly'],
}

const severityConfig = {
  low:    { label: 'Low Risk',    color: '#34d399', bg: 'rgba(52,211,153,0.12)',   ring: '#34d399' },
  medium: { label: 'Medium Risk', color: '#fbbf24', bg: 'rgba(251,191,36,0.12)',  ring: '#fbbf24' },
  high:   { label: 'High Risk',   color: '#f87171', bg: 'rgba(248,113,113,0.12)', ring: '#f87171' },
}

const howItWorks = [
  { icon: FiCamera,   title: 'Snap or upload',   body: 'Take a close-up of the diseased leaf, stem or fruit in daylight.' },
  { icon: FiZap,      title: 'AI scans in 1 sec', body: 'Our model checks against 50 K+ plant disease samples.' },
  { icon: FiShield,   title: 'Get your report',   body: 'Receive a full treatment card tuned for Indian conditions.' },
  { icon: FiArrowRight, title: 'Buy & learn',     body: 'Order remedies on Amazon or open the matched LMS lesson.' },
]

type ResultTab = 'treatment' | 'remedies' | 'learn'

export function AiDoctor() {
  const [file,        setFile]        = useState<File | null>(null)
  const [previewUrl,  setPreviewUrl]  = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [diagnosis,   setDiagnosis]   = useState<Diagnosis | null>(null)
  const [activeTab,   setActiveTab]   = useState<ResultTab>('treatment')
  const [isDragging,  setIsDragging]  = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFiles(files: FileList | null) {
    const f = files?.[0]
    if (!f) return
    setFile(f)
    setDiagnosis(null)
    setActiveTab('treatment')
    setPreviewUrl(URL.createObjectURL(f))
  }

  function handleAnalyze() {
    if (!file) return
    setIsAnalyzing(true)
    setDiagnosis(null)
    setTimeout(() => { setDiagnosis(MOCK); setIsAnalyzing(false) }, 2200)
  }

  function clearFile() {
    setFile(null)
    setPreviewUrl(null)
    setDiagnosis(null)
  }

  // SVG ring for confidence
  const R = 40
  const circ = 2 * Math.PI * R
  const conf = diagnosis?.confidence ?? 0
  const offset = circ * (1 - conf)

  const sev = diagnosis ? severityConfig[diagnosis.severity] : null

  return (
    <div className="space-y-6 pb-4">

      {/* ── Page header ── */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            AI Doctor · India-focused diagnostics
          </div>
          <h1 className="text-2xl font-black tracking-[-0.03em] text-white md:text-3xl">
            Diagnose plant diseases
            <span className="bg-gradient-to-r from-emerald-300 to-lime-200 bg-clip-text text-transparent"> instantly.</span>
          </h1>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-slate-400">
            Upload a photo and get a full treatment card, care notifications, and remedy links — tuned for Indian seasons and plants.
          </p>
        </div>

        {/* Stats strip */}
        <div className="flex shrink-0 flex-wrap gap-4">
          {[
            { val: '50K+', label: 'Diagnoses' },
            { val: '94%',  label: 'Accuracy' },
            { val: '200+', label: 'Diseases' },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-2.5 text-center">
              <p className="text-lg font-black text-emerald-300">{s.val}</p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">

        {/* ── LEFT: Upload zone ── */}
        <div className="space-y-4">

          {/* Drop zone */}
          <div
            className="relative overflow-hidden rounded-3xl border-2 border-dashed transition-all duration-300"
            style={{
              borderColor: isDragging ? '#34d399' : previewUrl ? 'rgba(52,211,153,0.4)' : 'rgba(255,255,255,0.12)',
              background: isDragging ? 'rgba(52,211,153,0.05)' : 'rgba(255,255,255,0.02)',
              minHeight: previewUrl ? '280px' : '220px',
            }}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFiles(e.dataTransfer.files) }}
          >
            <AnimatePresence mode="wait">
              {!previewUrl ? (
                /* ── Empty state ── */
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center gap-4 p-12"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/5">
                    <FiUploadCloud className="h-8 w-8 text-slate-400" />
                  </div>
                  <div className="text-center">
                    <p className="mb-1 text-base font-bold text-white">Drop your plant photo here</p>
                    <p className="text-sm text-slate-500">or click to browse · JPG, PNG, WEBP</p>
                  </div>
                  <label className="cursor-pointer">
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-6 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300">
                      <FiCamera className="h-4 w-4" />
                      Choose photo
                    </span>
                    <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFiles(e.target.files)} />
                  </label>
                </motion.div>
              ) : (
                /* ── Preview + scan ── */
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  className="relative"
                >
                  <img
                    src={previewUrl}
                    alt="Plant preview"
                    className="h-72 w-full object-cover"
                  />
                  {/* Dark veil */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060c07]/80 via-transparent to-transparent" />

                  {/* Scanning animation */}
                  {isAnalyzing && (
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                      <motion.div
                        className="absolute inset-x-0 h-1 rounded-full"
                        style={{ background: 'linear-gradient(90deg, transparent, #34d399, #a3e635, #34d399, transparent)', boxShadow: '0 0 20px #34d399, 0 0 40px #34d39966' }}
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                      />
                      {/* Grid overlay */}
                      <div className="absolute inset-0 opacity-20"
                        style={{ backgroundImage: 'linear-gradient(rgba(52,211,153,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,0.3) 1px, transparent 1px)', backgroundSize: '30px 30px' }}
                      />
                      {/* Corner brackets */}
                      {[['top-3 left-3 border-t-2 border-l-2', ''], ['top-3 right-3 border-t-2 border-r-2', ''], ['bottom-3 left-3 border-b-2 border-l-2', ''], ['bottom-3 right-3 border-b-2 border-r-2', '']].map(([cls], i) => (
                        <div key={i} className={`absolute h-7 w-7 border-emerald-400 ${cls}`} />
                      ))}
                    </div>
                  )}

                  {/* Remove button */}
                  {!isAnalyzing && (
                    <button
                      type="button"
                      onClick={clearFile}
                      className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-sm transition hover:bg-white/20"
                    >
                      <FiX className="h-4 w-4" />
                    </button>
                  )}

                  {/* File info bottom */}
                  <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-3">
                    <div>
                      <p className="text-xs font-semibold text-white">{file?.name}</p>
                      <p className="text-[10px] text-slate-400">{file ? (file.size / 1024).toFixed(0) + ' KB' : ''}</p>
                    </div>
                    {isAnalyzing && (
                      <div className="flex items-center gap-2 rounded-full border border-emerald-400/30 bg-black/60 px-3 py-1.5 text-xs font-bold text-emerald-300 backdrop-blur-md">
                        <span className="h-2 w-2 animate-spin rounded-full border-2 border-emerald-300 border-t-transparent" />
                        Scanning…
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Analyze button row */}
          {previewUrl && !isAnalyzing && !diagnosis && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleAnalyze}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-bold text-slate-950 shadow-xl shadow-emerald-500/30 transition hover:bg-emerald-300"
              >
                <FiActivity className="h-4 w-4" />
                Run AI Diagnosis
              </button>
              <label className="cursor-pointer">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10">
                  <FiCamera className="h-4 w-4" />
                  Change photo
                </span>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFiles(e.target.files)} />
              </label>
              <p className="text-[11px] text-slate-500">No data stored — demo mode</p>
            </motion.div>
          )}

          {/* ── DIAGNOSIS RESULT CARD ── */}
          <AnimatePresence>
            {diagnosis && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="overflow-hidden rounded-3xl border border-white/10"
                style={{ background: 'linear-gradient(135deg, #0a1f0e 0%, #0b1a0d 100%)' }}
              >
                {/* Result header */}
                <div className="relative p-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  {/* Glow */}
                  <div className="pointer-events-none absolute inset-0"
                    style={{ background: `radial-gradient(ellipse at 80% 50%, ${sev?.color}10, transparent 60%)` }}
                  />

                  <div className="relative flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                    {/* Left: names + summary */}
                    <div className="flex-1">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-300">
                          <FiCheckCircle className="h-3 w-3" /> AI Report
                        </span>
                        <span
                          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest"
                          style={{ background: sev?.bg, color: sev?.color, border: `1px solid ${sev?.color}40` }}
                        >
                          <span className="h-1.5 w-1.5 rounded-full" style={{ background: sev?.color }} />
                          {sev?.label}
                        </span>
                      </div>
                      <h2 className="mb-0.5 text-2xl font-black text-white">{diagnosis.diseaseName}</h2>
                      <p className="mb-3 text-sm font-semibold text-emerald-300">{diagnosis.plantName}</p>
                      <p className="max-w-lg text-sm leading-relaxed text-slate-400">{diagnosis.summary}</p>

                      {/* Environment tips strip */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {diagnosis.envTips.map((tip) => (
                          <span key={tip} className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-[11px] text-slate-400">
                            {tip}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right: confidence ring */}
                    <div className="flex flex-col items-center gap-1">
                      <div className="relative h-24 w-24">
                        <svg className="-rotate-90" viewBox="0 0 96 96" width="96" height="96">
                          <circle cx="48" cy="48" r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7" />
                          <motion.circle
                            cx="48" cy="48" r={R}
                            fill="none"
                            stroke={sev?.ring}
                            strokeWidth="7"
                            strokeLinecap="round"
                            strokeDasharray={circ}
                            initial={{ strokeDashoffset: circ }}
                            animate={{ strokeDashoffset: offset }}
                            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                            style={{ filter: `drop-shadow(0 0 8px ${sev?.ring})` }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-2xl font-black text-white">{(conf * 100).toFixed(0)}%</span>
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Confidence</span>
                        </div>
                      </div>
                      {/* Re-scan button */}
                      <button
                        type="button"
                        onClick={clearFile}
                        className="mt-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-slate-400 transition hover:bg-white/10 hover:text-white"
                      >
                        Scan another
                      </button>
                    </div>
                  </div>
                </div>

                {/* Tab bar */}
                <div className="flex border-b border-white/6">
                  {([
                    { key: 'treatment', icon: FiShield,  label: 'Treatment Plan' },
                    { key: 'remedies',  icon: FiActivity, label: 'Remedies' },
                    { key: 'learn',     icon: FiBook,     label: 'Learn More' },
                  ] as { key: ResultTab; icon: React.ElementType; label: string }[]).map((tab) => (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setActiveTab(tab.key)}
                      className={`flex flex-1 items-center justify-center gap-2 px-4 py-3.5 text-xs font-bold transition-all ${
                        activeTab === tab.key
                          ? 'border-b-2 border-emerald-400 text-emerald-300'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      <tab.icon className="h-3.5 w-3.5" />
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab content */}
                <div className="p-6">
                  <AnimatePresence mode="wait">

                    {/* ── Treatment ── */}
                    {activeTab === 'treatment' && (
                      <motion.div key="treatment" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                        <div className="mb-5 grid gap-3 md:grid-cols-2">
                          {/* Steps */}
                          <div>
                            <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-slate-500">Step-by-step treatment</p>
                            <ol className="space-y-2.5">
                              {diagnosis.steps.map((step, i) => (
                                <li key={i} className="flex gap-3 text-sm text-slate-300">
                                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-[10px] font-black text-emerald-300">
                                    {i + 1}
                                  </span>
                                  {step}
                                </li>
                              ))}
                            </ol>
                          </div>

                          {/* Notifications */}
                          <div>
                            <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-slate-500">Smart alerts</p>
                            <ul className="space-y-2.5">
                              {diagnosis.notifications.map((note, i) => (
                                <li key={i} className="flex gap-3 text-sm text-slate-300">
                                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                                  {note}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Quick action */}
                        <Link
                          to="/ai-gardener"
                          className="group inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-5 py-2.5 text-sm font-bold text-emerald-300 transition hover:bg-emerald-400/20"
                        >
                          Save to AI Gardener dashboard
                          <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </motion.div>
                    )}

                    {/* ── Remedies ── */}
                    {activeTab === 'remedies' && (
                      <motion.div key="remedies" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-3">
                        <p className="mb-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Recommended remedies — click to buy</p>
                        {diagnosis.remedies.map((remedy) => (
                          <a
                            key={remedy.name}
                            href={remedy.link}
                            target="_blank"
                            rel="noreferrer"
                            className="group flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition-all hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/[0.05]"
                          >
                            <div className="flex items-center gap-3">
                              <span
                                className="rounded-xl px-2.5 py-1.5 text-[10px] font-black uppercase tracking-wider"
                                style={remedy.type === 'organic'
                                  ? { background: 'rgba(52,211,153,0.15)', color: '#34d399', border: '1px solid rgba(52,211,153,0.25)' }
                                  : { background: 'rgba(56,189,248,0.15)', color: '#38bdf8', border: '1px solid rgba(56,189,248,0.25)' }
                                }
                              >
                                {remedy.type === 'organic' ? '🌿 Organic' : '⚗️ Chemical'}
                              </span>
                              <span className="text-sm text-slate-200">{remedy.name}</span>
                            </div>
                            <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-400/10 px-3 py-1.5 text-xs font-bold text-emerald-300 transition-colors group-hover:bg-emerald-400 group-hover:text-slate-950">
                              Buy Now <FiExternalLink className="h-3 w-3" />
                            </span>
                          </a>
                        ))}
                      </motion.div>
                    )}

                    {/* ── Learn ── */}
                    {activeTab === 'learn' && (
                      <motion.div key="learn" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-3">
                        <p className="mb-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Matched lessons from FLORE LMS</p>
                        {diagnosis.resources.map((res) => (
                          <div key={res.id} className="flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                            <div className="flex items-center gap-3">
                              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm ${res.kind === 'lesson' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-sky-500/15 text-sky-300'}`}>
                                {res.kind === 'lesson' ? '📖' : '✍️'}
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-white">{res.title}</p>
                                <p className="text-[11px] text-slate-500">{res.kind === 'lesson' ? 'Guided lesson' : 'Blog · Deep dive'} · {res.minutes} min</p>
                              </div>
                            </div>
                            <Link
                              to="/lms"
                              className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-slate-300 transition hover:bg-white/10 hover:text-white"
                            >
                              Open <FiArrowRight className="h-3 w-3" />
                            </Link>
                          </div>
                        ))}
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── RIGHT: How it works + tips ── */}
        <div className="space-y-4">

          {/* How it works */}
          <div className="overflow-hidden rounded-3xl border border-white/8" style={{ background: 'linear-gradient(160deg, #0a1f0e, #080f09)' }}>
            <div className="border-b border-white/6 px-5 py-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">How it works</p>
            </div>
            <div className="space-y-0 divide-y divide-white/6 px-2 py-2">
              {howItWorks.map((step, i) => (
                <div key={i} className="flex gap-4 px-3 py-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.04]">
                    <step.icon className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div>
                    <p className="mb-0.5 text-sm font-bold text-white">{step.title}</p>
                    <p className="text-xs leading-relaxed text-slate-500">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* India focus card */}
          <div className="relative overflow-hidden rounded-3xl border border-white/8 p-5" style={{ background: '#0a1f0e' }}>
            <div className="pointer-events-none absolute inset-0"
              style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(52,211,153,0.1), transparent 60%)' }}
            />
            <div className="relative">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Scan focus</p>
                <span className="rounded-full border border-emerald-400/25 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold text-emerald-300">
                  🇮🇳 India
                </span>
              </div>
              <p className="mb-3 text-sm leading-relaxed text-slate-300">
                Tuned for <span className="font-bold text-emerald-300">tropical & subtropical Indian climates</span> — from terrace gardens to small farms.
              </p>
              <ul className="space-y-2">
                {[
                  'Tomatoes, chilies, curry leaf, hibiscus, money plant & 200+ more',
                  'Understands monsoon humidity and typical fungal outbreaks',
                  'Connects remedies to Amazon India & LMS lessons',
                ].map((tip) => (
                  <li key={tip} className="flex gap-2 text-xs text-slate-400">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Warning if no diagnosis yet */}
          {!diagnosis && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex gap-3 rounded-2xl border border-amber-500/25 bg-amber-500/8 p-4 text-xs text-amber-200"
            >
              <FiAlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
              <p>Upload a clear, close-up photo of the affected leaf or stem in natural daylight for the most accurate diagnosis.</p>
            </motion.div>
          )}

          {/* After diagnosis: quick links */}
          {diagnosis && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
              <Link to="/ai-gardener"
                className="group flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-3.5 transition hover:bg-white/[0.06]">
                <div>
                  <p className="text-sm font-bold text-white">AI Gardener OS</p>
                  <p className="text-xs text-slate-500">Save this diagnosis as a plant card</p>
                </div>
                <FiArrowRight className="h-4 w-4 text-emerald-400 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/marketplace"
                className="group flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-3.5 transition hover:bg-white/[0.06]">
                <div>
                  <p className="text-sm font-bold text-white">Marketplace</p>
                  <p className="text-xs text-slate-500">Buy the recommended remedies</p>
                </div>
                <FiArrowRight className="h-4 w-4 text-emerald-400 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/lms"
                className="group flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-3.5 transition hover:bg-white/[0.06]">
                <div>
                  <p className="text-sm font-bold text-white">Learning Centre</p>
                  <p className="text-xs text-slate-500">Watch matched lessons</p>
                </div>
                <FiArrowRight className="h-4 w-4 text-emerald-400 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
