var Sequelize = require('sequelize');

var MODEL_ID = 'User';

var model = undefined;
module.exports = {
    id: MODEL_ID,
    model: function(db) {
        if (!model) {
            model = db.define(MODEL_ID, {
                name:           Sequelize.STRING,
                email:          Sequelize.STRING,
                guid:           Sequelize.STRING,
                password:       Sequelize.STRING,
                pictureUrl:     Sequelize.STRING
            });
        }
        return model;
    },
    relate: function(models) {
        var User    = models[MODEL_ID],
            Song    = models.Song;
        // A User has many purchased songs
        User.belongsToMany(Song, {
            through: 'PurchasedSong'
        });
    }
};
