var Sequelize = require('sequelize');

var MODEL_ID = 'Song';

var model = undefined;
module.exports = {
    id: MODEL_ID,
    model: function(db) {
        if (!model) {
            model = db.define(MODEL_ID, {
                name:               Sequelize.STRING,
                audioUrl:           Sequelize.STRING,
                lengthInSeconds:    Sequelize.INTEGER,
                spotifyId:          Sequelize.STRING
            });
        }
        return model;
    },
    relate: function(models) {
        var Song    = models[MODEL_ID],
            Album   = models.Album,
            User    = models.User;
        // A song is many-to-many with users
        Song.belongsToMany(User, {
            through: 'PurchasedSong'
        });
        // A song belongs to an Album
        Song.belongsTo(Album, {
            as: 'album'
        });
    }
};
