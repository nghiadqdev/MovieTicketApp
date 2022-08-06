const gulp = require('gulp');
const rename = require('gulp-rename');

// DEV
gulp.task("dev", async function () {
    gulp.src("./resources/dev/app.env.js")
        .pipe(rename('app.env.ts')) // Rename file
        .pipe(gulp.dest("./src/@config/", { overwrite: true })) // Thư mục chứa file json
});
// QA
gulp.task("qa", async function () {
    gulp.src("./resources/qa/app.env.js")
        .pipe(rename('app.env.ts')) // Rename file
        .pipe(gulp.dest("./src/@config/", { overwrite: true })) // Thư mục chứa file json
});
//PROD
gulp.task("prod", async function () {
    gulp.src("./resources/prod/app.env.js")
        .pipe(rename('app.env.ts')) // Rename file
        .pipe(gulp.dest("./src/@config/", { overwrite: true })) // Thư mục chứa file json
});

