const elegant = require('./src/styles/elegant.js')

module.exports = {

    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false,

    theme: elegant.theme,
    variants: elegant.variants,
    plugins: elegant.plugins

};
