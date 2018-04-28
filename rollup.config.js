import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import eslint from 'rollup-plugin-eslint'
import flow from 'rollup-plugin-flow'
import pkg from './package.json'

export default [
    // UMD
    {
        entry: 'src/index.js',
        dest: pkg.browser,
        format: 'umd',
        moduleName: 'smartsettings',
        plugins: [
            flow({ pretty: true }),
            eslint({
                parserOptions: {
                    ecmaVersion: 6,
                    sourceType: "module"
                },
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
            resolve(),
            babel({
                exclude: ['node_modules/**']
            }),
            commonjs()
        ]
    },

    // ES Module
    {
        entry: 'src/index.js',
        targets: [
            { dest: pkg.module, format: 'es' },
        ],
        plugins: [
            flow({ pretty: true }),
            babel({
                exclude: ['node_modules/**']
            })
        ]
    }
];