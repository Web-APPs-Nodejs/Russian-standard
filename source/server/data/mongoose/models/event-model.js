/**
 * Created by admin on 1.12.2016 г..
 */
/* globals require module String Date Boolean*/
"use strict";

const mongoose = require('mongoose'),
    userSchema = require('./user-model').UserSchema,
    commentSchema = require('./comment-model').CommentSchema;


// TODO this is simple validation example, make it to real email validation with regex
// TODO extract function to other file
var validateTitle = function (title) {
    title = '' + title;
    var isValidTitle = (title.length > 1) && (title.length < 200);
    if(!isValidTitle){
        return false;
    }

    return true;
};

var eventSchema = function () {
    var Schema = mongoose.Schema;

    //TODO put all validations here
    var titleValidation = [validateTitle, 'Title length is out of range!'];

    let UserSchema = userSchema();
    let CommentSchema = commentSchema();
    let eventSchemaToReturn = new Schema({
        title: { type: String, required: true, validate: titleValidation },
        author: { type: String, required: true },
        // author: { type: String, index: {unique: true, dropDups: true}, required: true },
        body: { type: String, required: true },
        date: { type: Date, default: Date.now},
        comments: [CommentSchema],
        hidden: {type: Boolean },
        interestedIn: [{type: String}],
        participatingIn: [{type: String}],
        meta: {
            seen: Number
        }
    });

    eventSchemaToReturn.method({
        hideUnhide: function() {
            if (this.hidden) {
                this.hidden = false;
            }
            else {
                this.hidden = true;
            }
        }
    });

    return eventSchemaToReturn
};

var eventModel = function () {
    var eS = eventSchema();
    var eventModelToReturn = mongoose.model('Event', eS);

    return eventModelToReturn;
};

module.exports.EventModel = eventModel();