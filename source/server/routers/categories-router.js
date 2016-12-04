/**
 * Created by admin on 1.12.2016 г..
 */
/* globals module require */

'use strict';

const express = require('express');

module.exports = function (app, data) {
    let router = new express.Router();
    let eventsController = require('../controllers/events-controller')(data);

    router
        .get('/', eventsController.getEventsPage)
        .get('/categories/add-event', eventsController.getCreateEventPage )
        .get('/categories/add-event/:categoryName', eventsController.getCreateEventPage )
        .post('/categories/add-event/:categoryName', eventsController.createEvent )
        .post('/comments/post-comment-to-event/:id', eventsController.createCommentToEventButtonAction )
        .get('/categories/:category', eventsController.getEventsPage)
        .get('/categories/:category/:id', eventsController.getEventsPage)
        .get('/categories/:category/sure-participate/:id', eventsController.getIncreaseParticipatingInEventButtonAction)
        .get('/categories/:category/interested/:id', eventsController.getIncreaseInterestedInEventButtonAction)
        .get('/categories/:category/:id', eventsController.getIncreaseInterestedInEventButtonAction);

    // app.use('/categories',  router);
    app.use(router);
};