import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiUser, FiMenu, FiX } from 'react-icons/fi'

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/ai-doctor', label: 'AI Doctor' },
  { path: '/ai-gardener', label: 'AI Gardener' },
  { path: '/marketplace', label: 'Marketplace' },
  { path: '/lms', label: 'LMS & Community' },
  { path: '/plant-swap', label: 'Plant Swap' },
  { path: '/about', label: 'About Us' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-slate-950/90 backdrop-blur-xl border-b border-white/5 shadow-glass'
            : 'bg-gradient-to-b from-slate-950/70 via-slate-950/20 to-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 md:px-8">
          <Link to="/" className="flex-shrink-0">
            <motion.img
              src="/logo.png"
              alt="Flora.ai"
              className="h-10 w-auto"
              whileHover={{ scale: 1.04 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            />
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  [
                    'relative px-3.5 py-2 text-sm font-medium transition-colors duration-200 rounded-full',
                    isActive
                      ? 'text-emerald-300'
                      : 'text-slate-300 hover:text-white',
                  ].join(' ')
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-0 rounded-full bg-emerald-500/10 border border-emerald-400/20"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              to="/auth"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 backdrop-blur-sm transition hover:bg-white/10 hover:border-white/25"
            >
              <FiUser className="h-4 w-4" />
              Sign in
            </Link>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 border border-emerald-400/25 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Beta
            </span>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-200 backdrop-blur-sm transition hover:bg-white/10 lg:hidden"
          >
            {mobileOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[68px] z-40 border-b border-white/10 bg-slate-950/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    [
                      'rounded-xl px-4 py-3 text-sm font-medium transition',
                      isActive
                        ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-400/20'
                        : 'text-slate-300 hover:bg-white/5',
                    ].join(' ')
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="mt-3 flex items-center gap-3 border-t border-white/10 pt-3">
                <Link
                  to="/auth"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 rounded-full border border-white/10 bg-white/5 py-2 text-center text-sm font-medium text-slate-200"
                >
                  Sign in
                </Link>
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 border border-emerald-400/25 px-4 py-2 text-xs font-semibold text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Live Beta
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
