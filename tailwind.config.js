const plugin = require('tailwindcss/plugin');

module.exports = {
    
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    
    darkMode: false,

    theme: {
        extend: {}
    },

    variants: {
        extend: {}
    },
    
    plugins: [
        plugin(function({ addBase, addComponents, config }) {
            addBase({ 'html': { fontSize: '12px' } });
            addComponents({
                ...require('./src/styles/postit'),
                ...require('./src/styles/tooltip'),
                ...require('./src/styles/popper')
            })
        })
    ]

};