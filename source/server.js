/* globals require */

const config = require('./server/config'),
    app = require('./server/config/express'),
    data = require('./server/data');

// attaching passport and routes
require('./server/config/passport')(app, data);
require('./server/routers')(app, data);

app.listen(config.port, () => console.log('Server now up and running...'));

// ATo mongoose schema tests start here
// const schemaParser = require('./server/data/schema-parsing');

// ATo mongoose schema tests end here