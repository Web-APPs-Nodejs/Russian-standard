/**
 * Created by admin on 1.12.2016 г..
 */
/* globals require module String Number Boolean*/
"use strict";

const mongoose = require('mongoose');

var commentSchema = function () {
    var Schema = mongoose.Schema;

    let commentSchemaToReturn = new Schema({
        author: { type: String, required: true },
        body: { type: String, required: true },
        date: { type: Date, default: Date.now},
        hidden: {type: Boolean },
        meta: {
            like: Number
        }
    });

    return commentSchemaToReturn;
};

var commentModel = function () {
    var cS = commentSchema();
    var commentModelToReturn = mongoose.model('Comment', cS);

    return commentModelToReturn;
};

module.exports.CommentSchema =  commentSchema;
module.exports.CommentModel = commentModel();
