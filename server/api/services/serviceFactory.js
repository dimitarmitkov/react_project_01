global.__basedir = __dirname;

const path = require('path');
const { Sequelize } = require('sequelize');
const cs = require("../connection/connectionData");
const jwt = require("jsonwebtoken");
const User = require("../../models/users");
const bcrypt = require("bcrypt");
const myKey = require("../connection/myKey");
const { password } = require('../connection/connectionData');
const multer = require('multer');
const fs = require('fs');
const getFileName = require("../functions/getFileName.js");

const upload = multer({ dest: path.resolve(__dirname, 'public/images') });


const sequelize = new Sequelize(cs.database, cs.username, cs.password, {
    host: cs.host,
    dialect: cs.dialect
});

try {
    sequelize.authenticate()
        .then(result => console.log('Connection has been established successfully.',
            sequelize.getDatabaseName()))
        .catch(err => console.log(err));

} catch (error) {
    console.log(error);;
}



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

        let idData = req.body.id;

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

        const { QueryTypes } = require('sequelize');
        sequelize.query(
                `SELECT MAX(r) FROM(SELECT ROW_NUMBER() OVER(PARTITION BY "taskProgress") AS r, t.* FROM "Tasks" t WHERE "deletedAt" IS null ORDER BY "id") T WHERE T.r >= :start and T.r <= :end;`, {
                    replacements: {
                        start: "1",
                        end: "100"
                    },
                    type: QueryTypes.SELECT
                }
            )
            .then(firsResult => {

                let usableOffsetData = offsetData === 0 ? 1 : offsetData;
                let usableLimitData = limitData === 0 ? firsResult.length : limitData;

                const { QueryTypes } = require('sequelize');
                sequelize.query(
                        `SELECT * FROM(SELECT ROW_NUMBER() OVER(PARTITION BY "taskProgress") AS r, t.* FROM "Tasks" t WHERE "deletedAt" IS null ORDER BY "id") T WHERE T.r >= :start and T.r <= :end;`, {
                            replacements: {
                                start: `${usableOffsetData}`,
                                end: `${usableLimitData}`
                            },
                            type: QueryTypes.SELECT
                        }
                    )
                    .then(result => {
                        res.send({
                            responseData: result,
                            count: firsResult
                        });
                    })
                    .catch(err => res.send(err));
            })
            .catch(err => res.send(err));
    }

    function getAllPaginationRawQueryMop(req, res, next, attributesArray) {

        const { limitData, offsetData, whereSelector } = req.body;

        const { QueryTypes } = require('sequelize');
        sequelize.query(
                `SELECT MAX(r) FROM(SELECT ROW_NUMBER() OVER(PARTITION BY "taskProgress") AS r, t.* 
                FROM "Tasks" t 
                WHERE "deletedAt" IS null and t."taskType"=:whereSelector ORDER BY "id") T 
                WHERE T.r >= :start and T.r <= :end;`, {
                    replacements: {
                        start: "1",
                        end: "100",
                        whereSelector: `${whereSelector}`
                    },
                    type: QueryTypes.SELECT
                }
            )
            .then(firsResult => {

                let usableOffsetData = offsetData === 0 ? 1 : offsetData;
                let usableLimitData = limitData === 0 ? firsResult.length : limitData;

                const { QueryTypes } = require('sequelize');
                sequelize.query(
                        `SELECT * FROM
                        (SELECT ROW_NUMBER() OVER(PARTITION BY "taskProgress") AS r, t.* 
                        FROM "Tasks" t 
                        WHERE "deletedAt" IS null and t."taskType"=:whereSelector ORDER BY "id") T 
                        WHERE T.r >= :start and T.r <= :end;`, {
                            replacements: {
                                start: `${usableOffsetData}`,
                                end: `${usableLimitData}`,
                                whereSelector: `${whereSelector}`
                            },
                            type: QueryTypes.SELECT
                        }
                    )
                    .then(result => {
                        res.send({
                            responseData: result,
                            count: firsResult
                        });
                    })
                    .catch(err => res.send(err));
            })
            .catch(err => res.send(err));
    }

    function createSingleUser(req, res, next, attributesArray, deletedObject) {

        const {
            firstName,
            lastName,
            insertPassword,
            email,
            role,
            picture
        } = req.body;

        const password = bcrypt.hashSync(`${insertPassword}`, 10);
        const isValidPass = bcrypt.compareSync(`${insertPassword}`, `${password}`);

        if (isValidPass) {
            model.create({
                firstName,
                lastName,
                password,
                email,
                role,
                picture
            }).then(customer => {
                res.status(201).send('user created');
            }).catch(next => {
                res.status(400).send('already exists')
            });
        } else {
            res.status(400).send('wrong password')
        }
    }

    function deleteSingle(req, res, next, attributesArray, deletedObject) {

        let deletedAt = '';
        let taskId = '';
        let userId = '';

        const userTasksTable = sequelize.define('userTasksModel', { taskId, userId, deletedAt }, { tableName: "UserTasks" });

        const { idData } = req.body;
        const t = new Date(Date.now()).toISOString();

        let whereObj = deletedObject === 'user' ? { userId: idData } : { taskId: idData };

        model.update({ deletedAt: t }, {
                where: { id: idData },
            })
            .then(resultFirstLevel => {

                userTasksTable.findOne({
                        where: whereObj
                    })
                    .then(isExisting => {

                        if (isExisting) {
                            userTasksTable.update({
                                    deletedAt: t,
                                }, {
                                    where: whereObj,
                                    attributes: attributesArray
                                })
                                .then(result => {
                                    res.send('delete done').status(200);
                                })
                                .catch(err => res.send(err));
                        } else {
                            res.send('delete done 2').status(200);
                        }
                    })
                    .catch(err => res.send('error', err));
            })
            .catch(err => res.send(err));
    }

    function editSingle(req, res, next, attributesArray, editObject) {

        const idData = parseInt(req.body.id);
        let replacePassword = '';
        let isValidPass;
        let queryText = '';
        let replacementsData = {};
        const updateDate = new Date(Date.now()).toISOString();

        const {
            firstName,
            lastName,
            insertPassword,
            email,
            role,
            picture
        } = req.body;


        if (insertPassword) {
            replacePassword = bcrypt.hashSync(`${insertPassword}`, 10);
            isValidPass = bcrypt.compareSync(`${insertPassword}`, `${replacePassword}`);
            queryText = `UPDATE "Users"
            SET "firstName" = :firstName,
                "lastName" = :lastName,
                "password" = :password,
                "email" = :email,
                "role" = :role,
                "picture" = :picture,
                "updatedAt" = :date
            WHERE "id" = :id;`;

            replacementsData = {
                firstName: `${firstName}`,
                lastName: `${lastName}`,
                password: `${replacePassword}`,
                email: `${email}`,
                role: `${role}`,
                picture: `${picture}`,
                id: `${idData}`,
                date: `${updateDate}`
            }
        } else {
            queryText = `UPDATE "Users"
            SET "firstName" = :firstName,
            "lastName" = :lastName,
            "email" = :email,
            "role" = :role,
            "picture" = :picture,
            "updatedAt" = :date
        WHERE "id" = :id;`;

            replacementsData = {
                firstName: `${firstName}`,
                lastName: `${lastName}`,
                email: `${email}`,
                role: `${role}`,
                picture: `${picture}`,
                id: `${idData}`,
                date: `${updateDate}`
            }

        }

        const { QueryTypes } = require('sequelize');
        sequelize.query(queryText, {
                replacements: replacementsData,
                type: QueryTypes.SELECT
            })
            .then(res => {
                res.send('username of user ' + idData + ' is changed');
            })
            .catch(err => res.send(err));
    }

    function getUserTasks(req, res, next, attributesArray, editObject) {

        const { limitData, offsetData, userId } = req.body;

        const { QueryTypes } = require('sequelize');
        sequelize.query(
                `SELECT
                        MAX(r)
                      FROM (
                        SELECT
                          ROW_NUMBER() OVER (PARTITION BY "taskProgress") AS r,
                          t.*, ut.*, u.*
                        FROM
                          "Tasks" t 
                          left join "UserTasks" ut
                          on t.id = ut."taskId"
                          left join "Users" u
                          on u.id = ut."userId"
                          WHERE t."deletedAt" is null and ut."deletedAt" is null and u.id = :userId) T
                      WHERE
                      T.r >= :start and T.r <= :end;`, {
                    replacements: {
                        start: "1",
                        end: "100",
                        userId: `${userId}`
                    },
                    type: QueryTypes.SELECT
                }
            )
            .then(firsResult => {


                let usableOffsetData = offsetData === 0 ? 1 : offsetData;
                let usableLimitData = limitData === 0 ? firsResult.length : limitData;

                const { QueryTypes } = require('sequelize');
                sequelize.query(
                        `SELECT
                        *
                      FROM (
                        SELECT
                          ROW_NUMBER() OVER (PARTITION BY "taskProgress") AS r,
                          t.*, ut.*, u.*
                        FROM
                          "Tasks" t 
                          left join "UserTasks" ut
                          on t.id = ut."taskId"
                          left join "Users" u
                          on u.id = ut."userId"
                          WHERE t."deletedAt" is null and ut."deletedAt" is null and u.id = :userId) T
                      WHERE
                      T.r >= :start and T.r <= :end;`, {
                            replacements: {
                                start: `${usableOffsetData}`,
                                end: `${usableLimitData}`,
                                userId: `${userId}`
                            },
                            type: QueryTypes.SELECT
                        }
                    )
                    .then(result => {
                        res.send({
                            responseData: result,
                            count: firsResult
                        });
                    })
                    .catch(err => res.send(err));
            })
            .catch(err => res.send(err));
    }

    function getUserTasksMeetingOrProject(req, res, next, attributesArray, editObject) {

        const { limitData, offsetData, userId, whereSelector } = req.body;

        const { QueryTypes } = require('sequelize');
        sequelize.query(
                `SELECT
                MAX(r)
              FROM (
                SELECT
                  ROW_NUMBER() OVER (PARTITION BY "taskProgress") AS r,
                  t.*, ut.*, u.*
                FROM
                  "Tasks" t 
                  left join "UserTasks" ut
                  on t.id = ut."taskId"
                  left join "Users" u
                  on u.id = ut."userId"
                  WHERE t."deletedAt" is null and ut."deletedAt" is null and u.id = :userId and t."taskType"=:whereSelector) T
              WHERE
              T.r >= :start and T.r <= :end;`, {
                    replacements: {
                        start: "1",
                        end: "100",
                        userId: `${userId}`,
                        whereSelector: `${whereSelector}`
                    },
                    type: QueryTypes.SELECT
                }
            )
            .then(firsResult => {

                let usableOffsetData = offsetData === 0 ? 1 : offsetData;
                let usableLimitData = limitData === 0 ? firsResult.length : limitData;

                const { QueryTypes } = require('sequelize');
                sequelize.query(
                        `SELECT
                        *
                      FROM (
                        SELECT
                          ROW_NUMBER() OVER (PARTITION BY "taskProgress") AS r,
                          t.*, ut.*, u.*
                        FROM
                          "Tasks" t 
                          left join "UserTasks" ut
                          on t.id = ut."taskId"
                          left join "Users" u
                          on u.id = ut."userId"
                          WHERE t."deletedAt" is null and ut."deletedAt" is null and u.id = :userId and t."taskType"=:whereSelector) T
                      WHERE
                      T.r >= :start and T.r <= :end;`, {
                            replacements: {
                                start: `${usableOffsetData}`,
                                end: `${usableLimitData}`,
                                userId: `${userId}`,
                                whereSelector: `${whereSelector}`
                            },
                            type: QueryTypes.SELECT
                        }
                    )
                    .then(result => {
                        res.send({
                            responseData: result,
                            count: firsResult
                        });
                    })
                    .catch(err => res.send(err));
            })
            .catch(err => res.send(err));
    }

    function userLogin(req, res, next, attributesArray, editObject) {

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
                            `${myKey}`, { expiresIn: '3000s' });
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
            }).catch(err => res.send('error', err));
        } catch (err) {
            res.send("incorrect user or password.")
        }
    }

    function userLogout(req, res, next, attributesArray, editObject) {

        return res
            .clearCookie("access_token")
            .status(200)
            .json({ message: "Successfully logged out" });
    }


    function currentLoggedUser(req, res, next, attributesArray, editObject) {

        const token = req.cookies.access_token;

        if (!token) {
            return res.sendStatus(403);
        }
        try {
            const data = jwt.verify(token, `${myKey}`);
            req.userId = data.id;
            res.send({
                id: data.id,
                userName: data.username,
                deletedAt: data.deletedAt,
                role: data.role
            });
        } catch {
            return res.sendStatus(403);
        }
    }

    function createSingleTask(req, res, next, attributesArray, editObject) {

        const initiatedAt = new Date(Date.now()).toISOString();

        const {
            taskType,
            taskName,
            taskProgress,
            initiatedByUserId
        } = req.body;

        model.create({
            taskType,
            taskName,
            taskProgress,
            initiatedAt,
            initiatedByUserId
        }).then(task => {
            res.status(201).send('task created');
        }).catch(next => {
            res.status(400).send('not allowed')
        });

    }

    function editTask(req, res, next, attributesArray, editObject) {

        const { changeData, idData, taskProgress } = req.body;

        const { QueryTypes } = require('sequelize');
        sequelize.query(
                `UPDATE "Tasks"
                SET "${Object.keys(changeData)[0]}" = :datedAt,
                "${Object.keys(changeData)[1]}" = :byUserId,
                "taskProgress" = :taskProgress
                WHERE "id" = :id;`, {
                    replacements: {
                        datedAt: `${changeData[Object.keys(changeData)[0]]}`,
                        byUserId: `${changeData[Object.keys(changeData)[1]]}`,
                        taskProgress: `${taskProgress}`,
                        id: `${idData}`
                    },
                    type: QueryTypes.SELECT
                }
            )
            .then(result => {
                res.send(result);
            })
            .catch(err => res.send(err));
    }

    function getAllUsersByTask(req, res, next, attributesArray) {

        const { idData } = req.body;

        const { QueryTypes } = require('sequelize');
        sequelize.query(
                `SELECT
                t.*, u.*
                FROM
                "UserTasks" t 
                left join "Users" u
                on u.id = t."userId"
                WHERE t."deletedAt" is null and u."deletedAt" is null and "taskId" = :taskId;`, {
                    replacements: {
                        taskId: `${idData}`
                    },
                    type: QueryTypes.SELECT
                }
            )
            .then(result => {
                res.send(result);
            })
            .catch(err => res.send(err));
    }


    function pictures(req, res, next, attributesArray) {

        const { userId } = req.body;

        const fileName = 'http://localhost:62000/public/images/' + getFileName(req);
        const updateDate = new Date(Date.now()).toISOString();
        queryText = `UPDATE "Users"
                    SET "picture" = :picture,
                    "updatedAt" = :date
                    WHERE "id" = :userId;`;

        replacementsData = {
            userId: `${userId}`,
            picture: `${fileName}`,
            date: `${updateDate}`
        }

        const { QueryTypes } = require('sequelize');
        sequelize.query(queryText, {
            replacements: replacementsData,
            type: QueryTypes.UPDATE
        }).then(task => {
            res.status(201).send('picture updated');
        }).catch(next => {
            res.status(400).send('not allowed')
        });


    }

    // function picturesGet(req, res, next, attributesArray) {

    //     const { userId } = req.body;

    //     model.findOne({
    //         where: { userId: userId },
    //         attributes: attributesArray
    //     }).then(result => {
    //         res.send(result);
    //     }).catch(err => res.send('error', err));

    // }

    function matchUserTasks(req, res, next, attributesArray) {

        const { userIdArray, taskId } = req.body;

        model.bulkCreate(userIdArray)
            .then(result => {
                res.send(result);
            })
            .catch(err => res.send('error', err));
    }


    return {
        getAll,
        getSingle,
        getAllPagination,
        createSingleUser,
        deleteSingle,
        editSingle,
        userLogin,
        userLogout,
        currentLoggedUser,
        getAllPaginationRawQuery,
        getUserTasks,
        getUserTasksMeetingOrProject,
        getAllPaginationRawQueryMop,
        createSingleTask,
        editTask,
        getAllUsersByTask,
        pictures,
        matchUserTasks
    };
}