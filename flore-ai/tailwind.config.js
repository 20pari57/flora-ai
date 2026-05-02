/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        'flore-primary': '#34d399',
        'flore-secondary': '#22c55e',
        'flore-dark': '#020617',
        'flore-glass': 'rgba(15,23,42,0.75)',
      },
      backgroundImage: {
        'flore-gradient':
          'radial-gradient(circle at top, rgba(74,222,128,0.35), transparent 60%), radial-gradient(circle at bottom, rgba(59,130,246,0.25), transparent 55%)',
      },
      boxShadow: {
        glass: '0 18px 50px rgba(15,23,42,0.65)',
        card: '0 4px 24px rgba(0,0,0,0.18)',
      },
      borderRadius: {
        glass: '1.75rem',
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.02em',
      },
    },
  },
  plugins: [],
}
