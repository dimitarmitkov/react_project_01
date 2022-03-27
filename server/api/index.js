const { Router } = require('express');
const tasksController = require('./controllers/tasks');
const authMiddleware = require('../api/middlewares/authenticate');

module.exports.connect = function(path, app) {
    const router = Router();

    router.route("/tasks")
        .get(authMiddleware.auth, authMiddleware.isAdmin, tasksController.getAllTasks);

    router.route("/users")
        .get(authMiddleware.auth, tasksController.getAllUsers);

    router.route("/usersPage")
        .get(authMiddleware.auth, tasksController.getAllUsersPaginate)
        .post(authMiddleware.auth, tasksController.getAllUsersPagesLimit);

    router.route("/tasksPage")
        .get(authMiddleware.auth, tasksController.getAllUsersPaginate)
        .post(authMiddleware.auth, tasksController.getAllUsersPagesLimit);

    router.route("/users/:id")
        .get(authMiddleware.auth, tasksController.getOneUser);

    router.route("/usersDelete/:id")
        .get(authMiddleware.auth, authMiddleware.isAdmin, tasksController.deleteOneUser);

    router.route("/tasks/:id")
        .get(authMiddleware.auth, tasksController.getOneTask);

    router.route("/tasksDelete/:id")
        .get(authMiddleware.auth, tasksController.deleteOneTask);

    router.route("/createUser")
        .get(tasksController.createSingleUser)
        .post(tasksController.createSingleUser);

    router.route("/createTask")
        .get(authMiddleware.auth, tasksController.createSingleTask);

    router.route("/usersEdit/:id")
        .get(authMiddleware.auth, tasksController.editOneUser);

    router.route("/userLog/:insertEmail,:insertPassword")
        .get(authMiddleware.auth, tasksController.userLogin);

    router.route("/authorization")
        .get(tasksController.authorization);

    router.route("/userLogin")
        .post(tasksController.userLogin);

    router.route("/currentLoggedUser")
        .get(authMiddleware.auth, tasksController.currentLoggedUser);

    app.use(path, router);
};