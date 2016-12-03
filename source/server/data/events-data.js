/**
 * Created by admin on 1.12.2016 г..
 */
/* globals module Promise*/

'use strict';

module.exports = (models) => {
    var EventModel = models.EventModel;

    return {
        eventCreateAndSave(title, category, picture, author, body, date, hidden = false){

            var _category = 'ski';
            if(!category) {
                _category = category;
            }

            var _picture = {};
            if(picture.src == '') {
                _picture = {
                    src: '/res/images/default-picture.png'
                }
            } else {
                _picture.src = picture.src;
            }

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
            // console.log('eventCreateAndSave' + JSON.stringify(event));

            return new Promise(function (resolve, reject) {
                event.save(function (error, dbEvent) {
                    if(error){
                        return reject(error);

                    }

                    return resolve(dbEvent);
                })
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