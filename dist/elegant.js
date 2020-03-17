const { colors } = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

module.exports = {
  
  theme: {
    extend: {
      colors: {

        transparent: 'transparent',

        black: '#000',
        white: '#fff',

        'navigator': colors.white,
        'navigator-bg': '#252529',
        'navigator-border': '#5f5f5f',

        'content': '#3e3f42',
        'muted': '#9ea0a5',

        'content-bg': '#fbfbfb',
        'content-fg': colors.white,
        'content-border': '#eaedf3',

        'primary': '#1665d8'

      }
    }
  },

  plugins: [
    plugin(function ({ addBase, config }) {
      addBase({
        'html': { fontSize: '12px' }
      })
    })
  ]

};