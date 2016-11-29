/* globals module require */

'use strict';

const express = require('express');

module.exports = function (app, data) {
    let router = new express.Router(),
        controllers = require('../controllers')(data);

    router.get('/login', controllers.getLoginPage);
    router.post('/login', controllers.login);

    app.use(router);
};