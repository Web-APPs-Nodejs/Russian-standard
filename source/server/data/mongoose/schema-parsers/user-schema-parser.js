/**
 * Created by admin on 29.11.2016 г..
 */
/* globals require module */
'use strict';

var profilePictureInMongoFormat = require('./profile-pictire-parser').profilePictureToMongooseProfilePicture;

// var res = '';
// function propName(prop, value) {
//     for (var i in prop) {
//         if (typeof prop[i] == 'object') {
//             if (propName(prop[i], value)) {
//                 return res;
//             }
//         } else {
//             if (prop[i] == value) {
//                 res = i;
//                 return res;
//             }
//         }
//     }
//     return undefined;
// }

var userToMongooseUser = function (user) {
    var userDataInMongoFormat = {},
        profilePicture = profilePictureInMongoFormat(user),
        errorMessage = 'User did not have property with name ';

    // TODO make the validation work
    // Person properties
    // var firstNameString = propName(user, user.FirstName);
    // if(!firstNameString){
    //     throw  new Error(errorMessage + 'FirstName');
    // }
    // var lastNameString = propName(user.prototype, user.LastName);
    // if(!lastNameString){
    //     throw  new Error(errorMessage + 'LastName');
    // }
    // var ageString = propName(user, user.Age);
    // if(!ageString){
    //     throw  new Error(errorMessage + 'Age');
    // }
    // var genderString = propName(user, user.Gender);
    // if(!genderString){
    //     throw  new Error(errorMessage + 'Gender');
    // }
    //
    // // User properties
    // var userNameString = propName(user, user.UserName);
    // if(!userNameString){
    //     throw  new Error(errorMessage + 'UserName');
    // }
    // var passHashString = propName(user, user.PassHash);
    // if(!passHashString){
    //     throw  new Error(errorMessage + 'PassHash');
    // }
    // var emailString = propName(user, user.Email);
    // if(!emailString){
    //     throw  new Error(errorMessage + 'Email');
    // }
    // var emailString = propName(user, user.Email);
    // if(!emailString){
    //     throw  new Error(errorMessage + 'Email');
    // }

    // Put property names in the returned object
    userDataInMongoFormat['FirstName'] = user.FirstName;
    userDataInMongoFormat['LastName'] = user.LastName;
    userDataInMongoFormat['Age'] = user.Age;
    userDataInMongoFormat['Gender'] = user.Gender;

    userDataInMongoFormat['UserName'] = user.UserName;
    userDataInMongoFormat['PassHash'] = user.PassHash;
    userDataInMongoFormat['Email'] = user.Email;

    userDataInMongoFormat['ProfilePicture'] = profilePicture;

    return userDataInMongoFormat;
};

module.exports.userToMongooseUser = userToMongooseUser;

