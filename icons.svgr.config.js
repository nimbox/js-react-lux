import path from 'path';

export default {
    icon: true,
    expandProps: true,
    jsxRuntime: 'automatic',
    svgProps: {
        'fill': 'currentColor'
    },
    indexTemplate: (filePaths) => {
        const exportEntries = filePaths.map((filePath) => {
            const basename = path.basename(filePath.path, '.tsx');
            const exportName = basename + 'Icon';
            return `export { default as ${exportName} } from './${basename}'`;
        });
        return exportEntries.join('\n');
    }
};
