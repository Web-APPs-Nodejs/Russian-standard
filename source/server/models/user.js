/**
 * Created by admin on 28.11.2016 г..
 */
/* globals require module*/
'use strict';

var Person = require('./person').Person;
var ProfilePicture = require('./profile-picture').ProfilePicture;

class User extends Person{
    constructor(firstName, lastName, age, gender, userName, passHash, email, profilePicture) {
        super(firstName, lastName, age, gender);

        // TODO validate here
        this._userName = userName;
        this._passHash = passHash;
        this._email = email;

        // TODO validate profile picture alt and src if property existing and string
        var hasSrcProperty = profilePicture.hasOwnProperty('src');
        var hasAltProperty = profilePicture.hasOwnProperty('alt');
        if(!hasSrcProperty){
            throw  new Error('Profile picture has no or invalid src property!')
        }
        if(!hasAltProperty){
            throw  new Error('Profile picture has no or invalid alt property!')
        }

        this._profilePicture = new ProfilePicture(profilePicture.alt, profilePicture.src);
    }

    get UserName() {
        return this._userName;
    }

    get PassHash() {
        return this._passHash;
    }

    get Email() {
        return this._email;
    }

    get ProfilePicture(){
        return this._profilePicture;
    }
}

module.exports.User = User;