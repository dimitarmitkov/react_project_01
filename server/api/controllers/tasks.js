global.__basedir = __dirname;

const path = require('path');
const { Sequelize } = require('sequelize');
const cs = require("../connection/connectionData");
const serviceFactory = require("../services/serviceFactory");
const fs = require('fs');
const getFileName = require("../functions/getFileName.js");

// const bcrypt = require("bcrypt");
// const { QueryTypes } = require('sequelize');
// const multer = require('multer');
// const upload = multer({ dest: path.resolve(__dirname, 'public/images') });


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
let password = '';
let email = '';
let role = '';
let picture = '';
let taskType = '';
let taskName = '';
let taskProgress = '';
let userId = '';
let taskId = '';
let initiatedAt = '';
let initiatedByUserId = '';


const usersTable = serviceFactory(sequelize.define('usersModel', { firstName, lastName, password, email, role, picture, deletedAt }, { tableName: "Users" }));

const tasksTable = serviceFactory(sequelize.define('tasksModel', { taskType, taskName, taskProgress, initiatedAt, initiatedByUserId, deletedAt }, { tableName: "Tasks" }));

const userTasksTable = serviceFactory(sequelize.define('userTasksModel', { userId, taskId, deletedAt }, { tableName: "UserTasks" }));


module.exports.getAllUsers = function(req, res, next) {

    usersTable.getAll(req, res, next, ['id', 'firstName', 'lastName', 'email', 'role', 'password', 'deletedAt']);
}

module.exports.getAllTasks = function(req, res, next) {

    tasksTable.getAll(req, res, next, ['id', 'taskType', 'taskName', 'taskProgress', 'deletedAt']);
}

module.exports.getAllUsersByTask = function(req, res, next) {

    userTasksTable.getAllUsersByTask(req, res, next, ['id', 'userId', 'taskId', 'deletedAt']);
}


module.exports.editTask = function(req, res, next) {

    tasksTable.editTask(req, res, next, [
        'id',
        'taskType',
        'taskName',
        'taskProgress',
        'initiatedAt',
        'initiatedByUserId',
        'selectedAt',
        'selectedByUserId',
        'progressAt',
        'progressByUserId',
        'reviewAt',
        'reviewByUserId',
        'doneAt',
        'doneByUserId',
        'deletedAt'
    ]);
}

module.exports.getOneUser = function(req, res, next) {

    usersTable.getSingle(req, res, next, ['id', 'firstName', 'lastName', 'email', 'role', 'password', 'picture', 'deletedAt']);
}

module.exports.getOneTask = function(req, res, next) {

    tasksTable.getSingle(req, res, next, ['id', 'taskType', 'taskName', 'deletedAt']);
}

module.exports.getUserTasks = function(req, res, next) {

    tasksTable.getUserTasks(req, res, next, ['id', 'taskType', 'taskName', 'taskProgress', 'deletedAt']);
}

module.exports.matchUserTasks = function(req, res, next) {

    userTasksTable.matchUserTasks(req, res, next, ['id', 'userId', 'taskId', 'deletedAt']);
}

module.exports.getUserTasksMeetingOrProject = function(req, res, next) {

    tasksTable.getUserTasksMeetingOrProject(req, res, next, ['id', 'taskType', 'taskName', 'taskProgress', 'deletedAt']);
}

module.exports.getAllUsersPaginate = function(req, res, next) {

    usersTable.getAllPagination(req, res, next, ['id', 'firstName', 'email', 'role', 'deletedAt'], "user");
}

module.exports.getAllUsersPagesLimit = function(req, res, next) {

    usersTable.getAllPagination(req, res, next, ['id', 'firstName', 'lastName', 'email', 'role', 'password', 'deletedAt'], "user");
}

module.exports.getAllTasksPaginate = function(req, res, next) {

    tasksTable.getAllPagination(req, res, next, ['id', 'taskType', 'taskName', 'taskProgress', 'deletedAt'], 'task');
}

module.exports.getAllPaginationRawQuery = function(req, res, next) {

    tasksTable.getAllPaginationRawQuery(req, res, next, ['id', 'taskType', 'taskName', 'taskProgress', 'deletedAt'], 'task');
}

module.exports.getAllPaginationRawQueryMop = function(req, res, next) {

    tasksTable.getAllPaginationRawQueryMop(req, res, next, ['id', 'taskType', 'taskName', 'taskProgress', 'deletedAt'], 'task');
}

module.exports.deleteOneUser = function(req, res, next) {

    usersTable.deleteSingle(req, res, next, ['id', 'firstName', 'email', 'role', 'deletedAt'], 'user');
}

module.exports.deleteOneTask = function(req, res, next) {

    tasksTable.deleteSingle(req, res, next, ['id', 'taskType', 'taskName', 'deletedAt'], 'task');
}

module.exports.editOneUser = function(req, res, next) {

    usersTable.editSingle(req, res, next, ['id', 'firstName', 'lastName', 'password', 'email', 'role', 'picture', 'deletedAt'], 'user');
}

module.exports.userLogin = function(req, res, next) {

    usersTable.userLogin(req, res, next, ['id', 'firstName', 'email', 'role', 'deletedAt'], 'user');
}

module.exports.userLogout = function(req, res, next) {

    usersTable.userLogout(req, res, next, ['id', 'firstName', 'email', 'role', 'deletedAt'], 'user');
}

module.exports.authorization = function(req, res, next) {

    usersTable.authorization(req, res, next, ['id', 'firstName', 'email', 'role', 'deletedAt'], 'user');
}

module.exports.currentLoggedUser = function(req, res, next) {

    usersTable.currentLoggedUser(req, res, next, ['id', 'firstName', 'email', 'role', 'deletedAt'], 'user');
}

// module.exports.pictures = function(req, res, next) {

//     userPicturesTable.pictures(req, res, next, ['id', 'userId', 'picture', 'deletedAt'], 'userPicture');
// }

// module.exports.picturesGet = function(req, res, next) {

//     userPicturesTable.picturesGet(req, res, next, ['id', 'userId', 'picture', 'deletedAt'], 'userPicture');
// }

module.exports.photos = function(req, res, next) {

    const mimeTypesArray = ['image/bmp', 'image/gif', 'image/jpeg', 'image/png', 'image/svg+xml', 'image/tiff'];

    if (mimeTypesArray.includes(req.body.picType)) {

        const currPath = path.resolve(__dirname, 'public/images').replace('api/controllers/', '');
        const base64Data = req.body.picture.replace(/^data:[A-Za-z-+\/]+;base64,/, '');
        const fileName = getFileName(req);

        fs.writeFile(currPath + '/' + fileName, base64Data, 'base64',
            function(err) {
                if (err) {
                    throw err;
                }
                usersTable.pictures(req, res, next, ['id', 'firstName', 'email', 'role', 'picture', 'deletedAt'], 'user');
            });
    } else {
        throw "This is not picture";
    }
}

module.exports.createSingleUser = function(req, res, next) {

    usersTable.createSingleUser(req, res, next, ['id', 'firstName', 'lastName', 'password', 'email', 'role', 'picture', 'deletedAt'], 'user');
}


module.exports.createSingleTask = function(req, res, next) {

    tasksTable.createSingleTask(req, res, next, ['id', 'taskType', 'taskName', 'taskProgress', 'deletedAt'], 'task');
}