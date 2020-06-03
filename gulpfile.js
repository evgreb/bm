const gulp = require("gulp");
const browserify = require("browserify");
const babelify = require("babelify");
const source = require("vinyl-source-stream");
const sync = require("browser-sync");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const rimraf = require("rimraf");
const hbsfy = require("hbsfy");
const sourcemaps = require("gulp-sourcemaps");
const gulpif = require("gulp-if");
const uglifyify = require("uglifyify");

require("dotenv").config();
const production = process.env.NODE_ENV === "production";

console.info(production);

const config = {
  paths: {
    build: "./public",
    static: {
      root: "./public/static",
      js: "./public/static/js",
      css: "./public/static/css",
    },
    source: {
      root: "./src",
    },
  },
};

function serve() {
  sync.init({
    server: config.paths.build,
    open: false,
  });
}

function watch() {
  gulp.watch(["./src/**/*.js", "./src/**/*.hbs"], buildJs);
  gulp.watch("./src/**/*.scss", buildCss);
  gulp.watch("./public/**/*").on("change", sync.reload);
}

function clean(done) {
  rimraf(config.paths.static.root, (error) => {
    if (error) {
      throw error;
    }
    done();
  });
}

function buildJs() {
  return browserify({
    debug: !production,
  })
    .add("./src/index.js")
    .transform(hbsfy)
    .transform(
      babelify.configure({
        presets: ["@babel/env"],
      })
    )
    .transform("uglifyify", { global: true })
    .bundle()
    .pipe(source("index.js"))
    .pipe(gulp.dest(config.paths.static.js));
}

function buildCss() {
  return gulp
    .src("./src/**/*.scss")
    .pipe(gulpif(!production, sourcemaps.init()))
    .pipe(sass())
    .pipe(gulpif(!production, sourcemaps.write()))
    .pipe(concat("style.css"))
    .pipe(gulp.dest(config.paths.static.css))
    .pipe(gulpif(!production, sync.stream()));
}

gulp.task("default", gulp.series(clean, gulp.parallel(buildCss, buildJs)));
gulp.task("serve", serve);
gulp.task("dev", gulp.series("default", gulp.parallel("serve", watch)));
