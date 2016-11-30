/**
 * Created by admin on 30.11.2016 г..
 */
/**
 * Created by admin on 29.11.2016 г..
 */
/* globals module */
'use strict';

var profilePictureToMongooseProfilePicture = function (user) {
    var profilePictureDataInMongoFormat = {},
        errorMessage = 'Profile picture object did not have property with name ';

    // TODO make the validation work
    //
    // // ProfilePicture
    // var profilePictureSrcString = propName(user, user.ProfilePicture.src);
    // if(!profilePictureSrcString){
    //     throw  new Error(errorMessage + 'ProfilePicture.src');
    // }
    // var profilePictureAltString = propName(user, user.ProfilePicture.alt);
    // if(!profilePictureAltString){
    //     throw  new Error(errorMessage + 'ProfilePicture.alt');
    // }

    // Put property names in the returned object
    profilePictureDataInMongoFormat['scr'] = user.ProfilePicture.Src;
    profilePictureDataInMongoFormat['alt'] = user.ProfilePicture.Alt;

    return profilePictureDataInMongoFormat;
};

module.exports.profilePictureToMongooseProfilePicture = profilePictureToMongooseProfilePicture;

