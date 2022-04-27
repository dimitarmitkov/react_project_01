const { Sequelize } = require('sequelize');
const cs = require("../connection/connectionData");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
const myKey = require("../connection/myKey");
const authMiddleware = {};
const session = require('express-session');
const { Cookie } = require('express-session');

const sequelize = new Sequelize(cs.database, cs.username, cs.password, {
    host: cs.host,
    dialect: cs.dialect
});

try {
    sequelize.authenticate()
        .then(res => console.log('Connection has been established successfully.',
            sequelize.getDatabaseName()))
        .catch(err => console.log(err));

} catch (error) {
    console.error('Unable to connect to the database:', error);
}
const users = sequelize.define('usersModel', {}, { tableName: "Users" });

module.exports = {

    isAdmin: function(req, res, next) {

        const token = req.cookies.access_token;

        if (!token) {
            return res.sendStatus(403);
        }

        try {
            const data = jwt.verify(token, `${myKey}`);
            // res.send(data);

            if (data.role === "admin") {
                return next();
            } else {
                res.sendStatus(403);
            }
        } catch {
            return res.sendStatus(403);
        }


    },

    auth: function(req, res, next) {

        const token = req.cookies.access_token;

        if (!token) {
            return res.sendStatus(403);
        }
        try {
            const data = jwt.verify(token, `${myKey}`);
            req.userId = data.id;
            req.type = data.type;
            return next();

        } catch {
            return res.sendStatus(403);
        }
    }
};