/* globals module */

'use strict';

module.exports = (models) => {
    var UserModel = models.UserModel;

    return {
        userCreateAndSave(firstName, lastName, age, gender, userName, password, email, profilePicture){
            var userObject = {
                firstName: firstName,
                lastName: lastName,
                age: age,
                gender: gender,
                username: userName,
                passHash: password,
                email: email,
                profilePicture: profilePicture
            };
            var user = new UserModel(userObject);

            var promise = new Promise(function (resolve, reject) {
                user.save(function (error, dbUser) {
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
        findById(userId) {
            return new Promise((resolve, reject) => {
                UserModel.findOne({ _id: userId }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        }
    };
};