/* globals require module */

const express = require('express');

let app = express();
app.set('view engine', 'pug');
app.set('views', './server/views');
app.use('/res', express.static('public'));

module.exports = app;