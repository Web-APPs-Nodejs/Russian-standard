/* globals module */

'use strict';

var testUser = {
    username: 'test',
    password: 'test',
    _id: 1,
    avatar: 'https://sap-certification.info/img/default-avatar.jpg'
};

module.exports = (models) => {
    var UserModel = models.UserModel;

    return {
        createAndSave(firstName, lastName, age, gender, userName, password, email, profilePicture){

            var userObject = {
                firstName: firstName,
                lastName: lastName,
                age: age,
                gender: gender,
                userName: userName,
                passHash: password,
                email: email,
                ProfilePicture: profilePicture
            };
            var user = new UserModel(userObject);

            var promise = new Promise(function (resolve, reject) {
                user.save(function (error, dbUser) {
                    if(error){
                        return reject(error);
                    }

                    return resolve(dbUser);
                })
            });

            return promise;
        },
        findUserByCredentials(username) {
            if (username === testUser.username) {
                return Promise.resolve(testUser);
            }

            return Promise.resolve(null);
        },
        findById(userId) {
            if (userId == testUser._id) {
                return Promise.resolve(testUser);
            }

            return Promise.resolve(null);
        }
    };
};