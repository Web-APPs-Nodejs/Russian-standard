/* globals module require */

'use strict';

const passport = require('passport');

module.exports = (data) => {
    return {
        getLoginPage(req, res) {
            res.render('users/login-page', { user: req.user });
        },

        getMyProfile(req, res) {
            if (req.isAuthenticated()) {
                res.render('users/my-profile', { user: req.user });
                return;
            }

            res.render('users/login-page', { user: req.user });
        },

        getUserProfilePage(req, res){
            let username = req.params.username;

            // TODO remove before production :)
            console.log('getUserProfilePage');

            if (req.isAuthenticated()) {
                data.findUserByCredentials(username)
                    .then((userData) => {
                        // TODO remove before production :(
                        console.log(userData);
                        res.render('profile/' + userData.username, {
                            user: req.user,
                            userData: userData
                        });
                    })
                    .catch((error) => {
                        throw error;
                    });
            }
        },

        getRegisterPage(req, res) {
            res.render('users/register-page');
        },

        getUpdateInfoPage(req, res) {
            console.log('getUpdateInfoPage');
            res.render('users/update-user-info', { user: req.user });
        },

        updateUserInfo(req, res) {
            let newData = {};

            // TODO remove before production :(
            console.log(req.body);
            console.log(req.user);

            Object.keys(req.body)

                .forEach(key => {
                    if (req.body[key] && req.body[key].trim() !== '') {
                        newData[key] = req.body[key];
                    }
                });
                newData['profilePicture'] = { src: req.body.avatar};

            data.updateUserInfo(req.user, newData)
                .then(() => {
                    res.redirect('/profile', { user: req.user });
                })
                .catch((err) => {
                    res.status(400).send(err);
                    res.redirect('/update-info', { user: req.user });
                });
        }
    };
};