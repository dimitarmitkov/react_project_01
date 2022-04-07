global.__basedir = __dirname;

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const utils = require('./utils');
const { server: { port, cors: corsConfig } } = require('./config');
const api = require('./api');
const tapLog = require('./utils/tap-log');
const globalErrorHandler = require('./global-error-handler');
const { allowedNodeEnvironmentFlags } = require('process');
const passport = require('passport');
const session = require('express-session');
const myKey = require("./api/connection/myKey");
const jwt = require("jsonwebtoken");
const jsonwebtoken = require('express-jwt');


const app = express();

app.use(cors({
    origin: corsConfig.urls,
    credentials: corsConfig.credentials,
    exposedHeaders: corsConfig.exposedHeaders
}));

// original code
// app.use('/static', express.static('public'));
app.use('/public', express.static('public'));

app.use(cookieParser());
app.use(bodyParser.json({ limit: '10000mb' }));

app.use(bodyParser.urlencoded({ limit: '10000mb', extended: true }));
app.use(express.static(path.resolve(__basedir, 'static')));

api.connect('/api/v1', app);

app.use('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'htmlStatic', 'index.html'));
});

app.use(globalErrorHandler);

function appListen() {
    return new Promise((resolve, reject) => {
        app.listen(port, function() { resolve(); })
    });
}

appListen().then(tapLog(`Server is listening on :${port}`))
    .catch(error => console.log(`Server Error: ${error.message}`));