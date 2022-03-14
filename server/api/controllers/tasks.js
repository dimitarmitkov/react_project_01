const { Sequelize } = require('sequelize');
const cs = require("../connection/connectionData");
const serviceFactory = require("../services/serviceFactory");
const { QueryTypes } = require('sequelize');

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

const usersTable = serviceFactory(sequelize.define("usersModel", {}, { tableName: "Users" }));

const tasksTable = serviceFactory(sequelize.define("tasksModel", {}, { tableName: "Tasks" }));


module.exports.getAllUsers = function (req, res, next) {

    usersTable.getAll(req, res, next, ['id', 'firstName', 'email', 'role']);
}

module.exports.getAllTasks = function (req, res, next) {

    tasksTable.getAll(req, res, next, ['id', 'taskType', 'taskName']);
}

module.exports.getOneUser = function (req, res, next) {

    usersTable.getSingle(req, res, next, ['id', 'firstName', 'email', 'role']);
}

module.exports.getOneTask = function (req, res, next) {

    tasksTable.getSingle(req, res, next, ['id', 'taskType', 'taskName']);
}

module.exports.getAllUsersPaginate = function (req, res, next) {

    usersTable.getAllPagination(req, res, next, ['id', 'firstName', 'email', 'role'], 1, 2);
}

module.exports.getAllUsersPagesLimit = function (req, res, next) {

    usersTable.getAllPagination(req, res, next, ['id', 'firstName', 'email', 'role']);
}
