const dbConfig = require("../config/db.config.js");
// console.log(db.config)
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    // freezeTableName: true,
    // modelName: 'singularName',

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.account = require('./account.model.js')(sequelize, Sequelize);
db.booking = require('./booking.model.js')(sequelize, Sequelize);
db.cartype = require('./cartype.model.js')(sequelize, Sequelize);
db.company = require('./company.model.js')(sequelize, Sequelize);
db.driverstatus = require('./driverstatus.model.js')(sequelize, Sequelize);
db.log = require('./log.model.js')(sequelize,Sequelize);
db.price = require('./price.model.js')(sequelize, Sequelize);
db.user = require('./user.model.js')(sequelize, Sequelize);
db.voucher = require('./voucher.model.js')(sequelize, Sequelize);


module.exports = db;