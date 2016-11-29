/* globals require module __dirname */

'use strict';

const fs = require('fs'),
    path = require('path'),
    models = require('../models');

let dataExport = {};

fs.readdirSync('./server/data')
    .filter(x => x.includes('-data'))
    .forEach(data => {
        let dataModule = require(path.join(__dirname, data))(models);

        Object.keys(dataModule)
            .forEach(key => {
                dataExport[key] = dataModule[key];
            });
    });

module.exports = dataExport;