/* eslint-disable import/no-extraneous-dependencies */

import gulp from 'gulp'
import babel from 'gulp-babel'
import eslint from 'gulp-eslint'
import del from 'del'
import webpack from 'webpack-stream'
import webpackConfig from './webpack.config.babel'

const paths = {
  allSrcJs: 'src/**/*.js?(x)',
  serverSrcJs: 'src/server/**/*.js?(x)',
  sharedSrcJs: 'src/shared/**/*.js?(x)',
  clientEntryPoint: 'src/client/app.jsx',
  clientBundle: 'dist/client-bundle.js?(.map)',
  gulpFile: 'gulpfile.babel.js',
  webpackFile: 'webpack.config.babel.js',
  libDir: 'lib',
  distDir: 'dist'

}

gulp.task('clean', () => del([
  paths.libDir,
  paths.clientBundle
]))

gulp.task('build', ['clean'], () => {
  return gulp.src(paths.allSrcJs)
    .pipe(babel())
    .pipe(gulp.dest(paths.libDir))
})

// Add lint action before clean
gulp.task('main', ['clean'], () => {
  gulp.src(paths.clientEntryPoint)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(paths.distDir))
})

gulp.task('lint', () => {
  return gulp.src([
    paths.allSrcJs,
    paths.gulpFile,
    paths.webpackFile
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('watch', () => {
  gulp.watch(paths.allSrcJs, ['main'])
})

gulp.task('default', ['watch', 'main'])
