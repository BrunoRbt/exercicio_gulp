const { src, dest, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const terser = require('gulp-terser');
const cleanCSS = require('gulp-clean-css');

// Compilação do SASS
function compileSass() {
    return src('src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(dest('dist/css'));
}

// Compressão de imagens
function compressImages() {
    return src('src/images/*')
        .pipe(imagemin())
        .pipe(dest('dist/images'));
}

// Compressão de código JavaScript
function compressJS() {
    return src('src/js/**/*.js')
        .pipe(terser())
        .pipe(dest('dist/js'));
}

// Exportar tarefas
exports.default = series(
    parallel(compileSass, compressImages, compressJS)
);