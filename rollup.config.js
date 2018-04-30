import babel from 'rollup-plugin-babel'
import cleanup from 'rollup-plugin-cleanup'
import commonjs from 'rollup-plugin-commonjs'
import sass from 'rollup-plugin-sass'
import node from 'rollup-plugin-node-resolve'
import eslint from 'rollup-plugin-eslint'
import uglify from 'rollup-plugin-uglify'
import resolve from 'rollup-plugin-node-resolve'
import eslintConf from './.eslintrc.json'

const babelConf = { exclude: ['/node_modules/'] }

export default {
    input: 'src/index.js',
    output: [
        {
            format: 'umd',
            file: './dist/smartsettings.umd.js',
            name: 'SmartSettings',
            sourcemap: true
        },
        {
            format: 'es',
            file: './dist/smartsettings.es.js',
            name: 'SmartSettings',
            sourcemap: true
        }
    ],
    watch: {
        include: 'src/**'
    },
    plugins: [
        eslint(eslintConf),
        resolve(),
        sass({
            insert: true,
            output: './dist/smartsettings.css',
            options: { outputStyle: 'compressed' }
        }),
        babel(babelConf),
        cleanup({
            comments: 'none',
            extensions: '.js'
        }),
        commonjs()
        // uglify()
    ]
}