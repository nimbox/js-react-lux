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

        'primary': {
          500: '#1665d8',
        },
        'secondary': {
          300: '#f8c46d', // -30%
          500: '#f6ab2f',
          700: '#c47d08' // +30%
        },
        'info': {
          500: '#34aa44'
        }

      }

    }
  },

  plugins: [
    plugin(function ({ addBase, addComponents, config}) {
      addBase({ 'html': { fontSize: '12px' } });
      addComponents({ 
          ...require('./postit'),
          ...require('./tooltip')
      })
    })
  ],

  variants: {
    fontSize: ['responsive', 'group-hover', 'hover'],
    textColor: ['responsive', 'focus', 'group-hover', 'hover'],
    backgroundColor: ['responsive', 'focus', 'group-hover', 'hover'],
    borderWidth: ['last'],
    margin: ['responsive', 'last']
  }

};