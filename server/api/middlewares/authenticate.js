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
// TODO
// module.exports = jwt.sign(
//     {
//         username: user.dataValues.name,
//         id: user.dataValues.id,
//         type: user.dataValues.type,
//         email: user.dataValues.email,
//         deleted: user.dataValues.deleted,
//         car: car[0].dataValues.id,
//     },
//     `${myKey}`,
//     {expiresIn: '3000s'});

module.exports = {

    // token: function(req, res, next) {

    //     // console.log('VALUES: ', req.params);

    //     let idData = req.params.id;

    //     users.findOne({
    //             where: { id: idData },
    //             attributes: ['id', 'firstName', 'email', 'role', 'picture', 'deletedAt']
    //         })
    //         .then(result => {

    //             jwt.sign({
    //                     username: result.dataValues.firstName,
    //                     id: result.dataValues.id,
    //                     role: result.dataValues.role,
    //                     email: result.dataValues.email,
    //                     deleted: result.dataValues.deletedAt,
    //                     picture: result.dataValues.picture,
    //                 },
    //                 `${myKey}`, { expiresIn: '300s' });




    //             const token = req.cookies.access_token;

    //             console.log(token);

    //             jwt.verify(token, `${myKey}`, (err, decoded) => {
    //                 if (err) {
    //                     return res.status(401).send({
    //                         message: "Unauthorized!"
    //                     });
    //                 }
    //                 // req.userId = decoded.id;
    //                 console.log('decoded and verified');
    //                 next();
    //             });

    //         })
    //         .catch(err => res.send(err));


    // },

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
        // console.log(session);
        const token = req.cookies.access_token;
        // console.log(token);

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