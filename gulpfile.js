const del = require('del');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const replace = require('gulp-replace');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const rtlcss = require('gulp-rtlcss');
const cleanCSS = require('gulp-clean-css');
const eslint = require('gulp-eslint');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync');

const { reload } = browserSync;
const Promise = require('promise');

/*-----------------------------------------------
|   Paths
-----------------------------------------------*/
const CSS = 'pages/assets/css';
const JS = 'pages/assets/js';
const lib = 'pages/assets/lib';
const PATHS = {
  HERE: './',
  PAGES: {
    FOLDER: 'pages',
    ALL: 'pages/**/*.*',
    HTML: 'pages/**/*.html',
  },
  JS: {
    ALL: 'js/**/*.js',
    BOOTSTRAP: [
      './js/bootstrap/util.js',
      './js/bootstrap/alert.js',
      './js/bootstrap/button.js',
      './js/bootstrap/carousel.js',
      './js/bootstrap/collapse.js',
      './js/bootstrap/dropdown.js',
      './js/bootstrap/modal.js',
      './js/bootstrap/tooltip.js',
      './js/bootstrap/popover.js',
      './js/bootstrap/scrollspy.js',
      './js/bootstrap/tab.js',
      './js/bootstrap/toast.js',
    ],
    THEME: [
      'js/theme/Utils.js', // Required
      'js/theme/bootstrap-navbar.js', // Required
      'js/theme/bootstrap-select-menu.js', // Required
      'js/theme/detector.js', // Required
      'js/theme/forms.js', // Required
      'js/theme/stickyfill.js', // Required
      'js/theme/stickykit.js', // Required
      'js/theme/tooltip-popover.js', // Required
      'js/theme/**/!(Utils | bootstrap-navbar | bootstrap-select-menu | detector | forms | stickyfill | stickykit | tooltip-popover)*.js',
    ],
    PLUGINS: ['js/plugins/all.min.js', 'js/plugins/imagesloaded.pkgd.js', 'js/plugins/TweenMax.js', 'js/plugins/CustomEase.js'],
  },
  SCSS: {
    ALL: 'scss/**/*.scss',
    THEME: 'scss/theme.scss',
  },
  ASSETS: {
    ALL: 'pages/assets/**/*.*',
    FONTS: 'pages/assets/fonts/**/*.*',
    VIDEO: 'pages/assets/video/**/*.*',
    IMG: 'pages/assets/img/**/*.*',
    JS: 'pages/assets/js',
  },
  CSS: 'pages/assets/css',
  DEPENDENCIES: {
    jquery: {
      FROM: 'node_modules/jquery/dist/jquery.min.js', // Required
      TO: JS,
    },
    popper: {
      FROM: 'node_modules/popper.js/dist/umd/popper.min.js', // Required
      TO: JS,
    },
    'bootstrap-js': {
      FROM: 'node_modules/bootstrap/js/dist/!(index)*.js', // Required
      TO: 'js/bootstrap',
    },
    'bootstrap-scss': {
      FROM: 'node_modules/bootstrap/scss/**/*.scss', // Required
      TO: 'scss/bootstrap',
    },
    prismjs: {
      FROM: ['node_modules/prismjs/prism.js', 'node_modules/prismjs/themes/prism-okaidia.css'],
      TO: lib,
    },
    stickyfilljs: {
      FROM: 'node_modules/stickyfilljs/dist/stickyfill.min.js', // Required
      TO: lib,
    },
    'sticky-kit': {
      FROM: 'node_modules/sticky-kit/dist/**/*.*', // Required
      TO: lib,
    },
    '@fortawesome': {
      FROM: 'node_modules/@fortawesome/fontawesome-free/js/all.min.js', // Required
      TO: lib,
    },
    'jquery.mb.ytplayer': {
      FROM: ['node_modules/jquery.mb.ytplayer/dist/css/jquery.mb.YTPlayer.min.css', 'node_modules/jquery.mb.ytplayer/dist/jquery.mb.YTPlayer.min.js'],
      TO: lib,
    },
    'semantic-ui-accordion': {
      FROM: ['node_modules/semantic-ui-accordion/accordion.min.css', 'node_modules/semantic-ui-accordion/accordion.min.js'],
      TO: lib,
    },
    'semantic-ui-transition': {
      FROM: ['node_modules/semantic-ui-transition/transition.min.css', 'node_modules/semantic-ui-transition/transition.min.js'],
      TO: lib,
    },
    'is': {
      FROM: 'node_modules/is_js/is.min.js',
      TO: lib,
    },
    'owl-carousel': {
      FROM: ['node_modules/owl.carousel/dist/owl.carousel.min.js', 'node_modules/owl.carousel/dist/assets/owl.carousel.min.css'],
      TO: lib,
    },
    'isotope-layout': {
      FROM: 'node_modules/isotope-layout/**/*.*',
      TO: lib,
    },
    'isotope-packery': {
      FROM: 'node_modules/isotope-packery/**/*.*',
      TO: lib,
    },
    fancybox: {
      FROM: ['node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js', 'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.css'],
      TO: lib,
    }
  },
  GENERATED: [
    'js/bootstrap',
    'scss/bootstrap',
    'pages/assets/css',
    'pages/assets/js',
  ],
};


/*-----------------------------------------------
|   Cleaning
-----------------------------------------------*/
gulp.task('clean', () => del(PATHS.GENERATED, { force: true }));


/*-----------------------------------------------
|   SCSS
-----------------------------------------------*/
gulp.task('scss', () => gulp.src(PATHS.SCSS.THEME)
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'expanded',
  }).on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 5 versions'],
    cascade: false,
  }))
  .pipe(sourcemaps.write('.'))
  .pipe(plumber.stop())
  .pipe(gulp.dest(PATHS.CSS))
  .pipe(browserSync.stream()));

gulp.task('scss:min', () => gulp.src(PATHS.SCSS.THEME)
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'expanded',
  }).on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 5 versions'],
    cascade: false,
  }))
  .pipe(cleanCSS({ compatibility: 'ie9' }))
  .pipe(rename({ suffix: '.min' }))
  .pipe(sourcemaps.write('.'))
  .pipe(plumber.stop())
  .pipe(gulp.dest(PATHS.CSS))
  .pipe(browserSync.stream()));

gulp.task('scss:rtl', () => gulp.src(PATHS.SCSS.THEME)
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'expanded',
  }).on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 5 versions'],
    cascade: false,
  }))
  .pipe(rtlcss()) // Convert to RTL.
  .pipe(rename({ suffix: '-rtl' })) // Append "-rtl" to the filename.
  .pipe(sourcemaps.write('.'))
  .pipe(plumber.stop())
  .pipe(gulp.dest(PATHS.CSS))
  .pipe(browserSync.stream()));

gulp.task('scss:rtl:min', () => gulp.src(PATHS.SCSS.THEME)
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'expanded',
  }).on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 5 versions'],
    cascade: false,
  }))
  .pipe(rtlcss()) // Convert to RTL.
  .pipe(cleanCSS({ compatibility: 'ie9' }))
  .pipe(rename({ suffix: '-rtl.min' }))
  .pipe(sourcemaps.write('.'))
  .pipe(plumber.stop())
  .pipe(gulp.dest(PATHS.CSS))
  .pipe(browserSync.stream()));


/*-----------------------------------------------
|   JavaScript
-----------------------------------------------*/
gulp.task('js:bootstrap', () => gulp.src(PATHS.JS.BOOTSTRAP)
  .pipe(concat('bootstrap.js'))
  .pipe(replace(/^(export|import).*/gm, ''))
  .pipe(babel({
    compact: false,
    presets: [
      [
        'env', {
          modules: false,
          loose: true,
        },
      ],
    ],
    plugins: [
      process.env.PLUGINS && 'transform-es2015-modules-strip',
      '@babel/plugin-proposal-object-rest-spread',
    ].filter(Boolean),
  }))
  .pipe(gulp.dest(PATHS.ASSETS.JS))
  .pipe(uglify())
  .pipe(rename({
    suffix: '.min',
  }))
  .pipe(gulp.dest(PATHS.ASSETS.JS))
  .pipe(reload({ stream: true })));

gulp.task('js:theme', () => gulp.src(PATHS.JS.THEME)
  .pipe(eslint({ fix: true }))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
  .pipe(concat('theme.js'))
  .pipe(replace(/^(export|import).*/gm, ''))
  .pipe(babel({
    compact: false,
    presets: [
      [
        'env',
        {
          modules: false,
          loose: true,
        },
      ],
    ],
    plugins: [
      process.env.PLUGINS && 'transform-es2015-modules-strip',
      '@babel/plugin-proposal-object-rest-spread',
      'transform-strict-mode',
    ].filter(Boolean),
  }))
  .pipe(gulp.dest(PATHS.ASSETS.JS))
  .pipe(uglify())
  .pipe(rename({
    suffix: '.min',
  }))
  .pipe(gulp.dest(PATHS.ASSETS.JS))
  .pipe(reload({ stream: true })));

gulp.task('js:plugins', () => gulp.src(PATHS.JS.PLUGINS)
  .pipe(concat('plugins.js'))
  .pipe(replace(/^(export|import).*/gm, ''))
  .pipe(babel({
    compact: false,
    presets: [
      [
        'env', {
          modules: false,
          loose: true,
        },
      ],
    ],
    plugins: [
      process.env.PLUGINS && 'transform-es2015-modules-strip',
      '@babel/plugin-proposal-object-rest-spread',
    ].filter(Boolean),
  }))
  .pipe(gulp.dest(PATHS.ASSETS.JS))
  .pipe(uglify())
  .pipe(rename({
    suffix: '.min',
  }))
  .pipe(gulp.dest(PATHS.ASSETS.JS))
  .pipe(reload({ stream: true })));

gulp.task('js', gulp.parallel('js:bootstrap', 'js:plugins', 'js:theme'));


/*-----------------------------------------------
|   Dependencies
-----------------------------------------------*/
gulp.task('copy:dependency', () => {
  const promises = Object.keys(PATHS.DEPENDENCIES).map(item => new Promise((resolve, reject) => {
    gulp.src(PATHS.DEPENDENCIES[item].FROM)
      .pipe(gulp.dest((PATHS.DEPENDENCIES[item].TO === lib) ? `${PATHS.DEPENDENCIES[item].TO}/${item}` : PATHS.DEPENDENCIES[item].TO))
      .on('end', (err) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve();
        }
      });
  }));
  return Promise.all(promises);
});


/*-----------------------------------------------
|   Watching
-----------------------------------------------*/
gulp.task('watch', () => {
  gulp.watch(PATHS.SCSS.ALL, gulp.series('scss'));

  gulp.watch(PATHS.JS.THEME, gulp.series('js:theme', (done) => {
    reload();
    done();
  }));

  gulp.watch(PATHS.JS.PLUGINS, gulp.series('js:plugins', (done) => {
    reload();
    done();
  }));

  gulp.watch([PATHS.PAGES.HTML, PATHS.ASSETS.FONTS, PATHS.ASSETS.VIDEO, PATHS.ASSETS.IMG], (done) => {
    reload();
    done();
  });
});


/*-----------------------------------------------
|   Serve
-----------------------------------------------*/
gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: PATHS.PAGES.FOLDER,
    },
    // proxy: '127.0.0.1:8010',
    port: 3000,
    open: true,
    notify: false,
  });
});


/*-----------------------------------------------
|   Starting everything
-----------------------------------------------*/
gulp.task('default', gulp.series('copy:dependency', 'scss', 'js', gulp.parallel('watch', 'serve')));
