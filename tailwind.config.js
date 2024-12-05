/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors:{
        customBlue:"#9cc6fb",
        fontblue:"#09559b",
      }
    },
  },
  plugins: [
      require('flowbite/plugin')

  ],
}



