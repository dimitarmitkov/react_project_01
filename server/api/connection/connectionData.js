const connectionString = require("../../config/config.json");

module.exports = {
  username: connectionString.development.username,
  password: connectionString.development.password,
  database: connectionString.development.database,
  host: connectionString.development.host,
  dialect: connectionString.development.dialect
}
