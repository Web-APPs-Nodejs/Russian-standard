/* globals require module */

'use strict';

const mongoose = require('mongoose');

let profilePictureSchema = function () {
    let Schema = mongoose.Schema;

    let profilePictureSchemaToReturn = new Schema({
        src: { type: String, required: true}
    });

    return profilePictureSchemaToReturn;
};

module.exports.ProfilePictureSchema =  profilePictureSchema;
