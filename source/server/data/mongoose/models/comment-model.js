/**
 * Created by admin on 1.12.2016 г..
 */
/* globals require module String Number Boolean*/
"use strict";

const mongoose = require('mongoose'),
    userSchema = require('./user-model').UserSchema;

var commentSchema = function () {
    var Schema = mongoose.Schema;

    let UserSchema = userSchema();
    let commentSchemaToReturn = new Schema({
        author: UserSchema,
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
