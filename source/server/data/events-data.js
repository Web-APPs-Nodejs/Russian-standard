/**
 * Created by admin on 1.12.2016 г..
 */
/* globals module */

'use strict';

module.exports = (models) => {
    var EventModel = models.EventModel;

    return {
        eventCreateAndSave(title, author, body, date, hidden = false){

            var eventObject = {
                title: title,
                author: author,
                body: body,
                date: date,
                hidden: hidden
            };
            var event = new EventModel(eventObject);

            var promise = new Promise(function (resolve, reject) {
                event.save(function (error, dbEvent) {
                    if(error){
                        return reject(error);
                    }

                    return resolve(dbEvent);
                })
            });

            return promise;
        },
        findById(eventId) {
            // TODO this is for tests only, edit and refactor later
            var dbUser = {
                firstName: 'Alex',
                lastName: 'Toplijski',
                age: 36,
                gender: 'gender',
                userName: 'userName101',
                passHash: '123456',
                email: 'email@email.com',
                ProfilePicture: { src: 'source'}
            };
            var dbEvent = {
                _id: 123456789,
                title: 'test event',
                author: dbUser,
                body: 'this si th body text, this si th body text, this si th body text, this si th body text',
                date: new Date(),
                hidden: false
            };

            if (eventId == dbEvent._id) {
                return Promise.resolve(dbEvent);
            }
            

            return Promise.resolve(null);
        }
    };
};