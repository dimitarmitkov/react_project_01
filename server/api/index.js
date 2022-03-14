const { Router } = require('express');
const tasksController = require('./controllers/tasks');

module.exports.connect = function (path, app) {
  const router = Router();

  router.route("/tasks")
  .get(tasksController.getAllTasks);

  router.route("/users")
  .get(tasksController.getAllUsers);

  router.route("/usersPage")
  .get(tasksController.getAllUsersPaginate);

  router.route("/usersPage/:osData,:limData")
  .get(tasksController.getAllUsersPagesLimit);

  router.route("/users/:id")
  .get(tasksController.getOneUser);

  router. route("/usersDelete/:id")
  .get(tasksController.deleteOneUser);

  router.route("/tasks/:id")
  .get(tasksController.getOneTask);

  router.route("/tasksDelete/:id")
  .get(tasksController.deleteOneTask);

  app.use(path, router);
};
