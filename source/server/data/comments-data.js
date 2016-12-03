/**
 * Created by admin on 1.12.2016 г..
 */
/* globals module Promise*/

'use strict';

module.exports = (models) => {
    var CommentModel = models.CommentModel;

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

        // TODO do not use this function ;) Check for usage later
        commentCreateAndSave(author, body, date, hidden = false){
            return new Promise(function (resolve, reject) {
                commentCreate(author, body, date, hidden)
                    .then((comment)=>{
                        comment.save(function (error, result) {
                            if(error){
                                return reject(error);
                            }

                            return resolve(result);
                        })
                    })
                    .catch((error) => {
                        return reject(error);
                    });
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
            return new Promise((resolve, reject) => {
                CommentModel.find({ _id: commentId }, (error, comment) => {
                    if (error) {
                        return reject(error);
                    }
                    console.log('Single comment in with _id ' + commentId + ' is found.');

                    return resolve(comment);
                });
            });
        },
    };
};