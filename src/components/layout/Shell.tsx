import type { ReactNode } from 'react'

type ShellProps = {
  children: ReactNode
}

export function Shell({ children }: ShellProps) {
  return (
    <main className="min-h-screen bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-28 md:px-6 md:pt-32">
        {children}
      </div>
    </main>
  )
}
