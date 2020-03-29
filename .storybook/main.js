module.exports = {
    stories: ['../src/**/*.stories.(tsx|mdx)'],
    addons: [
        '@storybook/preset-create-react-app',
        '@storybook/addon-knobs/register',
        '@storybook/addon-docs'
    ]
};