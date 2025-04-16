/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      ph: '480px',
      sm: '500px',
      md: '600px',
      lg: '756px',
      xl: '1200px'
    },
    extend: {
      fontFamily: {
        h: ['Poppins', 'sans-serif'],
        p: ['Inter', 'sans-serif']
      },
      colors: {
        bg: '#FAF4EF',
        primary: '#F4A261',
        secondary: '#8D6748',
        accent: '#FFF1E6',
        text: '#3B2F2F',
        error: '#FF4D4D',
      },
    }
  },
  plugins: [],
};
