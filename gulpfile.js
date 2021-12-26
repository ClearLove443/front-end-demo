const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");

const paths = {
  pages: ["src/*.html"],
};
gulp.task("html", () => {
  return gulp.src(paths.pages).pipe(gulp.dest("dist"));
});

gulp.task("sass", (cb) => {
  gulp
    .src("src/**/*.scss")
    .pipe(sass())
    .pipe(
      gulp.dest((f) => {
        return f.base;
      })
    )
    .pipe(gulp.dest("dist"));
  cb();
});

gulp.task("typescript", () => {
  return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("dist"));
});

// gulp 3
// gulp.task("default", ["copy-html"], bundle);

// 按照顺序执行
// gulp.task("default", gulp.series("copy-html", "bundle"));

// 并行执行
gulp.task(
  "default",
  gulp.parallel("html", "sass", "typescript", (cb) => {
    gulp.watch("src/*.html", gulp.series("html"));
    gulp.watch("src/*.scss", gulp.series("sass"));
    gulp.watch("src/*.ts", gulp.series("typescript"));
    cb();
  })
);
