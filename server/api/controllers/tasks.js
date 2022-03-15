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

const usersTable = serviceFactory(sequelize.define('usersModel', { deletedAt }, { tableName: "Users" }));

const tasksTable = serviceFactory(sequelize.define('tasksModel', { deletedAt }, { tableName: "Tasks" }));

const userTasksTable = serviceFactory(sequelize.define('userTasksModel', { deletedAt }, { tableName: "UserTasks" }));



module.exports.getAllUsers = function (req, res, next) {

    usersTable.getAll(req, res, next, ['id', 'firstName', 'email', 'role', 'picture', 'deletedAt']);
}

module.exports.getAllTasks = function (req, res, next) {

    tasksTable.getAll(req, res, next, ['id', 'taskType', 'taskName', 'deletedAt']);
}

module.exports.getOneUser = function (req, res, next) {

    usersTable.getSingle(req, res, next, ['id', 'firstName', 'email', 'role', 'deletedAt']);
}

module.exports.getOneTask = function (req, res, next) {

    tasksTable.getSingle(req, res, next, ['id', 'taskType', 'taskName', 'deletedAt']);
}

module.exports.getAllUsersPaginate = function (req, res, next) {

    usersTable.getAllPagination(req, res, next, ['id', 'firstName', 'email', 'role', 'deletedAt'], 1, 2);
}

module.exports.getAllUsersPagesLimit = function (req, res, next) {

    usersTable.getAllPagination(req, res, next, ['id', 'firstName', 'email', 'role', 'deletedAt']);
}

module.exports.deleteOneUser = function (req, res, next) {

    usersTable.deleteSingle(req, res, next, ['id', 'firstName', 'email', 'role', 'deletedAt'], 'user');
}

module.exports.deleteOneTask = function (req, res, next) {

    tasksTable.deleteSingle(req, res, next, ['id', 'taskType', 'taskName', 'deletedAt'], 'task');
}

module.exports.createSingleUser = function (req, res, next) {

    // const {
    //         firstName,
    //         lastName,
    //         insertPassword,
    //         email,
    //         role,
    //         picture
    //     } = req.body;

    const {
        firstName,
        lastName,
        insertPassword,
        email,
        role,
        picture
    } =
    {
        firstName: 'mitko',
        lastName: 'dimitar',
        insertPassword: '123456456456',
        email: 'email@mmm.mmm',
        role: 'admin',
        picture: 'jklshjklsdfhjksdhfjksd'
    }


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
        console.log(customer.dataValues);
    }).catch(next => {
        res.status(400).send('already exists')
    });
}


module.exports.createSingleTask = function (req, res, next) {

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
    } =
    {
        taskType: 'project',
        taskName: 'second task name',
        taskProgress: 'initial',
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
        { taskType, taskName, taskProgress }, 
        { tableName: "Tasks" });

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