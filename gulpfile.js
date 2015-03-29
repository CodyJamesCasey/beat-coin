var gulp        = require('gulp'),
    nodemon     = require('nodemon'),
    // Generic imports
    fs          = require('fs'),
    Stream      = require('stream'),
    gutil       = require('gulp-util'),
    path        = require('path'),
    clean       = require('rimraf'),
    plumber     = require('gulp-plumber'),
    replace     = require('gulp-replace'),
    // Browserify-related imports
    browserify  = require('browserify'),
    source      = require('vinyl-source-stream'),
    watchify    = require('watchify'),
    babelify    = require('babelify'),
    uglify      = require('gulp-uglify'),
    buffer      = require('vinyl-buffer')
    // LESS-related imports
    less        = require('gulp-less'),
    sourcemaps  = require('gulp-sourcemaps'),
    // HTML-related imports
    minify      = require('gulp-minify-html'),
    // Dev utility imports
    livereload  = require('gulp-livereload');


/**************************************** CONSTANTS ****************************************/

var PUBLIC_FOLDER_NAME          = 'public',
    FRONTEND_FOLDER_NAME        = 'frontend',
    FRONTEND_JS_FOLDER_NAME     = 'js',
    FRONTEND_LESS_FOLDER_NAME   = 'less',
    FRONTEND_IMG_FOLDER_NAME    = 'img',
    FRONTEND_VENDOR_FOLDER_NAME = 'vendor',
    FRONTEND_HTML_FOLDER_NAME   = 'pages',
    BACKEND_FOLDER_NAME         = 'backend',
    ENV_FOLDER_NAME             = 'env',

    FRONTEND_JS_ENTRY_POINT     = 'main.js',
    FRONTEND_LESS_ENTRY_POINT   = 'main.less',
    BACKEND_ENTRY_POINT         = 'index.js',

    ENV_FOLDER_PATH             = path.join(__dirname, ENV_FOLDER_NAME),
    PUBLIC_FOLDER_PATH          = path.join(__dirname, PUBLIC_FOLDER_NAME),
    FRONTEND_FOLDER_PATH        = path.join(__dirname, FRONTEND_FOLDER_NAME),
    FRONTEND_JS_FOLDER_PATH     = path.join(FRONTEND_FOLDER_PATH, FRONTEND_JS_FOLDER_NAME),
    FRONTEND_LESS_FOLDER_PATH   = path.join(FRONTEND_FOLDER_PATH, FRONTEND_LESS_FOLDER_NAME),
    FRONTEND_IMG_FOLDER_PATH    = path.join(FRONTEND_FOLDER_PATH, FRONTEND_IMG_FOLDER_NAME),
    FRONTEND_VENDOR_FOLDER_PATH = path.join(FRONTEND_FOLDER_PATH, FRONTEND_VENDOR_FOLDER_NAME),
    FRONTEND_HTML_FOLDER_PATH   = path.join(FRONTEND_FOLDER_PATH, FRONTEND_HTML_FOLDER_NAME),
    BACKEND_FOLDER_PATH         = path.join(__dirname, BACKEND_FOLDER_NAME),

    PROJECT_NAME                = __dirname.split(path.sep).pop();

/************************************* HELPER FUNCTIONS ************************************/

var helpers = {
    rebundle: function(bundler, done) {
        var time = (new Date()).getTime();
        gutil.log('Started re-bundling client js');
        bundler
            .bundle(function(err) {
                if (!err) {
                    gutil.log('Finished re-bundling client js after ' + (((new Date()).getTime() - time) / 1000) + ' s');
                    if (done) done();
                } else {
                    gutil.log('Failed to re-bundle client js');
                    console.log(err);
                    if (done) done(err);
                }
            })
            .pipe(plumber())
            .pipe(source(FRONTEND_JS_ENTRY_POINT))
            .pipe(buffer())
            // .pipe(uglify()) // Commented for sanity
            .pipe(gulp.dest(PUBLIC_FOLDER_PATH));
    },
    delay: function(callback) {
        // Waits a second before executing a function
        return function() {
            setTimeout(callback, 1000);
        };
    },
    copyAssets: function(folderName) {
        return function() {
            gulp.src(path.join(FRONTEND_FOLDER_PATH, folderName, '**', '*'))
                .pipe(plumber())
                .pipe(gulp.dest(path.join(PUBLIC_FOLDER_PATH, folderName)));
        };
    }
};

/**************************************** FRONTEND ****************************************/

// Compiles the client js
gulp.task('browserify', function(cb) {
    var bundler = browserify({
        cache: {},
        packageCache: {},
        fullPaths: true
    });
    // ES6 Compatibility
    bundler.transform(babelify);
    // Add the entry point
    bundler.add(path.join(FRONTEND_JS_FOLDER_PATH, FRONTEND_JS_ENTRY_POINT));
    // Perform initial rebundle
    return helpers.rebundle(bundler, cb);
});

// Watches and recompiles client js
gulp.task('watchify', function(cb) {
    var bundler = browserify({
        cache: {},
        packageCache: {},
        fullPaths: true,
        debug: true
    });
    // Pass the browserify bundler to watchify
    bundler = watchify(bundler);
    // ES6 Compatibility
    bundler.transform(babelify);
    // Bundlize on updates
    bundler.on('update', function() {
        helpers.rebundle(bundler);
    });
    // Add the entry point
    bundler.add(path.join(FRONTEND_JS_FOLDER_PATH, FRONTEND_JS_ENTRY_POINT));
    // Perform initial rebundle
    return helpers.rebundle(bundler, cb);
});

// Compiles the client less
gulp.task('less', function() {
    gulp.src(path.join(FRONTEND_LESS_FOLDER_PATH, FRONTEND_LESS_ENTRY_POINT))
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(PUBLIC_FOLDER_PATH));
});
gulp.task('less-dev', function() {
    gulp.src(path.join(FRONTEND_LESS_FOLDER_PATH, FRONTEND_LESS_ENTRY_POINT))
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(PUBLIC_FOLDER_PATH))
        .pipe(livereload());
});

// Condenses the pages
gulp.task('html', function() {
    gulp.src(path.join(FRONTEND_HTML_FOLDER_PATH, '**', '*'))
        .pipe(plumber())
        .pipe(minify({
            empty: true,
            spare: true
        }))
        .pipe(gulp.dest(path.join(PUBLIC_FOLDER_PATH, FRONTEND_HTML_FOLDER_NAME)));
});
gulp.task('html-dev', function() {
    gulp.src(path.join(FRONTEND_HTML_FOLDER_PATH, '**', '*'))
        .pipe(plumber())
        .pipe(minify({
            empty: true,
            spare: true
        }))
        .pipe(replace('</body>', '<script src="http://localhost:35729/livereload.js"></script></body>'))
        .pipe(gulp.dest(path.join(PUBLIC_FOLDER_PATH, FRONTEND_HTML_FOLDER_NAME)))
        .pipe(livereload());
});

// Moves images
gulp.task('images', helpers.copyAssets(FRONTEND_IMG_FOLDER_NAME));
gulp.task('images-delayed', helpers.delay(helpers.copyAssets(FRONTEND_IMG_FOLDER_NAME)));

// Moves vendor files
gulp.task('vendor', helpers.copyAssets(FRONTEND_VENDOR_FOLDER_NAME));
gulp.task('vendor-delayed', helpers.delay(helpers.copyAssets(FRONTEND_VENDOR_FOLDER_NAME)));

// Clears all compiled client code
gulp.task('clean', function() {
    clean.sync(PUBLIC_FOLDER_PATH);
});

/**************************************** BACKEND ****************************************/

gulp.task('server', function() {
    nodemon({
        script: path.join(BACKEND_FOLDER_PATH, BACKEND_ENTRY_POINT),
        env:    require('./env/dev.json')
    });
});

/**************************************** GENERIC ****************************************/

// Watches changes to the client code
gulp.task('watch', ['clean', 'less-dev', 'html-dev', 'images', 'vendor'], function() {
    gulp.watch(path.join(FRONTEND_HTML_FOLDER_PATH,     '**', '*'), ['html-dev']);
    gulp.watch(path.join(FRONTEND_LESS_FOLDER_PATH,     '**', '*'), ['less-dev']);
    gulp.watch(path.join(FRONTEND_IMG_FOLDER_PATH,      '**', '*'), ['images-delayed']);
    gulp.watch(path.join(FRONTEND_VENDOR_FOLDER_PATH,   '**', '*'), ['vendor-delayed']);
    // Start the livereload server
    livereload.listen();
});

// Run all compilation tasks
gulp.task('default', ['watch', 'watchify', 'server']);
