/**
 * Created by admin on 2.12.2016 г..
 */
/* globals module require */

'use strict';

const passport = require('passport');

module.exports = (data) => {
    return {

        getCreateEventPage(req, res) {
            let categoryName = req.params.categoryName;

            if(!categoryName) {
                categoryName = 'ski';
            }

            if (req.isAuthenticated()) {
                res.render('./events/add-event-page', {
                    user: req.user,
                    category: categoryName
                });

                return;
            }

            res.render('auth-not-authorised-page');
        },

        getEventsPage(req, res){
            let categoryName=req.params.category;
            let eventId=req.params.id;

            console.log('categoryName ' + categoryName);
            console.log('eventId ' + eventId);

            if(!categoryName && !eventId){
                data.getAllEvents(req, res)
                    .then((events) => {
                        // TODO remove before production :)
                        console.log(events);
                        res.render('./events/all-categories-page', {
                            user: req.user,
                            events: events
                        });
                    })
                    .catch((error) => {
                        throw error;
                    });

            } else if (categoryName && !eventId) {
                data.getEventByCategoryName(categoryName)
                    .then((events) => {
                        // TODO remove before production :)
                        //console.log(events);
                        res.render('./events/single-category-page', {
                            user: req.user,
                            category: categoryName,
                            events: events
                        });
                    })
                    .catch((error) => {
                        throw error;
                    });

            } else if (categoryName && eventId) {
                data.getEventByCategoryAndId(categoryName, eventId)
                    .then((event) => {
                        // TODO remove before production :)
                        //console.log(event);
                        res.render('./events/single-event-page', {
                            user: req.user,
                            category: categoryName,
                            event: event
                        });
                    })
                    .catch((error) => {
                        throw error;
                    });
            }
        },

        createEvent(req, res) {
            let body = req.body,
                nowDt = new Date(),
                eventIsHidden = false,
                categoryName = req.params.categoryName,
                pictureUrl = req.body.eventPicture;

            data.createAndSaveEvent(body.title, categoryName, pictureUrl, req.user, body.body, nowDt, eventIsHidden, req)
                .then((dbEvent) => {
                    // res.redirect(201, '/categories/ski');
                    // res.status(400).send(err);
                    // res.redirect('/update-info');
                    res.redirect('/categories/ski');

                })
                .catch((error) => {
                    var statusCode = 400;

                    // TODO delete duplicated index and try again
                    if(error.code == 11000) {
                        statusCode = 409;
                    }
                    //res.status(statusCode).send(error.errmsg);

                    res.render('error-page', {
                        user: res.user,
                        error: error
                    });

                });

            // if (req.isAuthenticated()) {
            //     data.eventCreateAndSave(body.title, categoryName, _picture, req.user, body.body, nowDt, eventIsHidden)
            //         .then(() => {
            //             //res.status(201).redirect('http://localhost:3001/categories/201', { user: req.user }).end();
            //             //res.status(201).send('The request has been fulfilled and resulted in a new resource being created. OK!');
            //             // res.redirect('/categories/201', {
            //             //     user: req.user
            //             // });
            //             //console.log('thenthen');
            //             res.render('all-categories-page', {
            //                 user: req.user,
            //                 category: categoryName,
            //                 event: event
            //             });
            //         })
            //         .catch((err) => {
            //             // The request could not be completed due to a conflict with the current state of the resource.
            //             // {"code":11000,"index":0,"errmsg":"E11000 duplicate key error collection...
            //             if(err.code == 11000){
            //                 // TODO delete duplicated key and try again
            //
            //                 var EventModel = data.EventModel;
            //                 // mongoose.connection.db.executeDbCommand({ dropIndexes: EventModel, index: 'a*' },
            //                 // var db = mongoose.connection;
            //                 mongoose.connection.executeDbCommand({ dropIndexes: EventModel, index: 'a*' },
            //                     function(err, result) {
            //                         console.log('index is dropped');
            //                         res.status(201).location('/categories/2011', { user: req.user }).end();
            //                     });
            //
            //                 console.log('index error');
            //                 res.status(409).location('/categories/409', { user: req.user }).end();
            //             }
            //
            //             res.status(400).location('/categories/400', { user: req.user }).end();
            //
            //             //res.status(409).send(err);
            //             //res.redirect('/', { user: req.user });
            //
            //             //return;
            //         });
            // }

            //res.render('auth-not-authorised-page');

        }
    }
};
