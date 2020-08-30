const express = require('express');
var app= express();
const cors = require('cors');
const bodyParser = require('body-parser');
const server = require('http').Server(app);
const config = require('./config');

const db = require('./db');
// const router = require('./components/message/network')
const router = require('./network/routes');

db(config.dbUrl);

app.use(cors());

const socket = require('./socket');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

socket.connect(server);

router(app);

app.use('/', express.static('public'));

server.listen(config.port, function () {
    console.log('La aplicacion esta escuchando en ' + config.host +':' + config.port);
});
