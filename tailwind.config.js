/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#05080f',
          900: '#0a0e17', // Base dark mode background
          850: '#0e1422',
          800: '#131b2e', // Elevated cards & containers
          750: '#18243c', // Hover states
          700: '#1e293b', // Borders & dividers
          600: '#334155',
          500: '#475569',
        },
        circuit: {
          teal: '#00e5c7',  // Primary electric accent
          cyan: '#22d3ee',  // Secondary signal accent
          green: '#10b981', // Hardware telemetry OK
          amber: '#f59e0b', // Status caution
          rose: '#f43f5e',  // Error / interrupt
          muted: '#64748b',
          border: 'rgba(34, 211, 238, 0.12)',
          'border-active': 'rgba(0, 229, 199, 0.45)',
          glow: 'rgba(0, 229, 199, 0.15)',
        },
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Space Mono', 'Consolas', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        'navbar': '4.5rem',
        'section': '6rem',
        'section-lg': '8rem',
      },
      boxShadow: {
        'glow-teal': '0 0 25px -4px rgba(0, 229, 199, 0.35)',
        'glow-cyan': '0 0 25px -4px rgba(34, 211, 238, 0.35)',
        'glow-subtle': '0 0 15px 0 rgba(0, 229, 199, 0.12)',
        'card': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
        'nav': '0 4px 20px -2px rgba(5, 8, 15, 0.7)',
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(rgba(34, 211, 238, 0.08) 1px, transparent 1px)",
        'dot-pattern': "radial-gradient(rgba(0, 229, 199, 0.1) 1px, transparent 1px)",
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'trace': 'traceMove 3s linear infinite',
      },
      keyframes: {
        traceMove: {
          '0%': { strokeDashoffset: '100%' },
          '100%': { strokeDashoffset: '0%' },
        }
      }
    },
  },
  plugins: [],
}
