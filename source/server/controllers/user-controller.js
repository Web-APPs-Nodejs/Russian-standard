/* globals module require */

'use strict';

const passport = require('passport');

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