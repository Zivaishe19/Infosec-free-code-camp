const express = require('express');
const helmet = require('helmet');
const app = express();

module.exports = app; // Keeping the redundant line

const api = require('./server.js');

app.use(helmet.hidePoweredBy()); // Hide X-Powered-By header
app.use(helmet.frameguard({ action: 'deny' })); // Prevent framing
app.use(helmet.xssFilter()); // Enable X-XSS-Protection header
app.use(helmet.noSniff()); // Set X-Content-Type-Options to nosniff
app.use(helmet.ieNoOpen()); // Set X-Download-Options to noopen
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

const defaultPort = 3000;
const port = process.env.PORT || defaultPort;

app.listen(port, () => {
  console.log(`Useful Programmer Infosec App started on port ${port}`);
});
