import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiArrowRight, FiMessageCircle, FiRepeat, FiMapPin, FiStar,
  FiPlus, FiX, FiSearch, FiFilter, FiCheck, FiShield, FiHeart,
  FiZap, FiUsers,
} from 'react-icons/fi'

type Reliability = 'New' | 'Active' | 'Trusted'

type SwapOffer = {
  id: string
  user: string
  handle: string
  city: string
  avatar: string
  plantHave: string
  plantHaveImage: string
  plantWant: string
  plantType: 'indoor' | 'outdoor' | 'edible'
  reliability: Reliability
  swaps: number
  rating: number
  posted: string
  liked: boolean
}

const allOffers: SwapOffer[] = [
  {
    id: 's1',
    user: 'Meera Krishnan',
    handle: '@meera_grows',
    city: 'Bengaluru',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=80&q=80',
    plantHave: 'Spider Plant babies (3 pups)',
    plantHaveImage: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=400&q=80',
    plantWant: 'Snake plant cutting',
    plantType: 'indoor',
    reliability: 'Trusted',
    swaps: 14,
    rating: 4.9,
    posted: '2 hr ago',
    liked: false,
  },
  {
    id: 's2',
    user: 'Kabir Menon',
    handle: '@kabir_balcony',
    city: 'Mumbai',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80',
    plantHave: 'ZZ Plant cutting (rooted)',
    plantHaveImage: 'https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=400&q=80',
    plantWant: 'Any flowering indoor plant',
    plantType: 'indoor',
    reliability: 'Active',
    swaps: 6,
    rating: 4.7,
    posted: '5 hr ago',
    liked: false,
  },
  {
    id: 's3',
    user: 'Ananya Sharma',
    handle: '@ananya_terrace',
    city: 'Pune',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80',
    plantHave: 'Pink Desi Rose sapling',
    plantHaveImage: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&q=80',
    plantWant: 'Jasmine cutting',
    plantType: 'outdoor',
    reliability: 'New',
    swaps: 1,
    rating: 4.5,
    posted: '1 day ago',
    liked: false,
  },
  {
    id: 's4',
    user: 'Rahul Pillai',
    handle: '@rahul_terrace',
    city: 'Chennai',
    avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=80&q=80',
    plantHave: 'Curry leaf sapling (6 months)',
    plantHaveImage: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80',
    plantWant: 'Tulsi or Holy Basil cutting',
    plantType: 'edible',
    reliability: 'Trusted',
    swaps: 21,
    rating: 5.0,
    posted: '3 hr ago',
    liked: false,
  },
  {
    id: 's5',
    user: 'Priya Iyer',
    handle: '@priya_pots',
    city: 'Bengaluru',
    avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=80&q=80',
    plantHave: 'Monstera Deliciosa cutting',
    plantHaveImage: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=400&q=80',
    plantWant: 'Pothos (golden or marble queen)',
    plantType: 'indoor',
    reliability: 'Active',
    swaps: 9,
    rating: 4.8,
    posted: '8 hr ago',
    liked: false,
  },
  {
    id: 's6',
    user: 'Deepak Nair',
    handle: '@deepak_grows',
    city: 'Mumbai',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80',
    plantHave: 'Cherry Tomato seedlings (4)',
    plantHaveImage: 'https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=400&q=80',
    plantWant: 'Chilli or capsicum seedling',
    plantType: 'edible',
    reliability: 'Active',
    swaps: 4,
    rating: 4.6,
    posted: '12 hr ago',
    liked: false,
  },
]

const reliabilityConfig: Record<Reliability, { label: string; color: string; bg: string; border: string; icon: typeof FiShield }> = {
  Trusted: { label: '✦ Trusted',   color: '#34d399', bg: 'rgba(52,211,153,0.12)',  border: 'rgba(52,211,153,0.3)', icon: FiShield },
  Active:  { label: '● Active',    color: '#38bdf8', bg: 'rgba(56,189,248,0.12)',  border: 'rgba(56,189,248,0.3)', icon: FiZap },
  New:     { label: '○ New',       color: '#94a3b8', bg: 'rgba(148,163,184,0.10)', border: 'rgba(148,163,184,0.2)', icon: FiUsers },
}

const plantTypeColors: Record<string, { label: string; color: string; bg: string }> = {
  indoor:  { label: '🏠 Indoor',  color: '#38bdf8', bg: 'rgba(56,189,248,0.1)' },
  outdoor: { label: '🌿 Outdoor', color: '#34d399', bg: 'rgba(52,211,153,0.1)' },
  edible:  { label: '🫚 Edible',  color: '#fb923c', bg: 'rgba(251,146,60,0.1)' },
}

const CITIES = ['All', 'Bengaluru', 'Mumbai', 'Pune', 'Chennai']
const TYPES  = ['All', 'indoor', 'outdoor', 'edible']

type PostState = { plantHave: string; plantWant: string; type: string; city: string; notes: string }

export function PlantSwap() {
  const [offers,        setOffers]        = useState<SwapOffer[]>(allOffers)
  const [selectedId,    setSelectedId]    = useState<string>('s1')
  const [cityFilter,    setCityFilter]    = useState('All')
  const [typeFilter,    setTypeFilter]    = useState('All')
  const [searchQuery,   setSearchQuery]   = useState('')
  const [showPostForm,  setShowPostForm]  = useState(false)
  const [postData,      setPostData]      = useState<PostState>({ plantHave: '', plantWant: '', type: 'indoor', city: 'Bengaluru', notes: '' })
  const [likedIds,      setLikedIds]      = useState<Set<string>>(new Set())

  const selected = offers.find((o) => o.id === selectedId) ?? offers[0]

  const filtered = useMemo(() => offers.filter((o) => {
    const q = searchQuery.toLowerCase()
    const matchSearch = !q || o.plantHave.toLowerCase().includes(q) || o.plantWant.toLowerCase().includes(q) || o.city.toLowerCase().includes(q) || o.user.toLowerCase().includes(q)
    const matchCity = cityFilter === 'All' || o.city === cityFilter
    const matchType = typeFilter === 'All' || o.plantType === typeFilter
    return matchSearch && matchCity && matchType
  }), [offers, searchQuery, cityFilter, typeFilter])

  const smartMatches = useMemo(() => offers.filter((o) =>
    o.id !== selected?.id &&
    o.city === selected?.city
  ), [offers, selected])

  function toggleLike(id: string) {
    setLikedIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function handlePost(e: React.FormEvent) {
    e.preventDefault()
    if (!postData.plantHave.trim() || !postData.plantWant.trim()) return
    const newOffer: SwapOffer = {
      id: `s-${Date.now()}`,
      user: 'You',
      handle: '@you_on_flore',
      city: postData.city,
      avatar: '',
      plantHave: postData.plantHave,
      plantHaveImage: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80',
      plantWant: postData.plantWant,
      plantType: postData.type as SwapOffer['plantType'],
      reliability: 'New',
      swaps: 0,
      rating: 5.0,
      posted: 'Just now',
      liked: false,
    }
    setOffers((prev) => [newOffer, ...prev])
    setSelectedId(newOffer.id)
    setShowPostForm(false)
    setPostData({ plantHave: '', plantWant: '', type: 'indoor', city: 'Bengaluru', notes: '' })
  }

  return (
    <div className="space-y-6 pb-4">

      {/* ── Header ── */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Plant Swap · Community exchange
          </div>
          <h1 className="text-2xl font-black tracking-[-0.03em] text-white md:text-3xl">
            Trade cuttings,
            <span className="bg-gradient-to-r from-emerald-300 to-lime-200 bg-clip-text text-transparent"> grow together.</span>
          </h1>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-slate-400">
            Browse swap offers near you, match with trusted growers, and exchange plants — no money, just community.
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-3">
          {[
            { val: offers.length, label: 'Active offers',     color: '#34d399' },
            { val: CITIES.length - 1, label: 'Cities',        color: '#38bdf8' },
            { val: '300+', label: 'Swaps done',               color: '#fb923c' },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-2.5">
              <p className="text-base font-black" style={{ color: s.color }}>{s.val}</p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">{s.label}</p>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setShowPostForm(true)}
            className="flex items-center gap-2 rounded-2xl border border-emerald-400/25 bg-emerald-500/10 px-4 py-2.5 text-sm font-black text-emerald-300 transition hover:bg-emerald-400/20"
          >
            <FiPlus className="h-4 w-4" /> Post a swap
          </button>
        </div>
      </div>

      {/* ── Search + Filters ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search plants, users, cities…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.04] py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-400/40 focus:ring-1 focus:ring-emerald-400/20"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <FiFilter className="h-4 w-4 shrink-0 text-slate-500" />
          {CITIES.map((c) => (
            <button key={c} type="button" onClick={() => setCityFilter(c)}
              className={`rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                cityFilter === c ? 'bg-emerald-400 text-slate-950' : 'border border-white/10 bg-white/[0.03] text-slate-400 hover:text-white'
              }`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Type filter pills */}
      <div className="flex flex-wrap gap-2">
        {TYPES.map((t) => {
          const tc = plantTypeColors[t]
          return (
            <button key={t} type="button" onClick={() => setTypeFilter(t)}
              className={`rounded-full border px-3 py-1.5 text-xs font-bold transition-all ${
                typeFilter === t
                  ? 'border-transparent bg-emerald-400 text-slate-950'
                  : 'border-white/10 bg-white/[0.02] text-slate-400 hover:text-white'
              }`}>
              {t === 'All' ? '🌱 All types' : tc?.label ?? t}
            </button>
          )
        })}
      </div>

      {/* ── Main grid ── */}
      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">

        {/* ── Swap cards grid ── */}
        <div>
          {filtered.length === 0 && (
            <div className="rounded-3xl border border-white/8 py-16 text-center text-slate-500">
              No swaps match your filters.
            </div>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            {filtered.map((offer, i) => {
              const rc  = reliabilityConfig[offer.reliability]
              const tc  = plantTypeColors[offer.plantType]
              const isSelected = offer.id === selectedId
              const isLiked = likedIds.has(offer.id)
              return (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => setSelectedId(offer.id)}
                  className="group cursor-pointer overflow-hidden rounded-3xl border transition-all"
                  style={{
                    borderColor: isSelected ? 'rgba(52,211,153,0.5)' : 'rgba(255,255,255,0.07)',
                    background: isSelected ? 'linear-gradient(135deg,#0a2010,#081408)' : 'linear-gradient(135deg,#0b1a0d,#070e08)',
                    boxShadow: isSelected ? '0 0 0 1px rgba(52,211,153,0.15), 0 8px 24px rgba(52,211,153,0.06)' : 'none',
                  }}
                >
                  {/* Plant image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={offer.plantHaveImage}
                      alt={offer.plantHave}
                      className="h-36 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f0e]/90 via-[#0a1f0e]/20 to-transparent" />

                    {/* Type badge top-left */}
                    <div className="absolute left-3 top-3">
                      <span className="rounded-full px-2.5 py-1 text-[10px] font-black"
                        style={{ background: tc.bg, color: tc.color, border: `1px solid ${tc.color}40` }}>
                        {tc.label}
                      </span>
                    </div>

                    {/* Like button top-right */}
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); toggleLike(offer.id) }}
                      className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-black/50 backdrop-blur-sm transition hover:bg-white/20"
                    >
                      <FiHeart className={`h-3.5 w-3.5 transition-colors ${isLiked ? 'fill-rose-400 text-rose-400' : 'text-white'}`} />
                    </button>

                    {/* Reliability badge bottom-right */}
                    <div className="absolute bottom-2 right-3">
                      <span className="rounded-full px-2.5 py-1 text-[10px] font-black backdrop-blur-sm"
                        style={{ background: rc.bg, color: rc.color, border: `1px solid ${rc.border}` }}>
                        {rc.label}
                      </span>
                    </div>

                    {/* Posted time bottom-left */}
                    <span className="absolute bottom-2 left-3 text-[10px] font-semibold text-slate-400">{offer.posted}</span>
                  </div>

                  {/* Card body */}
                  <div className="p-4">
                    {/* Have → Want */}
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex-1 rounded-xl border border-emerald-400/20 bg-emerald-500/8 px-3 py-2">
                        <p className="text-[9px] font-black uppercase tracking-wider text-emerald-500">Has</p>
                        <p className="text-xs font-bold text-emerald-200">{offer.plantHave}</p>
                      </div>
                      <FiRepeat className="h-4 w-4 shrink-0 text-slate-500" />
                      <div className="flex-1 rounded-xl border border-sky-400/20 bg-sky-500/8 px-3 py-2">
                        <p className="text-[9px] font-black uppercase tracking-wider text-sky-500">Wants</p>
                        <p className="text-xs font-bold text-sky-200">{offer.plantWant}</p>
                      </div>
                    </div>

                    {/* User row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {offer.avatar ? (
                          <img src={offer.avatar} alt={offer.user} className="h-8 w-8 rounded-full object-cover ring-2 ring-white/10" />
                        ) : (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-lime-300 text-xs font-black text-slate-950">
                            {offer.user[0]}
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-bold text-white">{offer.user}</p>
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                            <FiMapPin className="h-3 w-3 text-emerald-400" />{offer.city}
                            <span className="text-slate-600">·</span>
                            <FiStar className="h-3 w-3 text-amber-400" />{offer.rating}
                          </div>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-slate-500">{offer.swaps} swaps</span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* ── RIGHT: detail + matches + profile ── */}
        <div className="space-y-4">

          {/* Selected offer detail */}
          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                key={selectedId}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.22 }}
                className="overflow-hidden rounded-3xl border border-white/8"
                style={{ background: 'linear-gradient(160deg,#0a1f0e,#060f07)' }}
              >
                {/* Header */}
                <div className="relative border-b border-white/6 p-5">
                  <div className="pointer-events-none absolute inset-0"
                    style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(52,211,153,0.1),transparent 60%)' }} />
                  <div className="relative flex items-center gap-3">
                    {selected.avatar ? (
                      <img src={selected.avatar} alt={selected.user} className="h-12 w-12 rounded-full object-cover ring-2 ring-emerald-400/30" />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-lime-300 text-lg font-black text-slate-950">
                        {selected.user[0]}
                      </div>
                    )}
                    <div>
                      <p className="font-black text-white">{selected.user}</p>
                      <p className="text-[11px] text-slate-500">{selected.handle}</p>
                      <div className="mt-1 flex items-center gap-2 text-[11px]">
                        <span className="flex items-center gap-1 text-slate-400"><FiMapPin className="h-3 w-3 text-emerald-400" />{selected.city}</span>
                        <span className="flex items-center gap-1 text-amber-300"><FiStar className="h-3 w-3" />{selected.rating}</span>
                        <span className="text-slate-500">{selected.swaps} swaps</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Have / Want */}
                <div className="space-y-2 p-5">
                  <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/8 p-4">
                    <p className="mb-1 text-[9px] font-black uppercase tracking-widest text-emerald-500">Offering</p>
                    <p className="text-base font-black text-emerald-200">{selected.plantHave}</p>
                  </div>
                  <div className="flex justify-center">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5">
                      <FiRepeat className="h-3.5 w-3.5 text-slate-400" />
                    </div>
                  </div>
                  <div className="rounded-2xl border border-sky-400/20 bg-sky-500/8 p-4">
                    <p className="mb-1 text-[9px] font-black uppercase tracking-widest text-sky-500">Looking for</p>
                    <p className="text-base font-black text-sky-200">{selected.plantWant}</p>
                  </div>

                  <button type="button"
                    className="group mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-400 py-3 text-sm font-black text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300">
                    <FiMessageCircle className="h-4 w-4" />
                    Start swap chat
                    <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>

                {/* Smart matches */}
                <div className="border-t border-white/6 p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Smart matches nearby</p>
                    <span className="flex items-center gap-1 rounded-full border border-emerald-400/20 bg-emerald-500/8 px-2 py-1 text-[10px] font-bold text-emerald-300">
                      <FiZap className="h-3 w-3" /> {smartMatches.length} found
                    </span>
                  </div>
                  {smartMatches.length === 0 ? (
                    <p className="rounded-2xl border border-white/6 bg-white/[0.02] p-4 text-xs text-slate-500">
                      No same-city matches yet. Post your offer and let FLORE notify you when a match joins!
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {smartMatches.map((m) => {
                        const mrc = reliabilityConfig[m.reliability]
                        return (
                          <div key={m.id}
                            onClick={() => setSelectedId(m.id)}
                            className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-white/6 bg-white/[0.02] p-3 transition hover:border-emerald-400/25 hover:bg-emerald-500/5">
                            <div className="flex items-center gap-2.5">
                              {m.avatar ? (
                                <img src={m.avatar} alt={m.user} className="h-8 w-8 rounded-full object-cover" />
                              ) : (
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-lime-300 text-xs font-black text-slate-950">
                                  {m.user[0]}
                                </div>
                              )}
                              <div>
                                <p className="text-xs font-bold text-white">{m.user}</p>
                                <p className="text-[10px] text-slate-500">{m.plantHave}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold" style={{ color: mrc.color }}>{m.reliability}</span>
                              <button type="button"
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-1 rounded-full bg-emerald-400/10 px-2.5 py-1.5 text-[10px] font-bold text-emerald-300 transition hover:bg-emerald-400 hover:text-slate-950">
                                <FiMessageCircle className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Your swap profile */}
          <div className="overflow-hidden rounded-3xl border border-white/8" style={{ background: '#0a1a0c' }}>
            <div className="border-b border-white/6 px-5 py-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Your swap profile</p>
            </div>
            <div className="p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-lime-300 text-lg font-black text-slate-950">Y</div>
                <div>
                  <p className="font-black text-white">You</p>
                  <p className="text-xs text-slate-500">@you_on_flore · New member</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { val: '0',     label: 'Swaps',   color: '#34d399' },
                  { val: '0',     label: 'Posts',   color: '#38bdf8' },
                  { val: 'New',   label: 'Trust',   color: '#94a3b8' },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl border border-white/6 bg-white/[0.02] p-3 text-center">
                    <p className="text-sm font-black" style={{ color: s.color }}>{s.val}</p>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* How it works */}
          <div className="overflow-hidden rounded-3xl border border-white/8" style={{ background: '#0a1a0c' }}>
            <div className="border-b border-white/6 px-5 py-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">How swaps work</p>
            </div>
            <div className="divide-y divide-white/6">
              {[
                { num: '1', title: 'Post your offer', body: 'Tell the community what you have and what you want in return.' },
                { num: '2', title: 'FLORE matches you', body: 'We suggest nearby growers based on city and plant compatibility.' },
                { num: '3', title: 'Chat & meet',       body: 'Agree on a place and time, then exchange plants in person.' },
              ].map((step) => (
                <div key={step.num} className="flex gap-4 px-5 py-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-sm font-black text-emerald-300">{step.num}</div>
                  <div>
                    <p className="text-sm font-bold text-white">{step.title}</p>
                    <p className="text-xs leading-relaxed text-slate-500">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-5 pt-0">
              <button type="button" onClick={() => setShowPostForm(true)}
                className="group flex w-full items-center justify-center gap-2 rounded-2xl border border-emerald-400/25 bg-emerald-500/10 py-3 text-sm font-black text-emerald-300 transition hover:bg-emerald-400/20">
                <FiPlus className="h-4 w-4" /> Post a new swap request
                <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Post Swap Drawer ── */}
      <AnimatePresence>
        {showPostForm && (
          <>
            <motion.div key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
              onClick={() => setShowPostForm(false)}
            />
            <motion.div key="drawer"
              initial={{ opacity: 0, y: 48 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 48 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-lg overflow-hidden rounded-t-3xl border-t border-white/10 p-6"
              style={{ background: '#0a1f0e' }}
            >
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">New swap request</p>
                  <h2 className="text-lg font-black text-white">What are you offering?</h2>
                </div>
                <button type="button" onClick={() => setShowPostForm(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 hover:text-white">
                  <FiX className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handlePost} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-[11px] font-black uppercase tracking-wider text-slate-500">I have</label>
                    <input
                      className="w-full rounded-2xl border border-emerald-400/20 bg-emerald-500/8 px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-emerald-400/40"
                      placeholder="e.g. Spider plant pups"
                      value={postData.plantHave}
                      onChange={(e) => setPostData((p) => ({ ...p, plantHave: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[11px] font-black uppercase tracking-wider text-slate-500">I want</label>
                    <input
                      className="w-full rounded-2xl border border-sky-400/20 bg-sky-500/8 px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-sky-400/40"
                      placeholder="e.g. Snake plant cutting"
                      value={postData.plantWant}
                      onChange={(e) => setPostData((p) => ({ ...p, plantWant: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-[11px] font-black uppercase tracking-wider text-slate-500">Plant type</label>
                    <select className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white outline-none"
                      value={postData.type} onChange={(e) => setPostData((p) => ({ ...p, type: e.target.value }))}>
                      <option value="indoor">🏠 Indoor</option>
                      <option value="outdoor">🌿 Outdoor</option>
                      <option value="edible">🫚 Edible</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-[11px] font-black uppercase tracking-wider text-slate-500">Your city</label>
                    <select className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white outline-none"
                      value={postData.city} onChange={(e) => setPostData((p) => ({ ...p, city: e.target.value }))}>
                      {CITIES.filter((c) => c !== 'All').map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-[11px] font-black uppercase tracking-wider text-slate-500">Extra notes (optional)</label>
                  <textarea rows={2} className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none"
                    placeholder="e.g. Plant is healthy, will pot separately for transport"
                    value={postData.notes} onChange={(e) => setPostData((p) => ({ ...p, notes: e.target.value }))} />
                </div>
                <button type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-400 py-3 text-sm font-black text-slate-950 shadow-xl shadow-emerald-500/30 transition hover:bg-emerald-300 disabled:opacity-40"
                  disabled={!postData.plantHave.trim() || !postData.plantWant.trim()}>
                  <FiCheck className="h-4 w-4" /> Post swap request
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
