/* globals require */

const config = require('./server/config'),
    app = require('./server/config/express'),
    data = require('./server/data')(config);

require('./server/routers')(app, data);

app.listen(config.port, () => console.log('Server now up and running...'));

// Just testing the connection to mLab Cloud. Disregard the collection name, structure, etc. Will be deleted afterwards.
//const mongoose = require('mongoose');
//// mongoose.connect(config.connectionString);
// mongoose.connect(config.connectionStringForLocalTests);
//
// let schema = new mongoose.Schema({
//     username: String,
//     password: String
// });
//
// mongoose.model('User', schema);
// let User = mongoose.model('User');
//
// User.find((err, res) => {
//     console.log(res);
//     console.log(err);
// });
//
// mongoose.connection.close();
// mongoose.disconnect();

// ATo mongoose schema tests start here
const schemaParser = require('./server/data/schema-parsing');

// ATo mongoose schema tests end here