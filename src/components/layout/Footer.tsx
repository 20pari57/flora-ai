import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiArrowRight, FiInstagram, FiTwitter, FiYoutube, FiMail } from 'react-icons/fi'

gsap.registerPlugin(ScrollTrigger)

const links = {
  Platform: [
    { label: 'AI Plant Doctor', href: '/ai-doctor' },
    { label: 'AI Gardener OS', href: '/ai-gardener' },
    { label: 'Marketplace', href: '/marketplace' },
    { label: 'LMS & Community', href: '/lms' },
    { label: 'Plant Swap', href: '/plant-swap' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '#' },
    { label: 'Press Kit', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  Resources: [
    { label: 'Plant Care Guides', href: '#' },
    { label: 'Disease Library', href: '#' },
    { label: 'API Docs', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
}

const socials = [
  { icon: FiInstagram, label: 'Instagram', href: '#' },
  { icon: FiTwitter, label: 'Twitter / X', href: '#' },
  { icon: FiYoutube, label: 'YouTube', href: '#' },
  { icon: FiMail, label: 'Email', href: 'mailto:hello@florai.in' },
]

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(footerRef.current?.querySelectorAll('.footer-col') ?? [], {
        opacity: 0,
        y: 30,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="relative mt-0 overflow-hidden border-t border-white/8 bg-slate-950">

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(52,211,153,0.4), transparent)' }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-[600px] -translate-x-1/2 rounded-full opacity-10 blur-[120px]"
        style={{ background: 'radial-gradient(circle, #34d399, transparent)' }}
      />

      <div className="mx-auto max-w-7xl px-5 md:px-10">

        {/* ── Top section ── */}
        <div className="grid gap-12 py-16 md:grid-cols-2 md:py-20 lg:grid-cols-[2fr_1fr_1fr_1fr]">

          {/* Brand column */}
          <div className="footer-col">
            <Link to="/" className="mb-5 inline-block">
              <img src="/logo.png" alt="Flora.ai" className="h-10 w-auto" />
            </Link>
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-slate-400">
              India's first AI-powered plant care OS — from disease diagnosis to live garden management and ethical plant commerce.
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition hover:border-emerald-400/40 hover:bg-emerald-400/10 hover:text-emerald-300"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <div className="mt-8">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-300">
                Plant tips in your inbox
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="flora@email.com"
                  className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none focus:border-emerald-400/40 focus:bg-white/8 transition"
                />
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
                >
                  <FiArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading} className="footer-col">
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-white">
                {heading}
              </p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className="text-sm text-slate-400 transition hover:text-emerald-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div className="footer-col flex flex-col items-center justify-between gap-4 border-t border-white/8 py-6 text-xs text-slate-500 md:flex-row">
          <p>© {new Date().getFullYear()} FLORA AI. Built with care for Indian plant lovers.</p>
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              All systems operational
            </span>
            <span>Made in 🇮🇳 India</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
