/**
 * Created by admin on 29.11.2016 г..
 */
/* globals require module */
"use strict";

const User = require('../../../models').User,
    Person = require('../../../models').Person,
    profilePictureSchema = require('./profile-picture-schema').profilePictureSchema;

// var propsForMongooseUser = [
//     { name: 'FirstName', type: 'String' },
//     { name: 'LastName', type: 'String' },
//     { name: 'Age', type: 'Number' },
//     { name: 'Gender', type: 'String' },
//     { name: 'UserName', type: 'String' },
//     { name: 'PassHash', type: 'String' },
//     { name: 'Email', type: 'String' },
//     { name: 'ProfilePicture', type: 'profilePictureSchema' }
//
// ];

// function getDynamicAttachProperties(user) {
//     var res = {},
//         errorMessage = 'User can not create mongoose user schema, because did not have the property ';
//
//     for (var i in propsForMongooseUser) {
//         var currentProp = propsForMongooseUser[i];
//         if(!Person.prototype.hasOwnProperty(currentProp.name) && !User.prototype.hasOwnProperty((currentProp.name))){
//             throw new Error(errorMessage + currentProp.name);
//         }
//
//         res[currentProp.name] = currentProp.type;
//     }
//
//     return res;
// }

var userSchema = function (user, mongoose) {
    var Schema = mongoose.Schema;//,
        //propsToAttach = getDynamicAttachProperties(user);

    let ProfilePictureSchema = profilePictureSchema(mongoose);
    //console.log(ProfilePictureSchema);

    let userSchemaToReturn = new Schema({
        FirstName: String,
        LastName: String,
        Age: Number,
        Gender: String,
        UserName: String,
        PassHash: String,
        Email: String,
        ProfilePicture: ProfilePictureSchema
    });

    userSchemaToReturn.method({
        authenticate: function(password) {
            if (password === user.PassHash) {
                return true;
            }
            else {
                return false;
            }
        }
    });

    return userSchemaToReturn
};

module.exports.userSchema = userSchema;