var request = require('superagent'),
    async   = require('async'),
    fs      = require('fs');

var artistQuery = function(results, letter) {
    return function(callback) {
        request.get('https://api.spotify.com/v1/search')
            .query({
                q: letter,
                type: 'artist'
            })
            .set('Accept', 'application/json')
            .end(function(err, res) {
                if (err) {
                    callback(err);
                } else if (res.ok && res.body.artists) {
                    async.each(res.body.artists.items, function(artist, _callback) {
                        results.push(artist);
                        console.log('artist', results.length);
                        _callback();
                    }, callback);
                } else {
                    callback();
                }
            });
    };
};

var albumQuery = function(results, artistId) {
    return function(callback) {
        request.get('https://api.spotify.com/v1/artists/' + artistId + '/albums')
            .set('Accept', 'application/json')
            .end(function(err, res) {
                if (err) {
                    callback(err);
                } else if (res.ok && res.body.items) {
                    async.each(res.body.items, function(album, _callback) {
                        results.push(album);
                        _callback();
                    }, callback);
                } else {
                    callback();
                }
            });
    };
};

var songQuery = function(results, albumId) {
    return function(callback) {
        request.get('https://api.spotify.com/v1/albums/' + albumId + '/tracks')
            .set('Accept', 'application/json')
            .end(function(err, res) {
                if (err) {
                    callback(err);
                } else if (res.ok && res.body.items) {
                    async.each(res.body.items, function(song, _callback) {
                        results.push(song);
                        console.log('song', results.length);
                        _callback();
                    }, callback);
                } else {
                    callback();
                }
            });
    };
};

var loadArtists = function(callback) {
    if (fs.existsSync('artists.json')) {
        fs.readFile('artists.json', function(err, artists) {
            if (err) {
                callback(err);
            } else {
                callback(null, JSON.parse(artists));
            }
        });
    } else {
        var str = 'abcdefghijklmnopqrstuvwxyz',
            artistQueries = [],
            artists = [];
        for (var i = 0; i < str.length; i++) {
            artistQueries.push(artistQuery(artists, str[i]));
        }
        async.parallel(artistQueries, function(err) {
            if (err) {
                callback(err);
            } else {
                fs.writeFile('artists.json', JSON.stringify(artists), function(err) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(undefined, artists);
                    }
                });
            }
        });
    }
};

var loadAlbums = function(artists, callback) {
    if (fs.existsSync('albums.json')) {
        fs.readFile('albums.json', function(err, albums) {
            if (err) {
                callback(err);
            } else {
                callback(null, JSON.parse(albums));
            }
        });
    } else {
        var albumQueries = [],
            albums = [];
        for (var i = 0; i < artists.length; i++) {
            albumQueries.push(albumQuery(albums, artists[i].id));
        }
        async.parallel(albumQueries, function(err) {
            if (err) {
                callback(err);
            } else {
                fs.writeFile('albums.json', JSON.stringify(albums), function(err) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(undefined, albums);
                    }
                });
            }
        });
    }
};

var loadSongs = function(albums, callback) {
    console.log('loadSongs');
    if (fs.existsSync('songs.json')) {
        fs.readFile('songs.json', function(err, songs) {
            if (err) {
                callback(err);
            } else {
                callback(null, JSON.parse(songs));
            }
        });
    } else {
        var songQueries = [],
            songs = [];
        for (var i = 0; i < albums.length; i++) {
            songQueries.push(songQuery(songs, albums[i].id));
        }
        async.series(songQueries, function(err) {
            if (err) {
                callback(err);
            } else {
                fs.writeFile('songs.json', JSON.stringify(songs), function(err) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(undefined, songs);
                    }
                });
            }
        });
    }
};

module.exports = function(callback) {
    loadArtists(function(err, artists) {
        if (err) {
            callback(err);
        } else {
            console.log('got artists', artists.length);
            loadAlbums(artists, function(err, albums) {
                if (err) {
                    callback(err);
                } else {
                    console.log('got albums', albums.length);
                    loadSongs(albums, function(err, songs) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(undefined, artists, albums, songs);
                        }
                    });
                }
            });
        }
    });
};
