# react_project_01

This is a serverside structure of Management System Project

It contains API, global error handler, models, migrations, seeders

**Before start a JSON file named config.json ought to be added in config directory.**

This file will appear after installing sequelize-cli dependency.

All db connection data have to be added into config.json;

Entry point is index.js, you need to run (npx) nodemon index.js to run server app

As of now here are few operating services:
getAll - it will call all users/tasks: http://localhost:62000/api/v1/users
getSingle - it wull call singlr user/task by id: http://localhost:62000/api/v1/tasks/1
getAllPagination - it will call all users/tasks paginated by select user/task skipped at page beginning and number of users/task shown: http://localhost:62000/api/v1/usersPage/1,2

