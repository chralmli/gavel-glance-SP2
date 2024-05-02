/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-cream': '#FFFEE7',
        'secondary-blue': '#2D596B',
        'accent-blue': '#BFCFCC',
      },
      fontFamily: {
        'body': ['"Montserrat"'],
        'heading': ['"Playfair Display"'],
      },
      backgroundImage: {
        'hero-pattern': "url('/src/assets/gavelglance_banner-img.png')",
      }
    },
  },
  plugins: [],
}

