import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import {
  FiPlus, FiSun, FiDroplet, FiWind, FiThermometer,
  FiCheckCircle, FiAlertTriangle, FiX, FiActivity,
  FiMapPin, FiChevronRight, FiZap, FiRefreshCw,
} from 'react-icons/fi'
import { Link } from 'react-router-dom'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

type Plant = {
  id: string
  name: string
  species: string
  type: 'indoor' | 'outdoor'
  sunlight: 'low' | 'medium' | 'high'
  location: string
  city: string
  lastWateredDaysAgo: number
  idealWaterGapDays: number
  health: number
  image: string
  tasks: { id: string; text: string; done: boolean }[]
}

type NewPlantState = {
  name: string
  type: Plant['type']
  sunlight: Plant['sunlight']
  location: string
}

const initialPlants: Plant[] = [
  {
    id: 'p1',
    name: 'Money Plant',
    species: 'Epipremnum aureum',
    type: 'indoor',
    sunlight: 'medium',
    location: 'East-facing balcony rail',
    city: 'Mumbai',
    lastWateredDaysAgo: 1,
    idealWaterGapDays: 2,
    health: 82,
    image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=400&q=80',
    tasks: [
      { id: 't1', text: 'Check soil moisture with finger test', done: false },
      { id: 't2', text: 'Rotate pot 90° for even sunlight', done: true },
      { id: 't3', text: 'Wipe leaves to remove dust', done: false },
    ],
  },
  {
    id: 'p2',
    name: 'Areca Palm',
    species: 'Dypsis lutescens',
    type: 'indoor',
    sunlight: 'low',
    location: 'North-facing window',
    city: 'Bengaluru',
    lastWateredDaysAgo: 3,
    idealWaterGapDays: 4,
    health: 91,
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=400&q=80',
    tasks: [
      { id: 't4', text: 'Water base slowly until it drains', done: false },
      { id: 't5', text: 'Check for spider mites on undersides', done: false },
    ],
  },
  {
    id: 'p3',
    name: 'Cherry Tomato',
    species: 'Solanum lycopersicum',
    type: 'outdoor',
    sunlight: 'high',
    location: 'Terrace grow bag',
    city: 'Pune',
    lastWateredDaysAgo: 0,
    idealWaterGapDays: 1,
    health: 68,
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&q=80',
    tasks: [
      { id: 't6', text: 'Inspect lower leaves for early blight', done: false },
      { id: 't7', text: 'Apply neem oil spray after 5 PM', done: false },
      { id: 't8', text: 'Tie new growth to support stake', done: true },
    ],
  },
  {
    id: 'p4',
    name: 'Tulsi',
    species: 'Ocimum tenuiflorum',
    type: 'outdoor',
    sunlight: 'high',
    location: 'Kitchen windowsill',
    city: 'Chennai',
    lastWateredDaysAgo: 1,
    idealWaterGapDays: 1,
    health: 95,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80',
    tasks: [
      { id: 't9', text: 'Pinch off flower buds to keep bushy', done: false },
    ],
  },
]

function healthColor(h: number) {
  if (h >= 85) return { text: '#34d399', bg: 'rgba(52,211,153,0.15)', ring: '#34d399', label: 'Thriving' }
  if (h >= 65) return { text: '#fbbf24', bg: 'rgba(251,191,36,0.15)',  ring: '#fbbf24', label: 'Needs care' }
  return          { text: '#f87171', bg: 'rgba(248,113,113,0.15)', ring: '#f87171', label: 'At risk' }
}

function waterStatus(plant: Plant) {
  const due = plant.idealWaterGapDays - plant.lastWateredDaysAgo
  if (due <= 0) return { label: 'Water now', color: '#f87171', urgent: true }
  if (due === 1) return { label: 'Water tomorrow', color: '#fbbf24', urgent: false }
  return { label: `Water in ${due}d`, color: '#34d399', urgent: false }
}

const sunlightLabel = { low: 'Low light', medium: 'Filtered', high: 'Full sun' }
const sunlightIcon  = { low: '🌑', medium: '⛅', high: '☀️' }

export function AiGardener() {
  const [plants, setPlants]             = useState<Plant[]>(initialPlants)
  const [selectedId, setSelectedId]     = useState<string>('p1')
  const [showAddForm, setShowAddForm]   = useState(false)
  const [newPlant, setNewPlant]         = useState<NewPlantState>({ name: '', type: 'indoor', sunlight: 'medium', location: '' })

  const selected = plants.find((p) => p.id === selectedId) ?? plants[0]
  const hc       = healthColor(selected.health)
  const ws       = waterStatus(selected)

  const totalTasks     = plants.flatMap((p) => p.tasks).length
  const doneTasks      = plants.flatMap((p) => p.tasks).filter((t) => t.done).length
  const urgentWater    = plants.filter((p) => waterStatus(p).urgent).length

  function toggleTask(plantId: string, taskId: string) {
    setPlants((prev) => prev.map((p) =>
      p.id !== plantId ? p : {
        ...p,
        tasks: p.tasks.map((t) => t.id === taskId ? { ...t, done: !t.done } : t),
      }
    ))
  }

  function handleAddPlant(e: React.FormEvent) {
    e.preventDefault()
    if (!newPlant.name.trim()) return
    const created: Plant = {
      id: `p-${Date.now()}`,
      name: newPlant.name.trim(),
      species: 'Unknown species',
      type: newPlant.type,
      sunlight: newPlant.sunlight,
      location: newPlant.location || 'Custom location',
      city: 'India',
      lastWateredDaysAgo: 0,
      idealWaterGapDays: newPlant.type === 'indoor' ? 4 : 2,
      health: 80,
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80',
      tasks: [{ id: `t-${Date.now()}`, text: 'Set up your first care routine', done: false }],
    }
    setPlants((prev) => [...prev, created])
    setSelectedId(created.id)
    setNewPlant({ name: '', type: 'indoor', sunlight: 'medium', location: '' })
    setShowAddForm(false)
  }

  // Chart
  const chartData = useMemo(() => ({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Moisture %',
        data: [42, 55, 65, 68, 72, 70, 66],
        borderColor: '#34d399',
        backgroundColor: 'rgba(52,211,153,0.08)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#34d399',
        pointRadius: 3,
      },
      {
        label: 'Sunlight score',
        data: [60, 62, 65, 71, 75, 80, 76],
        borderColor: '#38bdf8',
        backgroundColor: 'rgba(56,189,248,0.05)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#38bdf8',
        pointRadius: 3,
      },
    ],
  }), [])

  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#64748b', font: { size: 10 }, boxWidth: 10 } },
      tooltip: {
        backgroundColor: '#0a1f0e',
        borderColor: 'rgba(52,211,153,0.3)',
        borderWidth: 1,
        titleColor: '#e2e8f0',
        bodyColor: '#94a3b8',
      },
    },
    scales: {
      x: { ticks: { color: '#475569', font: { size: 9 } }, grid: { color: 'rgba(255,255,255,0.04)' } },
      y: { ticks: { color: '#475569', font: { size: 9 } }, grid: { color: 'rgba(255,255,255,0.04)' } },
    },
  }), [])

  const R    = 32
  const circ = 2 * Math.PI * R
  const healthOffset = circ * (1 - selected.health / 100)

  return (
    <div className="space-y-6 pb-4">

      {/* ── Header ── */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            AI Gardener · Plant OS
          </div>
          <h1 className="text-2xl font-black tracking-[-0.03em] text-white md:text-3xl">
            Your personal
            <span className="bg-gradient-to-r from-emerald-300 to-lime-200 bg-clip-text text-transparent"> plant dashboard.</span>
          </h1>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-slate-400">
            Track every plant's health, watering schedule, and daily care tasks — all in one intelligent OS.
          </p>
        </div>

        {/* Summary chips */}
        <div className="flex shrink-0 flex-wrap gap-3">
          {[
            { icon: FiActivity,      val: plants.length,             label: 'Plants',        color: '#34d399' },
            { icon: FiCheckCircle,   val: `${doneTasks}/${totalTasks}`, label: 'Tasks done',  color: '#38bdf8' },
            { icon: FiDroplet,       val: urgentWater,               label: 'Need water',    color: urgentWater > 0 ? '#f87171' : '#34d399' },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                <s.icon className="h-3.5 w-3.5" style={{ color: s.color }} />
                <p className="text-base font-black text-white">{s.val}</p>
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">{s.label}</p>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 rounded-2xl border border-emerald-400/25 bg-emerald-500/10 px-4 py-2.5 text-sm font-black text-emerald-300 transition hover:bg-emerald-400/20"
          >
            <FiPlus className="h-4 w-4" /> Add plant
          </button>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="grid gap-5 lg:grid-cols-[1fr_340px]">

        {/* ── LEFT COLUMN ── */}
        <div className="space-y-5">

          {/* Plant cards grid */}
          <div className="grid gap-3 sm:grid-cols-2">
            {plants.map((plant) => {
              const isSelected = plant.id === selectedId
              const ws2 = waterStatus(plant)
              const hc2 = healthColor(plant.health)
              const pendingTasks = plant.tasks.filter((t) => !t.done).length
              return (
                <motion.button
                  key={plant.id}
                  type="button"
                  onClick={() => setSelectedId(plant.id)}
                  layout
                  className="group relative overflow-hidden rounded-3xl border text-left transition-all"
                  style={{
                    borderColor: isSelected ? 'rgba(52,211,153,0.5)' : 'rgba(255,255,255,0.07)',
                    background: isSelected ? 'linear-gradient(135deg,#0a2010,#081408)' : 'linear-gradient(135deg,#0b1a0d,#070e08)',
                    boxShadow: isSelected ? '0 0 0 1px rgba(52,211,153,0.2), 0 8px 24px rgba(52,211,153,0.08)' : 'none',
                  }}
                >
                  {/* Thumbnail strip */}
                  <div className="relative h-28 overflow-hidden">
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f0e]/90 via-[#0a1f0e]/30 to-transparent" />

                    {/* Health ring top-right */}
                    <div className="absolute right-3 top-3">
                      <div className="relative h-9 w-9">
                        <svg className="-rotate-90" viewBox="0 0 72 72" width="36" height="36">
                          <circle cx="36" cy="36" r={R} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                          <circle cx="36" cy="36" r={R} fill="none" stroke={hc2.ring} strokeWidth="6"
                            strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ * (1 - plant.health / 100)}
                            style={{ filter: `drop-shadow(0 0 4px ${hc2.ring})` }}
                          />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-[9px] font-black" style={{ color: hc2.text }}>
                          {plant.health}
                        </span>
                      </div>
                    </div>

                    {/* Water badge bottom-left */}
                    <div className="absolute bottom-2 left-3 flex items-center gap-1 rounded-full border bg-black/60 px-2 py-1 text-[10px] font-bold backdrop-blur-sm"
                      style={{ borderColor: `${ws2.color}40`, color: ws2.color }}>
                      <FiDroplet className="h-3 w-3" />
                      {ws2.label}
                    </div>

                    {/* Pending tasks badge */}
                    {pendingTasks > 0 && (
                      <div className="absolute right-3 bottom-2 flex items-center gap-1 rounded-full border border-amber-400/40 bg-black/60 px-2 py-1 text-[10px] font-bold text-amber-300 backdrop-blur-sm">
                        {pendingTasks} task{pendingTasks > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>

                  {/* Card body */}
                  <div className="p-3.5">
                    <p className="text-sm font-black text-white">{plant.name}</p>
                    <p className="text-[11px] italic text-slate-500">{plant.species}</p>
                    <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-400">
                      <FiMapPin className="h-3 w-3 shrink-0 text-emerald-400" />
                      <span className="truncate">{plant.city} · {plant.location}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="flex items-center gap-1 text-[11px] text-slate-400">
                        {sunlightIcon[plant.sunlight]} {sunlightLabel[plant.sunlight]}
                      </span>
                      <span className="text-[11px] font-bold" style={{ color: hc2.text }}>{hc2.label}</span>
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </div>

          {/* 7-day chart */}
          <div className="overflow-hidden rounded-3xl border border-white/8"
            style={{ background: 'linear-gradient(160deg, #0b1a0d, #070e08)' }}>
            <div className="flex items-center justify-between border-b border-white/6 px-5 py-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">7-day care graph</p>
                <p className="mt-0.5 text-sm font-bold text-white">Moisture & sunlight — {selected.name}</p>
              </div>
              <button type="button"
                className="flex items-center gap-1.5 rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-[11px] text-slate-400 transition hover:text-white">
                <FiRefreshCw className="h-3.5 w-3.5" /> Refresh
              </button>
            </div>
            <div className="p-5">
              <div className="h-48">
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="space-y-4">

          {/* Selected plant detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedId}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden rounded-3xl border border-white/8"
              style={{ background: 'linear-gradient(160deg, #0a1f0e, #060f07)' }}
            >
              {/* Header */}
              <div className="relative border-b border-white/6 p-5">
                <div className="pointer-events-none absolute inset-0"
                  style={{ background: `radial-gradient(ellipse at 100% 0%, ${hc.ring}12, transparent 60%)` }} />
                <div className="relative flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Selected plant</p>
                    <p className="mt-1 text-lg font-black text-white">{selected.name}</p>
                    <p className="text-xs italic text-slate-500">{selected.species}</p>
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
                      <FiMapPin className="h-3 w-3 text-emerald-400" />
                      {selected.city} · {selected.location}
                    </div>
                  </div>

                  {/* Health ring */}
                  <div className="relative h-16 w-16 shrink-0">
                    <svg className="-rotate-90" viewBox="0 0 80 80" width="64" height="64">
                      <circle cx="40" cy="40" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
                      <motion.circle
                        cx="40" cy="40" r={R}
                        fill="none" stroke={hc.ring} strokeWidth="6" strokeLinecap="round"
                        strokeDasharray={circ}
                        initial={{ strokeDashoffset: circ }}
                        animate={{ strokeDashoffset: healthOffset }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        style={{ filter: `drop-shadow(0 0 6px ${hc.ring})` }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-lg font-black" style={{ color: hc.text }}>{selected.health}</span>
                      <span className="text-[9px] font-bold uppercase text-slate-600">Health</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Metric row */}
              <div className="grid grid-cols-3 divide-x divide-white/6 border-b border-white/6">
                {[
                  {
                    icon: FiDroplet, label: 'Last watered',
                    val: selected.lastWateredDaysAgo === 0 ? 'Today' : `${selected.lastWateredDaysAgo}d ago`,
                    color: '#38bdf8',
                  },
                  {
                    icon: FiSun,     label: 'Sunlight',
                    val: sunlightLabel[selected.sunlight],
                    color: '#fbbf24',
                  },
                  {
                    icon: FiActivity, label: 'Next water',
                    val: ws.label,
                    color: ws.color,
                  },
                ].map((m) => (
                  <div key={m.label} className="flex flex-col items-center gap-1 py-4 text-center">
                    <m.icon className="h-4 w-4" style={{ color: m.color }} />
                    <p className="text-sm font-black" style={{ color: m.color }}>{m.val}</p>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">{m.label}</p>
                  </div>
                ))}
              </div>

              {/* Water urgency alert */}
              {ws.urgent && (
                <div className="mx-4 mt-4 flex items-center gap-2.5 rounded-2xl border border-red-400/25 bg-red-500/8 p-3 text-sm font-bold text-red-300">
                  <FiAlertTriangle className="h-4 w-4 shrink-0" />
                  This plant needs water today — soil is likely dry.
                </div>
              )}

              {/* Tasks checklist */}
              <div className="p-5">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Today's care tasks</p>
                  <span className="text-[11px] font-bold text-slate-500">
                    {selected.tasks.filter((t) => t.done).length}/{selected.tasks.length} done
                  </span>
                </div>
                <div className="space-y-2">
                  {selected.tasks.map((task) => (
                    <button
                      key={task.id}
                      type="button"
                      onClick={() => toggleTask(selectedId, task.id)}
                      className="flex w-full items-center gap-3 rounded-2xl border border-white/6 bg-white/[0.02] p-3 text-left transition hover:bg-white/[0.05]"
                    >
                      <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border-2 transition ${task.done ? 'border-emerald-400 bg-emerald-400' : 'border-white/20 bg-transparent'}`}>
                        {task.done && <FiCheckCircle className="h-3.5 w-3.5 text-slate-950" />}
                      </div>
                      <span className={`text-sm transition ${task.done ? 'text-slate-600 line-through' : 'text-slate-200'}`}>
                        {task.text}
                      </span>
                    </button>
                  ))}
                </div>

                {/* AI Doctor link */}
                <Link to="/ai-doctor"
                  className="group mt-4 flex items-center justify-between rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-3 transition hover:border-white/12 hover:bg-white/[0.05]">
                  <div>
                    <p className="text-sm font-bold text-white">Spot a problem?</p>
                    <p className="text-[11px] text-slate-500">Open AI Doctor for instant diagnosis</p>
                  </div>
                  <FiChevronRight className="h-4 w-4 text-emerald-400 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Weather widget */}
          <div className="overflow-hidden rounded-3xl border border-white/8"
            style={{ background: 'linear-gradient(160deg, #0b1a0d, #070e08)' }}>
            <div className="flex items-center justify-between border-b border-white/6 px-5 py-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Weather · {selected.city}</p>
              <span className="flex items-center gap-1 rounded-full border border-emerald-400/20 bg-emerald-500/8 px-2.5 py-1 text-[10px] font-bold text-emerald-300">
                <FiZap className="h-3 w-3" /> AI-aware
              </span>
            </div>
            <div className="p-5">
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/8 text-3xl">
                  🌤️
                </div>
                <div>
                  <p className="text-3xl font-black text-white">31<span className="text-lg text-slate-500">°C</span></p>
                  <p className="text-xs text-slate-500">Feels like 34°C · Warm & humid</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: FiDroplet,     label: 'Humidity', val: '68%',    note: 'Fungal risk',       color: '#38bdf8' },
                  { icon: FiWind,        label: 'Wind',     val: '12 kmh', note: 'Light breeze',      color: '#a3e635' },
                  { icon: FiThermometer, label: 'Rain',     val: '24h',    note: 'Pause watering',    color: '#fb923c' },
                ].map((w) => (
                  <div key={w.label} className="rounded-2xl border border-white/6 bg-white/[0.02] p-3 text-center">
                    <w.icon className="mx-auto mb-1 h-4 w-4" style={{ color: w.color }} />
                    <p className="text-sm font-black text-white">{w.val}</p>
                    <p className="text-[10px] text-slate-500">{w.label}</p>
                    <p className="mt-1 text-[10px] font-bold" style={{ color: w.color }}>{w.note}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex gap-2.5 rounded-2xl border border-emerald-400/15 bg-emerald-500/5 p-3">
                <FiZap className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <p className="text-xs leading-relaxed text-slate-400">
                  <span className="font-bold text-emerald-300">FLORE tip:</span> Rain expected tonight — skip watering outdoor pots and let the drizzle hydrate the soil naturally.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Add Plant modal/drawer ── */}
      <AnimatePresence>
        {showAddForm && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
              onClick={() => setShowAddForm(false)}
            />
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
              className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-lg rounded-t-3xl border-t border-white/10 p-6"
              style={{ background: '#0a1f0e' }}
            >
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">New plant</p>
                  <h2 className="text-lg font-black text-white">Add to your garden</h2>
                </div>
                <button type="button" onClick={() => setShowAddForm(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 hover:text-white">
                  <FiX className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleAddPlant} className="space-y-3">
                <div>
                  <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-500">Plant nickname</label>
                  <input
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-emerald-400/40 focus:ring-1 focus:ring-emerald-400/20"
                    placeholder="e.g. Tulsi · Kitchen window"
                    value={newPlant.name}
                    onChange={(e) => setNewPlant((p) => ({ ...p, name: e.target.value }))}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-500">Type</label>
                    <select
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-400/40"
                      value={newPlant.type}
                      onChange={(e) => setNewPlant((p) => ({ ...p, type: e.target.value as Plant['type'] }))}
                    >
                      <option value="indoor">🏠 Indoor</option>
                      <option value="outdoor">🌿 Outdoor</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-500">Sunlight</label>
                    <select
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-400/40"
                      value={newPlant.sunlight}
                      onChange={(e) => setNewPlant((p) => ({ ...p, sunlight: e.target.value as Plant['sunlight'] }))}
                    >
                      <option value="low">🌑 Low</option>
                      <option value="medium">⛅ Medium</option>
                      <option value="high">☀️ High</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-500">Location / space</label>
                  <input
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-emerald-400/40 focus:ring-1 focus:ring-emerald-400/20"
                    placeholder="e.g. Chennai · West balcony, 4 hrs sun"
                    value={newPlant.location}
                    onChange={(e) => setNewPlant((p) => ({ ...p, location: e.target.value }))}
                  />
                </div>
                <button type="submit"
                  className="w-full rounded-full bg-emerald-400 py-3 text-sm font-black text-slate-950 shadow-xl shadow-emerald-500/30 transition hover:bg-emerald-300 disabled:opacity-40"
                  disabled={!newPlant.name.trim()}>
                  Add plant to dashboard
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
