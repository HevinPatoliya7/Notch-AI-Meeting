/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: {
          DEFAULT: '#000000',
          50: '#0A0A0B',
          100: '#0F0F12',
          200: '#16161A',
          300: '#1F1F24',
          400: '#2A2A30',
        },
        violet: {
          glow: '#8B5CF6',
          soft: '#C4B5FD',
        },
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.03em',
      },
    },
  },
  plugins: [],
};
