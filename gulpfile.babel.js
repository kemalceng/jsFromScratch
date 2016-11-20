/* eslint-disable import/no-extraneous-dependencies */

import gulp from 'gulp'
import babel from 'gulp-babel'
import eslint from 'gulp-eslint'
import del from 'del'
import webpack from 'webpack-stream'
import webpackConfig from './webpack.config.babel'
import mocha from 'gulp-mocha'
import flow from 'gulp-flowtype'

const paths = {
  allSrcJs: 'src/**/*.js?(x)',
  serverSrcJs: 'src/server/**/*.js?(x)',
  sharedSrcJs: 'src/shared/**/*.js?(x)',
  clientEntryPoint: 'src/client/app.jsx',
  clientBundle: 'dist/client-bundle.js?(.map)',
  gulpFile: 'gulpfile.babel.js',
  webpackFile: 'webpack.config.babel.js',
  libDir: 'lib',
  distDir: 'dist',
  allLibTests: 'lib/test/**/*.js'
}

gulp.task('main', ['test'], () => {
  gulp.src(paths.clientEntryPoint)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(paths.distDir))
})

gulp.task('test', ['build'], () => {
  gulp.src(paths.allLibTests)
    .pipe(mocha())
})

// Add lint action before clean, remove flow here and activate flow pipe in lint
gulp.task('build', ['flow', 'clean'], () => {
  return gulp.src(paths.allSrcJs)
    .pipe(babel())
    .pipe(gulp.dest(paths.libDir))
})

gulp.task('clean', () => del([
  paths.libDir,
  paths.clientBundle
]))

gulp.task('lint', () => {
  return gulp.src([
    paths.allSrcJs,
    paths.gulpFile,
    paths.webpackFile
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
// .pipe(flow({ abort: true })) // Add Flow here if lint is used
})

gulp.task('flow', () => {
  return gulp.src([
    paths.allSrcJs,
    paths.gulpFile,
    paths.webpackFile
  ])
    .pipe(flow({ abort: true }))
})

gulp.task('watch', () => {
  gulp.watch(paths.allSrcJs, ['main'])
})

gulp.task('default', ['watch', 'main'])
