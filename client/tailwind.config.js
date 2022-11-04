/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extend: {
      colors: {
        'osmo-900':'#021431',
        'osmo-800':'#052861',
        'osmo-700':'#073c92',
        'osmo-600':'#0950c3',
        'osmo-500':'#0b64f4',
        'osmo-400':'#3c83f6',
        'osmo-300':'#6da2f8',
        'osmo-200':'#9ec1fa',
        'osmo-100':'#cee0fd',
      }
    },
  },  
  plugins: [],
}