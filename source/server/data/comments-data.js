/**
 * Created by admin on 1.12.2016 г..
 */
/* globals module */

'use strict';

module.exports = (models) => {
    var CommentModel = models.CommentModel;
    var EventModel = models.EventModel;
    // var CommentModel = require('./mongoose/models/comment-model').CommentModel;

    return {
        commentCreate(author, body, date, hidden = false){

            var commentObject = {
                author: author,
                body: body,
                date: date,
                hidden: hidden ,
                meta: { like: 0 }
            };

            return new Promise((resolve, reject) => {
                try {
                    var comment = new CommentModel(commentObject);
                    return resolve(comment);
                }
                catch (error) {
                    return reject(error);
                }
            });
        },
        commentCreateAndSave(author, body, date, hidden = false){

            var commentObject = {
                author: author,
                body: body,
                date: date,
                hidden: hidden ,
                meta: { like: 0 }
            };
            var comment = new CommentModel(commentObject);

            return new Promise(function (resolve, reject) {
                comment.save(function (error, result) {
                    if(error){
                        return reject(error);
                    }

                    return resolve(result);
                })
            });
        },
        commentAddToEvent(event, comment) {
            event.comments.push(comment);

            return new Promise((resolve, reject) => {
                event.save(function (error, result) {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(result);
                });
            });
        },
        commentFindById(commentId) {
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
                _id: e123456789,
                title: 'test event',
                author: dbUser.userName,
                body: 'event body event body event body event body ',
                date: new Date(),
                hidden: false
            };
            var dbComment = {
                _id: c123456789,
                author: dbUser.userName,
                body: 'comment comment.... by me',
                date: new Date(),
                hidden: false
            };

            if (commentId == dbComment._id) {
                return Promise.resolve(dbComment);
            }

            return Promise.resolve(null);
        },
        commentGetAll() {
            return new Promise((resolve, reject) => {
                CommentModel.find((err, comments) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(comments);
                });
            });
        },
    };
};