/* globals require module */

const express = require('express');

let app = express();
app.set('view engine', 'pug');
app.use('/res', express.static('public'));

module.exports = app;