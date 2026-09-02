/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FFFCF5',
        paper2: '#FDF6E3',
        line: '#E8E0C8',
        ink: '#1A1A18',
        muted: '#5C5A54',
      },
      fontFamily: {
        caveat: ['Caveat','cursive'],
        sans: ['DM Sans','system-ui','sans-serif'],
      }
    }
  },
  plugins: []
}
