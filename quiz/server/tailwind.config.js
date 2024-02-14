module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      backgroundImage: {
        dots: "radial-gradient(rgba(255, 255, 255, 0.1) 9%,transparent 9%)"
      }
    },
    colors: {
      main1: "#1E293B",
      main2: "#404356",
      contrast: "#003b59",
      text: "#ffffff",
      correct: "#00ff00",
    }
  },
  plugins: [],
 }