import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiLock, FiMail, FiUserPlus, FiLogIn } from 'react-icons/fi'

type Mode = 'signin' | 'signup'

export function Auth() {
  const [mode, setMode] = useState<Mode>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState<string | null>(null)

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setMessage(
      mode === 'signin'
        ? 'Demo sign-in successful. Connect your real auth provider here.'
        : 'Demo account created. Wire this flow to your backend or Auth service.',
    )
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:items-stretch md:justify-between">
      <div className="max-w-sm space-y-4 text-left">
        <p className="pill mb-2 bg-slate-900/70">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          FLORE ID · Account & sync
        </p>
        <h1 className="text-2xl font-semibold text-white md:text-3xl">
          One login for plants, community and marketplace.
        </h1>
        <p className="text-sm text-slate-300">
          Your FLORE ID connects AI Doctor history, Gardener dashboards, LMS progress and plant
          swaps. In this demo, authentication is simulated.
        </p>
        <ul className="mt-2 space-y-1 text-xs text-slate-300">
          <li>• Sync plants and reminders across devices.</li>
          <li>• Save diagnoses and expert consultations to your timeline.</li>
          <li>• Build a trust profile for safer plant swaps and marketplace deals.</li>
        </ul>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel w-full max-w-sm border-white/15 p-4"
      >
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="inline-flex rounded-full bg-slate-900/70 p-1 text-[11px]">
            <button
              type="button"
              onClick={() => setMode('signin')}
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 transition ${
                mode === 'signin'
                  ? 'bg-emerald-400 text-slate-950'
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              <FiLogIn className="h-3 w-3" />
              Sign in
            </button>
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 transition ${
                mode === 'signup'
                  ? 'bg-emerald-400 text-slate-950'
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              <FiUserPlus className="h-3 w-3" />
              Create account
            </button>
          </div>
          <span className="rounded-full bg-slate-900/70 px-2 py-1 text-[10px] text-slate-300">
            Demo only
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs text-slate-200">
          {mode === 'signup' && (
            <div className="space-y-1">
              <label className="text-[10px] text-slate-300">Full name</label>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2">
                <FiUserPlus className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  className="flex-1 bg-transparent text-xs text-slate-100 outline-none"
                  placeholder="e.g. Aditi Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          )}
          <div className="space-y-1">
            <label className="text-[10px] text-slate-300">Email</label>
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2">
              <FiMail className="h-4 w-4 text-slate-400" />
              <input
                type="email"
                className="flex-1 bg-transparent text-xs text-slate-100 outline-none"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] text-slate-300">Password</label>
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2">
              <FiLock className="h-4 w-4 text-slate-400" />
              <input
                type="password"
                className="flex-1 bg-transparent text-xs text-slate-100 outline-none"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-400 px-4 py-2 text-xs font-semibold text-slate-950 shadow-lg shadow-emerald-500/40 hover:bg-emerald-300"
          >
            {mode === 'signin' ? (
              <>
                <FiLogIn className="h-4 w-4" />
                Continue to FLORE
              </>
            ) : (
              <>
                <FiUserPlus className="h-4 w-4" />
                Create FLORE ID
              </>
            )}
          </button>
        </form>

        {message && (
          <p className="mt-3 rounded-2xl bg-slate-900/80 px-3 py-2 text-[11px] text-emerald-100">
            {message}
          </p>
        )}
      </motion.div>
    </div>
  )
}


