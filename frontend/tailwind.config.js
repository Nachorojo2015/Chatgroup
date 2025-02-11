/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.3 }
        }
      },
      animation: {
        blink: 'blink 1.5s infinite ease-in-out'
      }
    },
  },
  plugins: [],
  darkMode: 'selector'
}

