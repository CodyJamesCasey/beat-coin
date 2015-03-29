var Sequelize = require('sequelize');

var MODEL_ID = 'Album';

var model = undefined;
module.exports = {
    id: MODEL_ID,
    model: function(db) {
        if (!model) {
            model = db.define(MODEL_ID, {
                name:   Sequelize.STRING,
                artUrl: Sequelize.STRING,
                spotifyId:  Sequelize.STRING,
                artistRef: Sequelize.STRING,
                artistName: Sequelize.STRING
            });
        }
        return model;
    },
    relate: function(models) {
        var Album   = models[MODEL_ID],
            Artist  = models.Artist;
        // An artist has albums
        Album.belongsTo(Artist, {
            as: 'artist'
        });
    }
};
