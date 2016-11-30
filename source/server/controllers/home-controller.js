/* globals module */

'use strict';

module.exports = function(data) {
    return {
        getHomePage(req, res) {
            res.render('main-frame');
        }
    };
};