/**
 * Created by admin on 2.12.2016 г..
 */
/* globals module require */

'use strict';

const passport = require('passport');

module.exports = (data) => {
    return {
        getAllEvents(req, res) {
            res.render('categories-all-page');
        },

        getSkiEvents(req, res) {
            data.getSkiEvents()
                .then((events) => {
                    res.render('categories-skiing-page', {
                        result: events
                    });
                })
                .catch((error) => {
                    throw error;
                });
        },

        getCreateSkiEventPage(req, res) {
            res.render('categories-add-event-page');
        },

        createSkiEvent(req, res) {
            let body = req.body,
                nowDt = new Date(),
                hiddenComment = false,
                categoryName = req.params.categoryName;


            console.log('createSkiEvent');



            if (req.isAuthenticated()) {
                // res.render('my-profile', { isAuth: req.isAuthenticated(), user: req.user });
                data.eventCreateAndSave(body.title, req.user.username, body.body, nowDt, hiddenComment)
                    .then(() => {
                        res.redirect("/categories/ski");
                    });

                //return;
            }

            res.render('auth-not-authorised-page');


        }

    }
};
