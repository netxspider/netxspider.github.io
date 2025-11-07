/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      utilities: {
        '.transform-3d': {
          'transform-style': 'preserve-3d',
        },
      },
      backgroundImage: {
        'gradient-conic': 'conic-gradient(var(--conic-position, from 0deg at 50% 50%), var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
