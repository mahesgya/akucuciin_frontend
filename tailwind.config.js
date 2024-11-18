/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/logComponents/***.jsx", 
    "./src/components/***.jsx",
    "./src/ComponentsHP/***.jsx",
    "./src/verify/***.jsx",
    "./src/formComponents/***.jsx",
  ],
  theme: {
    extend: {
      colors: {
        "black-33": "rgba(0, 0, 0, 0.33)",
        "gray-55" : "rgba(255, 255, 255, 0.08)",
        "gray-ao" : "#A0A0A0",
        "green-tua" : "#183F18",
        "green-tua2" : "#193219",
        "green-muda" : "#0AB175",
        "gray-52" : "#525252",
        "gray-de" : "#DEDEDE",
        "birumuda" : "rgba(240, 237, 255, 0.80)",
        "black29" : "#292929",
        "gray55" : "#555",
        "extrablack" : "950"
      },
      backgroundImage: {
        "custom-bg" : "url('/src/assets/Mountain.png)",
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        custom: ['MyCustomFont', 'sans-serif'],
        quick: ['Quicksand', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
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
        'bottom': '0 4px 6px rgba(0, 0, 0, 0.3)', 
      },
      fontWeight:{
        'boldparah' : '1000',
      }
    },
  },
  plugins: [],
};
