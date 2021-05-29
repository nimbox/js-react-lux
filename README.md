# js-react-lux

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Usage

# Desarrollo

To create components

```bash
npm run storybook
```

To build library

```bash
npm run build
```

## package.json

When upgrading keep in mind that as of this writing react requires PostCSS7 and 
tailwind requires PostCSS8. We are using a compatibility build of tailwind to 
be able to run it.

    "build": "rm -rf dist/* && npm run build:icons && cp src/styles/*.js dist/ && rollup -c",
