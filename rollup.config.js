import json from 'rollup-plugin-json';
import typescript from 'rollup-plugin-typescript2';
import pack from './package.json';

export default {

    input: 'src/index.ts',
    output: [
        {
            file: pack.module,
            format: 'esm',
            exports: 'named',
            sourcemap: true
        }
    ],

    external: [
        ...Object.keys(pack.dependencies || {}),
        ...Object.keys(pack.peerDependencies || {})
    ],

    plugins: [

        json({
            preferConst: true, // Default: false
            indent: '  ',
            compact: true, // Default: false
            namedExports: true // Default: true
        }),

        typescript({
            clean: true,
            tsconfigOverride: {
                exclude: [ "src/styles", "stories/**/*", "**/*.stories.tsx", "src/i18n.tsx" ]
            }
        }),

    ]

}
