const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');


module.exports = {

    theme: {

        extend: {

            colors: {

                transparent: 'transparent',

                black: '#000000',
                white: '#ffffff',

                'navigator': defaultTheme.colors.white,
                'navigator-bg': '#252529',
                'navigator-border': '#5f5f5f',

                'content': '#3e3f42',
                'muted': '#9ea0a5',

                'content-bg': '#fbfbfb',
                'content-fg': defaultTheme.colors.white,
                'content-border': '#eaedf3',

                'control-border': '#888888',
                'control-placeholder': '#a0a0a0',

                'primary': {
                    100: '#daedef',
                    200: '#bfe3e8',
                    300: '#9ad2db',
                    400: '#78cadd',
                    500: '#4ec0e0',
                    600: '#309eb7',
                    700: '#277d91',
                    800: '#296872',
                    900: '#03374c'
                },
                'secondary': {
                    100: '#f4e1c1',
                    200: '#f9d6a2',
                    300: '#fcc17a',
                    400: '#ffb54a',
                    500: '#f9a11a',
                    600: '#e28414',
                    700: '#ba650f',
                    800: '#964a05',
                    900: '#6b3203'
                },
                'info': {
                    100: '#e7def9',
                    200: '#decdf9',
                    300: '#d1b0f7',
                    400: '#bf96e0',
                    500: '#ab7cc4',
                    600: '#7e55a5',
                    700: '#55388e',
                    800: '#40187f',
                    900: '#250a59'
                },
                'danger': {
                    100: '#eac3c3',
                    200: '#dd9999',
                    300: '#e0807c',
                    400: '#ea6a59',
                    500: '#f05022',
                    600: '#9e1212',
                    700: '#277d91',
                    800: '#7f201d',
                    900: '#4c0f0f'
                }

            },

            fontSize: {
                '1xs': '0.625rem'
            },

            strokeWidth: {
                '3': '3',
                '4': '4'
            },

            transitionProperty: {
                'height': 'height',
                'spacing': 'margin, padding'
            },

            minWidth: {
                24: '6rem',
                28: '7rem',
                32: '8rem',
                36: '9rem'
            }

        },

    },

    plugins: [

        plugin(function({ addBase, addComponents, theme, config }) {
            addBase({ 'html': { fontSize: '14px', lineHeight: '21px' } });
            addComponents({
                ...require('./lux'),
                ...require('./control')({ theme }),
                ...require('./postit'),
                ...require('./tooltip'),
                ...require('./popper')
            })
        }),

        // require("@tailwindcss/forms")
    ],

    variants: {
        extend: {
            fontSize: ['responsive', 'group-hover', 'hover'],
            textColor: ['responsive', 'focus', 'group-hover', 'hover'],
            backgroundColor: ['responsive', 'focus', 'group-hover', 'hover'],
            borderWidth: ['last'],
            margin: ['responsive', 'last'],
            borderColor: ['hover', 'focus', 'checked', 'focus-within'],
            visibility: ['group-hover', 'hover'],
            opacity: ['disabled'],
            strokeWidth: ['hover'],
            display: ['group-hover', 'hover'],
            cursor: ['disabled']
        }
    }

};