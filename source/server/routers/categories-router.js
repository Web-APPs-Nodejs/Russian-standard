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
        .get('/add-event', eventsController.getCreateEventPage )
        .get('/add-event/:categoryName', eventsController.getCreateEventPage )
        .post('/add-event/:categoryName', eventsController.createEvent )
        .get('/:category', eventsController.getEventsPage)
        .get('/:category/:id', eventsController.getEventsPage)
        .get('/:category/sure-participate/:id', eventsController.getIncreaseParticipatingInEventButtonAction)
        .get('/:category/interested/:id', eventsController.getIncreaseInterestedInEventButtonAction)
        .post('/:category/add-comment/:id', eventsController.createCommentToEventButtonAction)
        .get('/:category/:id', eventsController.getIncreaseInterestedInEventButtonAction);

    app.use('/categories',  router);

};