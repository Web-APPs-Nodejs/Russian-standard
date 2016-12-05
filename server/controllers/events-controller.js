/**
 * Created by admin on 2.12.2016 г..
 */
/* globals module require */

'use strict';

const passport = require('passport');

function addUsernameToEventPropertyArrayExecutor(req, res, data, propertyArrayName) {
    let eventId=req.params.id;

    // TODO remove before production :)
    //console.log('getIncreaseParticipatingInEventButtonAction' + req.user.username);

    if (req.isAuthenticated()) {
        data.getEventById(eventId)
            .then((dbEvent)=>{
                // TODO remove before production :)
                //console.log('getIncreaseParticipatingInEventButtonAction-eventId' + dbEvent._id);

                return data.addUsernameToEventPropertyArray(dbEvent, req.user.username, propertyArrayName);
            })
            .then((dbEventUpdated) => {
                // TODO remove before production :)
                // console.log('getIncreaseParticipatingInEventButtonAction-eventId' + dbEventUpdated._id);

                res.redirect('/events/' + dbEventUpdated.category + '/' + dbEventUpdated._id);
            })
            .catch((error)=>{
                res.render('error-page', {
                    user: res.user,
                    error: error
                });
            });
    } else {
        res.render('auth-not-authorised-page', {
            user: res.user
        });
    }
}

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

            console.log('categoryName: ' + categoryName);
            console.log('eventId: ' + eventId);

            if(!categoryName && !eventId){
                data.getAllEvents(req, res)
                    .then((events) => {
                        data.getLatestPicturesByCategory('', 5)
                            .then((picturesFromGallery) => {
                                events['latestPicturesFromGallery'] = picturesFromGallery;

                                console.log('latestPicturesFromGallery-' + picturesFromGallery);

                                res.render('./events/all-categories-page', {
                                    user: req.user,
                                    category: 'all',
                                    events: events
                                });
                            })
                    })
                    .catch((error) => {
                        throw error;
                    });

            } else if (categoryName && !eventId) {
                console.log('getEventsPage');

                data.getEventByCategoryName(categoryName)
                    .then((events) => {
                        data.getLatestPicturesByCategory(categoryName, 5)
                            .then((picturesFromGallery) => {
                                events['latestPicturesFromGallery'] = picturesFromGallery;

                                // TODO remove before production :)
                                console.log('latestPicturesFromGallery' + events.latestPicturesFromGallery);

                                res.render('./events/single-category-page', {
                                    user: req.user,
                                    category: categoryName,
                                    events: events
                                });
                            });
                        // console.log('getEventsPage');
                        // res.render('./events/single-category-page', {
                        //     user: req.user,
                        //     category: categoryName,
                        //     events: events
                        // });
                    })
                    .catch((error) => {
                        throw error;
                    });

            } else if (categoryName && eventId) {
                data.getEventByCategoryAndId(categoryName, eventId)
                    .then((event) => {
                        data.getLatestPicturesByCategory(event.category, 5)
                            .then((picturesFromGallery) => {
                                event['latestPicturesFromGallery'] = picturesFromGallery;

                                console.log(event.latestPicturesFromGallery);
                                //return event;

                                res.render('./events/single-event-page', {
                                            user: req.user,
                                            category: event.category,
                                            event: event
                                });
                            });

                    })
                    // .then((eventWithPicturesFromGallery) => {
                    //     // TODO remove before production :)
                    //     console.log(eventWithPicturesFromGallery);
                    //     res.render('./events/single-event-page', {
                    //         user: req.user,
                    //         category: event.category,
                    //         event: eventWithPicturesFromGallery
                    //     });
                    // })
                    .catch((error) => {
                        throw error;
                    });
            }
        },

        getIncreaseInterestedInEventButtonAction(req, res) {
            let propertyArrayName='interestedIn';
            addUsernameToEventPropertyArrayExecutor(req, res, data, propertyArrayName);
        },

        getIncreaseParticipatingInEventButtonAction(req, res) {
            let propertyArrayName='participatingIn';
            addUsernameToEventPropertyArrayExecutor(req, res, data, propertyArrayName);
        },

        createEvent(req, res) {
            let body = req.body,
                nowDt = req.date,
                eventIsHidden = false,
                categoryName = req.params.categoryName,
                picture =  { src: req.body.eventPicture };

            data.createAndSaveEvent(body.title, categoryName, picture, req.user, body.body, nowDt, eventIsHidden, req)
                .then((dbEvent) => {

                    // res.redirect(201, '/events/ski');
                    // res.status(400).send(err);
                    // res.redirect('/update-info');
                    // TODO remove before production :)
                    //console.log('createAndSaveEvent in controller - then-' + JSON.stringify(dbEvent));
                    data.putEventInUsersEvents(dbEvent, req.user, data.updateUserInfo);

                    return dbEvent;
                })
                .then((dbEvent)=>{
                    // TODO remove before production :)
                    //console.log('createAndSaveEvent in controller - thenthen-after putEventInUsersEvents');
                    // return data.addUsernameToEventSureParticipatingList(dbEvent, req.user.username);
                    return data.addUsernameToEventPropertyArray(dbEvent, req.user.username, 'participatingIn')
                })
                .then((dbEventUpdated)=>{
                    // TODO remove before production :)
                    console.log('after addUsernameToEventSureParticipatingList-' + JSON.stringify(dbEventUpdated));
                    res.redirect('/events/ski');
                })
                .catch((error) => {
                    var statusCode = 400;

                    // TODO delete duplicated index and try to save event again
                    if(error.code == 11000) {
                        statusCode = 409;
                    }
                    //res.status(statusCode).send(error.errmsg);

                    res.render('error-page', {
                        user: res.user,
                        error: error
                    });

                });

        },

        createCommentToEventButtonAction(req, res) {

            if (!req.isAuthenticated()) {
                res.render('auth-not-authorised-page');
                return;
            }

            let body = req.body,
                nowDt = new Date(),
                commentIsHidden = false,
                categoryName = req.params.category,
                eventId = req.params.id,
                meta = { like: 0 };

            if (!body.comment.trim() || body.comment.length > 100) {
                res.redirect('/events/' + categoryName + '/' + body.event._id);
                return;
            }

            console.log('createCommentToEventButtonAction');

            data.getEventById(eventId)
                .then((dbEvent) => {
                    return data.createCommentAndAddToEvent(dbEvent, data, req.user, body.comment, nowDt, commentIsHidden, meta)
                })
                .then((dbEventUpdated) => {
                    res.redirect('/events/' + dbEventUpdated.category + '/' + dbEventUpdated._id);
                })
                .catch((error) => {
                    res.render('error-page', {
                        user: res.user,
                        error: error
                    });
                });
        },

        deleteCommentButtonAction(req, res) {
            if (!req.isAuthenticated()) {
                res.render('auth-not-authorised-page');
                return;
            }

            let body = req.body,
                commentId = req.params.commentId,
                eventId = req.params.eventId;

            console.log('commentId-' + commentId);
            console.log('eventId-' + eventId);

            data.deleteSingleComment(eventId, commentId)
                .then((dbEventUpdated) => {
                    res.redirect('/events/' + dbEventUpdated.category + '/' + dbEventUpdated._id);
                })
                .catch((error) => {
                    res.render('error-page', {
                        user: res.user,
                        error: error
                    });
                });
        }
    };
};