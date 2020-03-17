import pack from './package.json';
import json from 'rollup-plugin-json';
import typescript from 'rollup-plugin-typescript2';

export default {

    input: 'src/build.ts',
    output: [
        {
            file: pack.main,
            format: 'cjs',
            exports: 'named',
            sourcemap: true
        },
        {
            file: pack.module,
            format: 'es',
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
                compilerOptions: {
                    module: 'esnext'
                }
            }
        })
        
    ]

}