/* globals module require */

'use strict';

const express = require('express');

module.exports = function (app, data) {
    let router = new express.Router(),
        controllers = require('../controllers')(data);

    router
        .get('/profile', controllers.getMyProfile)
        .get('/update-info', controllers.getUpdateInfoPage)
        .post('/update-info', controllers.updateUserInfo);

    app.use(router);
};