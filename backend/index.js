var express         = require('express'),
    // General purpose imports
    path            = require('path'),
    async           = require('async'),
    // Express specific imports
    morgan          = require('morgan'),
    expressJWT      = require('express-jwt'),
    bodyParser      = require('body-parser');

var routes          = require('./routes'),
    db              = require('./db'),
    util            = require('./util'),
    env             = require('./env'),
    log             = require('./log');

var escape = require('pg-escape');
var fs = require('fs');

// Create the server instance
var app = express();
// Strap up the request logger
app.use(morgan('dev'));
// Reads JSON request bodies
app.use(bodyParser.json());
// Reads formdata request bodies
app.use(bodyParser.urlencoded({
    extended: true
}));

async.series([
    function(callback) {
        callback(env.init());
    },
    function(callback) {
        // Setup the database
        db.setup(app, callback);
    },
    function(callback) {
        // TODO
        // return callback();
        // Add database data if not exists
        var Song = db.models.Song;
        Song.count().then(function(count) {
            if (count < 1) {
                // Require spotify data
                var artists = require('./data/artists.json'),
                    albums = require('./data/albums.json'),
                    songs = require('./data/songs.json');
                // Get the other models
                var Artist = db.models.Artist,
                    Album = db.models.Album;
                // Sanitize the data
                artists = artists.map(function(artist) {
                    // Add to the id map
                    return {
                        name: artist.name,
                        bio: '',
                        genre: artist.genres.length > 0 ? artist.genres[0] : '',
                        pictureUrl: (artist.images && artist.images[0]) ? artist.images[0].url : null,
                        spotifyId: artist.id
                    };
                });
                // Put in the database
                Artist.bulkCreate(artists).then(function(createdArtists) {
                    // Sanitize the data
                    albums = albums.map(function(album) {
                        return {
                            name: album.name,
                            artUrl: (album.images && album.images[0]) ? album.images[0].url : null,
                            spotifyId: album.id,
                            artistRef: album.artistId
                        };
                    });
                    // Put in the database
                    Album.bulkCreate(albums).then(function(ca) {
                        // Sanitize the data
                        console.log('Bulding query');
                        var query = 'insert into \"Songs\" (name, "audioUrl", "lengthInSeconds", "spotifyId", "albumRef", "createdAt", "updatedAt") values ' + songs.map(function(song) {
                            var stuff = {
                                name: song.name,
                                audioUrl: (song.external_url) ? song.external_url.spotify : null,
                                lengthInSeconds: song.duration_ms / 1000,
                                spotifyId: song.id,
                                albumRef: song.albumId
                            };
                            return '(' + escape.literal(stuff.name) + ',' + escape.literal(stuff.audioUrl) + ',' + stuff.lengthInSeconds + ',' + escape.literal(stuff.spotifyId) + ',' + (stuff.albumRef) + ',\'2015-03-23 17:47:38.523-04\',\'2015-03-23 17:47:38.523-04\')';
                        }).join(',') + ';';
                        console.log('POST BUILD');
                        fs.writeFileSync('songs.sql', query);
                        callback();
                    }).catch(function(err) {
                        callback(err);
                    });
                }).catch(function(err) {
                    callback(err);
                });
            }
        }).catch(function(err) {
            callback(err);
        });
    },
    function(callback) {
        console.log('got here');
        // Authorization control
        app.use(expressJWT({
            secret: env.get().tokenSecret
        }).unless({
            path: [
                '/api/authenticate',
                '/api/register'
            ]
        }));
        // Error handling middleware
        app.use(function (err, req, res, next) {
            if (err.name === 'UnauthorizedError') {
                res.status(401).json({
                    message: 'A valid token is required to interact with this endpoint'
                });
            } else {
                res.status(500).json({
                    message: 'An unexpected server issue occurred'
                });
            }
        });
        // Continue
        callback();
    },
    function(callback) {
        // Perform server routing
        routes.route(app, callback);
    },
    function(callback) {
        // Start servicing the requests
        app.listen(env.get().httpPort, callback);
    }
], function(err) {
    if (err) {
        log.error('Server could not start', err);
    } else {
        log.info('Server is listening on ' + env.get().httpPort + '\n');
    }
});
