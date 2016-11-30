/* globals module require */

'use strict';

const passport = require('passport');

const mongoose = require("mongoose"),
    config = require('../config');
require("../config/mongoose.js")(config.connectionString);
// require("../config/mongoose.js")(config.connectionStringForLocalTests);

const userDataForTest = require('../data');
userDataForTest.createAndSave('Alex', 'Toplijski', 36, 'gender', 'userName2', '123456', 'email@email.com', {src: 'source'})
    .then((res) => {
        console.log(res);
    }).catch((err) => {
    console.log(err);
});

module.exports = (data) => {
    return {
        getMyProfile(req, res) {
            if (req.isAuthenticated()) {
                res.render('my-profile', { isAuth: req.isAuthenticated(), user: req.user });
                return;
            }

            res.render('login-page', { isAuth: req.isAuthenticated() });
        },
        logout(req, res) {
            req.logout();
            res.redirect('/');
        }
    };
};