const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config');

const gutil = require('gulp-util');
// const sequence = require('gulp-sequence');

const open = require('gulp-open');
const PORT = 9000;

const eslint = require('gulp-eslint');

gulp.task('webpack', () => {
  return gulp.src('./src/app.js')
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest('./public'));
});

gulp.task('webpack-dev-server', (callback) => {
  let compiler = webpack(webpackConfig);

  let server = new WebpackDevServer(compiler, {
    // server and middleware options
    stats: {colors: true},
    contentBase: './src',
    watchContentBase: true,
    // publicPath: '/js/',
    setup(app) {
    },
  });

  server.listen(PORT, 'localhost', (err) => {
    if (err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }

    // Server listening
    gutil.log(
      '[webpack-dev-server]',
      `http://localhost:${PORT}`
    );

    // keep the server alive or continue?
    callback();
  });
});

gulp.task('copy', () => {
  return gulp.src(
    [
      './src/index.html',
    ], {base: 'src'}
  ).pipe(gulp.dest('./public'));
});

gulp.task('eslint', () => {
  return gulp.src([
    './src/**/**/*.js',
    'gulpfile.js',
    'webpack.config.js',
  ])
  .pipe(eslint({
    configFile: '.eslintrc',
  }))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('watch', ()=> {
  gulp.watch([
    './src/index.html',
  ], ['copy']);

  gulp.watch([
    './src/**/**/*.js',
    'gulpfile.js',
    'webpack.config.js',
  ], ['eslint']);
});

gulp.task('build', ['copy', 'webpack']);

gulp.task('open', () => {
  return gulp.src(__filename)
    .pipe(open({uri: `http://localhost:${PORT}`}));
});

gulp.task('default', ['build']);
gulp.task('start', [/* 'eslint', */'webpack-dev-server', 'open', 'watch']);
