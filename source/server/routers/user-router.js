/* globals module require */

'use strict';

const express = require('express');

module.exports = function (app, data) {
    let router = new express.Router(),
        controllers = require('../controllers')(data);

    router
        .get('/profile', controllers.getMyProfile)
        .get('/logout', controllers.logout);

    app.use(router);
};