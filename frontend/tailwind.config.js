/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#05070A',
        ink: '#080C14',
        panel: '#0C1220',
        'panel-raised': '#141D2F',
        samsung: '#1E88FF',
        'samsung-bright': '#7AA5FF',
        'samsung-dark': '#0C4CB0',
        cyan: {
          400: '#00F0FF',
        },
        muted: '#8C98AF',
      },
      boxShadow: {
        panel: '0 18px 50px rgba(0, 0, 0, 0.35)',
        glow: '0 0 30px rgba(30, 136, 255, 0.35)',
        'glow-cyan': '0 0 30px rgba(0, 240, 255, 0.35)',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
