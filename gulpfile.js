/// <binding />
"use strict";
var gulp = require("gulp");
var concat = require("gulp-concat");
var sass = require("gulp-sass");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var bower = require("gulp-bower");
var cleanCSS = require("gulp-clean-css");
var clean = require("gulp-clean");
var ts = require("gulp-typescript");
var debug = require("gulp-debug");

// Set the global.Filename to override this
var OUTPUT_FILE_NAME = global.FileName || "site";

var BOWER_COMPONENTS = global.BowerComponents || "wwwroot/lib";

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("clean:js", function () {
    return gulp.src("./wwwroot/js/*.js")
        .pipe(clean());
});

gulp.task("clean:css", function () {
    return gulp.src("./wwwroot/css/*.css")
        .pipe(clean());
});

gulp.task("clean:bower", function () {
    return gulp.src("./" + BOWER_COMPONENTS)
        .pipe(clean());
});

gulp.task("concat", ["concat:js", "concat:css"]);

gulp.task("concat:js", ["clean:js"], function () {
    return gulp.src([
            "./" + BOWER_COMPONENTS + "/jquery/dist/jquery.js",
            "./" + BOWER_COMPONENTS + "/jquery-validation/dist/jquery.validate.js",
            "./" + BOWER_COMPONENTS + "/jquery-validation/dist/additional-methods.js",
            "./" + BOWER_COMPONENTS + "/jquery-validation-unobtrusive/jquery.validate.unobtrusive.js",
            "./" + BOWER_COMPONENTS + "/datatables.net/js/jquery.dataTables.js",
            "./" + BOWER_COMPONENTS + "/datatables.net-buttons/js/dataTables.buttons.js",
            "./" + BOWER_COMPONENTS + "/system.js/dist/system.js",
            "./" + BOWER_COMPONENTS + "/jquery.maskedinput/dist/jquery.maskedinput.js",
            "./" + BOWER_COMPONENTS + "/iUS.UX/scripts/dist/iusHelpers.js",
            "./" + BOWER_COMPONENTS + "/iUS.UX/scripts/dist/iusForm.js",
            "./" + BOWER_COMPONENTS + "/iUS.UX/scripts/dist/iusUX.js"
    ])
    .pipe(debug())
        .pipe(concat(OUTPUT_FILE_NAME + ".js"))
        .pipe(gulp.dest("./wwwroot/js/"));
});

gulp.task("concat:css", ["sass"], function () {
    return gulp.src([
            "./" + BOWER_COMPONENTS + "/pure/pure.css",
            "./" + BOWER_COMPONENTS + "/pure/grids-responsive.css",
            "./" + BOWER_COMPONENTS + "/air-datepicker/dist/css/datepicker.css",
            "./" + BOWER_COMPONENTS + "/datatables.net-dt/css/jquery.dataTables.css",
            "./" + BOWER_COMPONENTS + "/datatables.net-buttons-dt/css/buttons.dataTables.css",
            "./" + BOWER_COMPONENTS + "/iUS.UX/fonts/icomoon/style.css",
            "./wwwroot/css/*.css"
    ])
        .pipe(debug())
        .pipe(concat(OUTPUT_FILE_NAME + ".css"))
        .pipe(gulp.dest("./wwwroot/css/"));
});

gulp.task("minify:css", ["concat:css"], function () {
    return gulp.src(["./wwwroot/css/*.css", "!css/*.min.css"])
        .pipe(debug())
        .pipe(cleanCSS({ compatibility: "ie8" }))
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest("./wwwroot/css"));
});

gulp.task("uglify:js", ["concat:js"], function () {
    return gulp.src(["./wwwroot/js/*.js", "!./wwwroot/js/*.min.js"])
        .pipe(debug())
        .pipe(uglify())
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest("./wwwroot/js/"));
});

gulp.task("sass", ["sass:local-app"]);

gulp.task("sass:local-app", function () {
    return gulp.src("./wwwroot/css/" + OUTPUT_FILE_NAME + ".scss")
        .pipe(sass())
        .pipe(gulp.dest("./wwwroot/css"));
});

gulp.task("copyfonts", function () {
    return gulp.src(["./" + BOWER_COMPONENTS + "/iUS.UX/fonts/icomoon/fonts/**"])
      .pipe(debug())
      .pipe(gulp.dest("./wwwroot/css/fonts/"));
});

gulp.task("copyimages", function () {
    return gulp.src(["./" + BOWER_COMPONENTS + "/iUS.UX/images/**", "./" + BOWER_COMPONENTS + "/datatables.net-dt/images/**"])
      .pipe(debug())
      .pipe(gulp.dest("./wwwroot/images/"));
});

gulp.task("watch", function () {
    gulp.watch("./wwwroot/**/*.ts", ["typescript"]);
    gulp.watch("./wwwroot/**/*.scss", ["sass"]);
});