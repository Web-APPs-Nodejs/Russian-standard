/**
 * Created by admin on 1.12.2016 г..
 */
/* globals module require */

// 'use strict';
//
// const express = require('express');
//
// module.exports = function (app, data) {
//     let router = new express.Router(),
//         controllers = require('../controllers')(data);
//
//     router
//         .get('/login', controllers.getLoginPage)
//         .post('/login', controllers.login)
//         .get('/register', controllers.getRegisterPage)
//         .post('/register', controllers.register);
//
//     app.use(router);
//
/* globals module require */
//
// const express = require("express");
//
// module.exports = function(app, data) {
//     let controller = require("./controllers/superhero-controller")(data);
//
//     let router = new express.Router();
//
//     router
//         .get("/", controller.getAll)
//         .get("/:id", controller.getById)
//         .post("/", controller.create);
//
//     app.use("/superheroes", router);
// };

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
        .get('/:category/:id', eventsController.getEventsPage);


    app.use('/categories',  router);

};