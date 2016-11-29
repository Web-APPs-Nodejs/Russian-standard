/* globals module */

'use strict';

var testUser = {
    username: 'test',
    password: 'test',
    _id: 1
};

module.exports = (models) => {
    return {
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