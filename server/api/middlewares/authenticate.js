const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const myKey = require("../connection/myKey");
const authMiddleware = {};

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

    auth: function(req, res, next){
        console.log('ok');
        next();
    }
};
