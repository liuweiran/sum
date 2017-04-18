const express = require('express'),
      app = express();

const default_port = 9901;

app.use('/', express.static('./', { redirect:false }));

//app.use('*', require('./index'));

const index = process.argv.indexOf('--port'),
      port = index > -1 ? (process.argv[index + 1] || default_port) : default_port;

app.listen(port, function () {
    console.log('Server start at http://localhost:%s', port);
});