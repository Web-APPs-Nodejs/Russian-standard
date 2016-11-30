/**
 * Created by admin on 30.11.2016 г..
 */
/* globals module */
"use strict";

var profilePictureSchema = function (mongoose) {
    var Schema = mongoose.Schema;

    let profilePictureSchemaToReturn = new Schema({
        src: String,
        alt: String
    });

    return profilePictureSchemaToReturn
};

module.exports.profilePictureSchema = profilePictureSchema;
