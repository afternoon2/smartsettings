import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import eslint from 'rollup-plugin-eslint'
import flow from 'rollup-plugin-flow'
import pkg from './package.json'

export default [
    // browser-friendly UMD build
    {
        entry: 'src/index.js',
        dest: pkg.browser,
        format: 'umd',
        moduleName: 'smartsettings',
        plugins: [
            flow(),
            eslint({
                rules: {
                    "indent": [
                        "warn",
                        4
                    ],
                    "linebreak-style": [
                        "warn",
                        "unix"
                    ],
                    "quotes": [
                        "warn",
                        "single"
                    ],
                    "semi": [
                        "warn",
                        "never"
                    ],
                    "no-console": ["warn"]
                }
            }),
            resolve(), // so Rollup can find `ms`
            commonjs(), // so Rollup can convert `ms` to an ES module
            babel({
                exclude: ['node_modules/**']
            })
        ]
    },

    // CommonJS (for Node) and ES module (for bundlers) build.
    // (We could have three entries in the configuration array
    // instead of two, but it's quicker to generate multiple
    // builds from a single configuration where possible, using
    // the `targets` option which can specify `dest` and `format`)
    {
        entry: 'src/index.js',
        external: ['ms'],
        targets: [
            { dest: pkg.module, format: 'es' }
        ],
        plugins: [
            flow(),
            babel({
                exclude: ['node_modules/**']
            })
        ]
    }
];