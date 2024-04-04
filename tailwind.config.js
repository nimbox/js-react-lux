/** @type {import('tailwindcss').Config} */
import elegant from './src/styles/elegant.js';


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: elegant.theme,
  variants: elegant.variants,
  plugins: elegant.plugins
};
