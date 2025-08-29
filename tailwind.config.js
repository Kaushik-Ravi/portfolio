/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Lora', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        slate: {
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          600: '#475569',
          500: '#64748b',
          400: '#94a3b8',
          300: '#cbd5e1',
          200: '#e2e8f0',
          100: '#f1f5f9',
        }
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#cbd5e1',
            h1: {
              fontFamily: ['Lora', 'Georgia', 'serif'],
              color: '#f1f5f9',
            },
            h2: {
              fontFamily: ['Lora', 'Georgia', 'serif'],
              color: '#f1f5f9',
            },
            h3: {
              fontFamily: ['Lora', 'Georgia', 'serif'],
              color: '#f1f5f9',
            },
          },
        },
      },
    },
  },
  plugins: [],
};