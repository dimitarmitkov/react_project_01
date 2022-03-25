const { Sequelize } = require('sequelize');
const cs = require("../connection/connectionData");
const jwt = require("jsonwebtoken");
const User = require("../../models/users");
const bcrypt = require("bcrypt");
const myKey = require("../connection/myKey");

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

let deletedAt = '';

const userTasksTable = sequelize.define('userTasksModel', { deletedAt }, { tableName: "UserTasks" });


module.exports = function serviceFactory(model) {

    function getAll(req, res, next, attributesArray) {

        model.findAll({
                attributes: attributesArray,
                where: {
                    deletedAt: null
                }
            })
            .then(result => {
                res.send(result);
            })
            .catch(err => res.send(err));
    }

    function getSingle(req, res, next, attributesArray, id) {

        let idData = req.params.id;

        model.findOne({
                where: { id: idData },
                attributes: attributesArray
            })
            .then(result => {
                res.send(result);
            })
            .catch(err => res.send(err));
    }

    function getAllPagination(req, res, next, attributesArray, os, lim) {

        let offsetData = os ? os : req.params.osData;
        let limitData = lim ? lim : req.params.limData;

        model.findAndCountAll({
                attributes: attributesArray,
                where: {
                    deletedAt: null
                },
                offset: offsetData,
                limit: limitData
            })
            .then(result => {
                res.send(result);
            })
            .catch(err => res.send(err));
    }

    function deleteSingle(req, res, next, attributesArray, deletedObject) {

        const idData = parseInt(req.params.id);
        const t = new Date(Date.now()).toISOString();

        let whereObj = deletedObject === 'user' ? { userId: idData } : { taskId: idData };

        model.update({ deletedAt: t }, {
                where: { id: idData },
            })
            .then(result => {

                userTasksTable.update({
                        deletedAt: t,
                    }, {
                        where: whereObj,
                        attributes: attributesArray
                    })
                    .then(result => {
                        res.send('delete done');
                    })
                    .catch(err => res.send(err));
            })
            .catch(err => res.send(err));
    }

    function editSingle(req, res, next, attributesArray, editObject) {

        const idData = parseInt(req.params.id);

        model.update({
                firstName: 'changed FN',
                lastName: 'DDDDDDDDDDDDD'
            }, {
                where: { id: idData },
            })
            .then(result => {

                res.send('username of user ' + idData + ' is changed');
            })
            .catch(err => res.send(err));
    }

    function userLogin(req, res, next, attributesArray, editObject) {
        // if axios query, if fetch - body
        // const { insertEmail, insertPassword } = req.query;
        const { insertEmail, insertPassword } = req.body;
        console.log(insertEmail);
        console.log(insertPassword);

        try {
            model.findOne({
                attributes: ['id', 'firstName', 'email', 'password', 'role', 'deletedAt'],
                where: { email: insertEmail }
            }).then(user => {
                if (user) {

                    let checkPass = user.dataValues.password;
                    const password_valid = bcrypt.compareSync(`${insertPassword}`, `${checkPass}`);

                    if (password_valid) {
                        let userId = user.dataValues.id;

                        let token = jwt.sign({
                                username: user.dataValues.firstName,
                                id: user.dataValues.id,
                                role: user.dataValues.role,
                                email: user.dataValues.email,
                                deletedAt: user.dataValues.deletedAt,
                            },
                            `${myKey}`, { expiresIn: '3000s' });

                        // console.log(token, ' this is token');

                        res.cookie("access_token", token, {
                                httpOnly: true,
                                secure: process.env.NODE_ENV === "production"
                            })
                            .status(200)
                            .json({ message: "Successfully logged", token: `${token}` });

                    } else {
                        res.status(400).json({ error: "Password Incorrect" });
                    }

                } else {
                    res.status(404).json({ error: "User does not exist" });
                }

            }).catch(err => console.log(err, ' thissss errrorrr'));
        } catch (err) {
            res.send("incorrect user or password.")
        }
    }

    function authorization(req, res, next, attributesArray, editObject) {
        // console.log(session);
        const token = req.cookies.access_token;
        console.log("token");

        // if (!token) {
        //     return res.sendStatus(403);
        // }
        // try {
        //     const data = jwt.verify(token, `${myKey}`);
        //     req.userId = data.id;
        //     req.type = data.type;
        //     res.send(data);
        //     // return next();
        // } catch {
        //     return res.sendStatus(403);
        // }
    }

    return { getAll, getSingle, getAllPagination, deleteSingle, editSingle, userLogin, authorization };
}