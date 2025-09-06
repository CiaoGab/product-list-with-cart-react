/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,html}'
  ],
  theme: {
    extend: {
        fontFamily: {
        display: ['"Red Hat Display"', 'sans-serif'],
        text: ['"Red Hat Text"', 'sans-serif'],
        mono: ['"Red Hat Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
