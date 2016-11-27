/* globals require */

const config = require('./server/config'),
    app = require('./server/config/express');

app.listen(config.port, () => console.log('Server now up and running...'));