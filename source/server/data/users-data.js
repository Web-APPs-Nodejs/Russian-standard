/* globals module require */

'use strict';

const encryptor = require('../utils/encryptor');

module.exports = (models) => {
    var UserModel = models.UserModel;

    return {
        userCreateAndSave(firstName, lastName, age, gender, username, password, email, profilePicture) {
            let salt = encryptor.generateSalt(),
                passHash = encryptor.generateHashedPassword(salt, password);

            let userObject = {
                firstName: firstName,
                lastName: lastName,
                age: age,
                gender: gender,
                username: username,
                passHash: passHash,
                salt: salt,
                email: email,
                profilePicture: profilePicture
            };
            var user = new UserModel(userObject);

            var promise = new Promise(function(resolve, reject) {
                user.save(function(error, dbUser) {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(dbUser);
                });
            });

            return promise;
        },
        findUserByCredentials(username) {
            return new Promise((resolve, reject) => {
                UserModel.findOne({ username: username }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        findUserById(userId) {
            return new Promise((resolve, reject) => {
                UserModel.findOne({ _id: userId }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        findUserByFacebookId(facebookId) {
            return new Promise((resolve, reject) => {
                UserModel.findOne({ facebookId: facebookId }, (err, res) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(res);
                });
            });
        },
        createFacebookUser(username, facebookId, facebookToken, email, firstName, lastName, gender, profilePicture) {
            let userObject = {
                username,
                facebookId,
                facebookToken,
                email,
                firstName,
                lastName,
                gender,
                profilePicture               
            };

            let user = new UserModel(userObject);
            return new Promise((resolve, reject) => {
                user.save((err, res) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(res);
                });
            });
        },
        updateUserInfo(user, newData) {            
            return new Promise((resolve, reject) => {
                UserModel.update({ username: user.username }, newData, (err, res) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(res);
                });
            });
        }
    };
};