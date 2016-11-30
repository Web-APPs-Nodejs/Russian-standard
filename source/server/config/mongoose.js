/* globals require module */
"use strict";

const mongoose = require("mongoose");

module.exports = function(connectionString) {
    mongoose.Promise = global.Promise;
    mongoose.connect(connectionString);

    // var db = mongoose.connection;
    // db.on('error', console.error.bind(console, 'connection error:'));
    // db.once('open', function() {
    //
    //     console.log('We are now connected to connected to: ' + connectionString);
    //
    //
    //     // all code
    // });
};