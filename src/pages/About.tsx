import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiArrowRight, FiArrowUpRight, FiLinkedin, FiTwitter, FiGithub, FiMail } from 'react-icons/fi'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 50, suffix: 'K+', label: 'Plants Diagnosed' },
  { value: 12, suffix: 'K+', label: 'Active Growers' },
  { value: 98, suffix: '%',  label: 'Accuracy Rate' },
  { value: 6,  suffix: '',   label: 'Indian Languages' },
]

const team = [
  {
    name: 'Arijita Paria',
    role: 'Devloper & AI Engineer',
    bio: 'Believes great design should feel like walking into a garden. Crafts interfaces that make plant care feel effortless and intuitive for every grower.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
    accent: '#34d399',
    skills: ['Figma', 'Motion Design', 'User Research'],
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    github: 'https://github.com',
  },
  {
    name: 'Anubhab Kundu',
    role: 'Data & Reacher',
    bio: 'Trained models on 2M+ plant images. Specialist in computer vision for plant pathology and deploying AI at the edge for real-world gardens.',
    image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=600&q=80',
    accent: '#38bdf8',
    skills: ['TensorFlow', 'PyTorch', 'Plant CV'],
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    github: 'https://github.com',
  },
  {
    name: 'Sumit Pal',
    role: 'AI-ML Engineer',
    bio: 'Builds fast, resilient systems from soil sensors to dashboards. Passionate about real-time APIs, clean architecture, and scalable plant data pipelines.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    accent: '#a3e635',
    skills: ['React', 'Node.js', 'PostgreSQL'],
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    github: 'https://github.com',
  },
  {
    name: 'Supriyo Paramanik',
    role: 'ML Engineer',
    bio: 'Architect of FLORE\'s core infrastructure. Turns millions of plant data points into reliable, lightning-fast APIs that power every diagnosis and care alert.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    accent: '#c084fc',
    skills: ['System Design', 'Cloud Infra', 'Python'],
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    github: 'https://github.com',
  },
]

const milestones = [
  { num: '01', year: '2022', title: 'The Seed', body: 'Born in a Bengaluru apartment with a dying tulsi plant and a vision to give every grower a botanist in their pocket.' },
  { num: '02', year: '2023', title: 'First Root', body: 'Launched AI Plant Doctor beta. 10,000 diagnoses in the first month. Zero marketing spend — just word of mouth.' },
  { num: '03', year: '2024', title: 'Branching Out', body: 'Expanded to Marketplace, Gardener OS and community LMS. Crossed 50K active growers across 18 Indian states.' },
  { num: '04', year: '2025+', title: 'Forest Mode', body: 'Regional language support, IoT sensor integration and a pan-India nursery network. The mission is just beginning.' },
]

export function About() {
  const heroRef      = useRef<HTMLDivElement>(null)
  const manifestoRef = useRef<HTMLDivElement>(null)
  const bentoRef     = useRef<HTMLDivElement>(null)
  const journeyRef   = useRef<HTMLDivElement>(null)
  const teamRef      = useRef<HTMLDivElement>(null)
  const ctaRef       = useRef<HTMLDivElement>(null)
  const statsRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Hero word reveal ──
      if (heroRef.current) {
        gsap.from(heroRef.current.querySelectorAll('.hero-word'), {
          opacity: 0, y: 80, rotateX: -40, stagger: 0.08, duration: 1,
          ease: 'power4.out', delay: 0.1,
        })
        gsap.from(heroRef.current.querySelectorAll('.hero-sub'), {
          opacity: 0, y: 20, stagger: 0.1, duration: 0.8, ease: 'power3.out', delay: 0.5,
        })
        gsap.from(heroRef.current.querySelectorAll('.hero-stat'), {
          opacity: 0, scale: 0.8, stagger: 0.1, duration: 0.7, ease: 'back.out(1.5)', delay: 0.6,
        })
      }

      // ── Manifesto ──
      if (manifestoRef.current) {
        const mWords = manifestoRef.current.querySelectorAll('.manifesto-word')
        gsap.set(mWords, { opacity: 1 })
        gsap.from(mWords, {
          y: 50, stagger: 0.04, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: manifestoRef.current, start: 'top 95%', once: true },
        })
      }

      // ── Stat counters ──
      if (statsRef.current) {
        const statItems = statsRef.current.querySelectorAll('.stat-item')
        gsap.set(statItems, { opacity: 1 })
        gsap.from(statItems, {
          y: 25, stagger: 0.1, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 95%', once: true },
        })
        statsRef.current.querySelectorAll('.stat-count').forEach((el) => {
          const target = parseFloat((el as HTMLElement).dataset.target ?? '0')
          const obj = { val: 0 }
          gsap.to(obj, {
            val: target,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate() { (el as HTMLElement).textContent = Math.round(obj.val).toString() },
            scrollTrigger: { trigger: statsRef.current, start: 'top 95%', once: true },
          })
        })
      }

      // ── Bento cards ──
      if (bentoRef.current) {
        const bentoCards = bentoRef.current.querySelectorAll('.bento-card')
        gsap.set(bentoCards, { opacity: 1 })
        gsap.from(bentoCards, {
          y: 40, scale: 0.98, stagger: 0.08, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: bentoRef.current, start: 'top 95%', once: true },
        })
      }

      // ── Journey items ──
      if (journeyRef.current) {
        const journeyItems = journeyRef.current.querySelectorAll('.journey-item')
        gsap.set(journeyItems, { opacity: 1 })
        gsap.from(journeyItems, {
          x: -40, stagger: 0.12, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: journeyRef.current, start: 'top 95%', once: true },
        })
        const journeyLine = journeyRef.current.querySelector('.journey-line')
        if (journeyLine) {
          gsap.from(journeyLine, {
            scaleY: 0, transformOrigin: 'top center', duration: 1.4, ease: 'power2.out',
            scrollTrigger: { trigger: journeyRef.current, start: 'top 95%', once: true },
          })
        }
      }

      // ── Team cards — y-only animation so cards are never hidden ──
      if (teamRef.current) {
        const cards = teamRef.current.querySelectorAll('.team-card')
        gsap.set(cards, { opacity: 1 })
        gsap.from(cards, {
          y: 40, stagger: 0.1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: teamRef.current, start: 'top 90%', once: true },
        })
      }

      // ── CTA ──
      if (ctaRef.current) {
        const ctaEls = ctaRef.current.querySelectorAll('.cta-el')
        gsap.set(ctaEls, { opacity: 1 })
        gsap.from(ctaEls, {
          y: 35, stagger: 0.1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 95%', once: true },
        })
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#060c07]">

      {/* ══════════════════════════════════════
          §1  HERO — FULL SCREEN
      ══════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative flex min-h-screen flex-col justify-end overflow-hidden pb-16 pt-24 md:pb-20"
      >
        {/* Full-bleed bg photo */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1800&q=80')" }}
        />
        {/* Multi-layer dark veil */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060c07]/80 via-[#060c07]/60 to-[#060c07]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060c07]/70 via-transparent to-[#060c07]/50" />

        {/* Giant background word */}
        <span
          className="pointer-events-none absolute inset-x-0 top-[12%] select-none text-center font-black uppercase leading-none text-white/[0.04]"
          style={{ fontSize: 'clamp(100px, 22vw, 240px)', letterSpacing: '-0.05em' }}
        >
          FLORA
        </span>

        {/* Orb accents */}
        <div className="pointer-events-none absolute left-[10%] top-[30%] h-96 w-96 rounded-full opacity-20 blur-[120px]"
          style={{ background: 'radial-gradient(circle, #34d399, transparent)' }} />
        <div className="pointer-events-none absolute right-[5%] top-[20%] h-72 w-72 rounded-full opacity-12 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #a3e635, transparent)' }} />

        <div className="relative mx-auto w-full max-w-7xl px-5 md:px-10">
          {/* Badge */}
          <div className="hero-sub mb-6 flex items-center gap-3">
            <div className="h-px w-10 bg-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-400">About Us</span>
          </div>

          {/* Giant headline */}
          <div className="mb-8 overflow-hidden">
            <h1 className="flex flex-wrap gap-x-4 text-[clamp(3rem,8vw,7rem)] font-black leading-[0.9] tracking-[-0.04em] text-white">
              {['Making', 'Plant', 'Care', 'Intelligent.'].map((w) => (
                <span key={w} className="hero-word inline-block" style={{ perspective: '800px' }}>
                  {w === 'Intelligent.' ? (
                    <span className="bg-gradient-to-r from-emerald-300 via-lime-200 to-emerald-400 bg-clip-text text-transparent">
                      {w}
                    </span>
                  ) : w}
                </span>
              ))}
            </h1>
          </div>

          {/* Sub-row */}
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p className="hero-sub max-w-md text-base leading-relaxed text-slate-400 md:text-lg">
              FLORA AI is an AI-powered platform built for India's 300 million plant lovers —
              combining computer vision, real-time data, and a passionate community.
            </p>

            {/* Floating stat pills */}
            <div className="hero-sub flex flex-wrap gap-3">
              {[
                { n: '50K+', l: 'Diagnoses' },
                { n: '4.9★', l: 'Rating' },
                { n: '18', l: 'States' },
              ].map((s) => (
                <div key={s.l}
                  className="hero-stat rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-md"
                >
                  <p className="text-lg font-black text-white">{s.n}</p>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="hero-sub absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600">Scroll</span>
          <div className="h-10 w-px bg-gradient-to-b from-slate-600 to-transparent" />
        </div>
      </section>

      {/* ══════════════════════════════════════
          §2  MANIFESTO STRIP
      ══════════════════════════════════════ */}
      <section
        ref={manifestoRef}
        className="border-y border-white/6 py-20 md:py-28"
        style={{ background: 'linear-gradient(135deg, #080e09 0%, #0a1a0c 100%)' }}
      >
        <div className="mx-auto max-w-6xl px-5 md:px-10">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-emerald-400">Our Belief</p>
          <p
            className="font-black leading-tight tracking-[-0.03em] text-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
          >
            {'"Every plant deserves a doctor. Every grower deserves the knowledge to keep it alive."'.split(' ').map((w, i) => (
              <span key={i} className="manifesto-word mr-[0.25em] inline-block">
                {w}
              </span>
            ))}
          </p>
          <p className="mt-6 text-sm text-slate-500">— The Flora.AI Founding Principle</p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          §3  STAT COUNTERS
      ══════════════════════════════════════ */}
      <section ref={statsRef} className="py-16 md:py-20" style={{ background: '#060c07' }}>
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="grid grid-cols-2 gap-px rounded-3xl overflow-hidden border border-white/6 md:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="stat-item relative flex flex-col items-center justify-center bg-white/[0.02] px-6 py-10 text-center"
              >
                {/* Subtle left border glow on non-first items */}
                {i > 0 && (
                  <div className="pointer-events-none absolute inset-y-6 left-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                )}
                <div className="mb-1 flex items-baseline gap-1">
                  <span className="stat-count text-5xl font-black text-white md:text-6xl" data-target={s.value}>
                    0
                  </span>
                  <span className="text-3xl font-black text-emerald-400 md:text-4xl">{s.suffix}</span>
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          §4  BENTO GRID — MISSION / VISION / PHOTO
      ══════════════════════════════════════ */}
      <section
        ref={bentoRef}
        className="py-20 md:py-28"
        style={{ background: 'linear-gradient(180deg, #060c07 0%, #08120a 100%)' }}
      >
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-emerald-400">Who we are</p>
          <h2 className="mb-10 text-4xl font-black tracking-[-0.03em] text-white md:text-5xl">
            Purpose-built for India.
          </h2>

          <div className="grid gap-4 md:grid-cols-3 md:grid-rows-2">

            {/* MISSION — tall left card */}
            <div
              className="bento-card relative row-span-2 overflow-hidden rounded-3xl border border-white/8 bg-[#0a1a0c] p-8 md:p-10"
            >
              <div className="pointer-events-none absolute inset-0"
                style={{ background: 'radial-gradient(ellipse at 30% 20%, rgba(52,211,153,0.12), transparent 60%)' }}
              />
              <div className="relative z-10 flex h-full flex-col">
                <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/25 bg-emerald-500/10 text-2xl">
                  🎯
                </span>
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-400">Our Mission</p>
                <h3 className="mb-4 text-3xl font-black leading-tight tracking-[-0.03em] text-white md:text-4xl">
                  Empower every
                  <br />
                  <span className="text-emerald-300">grower.</span>
                </h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-400">
                  To empower every plant lover with intelligent technology that makes plant care simple,
                  effective, and sustainable — regardless of whether they tend a single balcony pot
                  or a two-acre terrace farm.
                </p>
                {/* Decorative plant image */}
                <div className="mt-auto h-40 overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80"
                    alt="Mission"
                    className="h-full w-full object-cover opacity-70 transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </div>

            {/* VISION — top right */}
            <div className="bento-card col-span-1 overflow-hidden rounded-3xl border border-white/8 bg-[#0a1a0c] p-7 md:col-span-2">
              <div className="pointer-events-none absolute inset-0"
                style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(163,230,53,0.08), transparent 55%)' }}
              />
              <div className="relative flex h-full flex-col justify-between md:flex-row md:items-center md:gap-8">
                <div>
                  <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-lime-400/25 bg-lime-500/10 text-xl">
                    👁
                  </span>
                  <p className="mb-2 text-xs font-bold uppercase tracking-widest text-lime-400">Our Vision</p>
                  <h3 className="mb-3 text-2xl font-black leading-tight tracking-[-0.03em] text-white">
                    Where technology<br />and nature converge.
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-400">
                    A world where AI and nature work together — making the planet greener, one
                    plant and one grower at a time.
                  </p>
                </div>
                <div className="mt-4 h-32 w-full shrink-0 overflow-hidden rounded-2xl md:mt-0 md:h-full md:max-h-36 md:w-44">
                  <img
                    src="https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?auto=format&fit=crop&w=400&q=80"
                    alt="Vision"
                    className="h-full w-full object-cover opacity-80 transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </div>

            {/* VALUES chips — bottom right 2-col area split into 2 small cards */}
            <div className="bento-card overflow-hidden rounded-3xl border border-white/8 bg-[#0a1a0c] p-6">
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-sky-400">Built for India</p>
              <div className="flex flex-wrap gap-2">
                {['Monsoon-Aware', 'Multilingual', 'Low Bandwidth', 'Regional Crops', 'Ethical Sourcing', 'Zero Paywall'].map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bento-card relative overflow-hidden rounded-3xl border border-white/8">
              <img
                src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=600&q=80"
                alt="Community"
                className="absolute inset-0 h-full w-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#0a1a0c]/80 to-transparent" />
              <div className="relative z-10 flex h-full flex-col justify-end p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">Community</p>
                <p className="text-2xl font-black text-white">300M+</p>
                <p className="text-xs text-slate-400">Plant lovers in India</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          §5  JOURNEY — NUMBERED TIMELINE
      ══════════════════════════════════════ */}
      <section
        ref={journeyRef}
        className="border-t border-white/6 py-20 md:py-28"
        style={{ background: '#060c07' }}
      >
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-emerald-400">Our Story</p>
              <h2 className="text-4xl font-black tracking-[-0.03em] text-white md:text-5xl">
                From seed to<br />
                <span className="text-emerald-300">ecosystem.</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-slate-500">
              Four chapters that define how a small team of plant lovers built something
              that 50,000 growers now depend on.
            </p>
          </div>

          <div className="relative">
            {/* Vertical accent line */}
            <div className="journey-line absolute left-[27px] top-0 hidden h-full w-px origin-top bg-gradient-to-b from-emerald-400/50 via-emerald-400/20 to-transparent md:block" />

            <div className="space-y-0 divide-y divide-white/6">
              {milestones.map((m) => (
                <div key={m.num} className="journey-item group flex gap-8 py-10 transition-colors hover:bg-white/[0.015] md:pl-20">
                  {/* Number badge — positioned over the line */}
                  <div className="absolute left-0 hidden translate-y-9 md:block">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#060c07] text-xs font-black text-emerald-400 transition-colors group-hover:border-emerald-400/30 group-hover:bg-emerald-500/10">
                      {m.num}
                    </div>
                  </div>

                  {/* Mobile number */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xs font-black text-emerald-400 md:hidden">
                    {m.num}
                  </div>

                  <div className="min-w-0 flex-1 md:grid md:grid-cols-[160px_1fr] md:gap-10">
                    <div className="mb-2 md:mb-0">
                      <span className="rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-1 text-xs font-black text-emerald-300">
                        {m.year}
                      </span>
                    </div>
                    <div>
                      <h3 className="mb-2 text-2xl font-black text-white transition-colors group-hover:text-emerald-200 md:text-3xl">
                        {m.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-slate-400">{m.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          §6  TEAM
      ══════════════════════════════════════ */}
      <section
        ref={teamRef}
        className="border-t border-white/6 py-20 md:py-28"
        style={{ background: 'linear-gradient(180deg, #08120a 0%, #060c07 100%)' }}
      >
        <div className="mx-auto max-w-7xl px-5 md:px-10">

          {/* Section header */}
          <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-emerald-400" />
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-400">The People</p>
              </div>
              <h2 className="text-4xl font-black tracking-[-0.03em] text-white md:text-5xl">
                Meet the team
                <br />
                <span className="bg-gradient-to-r from-emerald-300 to-lime-200 bg-clip-text text-transparent">
                  behind FLORA.
                </span>
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-500">
                A small crew of plant obsessives, engineers, and designers working to give
                every grower in India a world-class plant care partner.
              </p>
            </div>
            <a
              href="mailto:hello@florai.in"
              className="group inline-flex items-center gap-2 self-start rounded-full border border-emerald-400/25 bg-emerald-500/10 px-6 py-3 text-sm font-bold text-emerald-300 transition hover:bg-emerald-400/20 md:self-auto"
            >
              <FiMail className="h-4 w-4" />
              Join our team
              <FiArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* ── 4-member equal grid ── */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div
                key={member.name}
                className="team-card group relative flex flex-col overflow-hidden rounded-3xl border border-white/8 bg-[#0a1a0c] transition-all duration-500 hover:-translate-y-1 hover:border-white/15 hover:shadow-2xl"
              >
                {/* Ambient glow on hover */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${member.accent}12, transparent 60%)` }}
                />

                {/* Photo */}
                <div className="relative h-56 overflow-hidden">
                  <div
                    className="team-photo absolute inset-0 bg-cover bg-top transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${member.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a0c] via-[#0a1a0c]/20 to-transparent" />
                  {/* Accent dot */}
                  <div
                    className="absolute right-4 top-4 h-2.5 w-2.5 rounded-full"
                    style={{ background: member.accent, boxShadow: `0 0 12px ${member.accent}` }}
                  />
                  {/* Role badge on photo */}
                  <div className="absolute bottom-3 left-4">
                    <span
                      className="rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider backdrop-blur-sm"
                      style={{ background: `${member.accent}20`, color: member.accent, border: `1px solid ${member.accent}40` }}
                    >
                      {member.role}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="mb-2 text-lg font-black text-white">{member.name}</h3>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-500">{member.bio}</p>

                  {/* Skill chips */}
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {member.skills.map((s) => (
                      <span
                        key={s}
                        className="rounded-full px-2.5 py-1 text-[10px] font-semibold"
                        style={{ background: `${member.accent}12`, color: member.accent, border: `1px solid ${member.accent}25` }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Social icons — LinkedIn, Twitter, GitHub always shown */}
                  <div className="flex items-center gap-2 border-t border-white/6 pt-4">
                    <a href={member.linkedin} target="_blank" rel="noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-500 transition hover:border-[#0077b5]/60 hover:bg-[#0077b5]/15 hover:text-[#0077b5]"
                      title="LinkedIn">
                      <FiLinkedin className="h-4 w-4" />
                    </a>
                    <a href={member.twitter} target="_blank" rel="noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-500 transition hover:border-[#1da1f2]/60 hover:bg-[#1da1f2]/15 hover:text-[#1da1f2]"
                      title="Twitter / X">
                      <FiTwitter className="h-4 w-4" />
                    </a>
                    <a href={member.github} target="_blank" rel="noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-500 transition hover:border-white/25 hover:bg-white/10 hover:text-white"
                      title="GitHub">
                      <FiGithub className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, transparent, ${member.accent}, transparent)` }}
                />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════
          §7  CTA — FULL WIDTH
      ══════════════════════════════════════ */}
      <section
        ref={ctaRef}
        className="relative overflow-hidden border-t border-white/6 py-24 md:py-36"
        style={{ background: '#060c07' }}
      >
        {/* Giant bg text */}
        <span
          className="pointer-events-none absolute inset-x-0 top-0 select-none text-center font-black uppercase leading-none text-white/[0.025]"
          style={{ fontSize: 'clamp(80px, 18vw, 200px)', letterSpacing: '-0.05em' }}
        >
          GROW
        </span>
        {/* Glow */}
        <div className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(52,211,153,0.1), transparent 60%)' }}
        />

        <div className="relative mx-auto max-w-4xl px-5 text-center md:px-10">
          <div className="cta-el mb-3 flex items-center justify-center gap-3">
            <div className="h-px w-10 bg-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-400">Get started</span>
            <div className="h-px w-10 bg-emerald-400" />
          </div>
          <h2 className="cta-el mb-5 text-5xl font-black leading-tight tracking-[-0.04em] text-white md:text-7xl">
            Ready to grow
            <br />
            <span className="bg-gradient-to-r from-emerald-300 via-lime-200 to-emerald-400 bg-clip-text text-transparent">
              smarter?
            </span>
          </h2>
          <p className="cta-el mb-10 text-base leading-relaxed text-slate-400 md:text-lg">
            Join 12,000+ growers across India who use FLORE AI every week to keep their
            plants thriving — no guesswork, no jargon.
          </p>
          <div className="cta-el flex flex-wrap justify-center gap-4">
            <Link
              to="/ai-doctor"
              className="group inline-flex items-center gap-2 rounded-full bg-emerald-400 px-8 py-4 text-base font-bold text-slate-950 shadow-xl shadow-emerald-500/30 transition hover:bg-emerald-300 hover:gap-3"
            >
              Try AI Plant Doctor
              <FiArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="mailto:hello@florai.in"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
            >
              Get in touch
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
