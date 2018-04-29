const gulp = require('gulp')
const rollup = require('gulp-better-rollup')
const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const eslint = require('rollup-plugin-eslint')
const flow = require('rollup-plugin-flow')
const types = require('gulp-flow-remove-types')
const exec = require('gulp-exec')
const rename = require('gulp-rename')

const _flowConf = { pretty: true }
const _babelConf = {  }
const _eslintConf = {
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
}

gulp.task('lib-build-dev', () => {
    gulp.src('src/index.template.js')
        .pipe(rollup({
            plugins: [
                flow(_flowConf),
                eslint(_eslintConf),
                babel(_babelConf),
                commonjs()
            ]
        }, {
            file: 'smartsettings.umd.js',
            format: 'umd'
        }))
        .pipe(gulp.dest('./dist'))
})

gulp.task('lib-build-docs', () => {
    gulp.src('src/index.template.js')
        .pipe(types(_flowConf))
        .pipe(rename({
            dirname: 'flow-striped',
            basename: 'index',
            extname: '.js'
        }))
        .pipe(gulp.dest('./src'))
        .pipe(exec('./node_modules/.bin/esdoc -c ./.esdoc.json'))
        .pipe(exec.reporter())
        .pipe(gulp.dest('./docs'))
})