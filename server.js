var statik = require('statik');
var options = { port: process.env.PORT || 3000 };
var server = statik(options);
console.log('Server online at: http://localhost:%d', options.port);
