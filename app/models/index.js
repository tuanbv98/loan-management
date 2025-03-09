const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.js")(sequelize, Sequelize);
db.customer = require("./customer.js")(sequelize, Sequelize);
db.loan = require("./loan.js")(sequelize, Sequelize);
db.payment = require("./payment.js")(sequelize, Sequelize);
db.transaction = require("./transaction.js")(sequelize, Sequelize);

module.exports = db;
