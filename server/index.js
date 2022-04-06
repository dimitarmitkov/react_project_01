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

// app.use(cors());
app.use('/static', express.static('public'));

app.use(cookieParser());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ limit: '5000mb', extended: true }));
app.use(express.static(path.resolve(__basedir, 'static')));
// app.use(express.urlencoded({ extended: true }));
// app.use(
//     session({
//         secret: "this_is_a_secret",
//         resave: true,
//         saveUnitialized: true,
//         rolling: true, // forces resetting of max age
//         cookie: {
//             maxAge: 3000,
//             secure: false // this should be true only when you don't want to show it for security reason
//         }
//     })
// );

// app.use(express.urlencoded({ extended: true }));
// app.use(
//     session({
//         secret: "this_is_a_secret",
//         // store: pgSessionStorage,
//         resave: true,
//         saveUnitialized: true,
//         rolling: true, // forces resetting of max age
//         cookie: {
//             maxAge: 3000,
//             secure: false // this should be true only when you don't want to show it for security reason
//         }
//     })
// );
// app.use(passport.initialize());
// app.use(passport.session());

// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true }
// }))

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