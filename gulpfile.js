const gulp = require('gulp')
const rollup = require('gulp-better-rollup')
const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const eslint = require('rollup-plugin-eslint')
const eslintConfig = require('./eslint.config')
const flow = require('rollup-plugin-flow')
const types = require('gulp-flow-remove-types')
const watch = require('gulp-watch')
const plumber = require('gulp-plumber')
const pkg = require('./package.json')
const exec = require('gulp-exec')

const _flowConf = { pretty: true }
const _babelConf = { exclude: ['node_modules/**']}

gulp.task('lib-build', () => {
    gulp.src('src/index.js')
        .pipe(rollup({
            plugins: [
                flow(_flowConf),
                eslint(eslintConfig),
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