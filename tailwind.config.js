/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mono: {
          bg: '#FFFFFF',
          secondary: '#050505',
          accent: '#FFFFFF',
          surface: '#D4D4D4',
          'surface-light': '#F4F4F5',
          'surface-subtle': '#FAFAFA',
          text: '#111827',
          'text-secondary': '#4B5563',
          border: '#D4D4D4',
          'border-subtle': '#E5E7EB',
        },
        navy: {
          950: '#050505',
          900: '#111827',
          850: '#1F2937',
          800: '#F4F4F5',
          750: '#E5E7EB',
          700: '#D4D4D4',
          600: '#9CA3AF',
          500: '#6B7280',
        },
        circuit: {
          teal: '#050505',
          cyan: '#111827',
          green: '#111827',
          amber: '#4B5563',
          rose: '#EF4444',
          muted: '#4B5563',
          border: '#D4D4D4',
          'border-active': '#050505',
          glow: 'rgba(5, 5, 5, 0.08)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Space Mono', 'Consolas', 'Menlo', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        'navbar': '4.5rem',
        'section': '6rem',
        'section-lg': '8rem',
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.06), 0 1px 3px 0 rgba(0, 0, 0, 0.04)',
        'card-hover': '0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
        'nav': '0 2px 15px -2px rgba(0, 0, 0, 0.05)',
        'glow-teal': '0 4px 20px -2px rgba(5, 5, 5, 0.25)',
        'glow-cyan': '0 4px 20px -2px rgba(5, 5, 5, 0.2)',
        'glow-subtle': '0 2px 10px 0 rgba(5, 5, 5, 0.08)',
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)",
        'dot-pattern': "radial-gradient(rgba(0, 0, 0, 0.12) 1px, transparent 1px)",
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
