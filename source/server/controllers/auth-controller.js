/* globals module require */

'use strict';

const passport = require('passport');

module.exports = (data) => {
    return {
        getLoginPage(req, res) {
            res.render('login-page');
        },
        login(req, res, next) {
            passport.authenticate('local', function (error, user) {
                if (error) {
                    next(error);
                    return;
                }

                if (!user) {
                    res.json({
                        success: false,
                        message: 'Invalid name or password!'
                    });
                }

                req.login(user, error => {
                    if (error) {
                        next(error);
                        return;
                    }

                    res.redirect('/profile');
                });
            })(req, res, next);
        },
    };
};