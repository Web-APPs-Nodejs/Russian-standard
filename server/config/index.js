/* globals module process */

// Connect from terminal --> 'mongo ds163667.mlab.com:63667/extreme-sports -u team-russian-standard -p maskarada' (without the quotes)

let connectionString = {
    production: 'mongodb://team-russian-standard:maskarada@ds163667.mlab.com:63667/extreme-sports',
    development: 'mongodb://localhost/extreme-sports'
};

module.exports = {
    port: process.env.PORT || 3001,
    connectionString: connectionString['production']
};