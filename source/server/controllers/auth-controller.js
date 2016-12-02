/* globals module require */

'use strict';

const passport = require('passport');

module.exports = (data) => {
    return {
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

        logout(req, res) {
            req.logout();
            res.redirect('/home');
        },

        register(req, res) {
            let user = {
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                age: req.body.age,
                profilePicture: {
                    src: req.body.avatar
                },
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                gender: req.body.gender
            };

            console.log('register');

            data.userCreateAndSave(user.firstName, user.lastName, user.age, user.gender, user.username, user.password, user.email, user.profilePicture)
                .then((res) => {
                    passport.authenticate('local')(req, res, function () {
                        console.log('register'+res);
                        res.redirect('/profile');
                    });
                })
                .catch((err) => {
                    console.log('register'+err);
                    res.redirect('/register');
                });
        },

        notAuthorised(req, res) {
            res.render('auth-not-authorised-page');
        }

    };
};