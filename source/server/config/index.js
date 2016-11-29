/* globals module */

// Connect from terminal --> 'mongo ds163667.mlab.com:63667/extreme-sports -u team-russian-standard -p maskarada' (without the quotes)
// connectionStringForLocalTests add for resting purpose in local environment
module.exports = {
    port: 3001,
    connectionString: 'mongodb://team-russian-standard:maskarada@ds163667.mlab.com:63667/extreme-sports',
    connectionStringForLocalTests: "mongodb://localhost/extreme-sports"
};