import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiMessageCircle, FiBookOpen, FiSend, FiPlay, FiClock, FiUsers,
  FiTrendingUp, FiAward, FiHeart, FiShare2, FiSearch, FiFilter,
  FiChevronRight, FiStar, FiZap, FiArrowRight,
} from 'react-icons/fi'

type Lesson = {
  id: string
  title: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  minutes: number
  category: string
  thumbnail: string
  instructor: string
  students: number
  rating: number
  progress?: number
}

type Blog = {
  id: string
  title: string
  topic: string
  readTime: number
  image: string
  author: string
  authorAvatar: string
  likes: number
  featured?: boolean
}

type Story = {
  id: string
  author: string
  handle: string
  content: string
  time: string
  avatar: string
  likes: number
  replies: number
  tags: string[]
  liked?: boolean
}

type Tab = 'learn' | 'community' | 'blogs'

const lessons: Lesson[] = [
  {
    id: 'ls1',
    title: 'Foundations of Balcony Gardening in Indian Cities',
    level: 'Beginner',
    minutes: 14,
    category: 'Balcony',
    thumbnail: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80',
    instructor: 'Priya Nair',
    students: 4820,
    rating: 4.8,
    progress: 60,
  },
  {
    id: 'ls2',
    title: 'Designing a Monsoon-Safe Container Garden',
    level: 'Intermediate',
    minutes: 18,
    category: 'Monsoon',
    thumbnail: 'https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=400&q=80',
    instructor: 'Rahul Sharma',
    students: 3210,
    rating: 4.9,
  },
  {
    id: 'ls3',
    title: 'Soil Microbiology for Healthy Urban Plants',
    level: 'Advanced',
    minutes: 22,
    category: 'Soil Science',
    thumbnail: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&q=80',
    instructor: 'Dr. Kavitha Rao',
    students: 1890,
    rating: 4.7,
  },
  {
    id: 'ls4',
    title: 'Composting Kitchen Waste the Indian Way',
    level: 'Beginner',
    minutes: 10,
    category: 'Composting',
    thumbnail: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80',
    instructor: 'Meera Joshi',
    students: 6540,
    rating: 4.6,
  },
  {
    id: 'ls5',
    title: 'Propagating Succulents & Tropical Houseplants',
    level: 'Intermediate',
    minutes: 16,
    category: 'Propagation',
    thumbnail: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=400&q=80',
    instructor: 'Arjun Menon',
    students: 2750,
    rating: 4.9,
  },
  {
    id: 'ls6',
    title: 'Vermicomposting for High-Rise Apartments',
    level: 'Advanced',
    minutes: 20,
    category: 'Composting',
    thumbnail: 'https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=400&q=80',
    instructor: 'Dr. Kavitha Rao',
    students: 1200,
    rating: 4.8,
  },
]

const blogs: Blog[] = [
  {
    id: 'bg1',
    title: 'How to Read Your Plant Leaves Like a Doctor',
    topic: 'Diagnostics',
    readTime: 6,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80',
    author: 'Dr. Kavitha Rao',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=80&q=80',
    likes: 312,
    featured: true,
  },
  {
    id: 'bg2',
    title: 'Designing an Edible Balcony for Indian Kitchens',
    topic: 'Edible Gardens',
    readTime: 8,
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80',
    author: 'Priya Nair',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80',
    likes: 218,
  },
  {
    id: 'bg3',
    title: 'Monsoon Pest Control Without Chemicals',
    topic: 'Pest Management',
    readTime: 5,
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=600&q=80',
    author: 'Rahul Sharma',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80',
    likes: 184,
  },
  {
    id: 'bg4',
    title: '10 Plants That Survive Indian Summers on a Balcony',
    topic: 'Summer Care',
    readTime: 4,
    image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600&q=80',
    author: 'Meera Joshi',
    authorAvatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=80&q=80',
    likes: 429,
  },
]

const starterStories: Story[] = [
  {
    id: 'st1',
    author: 'Meera Krishnan',
    handle: '@meera_grows',
    content: 'Shifted my tulsi from harsh noon sun to soft morning light — zero droop now. FLORE\'s light tracker was spot on! 🌿',
    time: '3 min ago',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=80&q=80',
    likes: 24,
    replies: 5,
    tags: ['Tulsi', 'IndoorGarden'],
  },
  {
    id: 'st2',
    author: 'Arjun Mehta',
    handle: '@arjun_terrace',
    content: 'FLORE reminded me before a heat wave — moved my hibiscus into shade and all the buds survived! Best decision ever. 🌺',
    time: '1 hr ago',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80',
    likes: 41,
    replies: 8,
    tags: ['Hibiscus', 'HeatWave'],
  },
  {
    id: 'st3',
    author: 'Priya Balasubramaniam',
    handle: '@priyas_pothos',
    content: 'Finally got my golden pothos to vine down an entire bookshelf. 6 months of patience and good light positioning paid off!',
    time: '2 hr ago',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80',
    likes: 67,
    replies: 12,
    tags: ['Pothos', 'IndoorPlants'],
  },
]

const levelColors = {
  Beginner:     { bg: 'rgba(52,211,153,0.12)',  text: '#34d399', border: 'rgba(52,211,153,0.25)' },
  Intermediate: { bg: 'rgba(251,191,36,0.12)',  text: '#fbbf24', border: 'rgba(251,191,36,0.25)' },
  Advanced:     { bg: 'rgba(248,113,113,0.12)', text: '#f87171', border: 'rgba(248,113,113,0.25)' },
}

const topicColors: Record<string, string> = {
  Diagnostics:      '#34d399',
  'Edible Gardens': '#a3e635',
  'Pest Management':'#fbbf24',
  'Summer Care':    '#fb923c',
}

export function LmsCommunity() {
  const [stories, setStories] = useState<Story[]>(starterStories)
  const [newStory, setNewStory] = useState('')
  const [activeTab, setActiveTab] = useState<Tab>('learn')
  const [searchQuery, setSearchQuery] = useState('')
  const [levelFilter, setLevelFilter] = useState<string>('All')
  const [likedStories, setLikedStories] = useState<Set<string>>(new Set())

  function handlePostStory(e: React.FormEvent) {
    e.preventDefault()
    const content = newStory.trim()
    if (!content) return
    setStories((prev) => [{
      id: `st-${Date.now()}`,
      author: 'You',
      handle: '@you_on_flore',
      content,
      time: 'Just now',
      avatar: '',
      likes: 0,
      replies: 0,
      tags: [],
    }, ...prev])
    setNewStory('')
  }

  function toggleLike(id: string) {
    setLikedStories((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
    setStories((prev) => prev.map((s) =>
      s.id === id ? { ...s, likes: likedStories.has(id) ? s.likes - 1 : s.likes + 1 } : s
    ))
  }

  const filteredLessons = lessons.filter((l) => {
    const matchSearch = l.title.toLowerCase().includes(searchQuery.toLowerCase()) || l.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchLevel = levelFilter === 'All' || l.level === levelFilter
    return matchSearch && matchLevel
  })

  const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: 'learn',     label: 'Learn',     icon: FiBookOpen },
    { key: 'community', label: 'Community', icon: FiUsers },
    { key: 'blogs',     label: 'Blogs',     icon: FiTrendingUp },
  ]

  return (
    <div className="space-y-6 pb-4">

      {/* ── Header ── */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            FLORE LMS · Learning & Community
          </div>
          <h1 className="text-2xl font-black tracking-[-0.03em] text-white md:text-3xl">
            Learn, grow, and
            <span className="bg-gradient-to-r from-emerald-300 to-lime-200 bg-clip-text text-transparent"> connect.</span>
          </h1>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-slate-400">
            Expert-led lessons, deep-dive blogs, and a thriving community of 50K+ plant lovers across India.
          </p>
        </div>

        {/* Stats strip */}
        <div className="flex shrink-0 flex-wrap gap-3">
          {[
            { icon: FiUsers,    val: '50K+', label: 'Members' },
            { icon: FiBookOpen, val: '120+',  label: 'Lessons' },
            { icon: FiAward,    val: '4.9★',  label: 'Rating' },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                <s.icon className="h-3.5 w-3.5 text-emerald-400" />
                <p className="text-base font-black text-white">{s.val}</p>
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tab bar ── */}
      <div className="flex gap-1 rounded-2xl border border-white/8 bg-white/[0.02] p-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
              activeTab === tab.key
                ? 'bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Tab content ── */}
      <AnimatePresence mode="wait">

        {/* ══════════════ LEARN TAB ══════════════ */}
        {activeTab === 'learn' && (
          <motion.div key="learn" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-5">

            {/* Search + Filter */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <FiSearch className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search lessons…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-400/40 focus:ring-1 focus:ring-emerald-400/20"
                />
              </div>
              <div className="flex items-center gap-2">
                <FiFilter className="h-4 w-4 shrink-0 text-slate-500" />
                {['All', 'Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setLevelFilter(lvl)}
                    className={`rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                      levelFilter === lvl
                        ? 'bg-emerald-400 text-slate-950'
                        : 'border border-white/10 bg-white/[0.03] text-slate-400 hover:text-white'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* In-progress banner (for first lesson with progress) */}
            {(() => {
              const inProgress = lessons.find((l) => l.progress)
              if (!inProgress) return null
              return (
                <div className="relative overflow-hidden rounded-3xl border border-emerald-400/25 p-5"
                  style={{ background: 'linear-gradient(120deg, #0a1f0e, #081408)' }}>
                  <div className="pointer-events-none absolute inset-0"
                    style={{ background: 'radial-gradient(ellipse at 0% 50%, rgba(52,211,153,0.12), transparent 60%)' }} />
                  <div className="relative flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img src={inProgress.thumbnail} alt="" className="h-14 w-14 rounded-2xl object-cover" />
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-emerald-300">Continue</span>
                          <span className="text-[11px] text-slate-500">{inProgress.progress}% complete</span>
                        </div>
                        <p className="font-bold text-white">{inProgress.title}</p>
                        <p className="text-xs text-slate-400">{inProgress.instructor} · {inProgress.minutes} min</p>
                      </div>
                    </div>
                    <button type="button"
                      className="flex shrink-0 items-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-black text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300">
                      <FiPlay className="h-4 w-4" /> Resume
                    </button>
                  </div>
                  {/* Progress bar */}
                  <div className="relative mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full bg-emerald-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${inProgress.progress}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              )
            })()}

            {/* Lesson grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredLessons.map((lesson, i) => {
                const lc = levelColors[lesson.level]
                return (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group overflow-hidden rounded-3xl border border-white/8 transition-all hover:-translate-y-1 hover:border-white/15"
                    style={{ background: 'linear-gradient(160deg, #0d1f10, #080f09)' }}
                  >
                    {/* Thumbnail */}
                    <div className="relative overflow-hidden">
                      <img
                        src={lesson.thumbnail}
                        alt={lesson.title}
                        className="h-36 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f10] via-transparent to-transparent" />
                      {/* Play button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400/90 shadow-xl shadow-emerald-500/40 backdrop-blur-sm">
                          <FiPlay className="h-5 w-5 translate-x-0.5 text-slate-950" />
                        </div>
                      </div>
                      {/* Level badge */}
                      <div className="absolute left-3 top-3">
                        <span className="rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider"
                          style={{ background: lc.bg, color: lc.text, border: `1px solid ${lc.border}` }}>
                          {lesson.level}
                        </span>
                      </div>
                      {/* Duration */}
                      <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full border border-white/15 bg-black/60 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                        <FiClock className="h-3 w-3" /> {lesson.minutes} min
                      </div>
                    </div>

                    <div className="p-4">
                      <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-slate-500">{lesson.category}</p>
                      <p className="mb-3 text-sm font-bold leading-snug text-white">{lesson.title}</p>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-semibold text-slate-300">{lesson.instructor}</p>
                          <div className="mt-0.5 flex items-center gap-2 text-[11px] text-slate-500">
                            <span className="flex items-center gap-1"><FiStar className="h-3 w-3 text-amber-400" />{lesson.rating}</span>
                            <span>·</span>
                            <span>{(lesson.students / 1000).toFixed(1)}K students</span>
                          </div>
                        </div>
                        <button type="button"
                          className="flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-3 py-1.5 text-xs font-bold text-emerald-300 transition hover:bg-emerald-400 hover:text-slate-950">
                          Start <FiChevronRight className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Progress bar if in-progress */}
                      {lesson.progress && (
                        <div className="mt-3">
                          <div className="mb-1 flex justify-between text-[10px] text-slate-500">
                            <span>Progress</span><span>{lesson.progress}%</span>
                          </div>
                          <div className="h-1 overflow-hidden rounded-full bg-white/10">
                            <div className="h-full rounded-full bg-emerald-400" style={{ width: `${lesson.progress}%` }} />
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {filteredLessons.length === 0 && (
              <div className="rounded-3xl border border-white/8 py-16 text-center text-slate-500">
                No lessons match your search.
              </div>
            )}

            {/* Expert CTA */}
            <div className="relative overflow-hidden rounded-3xl border border-emerald-400/20 p-6"
              style={{ background: 'linear-gradient(120deg, #081a0a, #060f07)' }}>
              <div className="pointer-events-none absolute inset-0"
                style={{ background: 'radial-gradient(ellipse at 100% 100%, rgba(52,211,153,0.1), transparent 50%)' }} />
              <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-300">
                    <FiZap className="h-3 w-3" /> Expert consultation
                  </div>
                  <h3 className="mb-1 text-lg font-black text-white">Get a personalised care plan</h3>
                  <p className="text-sm text-slate-400">Share 3–5 photos and your city. Certified horticulturists reply within 24 hours with a detailed treatment plan.</p>
                </div>
                <button type="button"
                  className="group flex shrink-0 items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950 shadow-xl shadow-emerald-500/30 transition hover:bg-emerald-300">
                  <FiMessageCircle className="h-4 w-4" />
                  Start expert session
                  <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ══════════════ COMMUNITY TAB ══════════════ */}
        {activeTab === 'community' && (
          <motion.div key="community" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="grid gap-5 lg:grid-cols-[1fr_300px]">

            {/* Feed */}
            <div className="space-y-4">
              {/* Composer */}
              <div className="overflow-hidden rounded-3xl border border-white/8"
                style={{ background: 'linear-gradient(160deg, #0d1f10, #080f09)' }}>
                <div className="border-b border-white/6 px-5 py-3.5">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Share with the community</p>
                </div>
                <form onSubmit={handlePostStory} className="p-5">
                  <div className="flex gap-3">
                    <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-lime-300 text-xs font-black text-slate-950">
                      Y
                    </div>
                    <div className="flex-1 space-y-3">
                      <textarea
                        rows={3}
                        className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-100 placeholder-slate-600 outline-none focus:border-emerald-400/40 focus:ring-1 focus:ring-emerald-400/20"
                        placeholder="Share a win, question, or plant story with the FLORE community…"
                        value={newStory}
                        onChange={(e) => setNewStory(e.target.value)}
                      />
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-slate-600">Visible to the community · Expert replies are labelled</p>
                        <button type="submit"
                          className="flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2 text-sm font-black text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300 disabled:opacity-40"
                          disabled={!newStory.trim()}>
                          <FiSend className="h-3.5 w-3.5" /> Post
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              {/* Stories */}
              <div className="space-y-3">
                {stories.map((story, i) => (
                  <motion.div
                    key={story.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="overflow-hidden rounded-3xl border border-white/8 p-5 transition-all hover:border-white/15"
                    style={{ background: 'linear-gradient(160deg, #0d1f10, #080f09)' }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {story.avatar ? (
                          <img src={story.avatar} alt={story.author} className="h-10 w-10 rounded-full object-cover ring-2 ring-emerald-400/20" />
                        ) : (
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-lime-300 text-sm font-black text-slate-950">
                            {story.author[0]}
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-bold text-white">{story.author}</p>
                          <p className="text-[11px] text-slate-500">{story.handle} · {story.time}</p>
                        </div>
                      </div>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-slate-300">{story.content}</p>

                    {story.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {story.tags.map((tag) => (
                          <span key={tag} className="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[11px] font-semibold text-slate-500">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-4 flex items-center gap-5 text-[11px] text-slate-500">
                      <button
                        type="button"
                        onClick={() => toggleLike(story.id)}
                        className={`flex items-center gap-1.5 font-bold transition-colors ${likedStories.has(story.id) ? 'text-rose-400' : 'hover:text-rose-400'}`}
                      >
                        <FiHeart className={`h-4 w-4 ${likedStories.has(story.id) ? 'fill-rose-400' : ''}`} />
                        {story.likes + (likedStories.has(story.id) ? 1 : 0)}
                      </button>
                      <button type="button" className="flex items-center gap-1.5 hover:text-emerald-400">
                        <FiMessageCircle className="h-4 w-4" />
                        {story.replies} replies
                      </button>
                      <button type="button" className="flex items-center gap-1.5 hover:text-sky-400">
                        <FiShare2 className="h-4 w-4" />
                        Share
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Trending topics */}
              <div className="rounded-3xl border border-white/8 p-5" style={{ background: '#0a1a0c' }}>
                <p className="mb-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Trending topics</p>
                <div className="space-y-2">
                  {[
                    { tag: '#MonsoonCare',    posts: '1.2K posts' },
                    { tag: '#BalconyGarden',  posts: '980 posts' },
                    { tag: '#NaturalFertiliser', posts: '741 posts' },
                    { tag: '#Tulsi',          posts: '620 posts' },
                    { tag: '#IndoorPlants',   posts: '558 posts' },
                  ].map((t) => (
                    <div key={t.tag} className="flex items-center justify-between rounded-2xl border border-white/6 bg-white/[0.02] px-3 py-2.5 text-sm transition hover:border-white/12 hover:bg-white/[0.04]">
                      <span className="font-bold text-emerald-300">{t.tag}</span>
                      <span className="text-[11px] text-slate-500">{t.posts}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active members */}
              <div className="rounded-3xl border border-white/8 p-5" style={{ background: '#0a1a0c' }}>
                <p className="mb-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Active this week</p>
                <div className="space-y-3">
                  {[
                    { name: 'Priya Nair',    handle: '@priya_grows',   avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=80&q=80', posts: 12 },
                    { name: 'Rahul Sharma',  handle: '@rahuls_terrace', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80', posts: 9 },
                    { name: 'Kavitha Rao',   handle: '@dr_kavitha',     avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=80&q=80', posts: 7 },
                  ].map((m) => (
                    <div key={m.name} className="flex items-center gap-3">
                      <img src={m.avatar} alt={m.name} className="h-9 w-9 rounded-full object-cover" />
                      <div className="flex-1">
                        <p className="text-sm font-bold text-white">{m.name}</p>
                        <p className="text-[11px] text-slate-500">{m.handle}</p>
                      </div>
                      <span className="text-[11px] text-emerald-400 font-bold">{m.posts} posts</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ══════════════ BLOGS TAB ══════════════ */}
        {activeTab === 'blogs' && (
          <motion.div key="blogs" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-5">

            {/* Featured blog */}
            {(() => {
              const featured = blogs.find((b) => b.featured)
              if (!featured) return null
              return (
                <div className="group relative overflow-hidden rounded-3xl border border-white/10 transition hover:-translate-y-0.5">
                  <img src={featured.image} alt={featured.title} className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060f07]/95 via-[#060f07]/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-emerald-400 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-slate-950">
                        Featured
                      </span>
                      <span className="rounded-full border px-2.5 py-1 text-[10px] font-bold"
                        style={{ borderColor: `${topicColors[featured.topic] ?? '#34d399'}40`, color: topicColors[featured.topic] ?? '#34d399' }}>
                        {featured.topic}
                      </span>
                    </div>
                    <h2 className="mb-2 text-xl font-black text-white">{featured.title}</h2>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={featured.authorAvatar} alt={featured.author} className="h-7 w-7 rounded-full object-cover" />
                        <span className="text-sm text-slate-300">{featured.author}</span>
                        <span className="text-slate-600">·</span>
                        <span className="flex items-center gap-1 text-xs text-slate-400"><FiClock className="h-3 w-3" /> {featured.readTime} min read</span>
                      </div>
                      <span className="flex items-center gap-1.5 text-xs text-rose-400">
                        <FiHeart className="h-3.5 w-3.5" /> {featured.likes}
                      </span>
                    </div>
                  </div>
                  <div className="absolute right-4 top-4">
                    <button type="button"
                      className="flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-4 py-2 text-xs font-bold text-white backdrop-blur-sm transition hover:bg-white/20">
                      Read now <FiArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )
            })()}

            {/* Blog grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {blogs.filter((b) => !b.featured).map((blog, i) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="group overflow-hidden rounded-3xl border border-white/8 transition-all hover:-translate-y-1 hover:border-white/15"
                  style={{ background: 'linear-gradient(160deg, #0d1f10, #080f09)' }}
                >
                  <div className="relative overflow-hidden">
                    <img src={blog.image} alt={blog.title}
                      className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f10] via-transparent to-transparent" />
                    <div className="absolute left-3 top-3">
                      <span className="rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider"
                        style={{
                          background: `${topicColors[blog.topic] ?? '#34d399'}20`,
                          color: topicColors[blog.topic] ?? '#34d399',
                          border: `1px solid ${topicColors[blog.topic] ?? '#34d399'}40`,
                        }}>
                        {blog.topic}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="mb-3 text-sm font-bold leading-snug text-white">{blog.title}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={blog.authorAvatar} alt={blog.author} className="h-6 w-6 rounded-full object-cover" />
                        <div>
                          <p className="text-[11px] font-semibold text-slate-300">{blog.author}</p>
                          <p className="flex items-center gap-1 text-[10px] text-slate-500"><FiClock className="h-3 w-3" /> {blog.readTime} min</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-xs text-rose-400">
                          <FiHeart className="h-3.5 w-3.5" /> {blog.likes}
                        </span>
                        <button type="button"
                          className="flex items-center gap-1 rounded-full bg-emerald-400/10 px-3 py-1.5 text-[11px] font-bold text-emerald-300 transition hover:bg-emerald-400 hover:text-slate-950">
                          Read <FiArrowRight className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Write for us CTA */}
            <div className="relative overflow-hidden rounded-3xl border border-white/8 p-6"
              style={{ background: 'linear-gradient(120deg, #0d1f10, #060f07)' }}>
              <div className="pointer-events-none absolute inset-0"
                style={{ background: 'radial-gradient(ellipse at 0% 100%, rgba(163,230,53,0.08), transparent 55%)' }} />
              <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-slate-500">Write for FLORE</p>
                  <h3 className="mb-1 text-lg font-black text-white">Share your expertise with 50K+ growers</h3>
                  <p className="text-sm text-slate-400">Publish your plant care knowledge, get featured, and grow your reputation in India's largest plant community.</p>
                </div>
                <button type="button"
                  className="group flex shrink-0 items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-6 py-3 text-sm font-black text-emerald-300 transition hover:bg-emerald-400 hover:text-slate-950">
                  Start writing
                  <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}
