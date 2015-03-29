var fs          = require('fs'),
    path        = require('path'),
    sequelize   = require('sequelize'),
    jwt         = require('jsonwebtoken'),
    async       = require('async'),
    bcrypt      = require('bcrypt');

var log         = require('../log'),
    env         = require('../env'),
    util        = require('../util');

exports.route = function(app) {
    app.get('/api/search', function(req, res) {
        var Artist      = req.models.Artist,
            Album       = req.models.Album,
            Song        = req.models.Song;

        var q       = req.query.q,
            limit   = parseInt(req.query.limit) || 20,
            offset  = parseInt(req.query.offset) || 0;

        async.parallel({
            artists: function(callback) {
                Artist.findAll({
                    where: ['name like ?', '%' + q + '%'],
                    limit: limit,
                    offset: offset
                }).then(function(artists) {
                    callback(null, artists);
                }).catch(function(err) {
                    callback(err);
                });
            },
            albums: function(callback) {
                Album.findAll({
                    where: ['name like ?', '%' + q + '%'],
                    limit: limit,
                    offset: offset
                }).then(function(albums) {
                    callback(null, albums);
                }).catch(function(err) {
                    callback(err);
                });
            },
            songs: function(callback) {
                Song.findAll({
                    where: ['name like ?', '%' + q + '%'],
                    limit: limit,
                    offset: offset
                }).then(function(songs) {
                    callback(null, songs);
                }).catch(function(err) {
                    callback(err);
                });
            }
        }, function(err, result) {
            if (err) {
                console.log('Problem with query:', err);
                res.status(200).json([]);
            } else {
                res.status(200).json(result);
            }
        });
    });
};
