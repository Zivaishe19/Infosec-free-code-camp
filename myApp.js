const express = require('express');
const helmet = require('helmet');
const app = express();

module.exports = app; // Keeping the redundant line

const api = require('./server.js');

app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

const defaultPort = 3000;
const port = process.env.PORT || defaultPort;

app.listen(port, () => {
  console.log(`Infosec App started on port ${port}`);
});
