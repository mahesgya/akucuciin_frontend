/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', 
  content: [
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-primary': '#687EFF',
        'red-warning': "#EF4444",
        "black-33": "rgba(0, 0, 0, 0.33)",
        "gray-55": "rgba(255, 255, 255, 0.08)",
        "gray-ao": "#A0A0A0",
        "green-tua": "#183F18",
        "green-tua2": "#193219",
        "green-muda": "#0AB175",
        "gray-52": "#525252",
        "gray-de": "#DEDEDE",
        "birumuda": "rgba(240, 237, 255, 0.80)",
        "black29": "#292929",
        "gray55": "#555",
        "extrablack": "#000000",

        "dark-bg": "#121212",
        "dark-card": "#1E1E1E",
        "dark-text": "#E5E5E5",
        'dark-card-darker': '#1A1A1A',
      },
      backgroundImage: {
        "custom-bg": "url('/src/assets/Mountain.png')",
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        custom: ['MyCustomFont', 'sans-serif'],
        quick: ['Quicksand'],
        inter: ['Inter'],
        work: ['Work Sans', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'tiny': '0.6rem',
        'base': '1rem',
        'big': '1.25rem',
        'extra-large': '2.5rem',
      },
      boxShadow: {
        'custom-note': '0px 0px 16px 0px rgba(96, 97, 112, 0.1)',
      },
      fontWeight: {
        'boldparah': '1000',
      }
    },
  },
  plugins: [
    require('tailwindcss-textshadow')
  ],
};
