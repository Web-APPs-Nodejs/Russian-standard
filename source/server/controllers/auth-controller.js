/* globals module require */

'use strict';

const passport = require('passport'),
    characterEscaper = require('../utils/character-escaper');


module.exports = (data) => {
    return {
        login(req, res, next) {
            passport.authenticate('local', function (error, user) {
                if (error) {
                    next(error);
                    return res.status(500).json('Server error! Please try again!');
                }

                if (!user) {
                    res.status(401).json('Invalid username or password!');
                }

                req.login(user, error => {
                    if (error) {
                        next(error);
                        return res.status(500).json('Server error! Please try again!');
                    }

                    res.status(200).json('Login successful!');
                });
            })(req, res, next);
        },

        logout(req, res) {
            req.logout();
            res.redirect('/home');
        },

        register(req, res) {
            Object.keys(req.body)
                .forEach(key => req.body[key] = characterEscaper(req.body[key]));

            data.userCreateAndSave(req.body.firstName, req.body.lastName, req.body.age, req.body.gender, req.body.username, req.body.password, req.body.email, { src: req.body.avatar })
                .then(() => {
                    passport.authenticate('local')(req, res, function () {
                        res.redirect('/profile');
                    });
                })
                .catch((err) => {
                    res.redirect('/register');
                    res.status(400).send(err);
                    res.redirect('/register', { message: err });
                });
        },

        notAuthorised(req, res) {
            res.render('auth-not-authorised-page');
        }

    };
};