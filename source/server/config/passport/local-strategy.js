/* globals module require */

'use strict';

const LocalStrategy = require('passport-local');
const data = require('../../data');

let strategy = new LocalStrategy(
    (username, password, done) => {
        data.findUserByCredentials(username)
            .then(user => {
                if (user && user.password === password) {
                    return done(null, user);
                }

                return done(null, false);
            })
            .catch(err => done(err, null));
    });

module.exports = strategy;