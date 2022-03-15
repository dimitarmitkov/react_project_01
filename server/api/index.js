const { Router } = require('express');
const tasksController = require('./controllers/tasks');
const authMiddleware = require('../api/middlewares/authenticate');

module.exports.connect = function (path, app) {
  const router = Router();

  router.route("/tasks")
    .get(tasksController.getAllTasks);

  router.route("/users")
    .get(authMiddleware.auth, tasksController.getAllUsers);

  router.route("/usersPage")
    .get(authMiddleware.auth, tasksController.getAllUsersPaginate);

  router.route("/usersPage/:osData,:limData")
    .get(authMiddleware.auth, tasksController.getAllUsersPagesLimit);

  router.route("/users/:id")
    .get(authMiddleware.auth, tasksController.getOneUser);

  router.route("/usersDelete/:id")
    .get(authMiddleware.auth, tasksController.deleteOneUser);

  router.route("/tasks/:id")
    .get(authMiddleware.auth, tasksController.getOneTask);

  router.route("/tasksDelete/:id")
    .get(authMiddleware.auth, tasksController.deleteOneTask);

  router.route("/createUser")
    .get(authMiddleware.auth, tasksController.createSingleUser);

  router.route("/createTask")
    .get(authMiddleware.auth, tasksController.createSingleTask);

  app.use(path, router);
};
