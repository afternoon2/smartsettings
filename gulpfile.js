const gulp = require('gulp')
const rollup = require('gulp-better-rollup')
const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const eslint = require('rollup-plugin-eslint')
const cleanup = require('rollup-plugin-cleanup')
const uglify = require('rollup-plugin-uglify')
const exec = require('gulp-exec')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const eslintConf = require('./.eslintrc.json')

const _babelConf = { exclude: ['/node_modules/'] }


gulp.task('lib-build-dev', () => {
    gulp.src('src/index.js')
        .pipe(rollup({
            plugins: [
                eslint(eslintConf),
                babel(_babelConf),
                cleanup({
                    comments: 'none',
                    extensions: '.js'
                }),
                commonjs(),
            ],
        }, [
            {
                file: 'smartsettings.umd.js',
                format: 'umd'
            },
            {
                file: 'smartsettings.es.js',
                format: 'es'
            }
        ]))
        .pipe(gulp.dest('./dist'))
    // minified versions
    gulp.src('./src/index.js')
        .pipe(rollup({
            plugins: [
                eslint(eslintConf),
                babel(_babelConf),
                cleanup({
                    comments: 'none',
                    extensions: '.js'
                }),
                commonjs(),
                uglify()
            ]
        }, [
            {
                file: 'smartsettings.umd.min.js',
                format: 'umd'
            },
            {
                file: 'smartsettings.es.min.js',
                format: 'es'
            }
        ]))
        .pipe(gulp.dest('./dist'))
})

// sass
gulp.task('compile-sass', () => {
    gulp.src('./src/sass/index.sass')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['cover 99.5%']
        }))
        .pipe(rename({
            basename: 'smartsettings',
            suffix: 'min',
            extname: '.css'
        }))
        .pipe(gulp.dest('./dist'))
})