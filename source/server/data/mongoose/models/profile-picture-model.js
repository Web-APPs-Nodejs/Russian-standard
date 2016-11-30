/**
 * Created by admin on 30.11.2016 г..
 */
/* globals require module String*/
"use strict";

const mongoose = require('mongoose');

var profilePictureSchema = function () {
    var Schema = mongoose.Schema;

    let profilePictureSchemaToReturn = new Schema({
        src: { type: String, required: true}
    });

    return profilePictureSchemaToReturn
};

var profilePictureModel = function () {
    var ppS = profilePictureSchema();
    var profilePictureModelToReturn = mongoose.model('ProfilePicture', ppS);

    return profilePictureModelToReturn;
};

module.exports.ProfilePictureSchema =  profilePictureSchema;
