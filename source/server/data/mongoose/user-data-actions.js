/**
 * Created by admin on 30.11.2016 г..
 */
/* globals require module Promise */
'use strict';

const mongoose = require('mongoose');
const config = require('../../config');

const models = require('../../models'),
    schemas = require('./schemas'),
    mongooseDbParsers = require('./schema-parsers');

var createAndSaveUser = function (user) {

    var promise = new Promise(function (resolve, reject) {

        //const connectionString = config.connectionStringForLocalTests;
        const connectionString = config.connectionString;
        mongoose.connect(connectionString);

        var extremeSportsDb = mongoose.connection;
        extremeSportsDb.on('error', console.error.bind(console, 'connection error:'));
        extremeSportsDb.once('open', function() {

            console.log('We are now connected to connected to: ' + connectionString);

            var userSchema = schemas.userSchema(models.User, mongoose);
            var userModel = mongoose.model('User', userSchema);
            var userInMongoFormat = mongooseDbParsers.userToMongooseUser(user);
            var newUser = new userModel(userInMongoFormat);
            newUser.save(function (err, dbUser) {
                if (err){
                    reject(err);
                }
                resolve(dbUser);
            });
        });
    });

    return promise;
};

var findByCredentials = function(username) {
    var dbUser = {};
    if (username === dbUser.UserName) {
        // TODO parse back to user
        var user = {};
        return Promise.resolve(user);
    }

    return Promise.resolve(null);
};

var findById = function(userId) {
    var dbUser = {};
    if (userId == dbUser._id) {
        // TODO parse back to user
        var user = {};
        return Promise.resolve(user);
    }

    return Promise.resolve(null);
};

// var getUserModel = function (mongoose) {
//     var userSchema = schemas.userSchema(models.User, mongoose);
//     var userModel = mongoose.model('User', userSchema);
//
//     return userModel;
// };

module.exports.createAndSaveUser = createAndSaveUser;