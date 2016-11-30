/**
 * Created by admin on 29.11.2016 г..
 */
/* globals require module */
'use strict';

const userToMongooseUser = require('./user-schema-parser').userToMongooseUser,
    profilePictureToMongooseProfilePicture = require('./profile-pictire-parser').profilePictureToMongooseProfilePicture;

module.exports = { userToMongooseUser, profilePictureToMongooseProfilePicture };