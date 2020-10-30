const gulp = require("gulp");
const ts = require("gulp-typescript");
const nodemon = require("gulp-nodemon");
const del = require("del");
const uglifyes = require("uglify-es");
const composer = require("gulp-uglify/composer");
const minify = composer(uglifyes, console);

const tsProject = ts.createProject("tsconfig.json");

gulp.task("clean", function () {
  return del(["dist/"]);
});

gulp.task(
  "compile",
  gulp.series("clean", function () {
    return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("dist"));
  })
);

gulp.task(
  "build",
  gulp.series("clean", function () {
    return tsProject
      .src()
      .pipe(tsProject())
      .js.pipe(minify())
      .pipe(gulp.dest("dist/"));
  })
);

gulp.task(
  "watch",
  gulp.series("compile", function () {
    nodemon({
      script: "dist/app.js",
      ext: "ts",
      tasks: ["compile"],
      execMap: {
        ts: "node --trace-warnings",
      },
      debug: true,
    });
  })
);

gulp.task("default", gulp.parallel("watch"));
