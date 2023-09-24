const elegant = require('./src/styles/elegant.js')


module.exports = {

    content: [
        './src/**/*.{js,jsx,ts,tsx,mdx}'
    ],

    theme: elegant.theme,
    variants: elegant.variants,
    plugins: elegant.plugins

};
