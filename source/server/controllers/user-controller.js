/* globals module */

'use strict';

module.exports = (data) => {
    return {        
        getLoginPage(req, res) {
            res.render('login-page', { isAuth: req.isAuthenticated() });
        },
        getMyProfile(req, res) {
            if (req.isAuthenticated()) {
                res.render('my-profile', { isAuth: req.isAuthenticated(), user: req.user });
                return;
            }

            res.render('login-page', { isAuth: req.isAuthenticated() });
        },
        getRegisterPage(req, res) {
            res.render('register-page');
        }
    };
};