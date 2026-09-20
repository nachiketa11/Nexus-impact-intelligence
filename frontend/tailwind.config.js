/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B0F17',
        panel: '#121826',
        'panel-raised': '#182235',
        samsung: '#5B8CFF',
        'samsung-bright': '#7AA5FF',
        muted: '#8C98AF',
      },
      boxShadow: {
        panel: '0 18px 50px rgba(0, 0, 0, 0.24)',
      },
    },
  },
  plugins: [],
}
