import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiArrowRight, FiActivity, FiCamera, FiMapPin, FiStar, FiDroplet, FiSun, FiPlay, FiShield, FiZap } from 'react-icons/fi'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    title: 'AI Plant Doctor',
    description: 'Detect diseases from a single photo with India-focused remedies and treatment plans.',
    icon: FiCamera,
    href: '/ai-doctor',
    pill: 'Diagnosis',
    accent: '#34d399',
    accentRgb: '52,211,153',
    image: 'https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?auto=format&fit=crop&w=800&q=80',
    tag: '98% accuracy',
  },
  {
    title: 'AI Gardener',
    description: 'Personal plant OS with weather-aware reminders and live growth dashboards.',
    icon: FiActivity,
    href: '/ai-gardener',
    pill: 'Assistant',
    accent: '#38bdf8',
    accentRgb: '56,189,248',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80',
    tag: 'Live weather sync',
  },
  {
    title: 'Smart Marketplace',
    description: 'Buy from online platforms or nearby nurseries via WhatsApp in one tap.',
    icon: FiMapPin,
    href: '/marketplace',
    pill: 'Commerce',
    accent: '#a3e635',
    accentRgb: '163,230,53',
    image: 'https://images.unsplash.com/photo-1441930474823-6d72ead87b71?auto=format&fit=crop&w=800&q=80',
    tag: '500+ nurseries',
  },
  {
    title: 'LMS & Community',
    description: 'Lessons, blogs and a social feed where growers share stories in real time.',
    icon: FiStar,
    href: '/lms',
    pill: 'Learning',
    accent: '#c084fc',
    accentRgb: '192,132,252',
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=800&q=80',
    tag: '12K+ growers',
  },
]

const stats = [
  { number: '50K+', label: 'Plants diagnosed', color: '#34d399' },
  { number: '120+', label: 'Indian crop varieties', color: '#38bdf8' },
  { number: '98%', label: 'Accuracy rate', color: '#a3e635' },
  { number: '12K+', label: 'Active growers', color: '#c084fc' },
]

const ticker = [
  'AI Plant Doctor', 'Weather-Aware Care', 'Smart Marketplace',
  'Community Feed', 'Plant Swap Network', 'Expert Consultations',
  'LMS Lessons', 'Nursery Finder', 'Monsoon-Safe Advice',
]

export function Landing() {
  const heroRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const orb1Ref = useRef<HTMLDivElement>(null)
  const orb2Ref = useRef<HTMLDivElement>(null)
  const orb3Ref = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const tickerRef = useRef<HTMLDivElement>(null)
  const widgetRef = useRef<HTMLDivElement>(null)
  const ctaSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Hero entrance timeline ──
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from(badgeRef.current, { opacity: 0, y: 30, duration: 0.7 })
        .from(
          headlineRef.current?.querySelectorAll('.word') ?? [],
          { opacity: 0, y: 80, stagger: 0.08, duration: 0.9, ease: 'power4.out' },
          '-=0.3',
        )
        .from(subRef.current, { opacity: 0, y: 30, duration: 0.7 }, '-=0.5')
        .from(ctaRef.current, { opacity: 0, y: 24, duration: 0.6 }, '-=0.4')

      // ── Floating orbs ──
      gsap.to(orb1Ref.current, {
        x: 40, y: -30, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut',
      })
      gsap.to(orb2Ref.current, {
        x: -50, y: 40, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2,
      })
      gsap.to(orb3Ref.current, {
        x: 30, y: 50, duration: 12, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 4,
      })

      // ── Parallax on bg ──
      gsap.to(bgRef.current, {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // ── Ticker ──
      const tickerEl = tickerRef.current
      if (tickerEl) {
        const totalWidth = tickerEl.scrollWidth / 2
        gsap.to(tickerEl, {
          x: -totalWidth,
          duration: 30,
          ease: 'none',
          repeat: -1,
        })
      }

      // ── Stats counter animation ──
      if (statsRef.current) {
        const statCards = statsRef.current.querySelectorAll('.stat-card')
        gsap.set(statCards, { opacity: 1 })
        gsap.from(statCards, {
          y: 40,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 95%', once: true },
        })
      }

      // ── Features stagger + scale reveal ──
      if (featuresRef.current) {
        const featureCards = featuresRef.current.querySelectorAll('.feature-card')
        gsap.set(featureCards, { opacity: 1 })
        gsap.from(featureCards, {
          y: 60,
          scale: 0.96,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: featuresRef.current, start: 'top 95%', once: true },
        })
        const featHeading = featuresRef.current.querySelector('.features-heading')
        if (featHeading) {
          gsap.set(featHeading, { opacity: 1 })
          gsap.from(featHeading, {
            y: 30,
            duration: 0.6,
            scrollTrigger: { trigger: featuresRef.current, start: 'top 95%', once: true },
          })
        }
        // ── Feature card GSAP hover (image zoom + content slide) ──
        featuresRef.current.querySelectorAll('.feature-card').forEach((card) => {
          const img = card.querySelector('.card-img') as HTMLElement
          const content = card.querySelector('.card-content') as HTMLElement
          const border = card.querySelector('.card-border-glow') as HTMLElement

          card.addEventListener('mouseenter', () => {
            if (img) gsap.to(img, { scale: 1.1, duration: 0.6, ease: 'power2.out' })
            if (content) gsap.to(content, { y: -6, duration: 0.4, ease: 'power2.out' })
            if (border) gsap.to(border, { opacity: 1, duration: 0.4 })
          })
          card.addEventListener('mouseleave', () => {
            if (img) gsap.to(img, { scale: 1, duration: 0.6, ease: 'power2.inOut' })
            if (content) gsap.to(content, { y: 0, duration: 0.4, ease: 'power2.inOut' })
            if (border) gsap.to(border, { opacity: 0, duration: 0.4 })
          })
        })
      }

      // ── Widget section ──
      if (widgetRef.current) {
        gsap.from(widgetRef.current.querySelector('.widget-left'), {
          opacity: 0,
          x: -60,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: widgetRef.current, start: 'top 80%' },
        })
        gsap.from(widgetRef.current.querySelector('.widget-right'), {
          opacity: 0,
          x: 60,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: widgetRef.current, start: 'top 80%' },
        })

        // ── Progress bar fill ──
        const bar = widgetRef.current.querySelector('.stat-bar') as HTMLElement
        if (bar) {
          gsap.to(bar, {
            width: '96%',
            duration: 1.4,
            ease: 'power2.out',
            delay: 0.4,
            scrollTrigger: { trigger: widgetRef.current, start: 'top 75%' },
          })
        }

        // ── Stat cards stagger in ──
        gsap.from(widgetRef.current.querySelectorAll('.widget-right .rounded-2xl'), {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.55,
          ease: 'power3.out',
          delay: 0.5,
          scrollTrigger: { trigger: widgetRef.current, start: 'top 75%' },
        })

        // ── Sparkline SVG stroke draw ──
        widgetRef.current.querySelectorAll('.sparkline-path').forEach((path, i) => {
          const el = path as SVGPathElement
          const len = el.getTotalLength ? el.getTotalLength() : 80
          gsap.set(el, { strokeDasharray: len, strokeDashoffset: len })
          gsap.to(el, {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: 'power2.out',
            delay: 0.7 + i * 0.15,
            scrollTrigger: { trigger: widgetRef.current, start: 'top 75%' },
          })
        })
      }

      // ── CTA section ──
      if (ctaSectionRef.current) {
        gsap.from(ctaSectionRef.current.querySelector('.cta-content'), {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: ctaSectionRef.current, start: 'top 85%' },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  // Plant card widget animation
  const plantCardRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!plantCardRef.current) return
    gsap.to(plantCardRef.current, {
      y: -12,
      duration: 3.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })
  }, [])

  return (
    <div className="bg-slate-950 overflow-x-hidden">

      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section ref={heroRef} className="relative flex min-h-screen flex-col overflow-hidden">

        {/* Background photo with parallax */}
        <div
          ref={bgRef}
          className="absolute inset-[-10%] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=2100&q=80')",
          }}
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/60 to-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/30 to-slate-950/70" />

        {/* Animated glow orbs */}
        <div
          ref={orb1Ref}
          className="pointer-events-none absolute left-[10%] top-[20%] h-80 w-80 rounded-full opacity-30 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #34d399, transparent)' }}
        />
        <div
          ref={orb2Ref}
          className="pointer-events-none absolute right-[15%] top-[30%] h-96 w-96 rounded-full opacity-20 blur-[120px]"
          style={{ background: 'radial-gradient(circle, #38bdf8, transparent)' }}
        />
        <div
          ref={orb3Ref}
          className="pointer-events-none absolute bottom-[20%] left-[40%] h-64 w-64 rounded-full opacity-25 blur-[80px]"
          style={{ background: 'radial-gradient(circle, #a3e635, transparent)' }}
        />

        {/* Floating SVG leaf elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {[
            { top: '18%', left: '6%', size: 36, rotate: -20, delay: 0 },
            { top: '55%', left: '3%', size: 22, rotate: 15, delay: 1.5 },
            { top: '25%', right: '5%', size: 28, rotate: 40, delay: 0.8 },
            { top: '65%', right: '8%', size: 18, rotate: -30, delay: 2.2 },
            { top: '42%', left: '88%', size: 14, rotate: 60, delay: 1 },
          ].map((leaf, i) => (
            <div
              key={i}
              className="absolute opacity-30"
              style={{
                top: leaf.top,
                left: 'left' in leaf ? leaf.left : undefined,
                right: 'right' in leaf ? (leaf as any).right : undefined,
              }}
            >
              <svg
                width={leaf.size}
                height={leaf.size}
                viewBox="0 0 24 24"
                fill="#34d399"
                style={{ transform: `rotate(${leaf.rotate}deg)` }}
              >
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 0-13 6 1.6-1.35 3.44-2.76 6-3.5C15 5.5 17 8 17 8z" />
              </svg>
            </div>
          ))}
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex flex-1 flex-col justify-end">
          <div className="mx-auto w-full max-w-7xl px-5 pb-20 md:px-10 md:pb-24">
            <div className="grid items-end gap-10 md:grid-cols-2 md:gap-20">

              {/* Left – big headline */}
              <div>
                <div ref={badgeRef} className="mb-6">
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-300 backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Smart plant care OS · Indian subcontinent
                  </span>
                </div>

                <div ref={headlineRef} className="overflow-hidden">
                  <h1 className="text-[clamp(4rem,9vw,8rem)] font-black leading-none tracking-[-0.04em] text-white">
                    <span className="word inline-block">FLORE</span>
                    <br />
                    <span className="word inline-block bg-gradient-to-r from-emerald-300 via-lime-200 to-sky-300 bg-clip-text text-transparent">
                      AI
                    </span>
                  </h1>
                </div>

                {/* Animated line under headline */}
                <div className="mt-4 h-px bg-gradient-to-r from-emerald-400 to-transparent gsap-line" style={{ width: '60%' }} />
              </div>

              {/* Right – description + CTAs */}
              <div>
                <div ref={subRef}>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-emerald-400">
                    From leaf to ecosystem
                  </p>
                  <p className="mb-8 text-lg leading-relaxed text-slate-200 md:text-xl">
                    Diagnose plant diseases, orchestrate watering with live weather, discover ethical
                    nurseries, and grow with India's largest plant community.
                  </p>
                </div>

                <div ref={ctaRef} className="flex flex-wrap gap-3">
                  <Link
                    to="/ai-doctor"
                    className="group inline-flex items-center gap-2 rounded-full bg-emerald-400 px-7 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/40 transition-all hover:bg-emerald-300 hover:shadow-emerald-400/50 hover:gap-3"
                  >
                    Try AI Doctor
                    <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    to="/ai-gardener"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15 hover:border-white/30"
                  >
                    Start Gardening OS
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
      </section>

      {/* ═══════════════════════════════════════
          TICKER / MARQUEE
      ═══════════════════════════════════════ */}
      <div className="overflow-hidden border-y border-white/8 bg-slate-900/50 py-4">
        <div ref={tickerRef} className="flex gap-8 whitespace-nowrap">
          {[...ticker, ...ticker].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-slate-400">
              <span className="h-1 w-1 rounded-full bg-emerald-500" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════
          STATS
      ═══════════════════════════════════════ */}
      <div ref={statsRef} className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-20">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.number}
              className="stat-card group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-6 text-center transition hover:border-white/15 hover:bg-white/[0.06]"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: `radial-gradient(circle at center, ${stat.color}15, transparent 70%)` }}
              />
              <p className="relative text-3xl font-black md:text-4xl" style={{ color: stat.color }}>
                {stat.number}
              </p>
              <p className="relative mt-1.5 text-xs font-medium text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════
          FEATURES
      ═══════════════════════════════════════ */}
      <section ref={featuresRef} className="mx-auto max-w-7xl px-5 py-10 md:px-10 md:py-20">

        {/* Section heading */}
        <div className="features-heading mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-emerald-400">
              Platform modules
            </p>
            <h2 className="text-4xl font-black leading-tight tracking-[-0.03em] text-white md:text-5xl lg:text-6xl">
              Everything your plants
              <br />
              <span className="bg-gradient-to-r from-emerald-300 to-sky-300 bg-clip-text text-transparent">
                need in one place.
              </span>
            </h2>
          </div>
          <Link
            to="/ai-doctor"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/10 md:self-auto"
          >
            Explore all modules
            <FiArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Feature cards — image overlay editorial style */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <Link key={f.title} to={f.href} className="feature-card group block" style={{ willChange: 'transform, opacity' }}>
              <div className="relative flex h-[420px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900">

                {/* ── Background image (GSAP zooms this) ── */}
                <div className="card-img absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${f.image}')`, transformOrigin: 'center center' }} />

                {/* Dark gradient overlay — stronger at bottom */}
                <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, rgba(2,6,23,0.25) 0%, rgba(2,6,23,0.5) 40%, rgba(2,6,23,0.92) 80%, rgba(2,6,23,1) 100%)` }} />

                {/* Accent color tint on hover (CSS transition fallback) */}
                <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-30" style={{ background: `radial-gradient(ellipse at 50% 0%, rgba(${f.accentRgb},0.4), transparent 70%)` }} />

                {/* ── Top row ── */}
                <div className="relative z-10 flex items-center justify-between p-5">
                  <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/70 backdrop-blur-sm">
                    {f.pill}
                  </span>
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-sm"
                    style={{ background: `rgba(${f.accentRgb},0.18)`, border: `1px solid rgba(${f.accentRgb},0.35)`, color: f.accent }}
                  >
                    <f.icon className="h-4 w-4" />
                  </div>
                </div>

                {/* ── Bottom content (GSAP slides this up on hover) ── */}
                <div className="card-content relative z-10 mt-auto p-5">

                  {/* Live tag */}
                  <div className="mb-3">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold"
                      style={{ background: `rgba(${f.accentRgb},0.15)`, color: f.accent, border: `1px solid rgba(${f.accentRgb},0.25)` }}
                    >
                      <span className="h-1 w-1 animate-pulse rounded-full" style={{ background: f.accent }} />
                      {f.tag}
                    </span>
                  </div>

                  <h3 className="mb-2 text-xl font-black tracking-[-0.02em] text-white">{f.title}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-slate-300/80">{f.description}</p>

                  {/* CTA row */}
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm font-bold" style={{ color: f.accent }}>
                      Explore
                      <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
                    </span>
                    {/* Mini progress bar decoration */}
                    <div className="h-1 w-16 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-0 rounded-full transition-all duration-700 group-hover:w-full" style={{ background: f.accent }} />
                    </div>
                  </div>
                </div>

                {/* ── Bottom border glow (GSAP fades in on hover) ── */}
                <div
                  className="card-border-glow pointer-events-none absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{ background: `linear-gradient(90deg, transparent, ${f.accent}, transparent)`, opacity: 0 }}
                />

                {/* Corner accent dot */}
                <div className="absolute right-5 top-[52px] h-1 w-1 rounded-full opacity-60 transition-all duration-500 group-hover:scale-[3]" style={{ background: f.accent }} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          LIVE WIDGET SECTION
      ═══════════════════════════════════════ */}
      <section ref={widgetRef} className="border-t border-white/8 bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
          <div className="grid items-center gap-14 md:grid-cols-2">

            {/* ── Left text ── */}
            <div className="widget-left">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-emerald-400">
                Live dashboard
              </p>
              <h2 className="mb-6 text-4xl font-black leading-tight tracking-[-0.03em] text-white md:text-5xl">
                Your plants,
                <br />
                <span className="bg-gradient-to-r from-emerald-300 to-lime-200 bg-clip-text text-transparent">
                  in real-time.
                </span>
              </h2>
              <p className="mb-6 text-base leading-relaxed text-slate-400">
                FLORE AI turns sensor data and live weather feeds into a calm, actionable dashboard.
                Track moisture, sunlight, and watering schedules at a glance — automatically adjusted
                for Indian climate conditions.
              </p>

              {/* Bullet points with icon badges */}
              <ul className="mb-8 space-y-3.5">
                {[
                  { icon: FiDroplet, text: 'Monsoon-aware watering schedules', color: '#34d399', bg: 'rgba(52,211,153,0.12)' },
                  { icon: FiZap,     text: 'Heat-wave alerts for outdoor pots',       color: '#fbbf24', bg: 'rgba(251,191,36,0.12)' },
                  { icon: FiShield,  text: 'Fungal risk prediction via humidity tracking', color: '#c084fc', bg: 'rgba(192,132,252,0.12)' },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-3 text-sm text-slate-300">
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl"
                      style={{ background: item.bg, color: item.color }}
                    >
                      <item.icon className="h-3.5 w-3.5" />
                    </span>
                    {item.text}
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/ai-gardener"
                  className="group inline-flex items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300 hover:gap-3"
                >
                  Open Gardener OS
                  <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <button type="button" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-white">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5">
                    <FiPlay className="h-3.5 w-3.5 translate-x-[1px]" />
                  </span>
                  See how it works
                </button>
              </div>
            </div>

            {/* ── Right – redesigned widget ── */}
            <div className="widget-right relative">
              {/* Outer ambient glow */}
              <div
                className="pointer-events-none absolute inset-[-30px] rounded-[3rem] opacity-50 blur-3xl"
                style={{ background: 'radial-gradient(ellipse, rgba(52,211,153,0.25), rgba(56,189,248,0.15), transparent 70%)' }}
              />

              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d1f18] p-6 shadow-2xl">
                {/* Subtle inner glow */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{ background: 'radial-gradient(ellipse at 80% 10%, rgba(52,211,153,0.1), transparent 55%)' }}
                />

                <div className="relative z-10">
                  {/* ── Header ── */}
                  <div className="mb-5 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-white">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                      Live Plant Snapshot
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Beta
                    </span>
                  </div>

                  {/* ── Main plant card with real photo ── */}
                  <div
                    ref={plantCardRef}
                    className="relative mb-4 overflow-hidden rounded-2xl"
                    style={{
                      background: 'linear-gradient(135deg, #0b2e1e 0%, #0f3d24 50%, #1a4d2e 100%)',
                      border: '1px solid rgba(52,211,153,0.2)',
                      minHeight: '160px',
                    }}
                  >
                    {/* Radial glow inside card */}
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(52,211,153,0.18), transparent 60%)' }}
                    />
                    {/* Concentric ring decoration */}
                    <div
                      className="pointer-events-none absolute right-[-20px] top-[-20px] h-48 w-48 rounded-full opacity-20"
                      style={{ border: '1px solid rgba(52,211,153,0.4)' }}
                    />
                    <div
                      className="pointer-events-none absolute right-[-5px] top-[-5px] h-36 w-36 rounded-full opacity-15"
                      style={{ border: '1px solid rgba(52,211,153,0.5)' }}
                    />

                    <div className="relative flex items-center justify-between p-5">
                      {/* Left text */}
                      <div>
                        <p className="mb-0.5 text-xs font-black uppercase tracking-[0.25em] text-emerald-300">FLORE</p>
                        <p className="mb-4 text-xs text-slate-400">Plant Aura</p>
                        {/* Progress bar */}
                        <div className="mb-2 h-1.5 w-28 overflow-hidden rounded-full bg-white/10">
                          <div className="stat-bar h-full w-0 rounded-full bg-gradient-to-r from-emerald-400 to-lime-300" style={{ width: '0%' }} />
                        </div>
                        <p className="text-xl font-black text-white">96% Healthy</p>
                      </div>

                      {/* Right – real plant photo */}
                      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl">
                        <img
                          src="https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=300&q=80"
                          alt="Plant"
                          className="h-full w-full object-cover"
                        />
                        <div
                          className="absolute inset-0"
                          style={{ background: 'linear-gradient(to left, transparent 40%, rgba(11,46,30,0.6))' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* ── Stat cards with icons + sparklines ── */}
                  <div className="mb-4 grid grid-cols-3 gap-2.5">
                    {[
                      {
                        icon: FiDroplet,
                        label: 'Moisture',
                        val: '68%',
                        status: 'Optimal',
                        iconColor: '#34d399',
                        iconBg: 'rgba(52,211,153,0.15)',
                        statusColor: '#34d399',
                        wave: 'M0,10 C5,6 10,14 15,10 C20,6 25,14 30,10 C35,6 40,14 45,10 C50,6 55,14 60,10',
                        waveColor: '#34d399',
                      },
                      {
                        icon: FiSun,
                        label: 'Sunlight',
                        val: 'Soft',
                        status: 'Ideal',
                        iconColor: '#fbbf24',
                        iconBg: 'rgba(251,191,36,0.15)',
                        statusColor: '#fbbf24',
                        wave: 'M0,10 C5,14 10,6 15,10 C20,14 25,6 30,10 C35,14 40,6 45,10 C50,14 55,6 60,10',
                        waveColor: '#fbbf24',
                      },
                      {
                        icon: FiDroplet,
                        label: 'Next Water',
                        val: 'Today',
                        status: 'Recommended',
                        iconColor: '#38bdf8',
                        iconBg: 'rgba(56,189,248,0.15)',
                        statusColor: '#38bdf8',
                        wave: 'M0,10 C5,8 10,12 15,8 C20,12 25,8 30,12 C35,8 40,12 45,8 C50,12 55,8 60,12',
                        waveColor: '#38bdf8',
                      },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-3.5 transition hover:border-white/15 hover:bg-white/[0.05]"
                      >
                        {/* Icon */}
                        <div className="mb-2 flex items-center gap-1.5">
                          <span
                            className="flex h-5 w-5 items-center justify-center rounded-md"
                            style={{ background: s.iconBg, color: s.iconColor }}
                          >
                            <s.icon className="h-3 w-3" />
                          </span>
                          <p className="text-[9px] font-bold uppercase tracking-wider text-slate-500">{s.label}</p>
                        </div>
                        {/* Value */}
                        <p className="mb-0.5 text-xl font-black text-white">{s.val}</p>
                        {/* Status label */}
                        <p className="mb-3 text-[10px] font-semibold" style={{ color: s.statusColor }}>{s.status}</p>
                        {/* Sparkline wave */}
                        <svg viewBox="0 0 60 20" className="w-full" style={{ height: '18px' }}>
                          <path
                            d={s.wave}
                            fill="none"
                            stroke={s.waveColor}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            opacity="0.6"
                            className="sparkline-path"
                          />
                        </svg>
                      </div>
                    ))}
                  </div>

                  {/* ── Footer ── */}
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="inline-flex items-center gap-2">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime-400" />
                      4 plants in Flow Mode
                    </span>
                    <Link to="/ai-gardener" className="flex items-center gap-1 transition hover:text-slate-300">
                      Tap to open
                      <FiArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          MARQUEE 2 - visual separator
      ═══════════════════════════════════════ */}
      <div className="relative overflow-hidden border-y border-white/8 py-16">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at center, rgba(52,211,153,0.05), transparent 70%)' }}
        />
        <div className="relative mx-auto max-w-7xl px-5 text-center md:px-10">
          <p className="text-4xl font-black tracking-[-0.03em] text-white/10 md:text-6xl lg:text-7xl">
            GROW SMARTER · DIAGNOSE FASTER · CONNECT DEEPER · FLORE AI
          </p>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          CTA SECTION
      ═══════════════════════════════════════ */}
      <section ref={ctaSectionRef} className="relative overflow-hidden">
        {/* Background glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at center bottom, rgba(52,211,153,0.12), transparent 65%)' }}
        />
        <div className="cta-content relative mx-auto max-w-7xl px-5 py-24 text-center md:px-10 md:py-32">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-emerald-400">
            Join the community
          </p>
          <h2 className="mb-6 text-4xl font-black leading-tight tracking-[-0.03em] text-white md:text-5xl lg:text-6xl">
            Ready to grow
            <br />
            <span className="bg-gradient-to-r from-emerald-300 via-lime-200 to-sky-300 bg-clip-text text-transparent">
              smarter?
            </span>
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-base leading-relaxed text-slate-400">
            Join thousands of Indian plant lovers who use FLORE AI to keep their gardens thriving —
            from balcony pots to terrace farms.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/ai-doctor"
              className="group inline-flex items-center gap-2 rounded-full bg-emerald-400 px-8 py-4 text-base font-bold text-slate-950 shadow-xl shadow-emerald-500/30 transition-all hover:bg-emerald-300 hover:shadow-emerald-400/50 hover:gap-3"
            >
              Get Started Free
              <FiArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 hover:border-white/25"
            >
              Explore Marketplace
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
