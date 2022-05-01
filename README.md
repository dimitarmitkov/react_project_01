# react_project_01

This is a serverside structure of Management System Project

It contains API, global error handler, models, migrations, seeders

**Before start a JSON file named config.json ought to be added in config directory.**

config.json file will appear after installing sequelize-cli dependency.

All db connection data have to be added into config.json, like that:
```
{
  "development": {
    "username": [username],
    "password": [password],
    "database": [databasename],
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": [username],
    "password": [password],
    "database": [databasename],
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": [username],
    "password": [password],
    "database": [databasename],
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```

postgres dialect is a must, because postgres db is used in this project.

**Starting project:**

From main directory you need to type `npm start`. Enjoy it :) 



