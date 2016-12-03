/* globals module require */

'use strict';

const encryptor = require('../utils/encryptor');

module.exports = (models) => {
    var UserModel = models.UserModel;

    return {
        userCreateAndSave(firstName, lastName, age, gender, username, password, email, profilePicture) {
            let salt = encryptor.generateSalt(),
                passHash = encryptor.generateHashedPassword(salt, password);

            let _profilePicture = {};
            if(!profilePicture) {
                _profilePicture = {
                    src: '/res/images/default-user.png'
                }
            } else {
                _profilePicture.src = profilePicture.src;
            }

            let userObject = {
                firstName: firstName,
                lastName: lastName,
                age: age,
                gender: gender,
                username: username,
                passHash: passHash,
                salt: salt,
                email: email,
                profilePicture: _profilePicture
            };
            console.log(userObject);
            var user = new UserModel(userObject);

            return new Promise(function(resolve, reject) {
                user.save(function(error, dbUser) {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(dbUser);
                });
            });
        },

        findUserByCredentials(username) {
            return new Promise((resolve, reject) => {
                UserModel
                    .findOne()
                    .where('username').equals(username)
                    .exec(function (error, user) {
                        if(error){
                            return reject(error);
                        }

                        return resolve(user);
                    });
            });
        },

        findUserById(userId) {
            return new Promise((resolve, reject) => {
                UserModel
                    .findOne()
                    .where('_id').equals(userId)
                    .exec(function (error, user) {
                        if(error){
                            return reject(error);
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