/* globals module require */

'use strict';

const passport = require('passport');
// //---------------------------------------
// // AT test User.createAndSave start
// const mongoose = require("mongoose"),
//     config = require('../config');
// // require("../config/mongoose.js")(config.connectionString);
// require("../config/mongoose.js")(config.connectionStringForLocalTests);

// const dataForTest = require('../data');

// dataForTest.userCreateAndSave('Alex', 'Toplijski', 36, 'gender', 'persssi6', '123456', 'email@email.com', {src: 'source'})
//     .then((res) => {
//         // Create and Save user
//         console.log('------------- User -------------');
//         console.log(res);
//         return res;
//     })
//     .then((persssiUser) => {
//         // Create and Save event
//         var nowDt = new Date();
//         var res = dataForTest.eventCreateAndSave('First event title', persssiUser.userName, 'this si th body text, this si th body text, this si th body text, this si th body text', nowDt);

//         return res;
//     })
//     .then((dbEvent) => {
//         console.log('------------- Event -------------');
//         console.log(dbEvent);

//         // Add participant to event
//         dbEvent.participatingIn.push(dbEvent.get('author'));

//         return new Promise((resolve, reject) => {
//             dbEvent.save(function (error, res) {
//                 if (error) {
//                     return reject(error);
//                 }

//                 return resolve(dbEvent);
//             });
//         });
//     })
//     .then((dbEvent) => {
//         // Create and add new comment to event
//         var nowDt = new Date();

//         var firstComment = dataForTest.commentCreate(dbEvent.author, 'comment comment.... by me', nowDt, false);

//         dbEvent.comments.push(firstComment);
//         dbEvent.save(function (error, res) {
//             if(error){
//                 console.log(error);
//             }
//             console.log('------------- Event + one comment -------------');
//             console.log(res);
//             //return res;
//         });
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// // AT test User.createAndSave end


module.exports = (data) => {
    return {
        getLoginPage(req, res) {
            res.render('users/login-page', { user: req.user });
        },
        getMyProfile(req, res) {
            if (req.isAuthenticated()) {
                res.render('users/my-profile', { user: req.user });
                return;
            }

            res.render('users/login-page', { user: req.user });

        },
        getRegisterPage(req, res) {
            res.render('users/register-page');
        },
        getFacebookCallbackPage(req, res) {
            res.render('users/my-profile', { user: req.user });
        },
        getUpdateInfoPage(req, res) {
            res.render('users/update-user-info', { user: req.user });
        },
        updateUserInfo(req, res) {
            let newData = {};

            Object.keys(req.body)
                .forEach(key => {
                    if (req.body[key] && req.body[key].trim() !== '') {
                        newData[key] = req.body[key];
                    }
                });

            data.updateUserInfo(req.user, newData)
                .then(() => {
                    res.redirect('/profile');
                })
                .catch((err) => {
                    res.status(400).send(err);
                    res.redirect('/update-info');
                });
        }
    };
};