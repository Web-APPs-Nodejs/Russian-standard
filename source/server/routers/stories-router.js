/* globals module require */

'use strict';

const express = require('express');

module.exports = function (app, data) {
    let router = new express.Router(),
        controllers = require('../controllers')(data);

    router
        .get('/stories', controllers.getStoriesPage)
        .get('/add-story', controllers.getAddStoryPage)
        .post('/add-story', controllers.addStory);

    app.use(router);
};