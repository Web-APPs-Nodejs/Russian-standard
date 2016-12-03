/* globals module require process */

'use strict';

const LocalStrategy = require('passport-facebook'),
    data = require('../../data'),
    facebookAuth = {
        clientID: '180985195698292',
        clientSecret: 'dcc09b0fc67b036b9e1b40909e45a5d6',
        callbackURL: 'http://localhost:3001/login/facebook/callback',
        profileFields: ['id', 'firstname', 'lastname', 'displayName', 'picture', 'email', 'gender']

    };

let strategy = new LocalStrategy({
    clientID: facebookAuth.clientID,
    clientSecret: facebookAuth.clientSecret,
    callbackURL: facebookAuth.callbackURL,
    profileFields: facebookAuth.profileFields
},
    (token, refreshToken, profile, done) => {
        process.nextTick(() => {
            data.findUserByFacebookId(profile.id)
                .then(user => {
                    if (user) {
                        return done(null, user);
                    }
                    else {
                        let username = profile.displayName,
                            facebookId = profile.id,
                            facebookToken = token,
                            email = profile.email,
                            firstName = profile.firstname,
                            lastName = profile.lastname,
                            gender = profile.gender,
                            profilePicture = {
                                src: profile.picture
                            };

                        data.createFacebookUser(username, facebookId, facebookToken, email, firstName, lastName, gender, profilePicture)
                            .then((res) => {
                                return done(null, res);
                            })
                            .catch(err => done(err, null, { message: 'A server exception occured! Please try again!' }));
                    }
                    
                })
                .catch(err => done(err, null, { message: 'A server exception occured! Please try again!' }));
        });
    });

module.exports = strategy;