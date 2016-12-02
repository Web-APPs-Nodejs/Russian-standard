/* globals module require */

'use strict';

const encryptor = require('../utils/encryptor');

module.exports = (models) => {
    var UserModel = models.UserModel;

    return {
        userCreateAndSave(firstName, lastName, age, gender, userName, password, email, profilePicture) {
            let salt = encryptor.generateSalt(),
                passHash = encryptor.generateHashedPassword(salt, password);

            let userObject = {
                firstName: firstName,
                lastName: lastName,
                age: age,
                gender: gender,
                userName: userName,
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