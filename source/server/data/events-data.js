/**
 * Created by admin on 1.12.2016 г..
 */
/* globals module Promise*/

'use strict';

const validate  = require('./utilities').validate;

module.exports = (models) => {
    var EventModel = models.EventModel;

    return {
<<<<<<< HEAD
        createAndSaveEvent(title, category, picture, author, body, date, hidden = false, req){

=======
        createAndSaveEvent(title, category, picture, author, body, date, hidden = false) {
>>>>>>> f109f357f8c705507da3ecc038f926c883cdd1e3
            var _category = validate.category(category);
            var _picture = validate.picture(picture, req);

            // TODO remove before production :)
            console.log('picture- '+ JSON.stringify(_picture));
            console.log('category- '+_category);
            console.log('author-' + JSON.stringify(author));

            var eventObject = {
                title: title,
                category: _category,
                pictures: [_picture],
                author: author,
                body: body,
                date: date,
                hidden: hidden
            };
            var event = new EventModel(eventObject);
            // TODO remove before production :)
            console.log('eventCreateAndSave' + JSON.stringify(event));

            return new Promise(function (resolve, reject) {
                event.save(function (error, dbEvent) {
                    if(error){
                        return reject(error);
                    }

                    // TODO remove before production :)
                    console.log('eventCreateAndSave' + JSON.stringify(event));
                    return resolve(dbEvent);
                });
            });
        },

        getAllEvents(){
            return new Promise(function (resolve, reject) {
                EventModel
                    .find()
                    .limit(300)
                    .sort('-date')
                    .exec(function (error, events) {
                        if(error){
                            return reject(error);
                        }
                        // TODO remove before production :)
                        // console.log('All events in all categories are found.');

                        return resolve(events);
                    });
            });
        },

        getEventByCategoryName(categoryName) {
            return new Promise((resolve, reject) => {
                EventModel
                    .find()
                    .where('category').equals(categoryName)
                    .limit(300)
                    .sort('-date')
                    .exec(function (error, events) {
                        if(error){
                            return reject(error);
                        }
                        // TODO remove before production :)
                        // console.log('All events in ' + categoryName + ' are found.');

                        return resolve(events);
                    });
            });
        },

        getEventByCategoryAndId(categoryName, eventId) {
            return new Promise((resolve, reject) => {
                EventModel
                    .find()
                    .where('_id').equals(eventId)
                    .where('category').equals(categoryName)
                    .limit(300)
                    .sort('-date')
                    .exec(function (error, events) {
                        if(error){
                            return reject(error);
                        }
                        console.log('All events in ' + categoryName + ' are found.');

                        return resolve(events);
                    });
            });
        }
    };
};