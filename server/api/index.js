const { Router } = require('express');
const tasksController = require('./controllers/tasks');
const authMiddleware = require('../api/middlewares/authenticate');

module.exports.connect = function(path, app) {
    const router = Router();

    router.route("/tasks")
        .get(authMiddleware.auth, authMiddleware.isAdmin, tasksController.getAllTasks)
        .post(authMiddleware.auth, tasksController.editTask);

    router.route("/users")
        .get(authMiddleware.auth, authMiddleware.isAdmin, tasksController.getAllUsers)
        .post(authMiddleware.auth, tasksController.getOneUser);

    router.route("/usertasks")
        .get(authMiddleware.auth, tasksController.getUserTasks)
        .post(authMiddleware.auth, tasksController.getUserTasks)
        .patch(authMiddleware.auth, tasksController.getAllUsersByTask)
        .put(authMiddleware.auth, tasksController.matchUserTasks);

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

    router.route("/tasksDelete")
        .get(authMiddleware.auth, authMiddleware.isAdmin, tasksController.deleteOneTask)
        .post(authMiddleware.auth, authMiddleware.isAdmin, tasksController.deleteOneTask);

    router.route("/createUser")
        .get(authMiddleware.auth, authMiddleware.isAdmin, tasksController.createSingleUser)
        .post(authMiddleware.auth, authMiddleware.isAdmin, tasksController.createSingleUser);

    router.route("/createTask")
        .post(authMiddleware.auth, authMiddleware.isAdmin, tasksController.createSingleTask);

    router.route("/usersEdit")
        .post(authMiddleware.auth, tasksController.editOneUser);

    router.route("/authorization")
        .get(tasksController.authorization);

    router.route("/userLogin")
        .post(tasksController.userLogin);

    router.route("/userLogout")
        .get(tasksController.userLogout);

    router.route("/currentLoggedUser")
        .get(authMiddleware.auth, tasksController.currentLoggedUser);

    router.route("/photos/upload")
        .post(authMiddleware.auth, tasksController.photos);

    app.use(path, router);
};