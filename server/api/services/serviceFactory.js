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
                },
                order: [
                    ['id', 'ASC']
                ]
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

    function getAllPagination(req, res, next, attributesArray) {


        const { limitData, offsetData } = req.body;



        model.findAndCountAll({
                attributes: attributesArray,
                where: {
                    deletedAt: null
                },
                order: [
                    ['id', 'ASC']
                ],
                offset: offsetData ? offsetData : 0,
                limit: limitData ? limitData : 5
            })
            .then(result => {
                res.send(result);
            })
            .catch(err => res.send(err));
    }

    function getAllPaginationRawQuery(req, res, next, attributesArray) {

        const { limitData, offsetData } = req.body;

        model.findAll({
                attributes: attributesArray,
                where: {
                    deletedAt: null
                }
            })
            .then(firsResult => {


                let usableOffsetData = offsetData === 0 ? 1 : offsetData;
                let usableLimitData = limitData === 0 ? firsResult.length : limitData;

                const { QueryTypes } = require('sequelize');
                sequelize.query(
                        `SELECT * FROM(SELECT ROW_NUMBER() OVER(PARTITION BY "taskProgress") AS r, t.* FROM "Tasks" t) T WHERE T.r >= :start and T.r <= :end;`, {
                            replacements: {
                                start: `${usableOffsetData}`,
                                end: `${usableLimitData}`
                            },
                            type: QueryTypes.SELECT
                        }
                    )
                    .then(result => {
                        res.send(result);
                    })
                    .catch(err => res.send(err));
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
                            `${ myKey }`, { expiresIn: '3000s' });
                        res.cookie("access_token", token, {
                                httpOnly: true,
                                secure: process.env.NODE_ENV === "production"
                            })
                            .status(200)
                            .json({ message: "Successfully logged", token: `$ { token }`, userLogged: `$ { user.dataValues.firstName }` });

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

    function currentLoggedUser(req, res, next, attributesArray, editObject) {

        const token = req.cookies.access_token;

        if (!token) {
            return res.sendStatus(403);
        }
        try {
            const data = jwt.verify(token, `${ myKey }`);
            req.userId = data.id;
            // return data;
            // res.send([data.id, data.username]);
            res.send({
                id: data.id,
                userName: data.username,
                deletedAt: data.deletedAt
            });
        } catch {
            return res.sendStatus(403);
        }
    }

    return { getAll, getSingle, getAllPagination, deleteSingle, editSingle, userLogin, currentLoggedUser, getAllPaginationRawQuery };
}