var a = require('./artists');
a(function(err, artists, albums) {
    if (err) {
        console.log('fuck', err);
    } else {
        console.log('done');
    }
});
