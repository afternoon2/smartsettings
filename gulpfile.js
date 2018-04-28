const gulp = require('gulp')
const rollup = require('gulp-better-rollup')
const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const eslint = require('rollup-plugin-eslint')
const flow = require('rollup-plugin-flow')
const types = require('gulp-flow-remove-types')
const pkg = require('./package.json')

gulp.task('lib-build-umd', () => {
    gulp.src('src/index.js')
        .pipe(rollup({
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
        }, {
            file: 'smartsettings.umd.js',
            format: 'umd'
        }
        ))
        .pipe(gulp.dest('dist'))
})

gulp.task('lib-build-es', () => {
    gulp.src('src/index.js')
        .pipe(rollup({
            plugins: [
                flow({ pretty: true }),
                babel({
                    exclude: ['node_modules/**']
                })
            ]
        }, {
            file: 'smartsettings.esm.js',
            format: 'es'
        }
    ))
})

gulp.task('lib-docs', () => {
    gulp.src('src/index.js')
        .pipe(types({
            pretty: true
        }))
        .pipe(gulp.dest('dist/docs'))
})