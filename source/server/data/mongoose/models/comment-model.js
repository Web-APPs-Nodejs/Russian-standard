/**
 * Created by admin on 1.12.2016 г..
 */
/* globals require module String*/
"use strict";

const mongoose = require('mongoose');

var commentSchema = function () {
    var Schema = mongoose.Schema;

    let commentSchemaToReturn = new Schema({
        author: { type: String, required: true },
        body: { type: String, required: true },
        date: { type: Date, default: Date.now},
        meta: {
            like: Number
        }
    });

    return commentSchemaToReturn
};

var commentModel = function () {
    var cS = commentSchema();
    var commentModelToReturn = mongoose.model('ProfilePicture', cS);

    return new commentModelToReturn;
};

module.exports.CommentSchema =  commentSchema;
module.exports.CommentModel =  commentModel();
