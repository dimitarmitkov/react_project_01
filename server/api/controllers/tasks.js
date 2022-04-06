global.__basedir = __dirname;

const path = require('path');
const { Sequelize } = require('sequelize');
const cs = require("../connection/connectionData");
const serviceFactory = require("../services/serviceFactory");
const { QueryTypes } = require('sequelize');
const bcrypt = require("bcrypt");
const multer = require('multer');
const fs = require('fs');

const upload = multer({ dest: path.resolve(__dirname, 'public/images') });
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
let userId = '';
let picture = '';

const usersTable = serviceFactory(sequelize.define('usersModel', { firstName, lastName, deletedAt }, { tableName: "Users" }));

const tasksTable = serviceFactory(sequelize.define('tasksModel', { deletedAt }, { tableName: "Tasks" }));

const userTasksTable = serviceFactory(sequelize.define('userTasksModel', { deletedAt }, { tableName: "UserTasks" }));

const userPicturesTable = serviceFactory(sequelize.define('userPicturesModel', { userId, picture, deletedAt }, { tableName: "UserPictures" }));



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

module.exports.pictures = function(req, res, next) {

    userPicturesTable.pictures(req, res, next, ['id', 'userId', 'picture', 'deletedAt'], 'userPicture');
}

module.exports.photos = function(req, res, next) {
    upload.single('file');

    // function readFile(filePath) {
    //     try {
    //         const data = fs.readFile(filePath);
    //         console.log(data.toString());
    //     } catch (error) {
    //         console.error(`Got an error trying to read the file: ${error.message}`);
    //     }
    // }

    // readFile(req.body.picture);

    console.log(global);
    console.log(req._parsedUrl._raw);
    console.log(req.body.picture);
    console.log(path.resolve(req.body.picture));
    const file = global.__basedir + '/public/images/' + req.body.picture;

    fs.rename(req._parsedUrl._raw, file, function(err) {
        if (err) {
            console.log(err);
            res.send(500);
        } else {

            usersTable.photos(req, res, next, ['id', 'firstName', 'email', 'role', 'deletedAt'], 'user');
        }

    })

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

    if (isValidPass) {
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

    } else {
        res.status(400).send('wrong password')
    }


}


module.exports.createSingleTask = function(req, res, next) {

    var minutesToAdd = 1;
    var currentDate = new Date();
    var futureDate = new Date(currentDate.getTime() + minutesToAdd * 60000).toISOString();

    const {
        taskType,
        taskName,
        taskProgress,
    } = req.body;

    const taskCreatable = sequelize.define('tasksModel', { taskType, taskName, taskProgress }, { tableName: "Tasks" });

    taskCreatable.create({
        taskType,
        taskName,
        taskProgress,
    }).then(task => {
        console.log(task.dataValues);
        res.status(201).send('task created');
    }).catch(next => {
        res.status(400).send('not allowed')
    });
}