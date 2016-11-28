/* globals require */

const config = require('./server/config'),
    app = require('./server/config/express'),
    data = require('./server/data')(config);

require('./server/routers')(app, data);

app.listen(config.port, () => console.log('Server now up and running...'));

// Just testing the connection to mLab Cloud. Disregard the collection name, structure, etc. Will be deleted afterwards.
const mongoose = require('mongoose');
mongoose.connect(config.connectionString);

let schema = new mongoose.Schema({
    username: String,
    password: String
});

mongoose.model('User', schema);
let User = mongoose.model('User');

User.find((err, res) => {
    console.log(res);
});