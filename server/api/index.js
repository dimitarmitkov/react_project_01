const { Router } = require('express');
const tasksController = require('./controllers/tasks');
const authMiddleware = require('../api/middlewares/authenticate');

module.exports.connect = function(path, app) {
    const router = Router();

    router.route("/tasks")
        .get(authMiddleware.auth, authMiddleware.isAdmin, tasksController.getAllTasks)
        .post(authMiddleware.auth, authMiddleware.isAdmin, tasksController.editTask);

    router.route("/users")
        .get(authMiddleware.auth, tasksController.getAllUsers)
        .post(authMiddleware.auth, tasksController.getOneUser);

    router.route("/usertasks")
        .get(authMiddleware.auth, tasksController.getUserTasks)
        .post(authMiddleware.auth, tasksController.getUserTasks);

    router.route("/usertasksmop")
        .get(authMiddleware.auth, tasksController.getUserTasksMeetingOrProject)
        .post(authMiddleware.auth, tasksController.getUserTasksMeetingOrProject);

    router.route("/usersPage")
        .get(authMiddleware.auth, tasksController.getAllUsersPaginate)
        .post(authMiddleware.auth, tasksController.getAllUsersPagesLimit);

    router.route("/tasksPage")
        .get(authMiddleware.auth, tasksController.getAllTasksPaginate)
        .post(tasksController.getAllPaginationRawQuery)
        .patch(tasksController.getAllPaginationRawQueryMop);

    router.route("/usersDelete")
        .post(authMiddleware.auth, authMiddleware.isAdmin, tasksController.deleteOneUser);

    router.route("/tasks/:id")
        .get(authMiddleware.auth, tasksController.getOneTask);

    router.route("/tasksDelete")
        .get(authMiddleware.auth, tasksController.deleteOneTask)
        .post(authMiddleware.auth, tasksController.deleteOneTask);

    router.route("/createUser")
        .get(tasksController.createSingleUser)
        .post(tasksController.createSingleUser);

    router.route("/createTask")
        .post(tasksController.createSingleTask);

    router.route("/usersEdit")
        .post(authMiddleware.auth, tasksController.editOneUser);

    router.route("/userLog/:insertEmail,:insertPassword")
        .get(authMiddleware.auth, tasksController.userLogin);

    router.route("/authorization")
        .get(tasksController.authorization);

    router.route("/userLogin")
        .post(tasksController.userLogin);

    router.route("/userLogout")
        .get(tasksController.userLogout);

    router.route("/currentLoggedUser")
        .get(authMiddleware.auth, tasksController.currentLoggedUser);

    app.use(path, router);
};