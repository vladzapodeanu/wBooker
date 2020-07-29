module.exports = (sequelize, Sequelize) => {

    const Log = sequelize.define('log', {
        id_log: {
            type: 'INTEGER',
            autoIncrement:true,
            primaryKey:true
        },
        id_driver: {
            type: 'INTEGER'
        },

        values: {
            type: 'INTEGER'
        }
    });

    return Log;
}