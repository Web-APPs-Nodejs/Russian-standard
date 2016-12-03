/* globals module */

'use strict';

module.exports = (data) => {
    return {
        getLoginPage(req, res) {
            res.render('users/login-page', { user: req.user });
        },

        getMyProfile(req, res) {
            if (req.isAuthenticated()) {
                res.render('users/profile-page', { user: req.user });
                return;
            }

            res.render('users/login-page', { user: req.user });
        },

        getUserProfilePage(req, res) {
            let username = req.params.username;
            data.findUserByCredentials(username)
                .then((userData) => {
                    if (!userData) {
                        return res.render('page-not-found', { user: req.user });
                    }

                    res.render('users/profile-page', {
                        user: req.user,
                        userData: userData
                    });
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).json('An error occurred! Please try again!');
                });

        },

        getRegisterPage(req, res) {
            res.render('users/register-page');
        },

        getFacebookCallbackPage(req, res) {
            res.render('users/profile-page', { user: req.user });
        },

        getUpdateInfoPage(req, res) {
            res.render('users/update-user-info', { user: req.user, userData: req.user });
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
            newData['profilePicture'] = { src: req.body.avatar };

            data.updateUserInfo(req.user, newData)
                .then(() => {
                    res.redirect('/profile', { user: req.user });
                })
                .catch((err) => {
                    res.status(400).send(err);
                    res.redirect('/update-info');
                });
        }
    };
};