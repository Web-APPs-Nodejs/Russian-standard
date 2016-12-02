/* globals module require */

'use strict';

const express = require('express');

module.exports = function (app, data) {
    let router = new express.Router(),
        controllers = require('../controllers')(data);

    router
        .get('/login', controllers.getLoginPage)
        .post('/login', controllers.login)
        .get('/register', controllers.getRegisterPage)
        .post('/register', controllers.register)
        .get('/not-authorised', controllers.notAuthorised);

    app.use(router);
};