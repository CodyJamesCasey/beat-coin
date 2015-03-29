var fs      = require('fs'),
    path    = require('path'),
    async   = require('async');

var log     = require('../log');

exports.route = function(app, callback) {
    fs.readdir(__dirname, function(err, files) {
        if (err) callback(err);
        else {
            async.each(files, function(file, callback) {
                try {
                    if (file !== 'index.js' && (file.indexOf('.js', file.length - 3) !== -1)) {
                        var routeModule = require(path.join(__dirname, file));
                        if (routeModule && routeModule.route) {
                            log.debug('Loading routes from ' + file);
                            routeModule.route(app);
                        }
                    }
                    callback();
                } catch (err) {
                    callback(err);
                }
            }, function(err) {
                if (err) callback(err);
                else {
                    // index page route
                    log.debug('Loading resume page route');
                    app.get('/', function(req, res) {
                        res.sendFile(path.join(__dirname, '..', '..', 'public', 'pages', 'index.html'));

                    });
                    // 404 page route
                    log.debug('Loading 404 page route');
                    app.get('/*', function(req, res) {
                        res.sendFile(path.join(__dirname, '..', '..', 'public', 'pages', '404.html'));

                    });
                    // All routing now complete
                    log.info('Endpoint routing completed');
                    callback();
                }
            });
        }
    });
};
