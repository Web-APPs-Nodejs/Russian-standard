/**
 * Created by admin on 29.11.2016 г..
 */
/* globals require module */
"use strict";

const config = require('../config'),
    models = require('../models'),
    mongooseDbContext = require('./mongoose');

var newTestUser = new models.User('Alexander', 'Toplijski', 36, 'male', 'persssssssi', '12345', 'email@email.com', {src: 'source', alt: ''});

mongooseDbContext.createAndSaveUser(newTestUser)
    .then((newDbTestUser) => {
        console.log('New user created and saved ot database');
        console.log(newDbTestUser);
    })
    .catch((error) => {
        throw  error;
    });