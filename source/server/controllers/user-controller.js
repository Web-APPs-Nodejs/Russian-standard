/* globals module require */

'use strict';

// const passport = require('passport');
// //---------------------------------------
// // AT test User.createAndSave start
// const mongoose = require("mongoose"),
//     config = require('../config');
// // require("../config/mongoose.js")(config.connectionString);
// require("../config/mongoose.js")(config.connectionStringForLocalTests);

// const dataForTest = require('../data');

// // var persssiUser = {};

// dataForTest.userCreateAndSave('Alex', 'Toplijski', 36, 'gender', 'persssi5', '123456', 'email@email.com', {src: 'source'})
//     .then((res) => {
//         console.log(res);
//         return res;
//     })
//     .then((persssiUser) => {
//         var nowDt = new Date();
//         // var res = dataForTest.eventCreateAndSave('First event title', persssiUser.get('userName'), 'this si th body text, this si th body text, this si th body text, this si th body text', nowDt)
//         var res = dataForTest.eventCreateAndSave('First event title', persssiUser.userName, 'this si th body text, this si th body text, this si th body text, this si th body text', nowDt)
//         res.then((ev)=>{
//             console.log(ev);
//         });
//         return res;
//     })
//     .then((persssiFirstEvent) => {
//         persssiFirstEvent.participatingIn.push(persssiFirstEvent.get('author'));
//         persssiFirstEvent.save(function (error, dbEvent) {
//             if(error){
//                 console.log(error);
//             }

//             console.log(dbEvent);
//         });
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// // AT test User.createAndSave end

// //---------------------------------------
// // AT test Event.createAndSave start
// // var nowDt = new Date();
// // dataForTest.eventCreateAndSave('First event title', persssiUser.username, 'this si th body text, this si th body text, this si th body text, this si th body text', nowDt)
// //     .then((res) => {
// //         console.log(res);
// //
// //     }).catch((err) => {
// //         console.log(err);
// //     });

// // AT test Event.createAndSave end
// //---------------------------------------

module.exports = (data) => {
    return {
        getLoginPage(req, res) {
            res.render('login-page', { isAuth: req.isAuthenticated() });
        },
        getMyProfile(req, res) {
            if (req.isAuthenticated()) {
                res.render('my-profile', { isAuth: req.isAuthenticated(), user: req.user });
                return;
            }

            res.render('login-page', { isAuth: req.isAuthenticated() });

        },
        getRegisterPage(req, res) {
            res.render('register-page');
        },
        getUpdateInfoPage(req, res) {
            res.render('update-user-info', { isAuth: req.isAuthenticated(), user: req.user });
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
                    res.status(400).send('Invalid data passed!');
                    res.redirect('/update-info', { isAuth: req.isAuthenticated(), user: req.user });
                });
        }
    };
};