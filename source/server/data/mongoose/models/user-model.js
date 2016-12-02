/**
 * Created by admin on 29.11.2016 г..
 */
/* globals require module String Number*/
'use strict';
const encryptor = require('../../../utils/encryptor'),
    mongoose = require('mongoose'),
    profilePictureSchema = require('./profile-picture-model').ProfilePictureSchema;


// TODO this is simple validation example, make it to real email validation with regex
// TODO extract function to other file
var validateEmail = function (emailString) {
    emailString = '' + emailString;
    var isValidEmail = emailString.includes('@');
    if (!isValidEmail) {
        return false;
    }

    return true;
};

var userSchema = function () {
    var Schema = mongoose.Schema;

    //TODO put all validations here
    var emailValidation = [validateEmail, 'Email {PATH} is not a valid email address.'];

    let ProfilePictureSchema = profilePictureSchema();
    let userSchemaToReturn = new Schema({
        firstName: { type: String, required: true },
        lastName: String,
        age: { type: Number, required: true },
        gender: String,
        userName: { type: String, unique: true, required: true },
        passHash: String,
        salt: String,
        email: { type: String, validate: emailValidation },
        profilePicture: ProfilePictureSchema
    });

    userSchemaToReturn.method({
        authenticate: function (password) {
            if (encryptor.generateHashedPassword(this.salt, password) === this.passHash) {
                return true;
            }
            else {
                return false;
            }
        }
    });

    return userSchemaToReturn;
};

var userModel = function () {
    var uS = userSchema();
    var userModelToReturn = mongoose.model('User', uS);

    return userModelToReturn;
};
module.exports.UserSchema = userSchema;
module.exports.UserModel = userModel();