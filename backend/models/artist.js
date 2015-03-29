var Sequelize = require('sequelize');

var MODEL_ID = 'Artist';

var model = undefined;
module.exports = {
    id: MODEL_ID,
    model: function(db) {
        if (!model) {
            model = db.define(MODEL_ID, {
                name:       Sequelize.STRING,
                bio:        Sequelize.TEXT,
                genre:      Sequelize.STRING,
                pictureUrl: Sequelize.STRING,
                spotifyId:  Sequelize.STRING
            });
        }
        return model;
    }
};
