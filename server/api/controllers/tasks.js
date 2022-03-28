const { Sequelize } = require('sequelize');
const cs = require("../connection/connectionData");
const serviceFactory = require("../services/serviceFactory");
const { QueryTypes } = require('sequelize');
const bcrypt = require("bcrypt");
// const usersModel = require("../../models/users");
// const tasksModel = require("../../models/tasks");
// const userTasksModel = require("../../models/usertasks  ");


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
let firstName = '';
let lastName = '';

const usersTable = serviceFactory(sequelize.define('usersModel', { firstName, lastName, deletedAt }, { tableName: "Users" }));

const tasksTable = serviceFactory(sequelize.define('tasksModel', { deletedAt }, { tableName: "Tasks" }));

const userTasksTable = serviceFactory(sequelize.define('userTasksModel', { deletedAt }, { tableName: "UserTasks" }));



module.exports.getAllUsers = function(req, res, next) {

    usersTable.getAll(req, res, next, ['id', 'firstName', 'email', 'role', 'picture', 'deletedAt']);
}

module.exports.getAllTasks = function(req, res, next) {

    tasksTable.getAll(req, res, next, ['id', 'taskType', 'taskName', 'taskProgress', 'deletedAt']);
}

module.exports.getOneUser = function(req, res, next) {

    usersTable.getSingle(req, res, next, ['id', 'firstName', 'email', 'role', 'deletedAt']);
}

module.exports.getOneTask = function(req, res, next) {

    tasksTable.getSingle(req, res, next, ['id', 'taskType', 'taskName', 'deletedAt']);
}

module.exports.getAllUsersPaginate = function(req, res, next) {

    usersTable.getAllPagination(req, res, next, ['id', 'firstName', 'email', 'role', 'deletedAt'], "user");
}

module.exports.getAllUsersPagesLimit = function(req, res, next) {

    usersTable.getAllPagination(req, res, next, ['id', 'firstName', 'email', 'role', 'deletedAt'], "user");
}

module.exports.getAllTasksPaginate = function(req, res, next) {

    tasksTable.getAllPagination(req, res, next, ['id', 'taskType', 'taskName', 'taskProgress', 'deletedAt'], 'task');
}

module.exports.getAllPaginationRawQuery = function(req, res, next) {

    tasksTable.getAllPaginationRawQuery(req, res, next, ['id', 'taskType', 'taskName', 'taskProgress', 'deletedAt'], 'task');
}

module.exports.deleteOneUser = function(req, res, next) {

    usersTable.deleteSingle(req, res, next, ['id', 'firstName', 'email', 'role', 'deletedAt'], 'user');
}

module.exports.deleteOneTask = function(req, res, next) {

    tasksTable.deleteSingle(req, res, next, ['id', 'taskType', 'taskName', 'deletedAt'], 'task');
}

module.exports.editOneUser = function(req, res, next) {

    usersTable.editSingle(req, res, next, ['id', 'firstName', 'email', 'role', 'deletedAt'], 'user');
}

module.exports.userLogin = function(req, res, next) {

    usersTable.userLogin(req, res, next, ['id', 'firstName', 'email', 'role', 'deletedAt'], 'user');
}

module.exports.authorization = function(req, res, next) {

    usersTable.authorization(req, res, next, ['id', 'firstName', 'email', 'role', 'deletedAt'], 'user');
}

module.exports.currentLoggedUser = function(req, res, next) {

    usersTable.currentLoggedUser(req, res, next, ['id', 'firstName', 'email', 'role', 'deletedAt'], 'user');
}

module.exports.createSingleUser = function(req, res, next) {

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

    const usersCreatable = sequelize.define('usersModel', { firstName, lastName, password, email, role, picture }, { tableName: "Users" });

    usersCreatable.create({
        firstName,
        lastName,
        password,
        email,
        role,
        picture
    }).then(customer => {
        // console.log(customer.dataValues);
        res.status(201).send('user created');

    }).catch(next => {
        res.status(400).send('already exists')
    });
}


module.exports.createSingleTask = function(req, res, next) {

    var minutesToAdd = 1;
    var currentDate = new Date();
    var futureDate = new Date(currentDate.getTime() + minutesToAdd * 60000).toISOString();


    // let t = new Date(Date.now()).toISOString();

    // const {
    //         firstName,
    //         lastName,
    //         insertPassword,
    //         email,
    //         role,
    //         picture
    //     } = req.body;

    const {
        taskType,
        taskName,
        taskProgress,
        initiatedAt,
        initiatedByUserId,
        selectedAt,
        selectedByUserId,
        progressAt,
        progressByUserId,
        reviewAt,
        reviewByUserId,
        doneAt,
        doneByUserId
    } = {
        taskType: 'project',
        taskName: 'review task name 5',
        taskProgress: 'review',
        // initiatedAt,
        // initiatedByUserId,
        // selectedAt,
        // selectedByUserId,
        // progressAt,
        // progressByUserId,
        // reviewAt,
        // reviewByUserId,
        // doneAt,
        // doneByUserId
    }


    // const password = bcrypt.hashSync(`${insertPassword}`, 10);

    // const isValidPass = bcrypt.compareSync(`${insertPassword}`, `${password}`);

    const taskCreatable = sequelize.define('tasksModel',
        // { taskType, taskName, taskProgress, initiatedAt, initiatedByUserId, selectedAt, selectedByUserId, progressAt, progressByUserId, reviewAt, reviewByUserId, doneAt, doneByUserId },
        { taskType, taskName, taskProgress }, { tableName: "Tasks" });

    taskCreatable.create({
        taskType,
        taskName,
        taskProgress,
        // initiatedAt,
        // initiatedByUserId,
        // selectedAt,
        // selectedByUserId,
        // progressAt,
        // progressByUserId,
        // reviewAt,
        // reviewByUserId,
        // doneAt,
        // doneByUserId
    }).then(task => {
        console.log(task.dataValues);
    }).catch(next => {
        res.status(400).send('already exists')
    });
}