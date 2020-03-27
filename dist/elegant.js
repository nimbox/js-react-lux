const {
  colors
} = require('tailwindcss/defaultTheme');
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

        '.postit-container': {
          position: 'relative',
          zIndex: 1
        },
        
        '.postit': {
          
          display: 'inline-block',
          position: 'relative',
          
          width: '100%',
          minWidth: '64px',
          minHeight: '5rem',
          
          padding: '1rem',

          border: '1px solid #e8e8e8',
          borderBottomRightRadius: '64px 5px',

          background: '#ffff88'

        },

        '.postit:after': {

          content: '""',

          position: 'absolute',
          right: '0px',
          bottom: '14px',

          width: '48px',  
          height: '25px',

          background: 'rgba(0, 0, 0, 0.2)',
          boxShadow: '2px 15px 5px rgba(0, 0, 0, 0.40)',
          transform: 'matrix(-1, -0.1, 0, 1, 0, 0)',

          zIndex: -1

        }

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