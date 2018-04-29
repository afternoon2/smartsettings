const gulp = require('gulp')
const rollup = require('gulp-better-rollup')
const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const eslint = require('rollup-plugin-eslint')
const flow = require('rollup-plugin-flow')
const types = require('gulp-flow-remove-types')
const watch = require('gulp-watch')
const plumber = require('gulp-plumber')
const exec = require('gulp-exec')

const _flowConf = { pretty: true }
const _babelConf = { exclude: ['node_modules/**']}
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
const _onError = err => console.err(err)

gulp.task('lib-build', () => {
    gulp.src('src/index.js')
        .pipe(rollup({
            plugins: [
                flow(_flowConf),
                eslint(_eslintConf),
                commonjs()
            ]
        }, {
            file: 'smartsettings.umd.js',
            format: 'umd'
        }
        ))
        .pipe(gulp.dest('dist'))
})

gulp.task('lib-build-docs', () => {
    gulp.src('src/index.js')
        .pipe(types(_flowConf))
        .pipe(gulp.dest('src/docs'))
        .pipe(exec('./node_modules/.bin/esdoc -c .esdoc.json'))
        .pipe(exec.reporter())
        .pipe(gulp.dest('./docs'))
})

gulp.task('watch-n-build', () => {
    return gulp.watch('src/index.js', ['lib-build', 'lib-build-docs'])
})