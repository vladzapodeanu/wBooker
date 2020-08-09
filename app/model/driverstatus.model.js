module.exports = (sequelize, Sequelize) => {

    const DriverStatus = sequelize.define('driverstatus', {
        id_driver: {
            type: 'INTEGER',
            autoIncrement:true,
            primaryKey:true
        },
        id_user:{
          type: 'INTEGER'
        },
        online: {
            type: 'BIT'
        },
        status: {
            type: 'VARCHAR'
        },
        lat: {
            type: 'FLOAT'
        },
        longit: {
            type: 'FLOAT'
        }},
        {
            freezeTableName: true
        });

    return DriverStatus;
}